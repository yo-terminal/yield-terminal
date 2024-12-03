import { memo } from "react";

type Props = {
  className?: string;
  symbol: string;
  value: number;
  profit?: boolean;
};

export const BalanceValue = memo(function BalanceValue({
  className,
  value,
  symbol,
  profit,
}: Props) {
  return (
    <span className={className}>
      {`${profit && value > 0 ? "+" : ""}${value}`}{" "}
      <span className="text-slate-500 dark:text-slate-400">{symbol}</span>
    </span>
  );
});
