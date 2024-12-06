import { Badge } from "@trade-project/ui-toolkit";
import { memo } from "react";

function getColor(value?: number) {
  if (!value) return "slate";
  if (value > 0) return "teal";
  if (value < 0) return "pink";
  return "slate";
}

type Props = {
  className?: string;
  value?: number;
  percent?: boolean;
};

export const ProfitBadge = memo(function ProfitBadge({
  className,
  value,
  percent,
}: Props) {
  const content =
    typeof value === "number"
      ? `${value > 0 ? "+" : ""}${percent ? `${value.toFixed(2)}%` : value}`
      : "—";
  return (
    <Badge className={className} color={getColor(value)}>
      {content}
    </Badge>
  );
});
