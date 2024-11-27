import { OpenParams } from "./closePositionDialogSlice";
import { Button, Spin } from "@trade-project/ui-toolkit";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecute } from "../../../app/hooks";
import { useQueueProcessMutation } from "../../../app/api";

type Props = OpenParams & {
  onClose: () => void;
};

export function ClosePositionForm({ poolId, onClose }: Props) {
  const { packageId, queueId, signAndExecute, isPending } = useSignAndExecute();
  const [queueProcess, { isLoading }] = useQueueProcessMutation();

  const isProcessing = isPending || isLoading;

  const handleClosePosition = () => {
    const tx = new Transaction();

    tx.moveCall({
      arguments: [
        tx.object(queueId),
        tx.pure.u64(2),
        tx.pure.option("string", JSON.stringify({ poolId })),
      ],
      target: `${packageId}::yield_terminal::push_action`,
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log("Transaction result:", result);
          queueProcess().then(() => {
            onClose();
          });
        },
        onError: () => {
          alert("Something went wrong");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex justify-end mt-12 gap-2">
        <Button plain disabled={isProcessing} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isProcessing} onClick={handleClosePosition}>
          {isProcessing && <Spin className="-ml-1 mr-2" />}
          Close Position
        </Button>
      </div>
    </div>
  );
}
