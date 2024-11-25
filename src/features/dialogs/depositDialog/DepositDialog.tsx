import { Modal } from "@trade-project/ui-toolkit";
import { closeDepositDialog } from "./depositDialogSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DepositForm } from "./DepositForm";

export function DepositDialog() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialogs.depositDialog.open);
  const openParams = useAppSelector(
    (state) => state.dialogs.depositDialog.openParams
  );

  if (!openParams) {
    return null;
  }

  const closeDialog = () => {
    dispatch(closeDepositDialog());
  };

  return (
    <Modal title="Deposit" size="xl" open={open} onClose={closeDialog}>
      <DepositForm {...openParams} onClose={closeDialog} />
    </Modal>
  );
}
