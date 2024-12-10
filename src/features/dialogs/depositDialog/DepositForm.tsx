import { useState } from "react";
import { useForm, SubmitHandler, useController } from "react-hook-form";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { OpenParams } from "./depositDialogSlice";
import {
  Avatar,
  Button,
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Heading,
  Spin,
} from "@trade-project/ui-toolkit";
import { useCoins, useSignAndExecute } from "../../../app/hooks";
import { useQueueProcessMutation } from "../../../app/api";
import {
  createTransferCoinTxb,
  getMaxBalance,
  SUI_TYPE_ARG,
} from "../../../common/utils";
import { DepositInput } from "../../../common/components";
import { GasDepositWarning } from "./warnings/GasDepositWarning";
import { NotEnoughWarning } from "./warnings/NotEnoughWarning";

type Props = OpenParams & {
  onClose: () => void;
};

type FormInput = {
  amount: number;
};

export function DepositForm({
  poolId,
  coinType,
  recipientAddress,
  decimals,
  symbol,
  min_deposit,
  reserve,
  onClose,
}: Props) {
  const currentAccount = useCurrentAccount();
  const { packageId, queueId, signAndExecute, isPending } = useSignAndExecute();
  const [queueProcess, { isLoading }] = useQueueProcessMutation();
  const [txStatus, setTxStatus] = useState("");
  const [isWaiting, setWaiting] = useState(false);

  const { coins, isCoinLoading } = useCoins(currentAccount!.address);
  const maxBalance = getMaxBalance(coins, coinType, decimals);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid, submitCount },
  } = useForm<FormInput>({
    defaultValues: {
      amount: min_deposit,
    },
  });

  const { field } = useController({
    name: "amount",
    control,
    rules: { required: true, min: min_deposit, max: maxBalance },
  });

  const isProcessing = isPending || isLoading || isSubmitting || isWaiting;
  const notEnough = min_deposit > maxBalance;

  const handleSendTokens = async (depositValue: number | string) => {
    try {
      // Convert amount to smallest unit
      const deposit = parseFloat(depositValue as string);
      const amountInSmallestUnit = BigInt(deposit * 10 ** decimals);

      const { tx, gasDeposit } = createTransferCoinTxb(
        coins,
        coinType,
        amountInSmallestUnit,
        recipientAddress,
        reserve
      );

      tx.moveCall({
        arguments: [
          tx.object(queueId),
          tx.pure.u64(1),
          tx.pure.string(JSON.stringify({ poolId, deposit, gasDeposit })),
        ],
        target: `${packageId}::yield_terminal::push_action`,
      });

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log("Transaction result:", result);
            setWaiting(true);
            setTimeout(() => {
              setWaiting(false);
              queueProcess().then(() => {
                onClose();
              });
            }, 1000);
          },
          onError: () => {
            setTxStatus("Something went wrong");
          },
        }
      );
    } catch (error) {
      console.error("Error sending tokens:", error);
      setTxStatus(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await handleSendTokens(data.amount);
  };

  return (
    <form
      className="flex flex-col gap-3 p-2 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Fieldset className="mb-8" disabled={isCoinLoading || notEnough}>
        <Heading className="flex justify-center items-center gap-2 mb-6">
          <Avatar
            src={`https://assets.terminal.mobi/coins/${symbol}.png`}
            className="size-7"
          />
          {symbol}
        </Heading>
        {!notEnough && coinType !== SUI_TYPE_ARG && reserve < 0.5 && (
          <GasDepositWarning />
        )}
        {!isCoinLoading && notEnough && (
          <NotEnoughWarning
            balance={maxBalance}
            minDeposit={min_deposit}
            symbol={symbol}
          />
        )}
        <FieldGroup className="mt-4">
          <Field className="">
            <DepositInput
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                setTxStatus("");
              }}
              minDeposit={min_deposit}
              maxBalance={maxBalance}
              decimals={decimals}
              ref={field.ref}
              onBlur={field.onBlur}
            />
            <div className="min-h-6 mt-2 mx-1">
              {errors.amount?.type === "min" && (
                <ErrorMessage>
                  Min Deposit: {min_deposit} {symbol}
                </ErrorMessage>
              )}
              {errors.amount?.type === "max" && (
                <ErrorMessage>
                  Max Balance: {maxBalance} {symbol}
                </ErrorMessage>
              )}
              {txStatus && <ErrorMessage>{txStatus}</ErrorMessage>}
            </div>
          </Field>
        </FieldGroup>
      </Fieldset>
      <div className="flex justify-end gap-2">
        <Button plain disabled={isProcessing} onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={
            isProcessing ||
            (!isValid && submitCount > 0) ||
            isCoinLoading ||
            notEnough
          }
          type="submit"
        >
          {isProcessing && <Spin dark className="-ml-1 mr-2" />}
          Deposit
        </Button>
      </div>
    </form>
  );
}
