import { memo } from "react";
import { DepositDialog } from "./depositDialog/DepositDialog";
import { ClosePositionDialog } from "./closePositionDialog/ClosePositionDialog";

export const Dialogs = memo(function Dialogs() {
  return (
    <>
      <DepositDialog />
      <ClosePositionDialog />
    </>
  );
});
