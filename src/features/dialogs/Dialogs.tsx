import { memo } from "react";
import { DepositDialog } from "./depositDialog/DepositDialog";

export const Dialogs = memo(function Dialogs() {
  return (
    <>
      <DepositDialog />
    </>
  );
});
