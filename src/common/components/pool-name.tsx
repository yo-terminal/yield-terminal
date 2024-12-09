import clsx from "clsx";
import { Avatar, Text } from "@trade-project/ui-toolkit";

type Props = {
  className?: string;
  asset: string;
  quote: string;
  fee: number;
  asset_type: string;
};

export function PoolName({ className, asset, quote, fee, asset_type }: Props) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <div className="flex -space-x-2">
        <Avatar src={`https://assets.terminal.mobi/coins/${asset}.png`} className="size-6 saturate-50" />
        <Avatar src={`https://assets.terminal.mobi/coins/${quote}.png`} className="size-6 z-10" />
      </div>
      <div className="flex items-center gap-1">
        <a
          href={`https://www.birdeye.so/token/${asset_type}?chain=sui`}
          target="_blank"
        >
          {asset} - {quote}
        </a>
        <Text>({fee}%)</Text>
      </div>
    </div>
  );
}
