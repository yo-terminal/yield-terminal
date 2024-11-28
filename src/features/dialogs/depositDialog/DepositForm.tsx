import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { OpenParams } from "./depositDialogSlice";
import {
  Button,
  FieldGroup,
  Fieldset,
  InputField,
  Spin,
} from "@trade-project/ui-toolkit";
import { useSignAndExecute } from "../../../app/hooks";
import { useQueueProcessMutation } from "../../../app/api";
import createTransferCoinTxb from "./createTransferCoinTxb";

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
  onClose,
}: Props) {
  const currentAccount = useCurrentAccount();
  const { packageId, queueId, signAndExecute, suiClient, isPending } =
    useSignAndExecute();
  const [queueProcess, { isLoading }] = useQueueProcessMutation();
  const [txStatus, setTxStatus] = useState("");
  const [isWaiting, setWaiting] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormInput>({
    defaultValues: {
      amount: 0,
    },
  });

  const isProcessing = isPending || isLoading || isSubmitting || isWaiting;

  const handleSendTokens = async (depositValue: number | string) => {
    if (!depositValue) {
      setTxStatus("Please fill amount field");
      return;
    }
    try {
      // This uses the SuiClient to get coins of the specified type owned by the current address
      const { data: coins } = await suiClient.getCoins({
        owner: currentAccount!.address,
        coinType,
      });
      if (coins.length === 0) {
        setTxStatus(`No ${symbol} coins found in your wallet`);
        return;
      }
      // Create a new transaction block
      // Transaction is used to construct and execute transactions on Sui

      // Convert amount to smallest unit
      const deposit = parseFloat(depositValue as string);
      const amountInSmallestUnit = BigInt(deposit * 10 ** decimals);

      const tx = createTransferCoinTxb(
        coins,
        coinType,
        amountInSmallestUnit,
        recipientAddress
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
            alert("Something went wrong");
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
      <Fieldset>
        <FieldGroup>
          <InputField
            label={`Amount (in ${symbol})`}
            control={control}
            name="amount"
            type="number"
            rules={{ required: true }}
          />
        </FieldGroup>
      </Fieldset>

      {txStatus && <p className="text-sm">{txStatus}</p>}

      <div className="flex justify-end mt-12 gap-2">
        <Button plain disabled={isProcessing} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isProcessing} type="submit">
          {isProcessing && <Spin className="-ml-1 mr-2" />}
          Deposit
        </Button>
      </div>
    </form>
  );
}
