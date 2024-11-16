import { Button } from "@trade-project/ui-toolkit";
import { PoolDto } from "../../../../app/dto";
import { openDepositDialog } from "../../../dialogs/depositDialog/depositDialogSlice";
import { useAppDispatch } from "../../../../app/hooks";

type Props = {
  pool: PoolDto;
};

export function Deposit({ pool }: Props) {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(
          openDepositDialog({
            recipientAddress: pool.position!.address,
            coinType: pool.quote_type,
            decimals: pool.quote_decimals,
            symbol: pool.quote_symbol,
          })
        );
      }}
    >
      Deposit
    </Button>
  );
}
