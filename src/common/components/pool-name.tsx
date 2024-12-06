import clsx from "clsx";
import { Avatar, Text } from "@trade-project/ui-toolkit";

type Props = {
  className?: string;
  asset: string;
  quote: string;
  fee: number;
};

export function PoolName({ className, asset, quote, fee }: Props) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <div className="flex -space-x-2">
        <Avatar src={`/coins/${asset}.png`} className="size-6 saturate-50" />
        <Avatar src={`/coins/${quote}.png`} className="size-6 z-10" />
      </div>
      <div className="flex items-center gap-1">
        <span>
          {asset} - {quote}
        </span>
        <Text>({fee}%)</Text>
      </div>
    </div>
  );
}
