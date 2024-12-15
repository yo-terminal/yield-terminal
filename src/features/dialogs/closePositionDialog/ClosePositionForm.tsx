import { OpenParams } from "./closePositionDialogSlice";
import { Button, Text, Strong, Spin } from "@trade-project/ui-toolkit";
import { useClosePosition } from "../../../app/hooks";

type Props = OpenParams & {
  onClose: () => void;
};

export function ClosePositionForm({ poolId, balance, symbol, onClose }: Props) {
  const { closePosition, isPending } = useClosePosition();

  const handleClosePosition = () => {
    closePosition({ pool_id: poolId }).then(onClose);
  };

  return (
    <div className="flex flex-col gap-3 p-2">
      <Text className="mt-2">
        By closing the position, you will receive its assets in the amount of
        about <Strong>{balance}</Strong> {symbol}.
      </Text>
      <div className="flex justify-end mt-10 gap-2">
        <Button plain disabled={isPending} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isPending} onClick={handleClosePosition}>
          {isPending && <Spin dark className="-ml-1 mr-2" />}
          Close Position
        </Button>
      </div>
    </div>
  );
}
