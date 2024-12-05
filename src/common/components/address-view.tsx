import clsx from "clsx";
import { ClipboardButton } from "./clipboard-button";

type Props = {
  className?: string;
  address: string;
};

function toAdressView(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function AddressView({ className, address }: Props) {
  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <div className="">{toAdressView(address)}</div>
      <ClipboardButton text={address} />
    </div>
  );
}
