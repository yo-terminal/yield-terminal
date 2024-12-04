import {
  Button,
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@trade-project/ui-toolkit";
import { PoolDto } from "../../../../app/dto";
import { openDepositDialog } from "../../../dialogs/depositDialog/depositDialogSlice";
import { useAppDispatch } from "../../../../app/hooks";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/16/solid";
import { openClosePositionDialog } from "../../../dialogs/closePositionDialog/closePositionDialogSlice";

type Props = {
  pool: PoolDto;
};

export function ActionCell({ pool }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        plain
        onClick={() => {
          dispatch(
            openDepositDialog({
              poolId: pool._id,
              recipientAddress: pool.position!.address,
              coinType: pool.quote_type,
              decimals: pool.quote_decimals,
              symbol: pool.quote_symbol,
              min_deposit: pool.min_deposit,
              reserve: pool.position!.reserve || 0,
            })
          );
        }}
      >
        <PlusIcon />
        Deposit
      </Button>
      <Dropdown>
        <DropdownButton plain aria-label="More options">
          <EllipsisVerticalIcon />
        </DropdownButton>
        <DropdownMenu anchor="bottom end">
          <DropdownItem
            onClick={() => {
              dispatch(
                openClosePositionDialog({
                  poolId: pool._id,
                  balance: pool.position!.balance,
                  symbol: pool.quote_symbol,
                })
              );
            }}
          >
            Close Position
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
