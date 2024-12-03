import { Modal } from "@trade-project/ui-toolkit";
import { closeClosePositionDialog } from "./closePositionDialogSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ClosePositionForm } from "./ClosePositionForm";

export function ClosePositionDialog() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialogs.closePositionDialog.open);
  const openParams = useAppSelector(
    (state) => state.dialogs.closePositionDialog.openParams
  );

  if (!openParams) {
    return null;
  }

  const closeDialog = () => {
    dispatch(closeClosePositionDialog());
  };

  return (
    <Modal title="Close Position" size="md" open={open} onClose={closeDialog}>
      <ClosePositionForm {...openParams} onClose={closeDialog} />
    </Modal>
  );
}
