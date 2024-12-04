import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useForm, SubmitHandler } from "react-hook-form";
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
  InputField,
  Spin,
} from "@trade-project/ui-toolkit";
import { useCoins, useSignAndExecute } from "../../../app/hooks";
import { useQueueProcessMutation } from "../../../app/api";
import {
  createTransferCoinTxb,
  getMaxBalance,
} from "../../../common/utils";
import { number } from "../../../common/utils";

type Props = OpenParams & {
  onClose: () => void;
};

type FormInput = {
  amount: number;
};

export default function GasDepositWarning() {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon
            aria-hidden="true"
            className="size-5 text-blue-400"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">
            Plus an additional 1 SUI for gas.
          </p>
        </div>
      </div>
    </div>
  );
}

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
  const [percent, setPercent] = useState(0);

  const { coins, isCoinLoading } = useCoins(currentAccount!.address);
  const maxBalance = getMaxBalance(coins, coinType, decimals);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors, isValid, submitCount },
  } = useForm<FormInput>({
    defaultValues: {
      amount: min_deposit,
    },
  });

  const isProcessing = isPending || isLoading || isSubmitting || isWaiting;

  const handleSendTokens = async (depositValue: number | string) => {
    try {
      // Convert amount to smallest unit
      const deposit = parseFloat(depositValue as string);
      const amountInSmallestUnit = BigInt(deposit * 10 ** decimals);

      const tx = createTransferCoinTxb(
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
          tx.pure.string(JSON.stringify({ poolId, deposit })),
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
      <Fieldset className="mb-8" disabled={isCoinLoading}>
        <Heading className="flex justify-center items-center gap-2 mb-6">
          <Avatar src={`/coins/${symbol}.png`} className="size-7" />
          {symbol}
        </Heading>
        <FieldGroup className="mt-4">
          <Field className="">
            <div className="w-full flex items-center gap-1">
              <InputField
                className="w-full"
                control={control}
                name="amount"
                type="number"
                rules={{ required: true, min: min_deposit, max: maxBalance }}
              />
              <Button
                color="blue"
                onClick={() => {
                  setPercent(100);
                  setValue("amount", maxBalance, { shouldValidate: true });
                }}
              >
                Max
              </Button>
            </div>
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
          </Field>
        </FieldGroup>
        <FieldGroup>
          <div className="px-0.5">
            <input
              className="w-full"
              type="range"
              min="0"
              max="100"
              value={percent}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPercent(value);
                setValue(
                  "amount",
                  number.round(
                    min_deposit + ((maxBalance - min_deposit) * value) / 100,
                    decimals
                  ),
                  { shouldValidate: true }
                );
              }}
            />
          </div>
        </FieldGroup>
      </Fieldset>
      {reserve < 0.5 && <GasDepositWarning />}
      {txStatus && <p className="text-sm">{txStatus}</p>}
      <div className="flex justify-end mt-8 gap-2">
        <Button plain disabled={isProcessing} onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={
            isProcessing || (!isValid && submitCount > 0) || isCoinLoading
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
