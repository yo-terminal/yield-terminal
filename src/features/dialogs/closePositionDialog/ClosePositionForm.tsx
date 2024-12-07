import { useState } from "react";
import { OpenParams } from "./closePositionDialogSlice";
import { Button, Text, Strong, Spin } from "@trade-project/ui-toolkit";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecute } from "../../../app/hooks";
import { useQueueProcessMutation } from "../../../app/api";

type Props = OpenParams & {
  onClose: () => void;
};

export function ClosePositionForm({ poolId, balance, symbol, onClose }: Props) {
  const { packageId, queueId, signAndExecute, isPending } = useSignAndExecute();
  const [queueProcess, { isLoading }] = useQueueProcessMutation();
  const [isWaiting, setWaiting] = useState(false);

  const isProcessing = isPending || isLoading || isWaiting;

  const handleClosePosition = () => {
    const tx = new Transaction();

    tx.moveCall({
      arguments: [
        tx.object(queueId),
        tx.pure.u64(2),
        tx.pure.string(JSON.stringify({ poolId })),
      ],
      target: `${packageId}::yield_terminal::push_action`,
    });

    signAndExecute(
      { transaction: tx },
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
  };

  return (
    <div className="flex flex-col gap-3 p-2">
      <Text className="mt-2">
        By closing the position, you will receive its assets in the amount of
        about <Strong>{balance}</Strong> {symbol}.
      </Text>
      <div className="flex justify-end mt-10 gap-2">
        <Button plain disabled={isProcessing} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isProcessing} onClick={handleClosePosition}>
          {isProcessing && <Spin dark className="-ml-1 mr-2" />}
          Close Position
        </Button>
      </div>
    </div>
  );
}
