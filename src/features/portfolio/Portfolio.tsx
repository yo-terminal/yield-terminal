import { useCurrentAccount } from "@mysten/dapp-kit";
import { Overview } from "./overview/Overview";
import { PoolList } from "./poolList/PoolList";

export function Portfolio() {
  const account = useCurrentAccount();

  return (
    <>
      {account && <Overview owner={account.address} />}
      {account && <PoolList className="mt-14 mb-7" owner={account.address} />}
    </>
  );
}
