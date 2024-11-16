import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useSuiClient,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { OpenParams } from "./depositDialogSlice";
import {
  Button,
  FieldGroup,
  Fieldset,
  InputField,
  Spin,
} from "@trade-project/ui-toolkit";

type Props = OpenParams & {
  onCancel: () => void;
};

type FormInput = {
  amount: number;
};

export function DepositForm({
  coinType,
  recipientAddress,
  decimals,
  symbol,
  onCancel,
}: Props) {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();
  const [connected, setConnected] = useState(false);
  const [txStatus, setTxStatus] = useState("");

  useEffect(() => {
    setConnected(!!currentAccount);
  }, [currentAccount]);

  const handleSendTokens = async (amount: number | string) => {
    if (!currentAccount || !amount || !recipientAddress) {
      setTxStatus("Please connect wallet and fill in all fields");
      return;
    }
    try {
      // This uses the SuiClient to get coins of the specified type owned by the current address
      const { data: coins } = await suiClient.getCoins({
        owner: currentAccount.address,
        coinType,
      });
      if (coins.length === 0) {
        setTxStatus(`No ${symbol} coins found in your wallet`);
        return;
      }
      // Create a new transaction block
      // Transaction is used to construct and execute transactions on Sui
      const tx = new Transaction();
      // Convert amount to smallest unit
      const amountInSmallestUnit = BigInt(parseFloat(amount as string) * 10 ** decimals);
      // Split the coin and get a new coin with the specified amount
      // This creates a new coin object with the desired amount to be transferred
      const [coin] = tx.splitCoins(coins[0].coinObjectId, [
        tx.pure.u64(amountInSmallestUnit),
      ]);
      // Transfer the split coin to the recipient
      // This adds a transfer operation to the transaction block
      tx.transferObjects([coin], tx.pure.address(recipientAddress));
      // Sign and execute the transaction block
      // This sends the transaction to the network and waits for it to be executed
      signAndExecuteTransaction(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log("Transaction result:", result);
            setTxStatus(`Transaction successful. Digest: ${result.digest}`);
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

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormInput>({
    defaultValues: {
      amount: 0,
    },
  });

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

      {txStatus && <p className="">{txStatus}</p>}

      <div className="flex justify-end mt-12 gap-2">
        <Button plain disabled={isSubmitting} onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={isSubmitting || !connected} type="submit">
          {isSubmitting && <Spin className="-ml-1 mr-2" />}
          Deposit
        </Button>
      </div>
    </form>
  );
}
