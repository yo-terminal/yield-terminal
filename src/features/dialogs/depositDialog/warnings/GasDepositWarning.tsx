import { InformationCircleIcon } from "@heroicons/react/20/solid";

// Ensure your wallet has sufficient balance to proceed.

export function GasDepositWarning() {
  return (
    <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/50">
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon
            aria-hidden="true"
            className="size-5 text-blue-400 dark:text-blue-200"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700 dark:text-blue-200">
            Please note that you will need an additional <strong>1 SUI</strong> to cover gas
            fees. Ensure your wallet has sufficient balance to proceed.<br/><br/>The rest
            of the SUI will be returned after the position is closed.
          </p>
        </div>
      </div>
    </div>
  );
}
