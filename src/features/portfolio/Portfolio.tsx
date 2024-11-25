import { useCurrentAccount } from "@mysten/dapp-kit";
import { PoolList } from "./poolList/PoolList";

export function Portfolio() {
  const account = useCurrentAccount();

  return (
    <>
      {account && <PoolList className="mt-8" owner={account.address} />}
    </>
  );
}
