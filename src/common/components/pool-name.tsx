import clsx from "clsx";
import { Avatar, Text } from "@trade-project/ui-toolkit";

type Props = {
  className?: string;
  asset: string;
  quote: string;
  fee: number;
  address: string;
};

export function PoolName({ className, asset, quote, fee, address }: Props) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <div className="flex -space-x-2">
        <Avatar src={`/coins/${asset}.png`} className="size-6 saturate-50" />
        <Avatar src={`/coins/${quote}.png`} className="size-6 z-10" />
      </div>
      <div className="flex items-center gap-1">
        <a
          href={`https://www.geckoterminal.com/sui-network/pools/${address}`}
          target="_blank"
        >
          {asset} - {quote}
        </a>
        <Text>({fee}%)</Text>
      </div>
    </div>
  );
}
