import { useCurrentAccount } from "@mysten/dapp-kit";
import { PoolList } from "./poolList/PoolList";
import { EMPTY_OWNER } from "../../app/constants";
// import { Stat } from "../../common/components";
// import { Subheading } from "@trade-project/ui-toolkit";

export function Pools() {
  const account = useCurrentAccount();

  return (
    <>
      {/* <div className="flex items-end justify-between">
        <Subheading>Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Value Locked" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div> */}
      <PoolList
        className="mb-7"
        owner={account?.address || EMPTY_OWNER}
      />
    </>
  );
}
