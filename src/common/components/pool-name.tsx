import clsx from "clsx";
import { Avatar } from "@trade-project/ui-toolkit";

type Props = {
  className?: string;
  asset: string;
  quote: string;
};

export function PoolName({ className, asset, quote }: Props) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <div className="flex -space-x-2">
        <Avatar src={`/coins/${asset}.png`} className="size-6" />
        <Avatar src={`/coins/${quote}.png`} className="size-6" />
      </div>
      <span>
        {asset} - {quote}
      </span>
    </div>
  );
}
