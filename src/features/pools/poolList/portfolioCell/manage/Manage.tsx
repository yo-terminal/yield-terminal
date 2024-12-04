import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import {
  Badge,
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@trade-project/ui-toolkit";
import { PoolDto } from "../../../../../app/dto";
import { useAppDispatch } from "../../../../../app/hooks";
import { openDepositDialog } from "../../../../dialogs/depositDialog/depositDialogSlice";
import { openClosePositionDialog } from "../../../../dialogs/closePositionDialog/closePositionDialogSlice";

type Props = {
  pool: PoolDto;
};

export function Manage({ pool }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-end gap-4">
      <Badge color="blue">In Portfolio</Badge>
      <Dropdown>
        <DropdownButton plain aria-label="More options">
          <EllipsisVerticalIcon />
        </DropdownButton>
        <DropdownMenu anchor="bottom end">
          <DropdownItem
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
            Deposit
          </DropdownItem>
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
