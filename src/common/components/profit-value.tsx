import clsx from "clsx";
import { memo } from "react";

function getColor(value?: number) {
  if (!value) return undefined;
  if (value > 0) return "text-emerald-700 dark:text-emerald-500";
  if (value < 0) return "text-rose-600 dark:text-rose-500";
  return undefined;
}

type Props = {
  className?: string;
  value?: number;
  color?: boolean;
  percent?: boolean;
};

export const ProfitValue = memo(function ProfitValue({
  className,
  value,
  color,
  percent,
}: Props) {
  const content =
    typeof value === "number"
      ? `${value > 0 ? "+" : ""}${percent ? `${value.toFixed(2)}%` : value}`
      : "—";
  return (
    <span className={clsx(className, color ? getColor(value) : undefined)}>
      {content}
    </span>
  );
});
