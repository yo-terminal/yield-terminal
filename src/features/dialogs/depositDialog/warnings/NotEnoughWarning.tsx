import { InformationCircleIcon } from "@heroicons/react/20/solid";

// Ensure your wallet has sufficient balance to proceed.

type Props = {
  balance: number;
  minDeposit: number;
  symbol: string;
};

export function NotEnoughWarning({ balance, minDeposit, symbol }: Props) {
  return (
    <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/30">
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon
            aria-hidden="true"
            className="size-5 text-yellow-400 dark:text-yellow-200"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-yellow-700 dark:text-yellow-200">
            Your available balance of {balance} {symbol} is not enough for the
            minimum deposit of {minDeposit} {symbol}. Please add more funds to
            your wallet and try again.
          </p>
        </div>
      </div>
    </div>
  );
}
