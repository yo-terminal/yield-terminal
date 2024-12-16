import { Divider, ProfitBadge } from "@trade-project/ui-toolkit";
const valueFormatter = Intl.NumberFormat(undefined, { notation: "compact" });
const titleFormatter = Intl.NumberFormat();

export function Stat({
  title,
  value,
  change,
  percent,
}: {
  title: string;
  value: number;
  change?: number;
  percent?: boolean;
}) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6 text-slate-500 dark:text-slate-400">
        {title}
      </div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8 flex items-center gap-3">
        <span title={titleFormatter.format(value)}>
          {valueFormatter.format(value)}
        </span>
        {change !== undefined && (
          <ProfitBadge value={change} percent={percent} />
        )}
      </div>
    </div>
  );
}
