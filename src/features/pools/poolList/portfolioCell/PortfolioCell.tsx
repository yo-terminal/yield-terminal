import { PoolDto } from "../../../../app/dto";
import { usePoolAccounts } from "../../../../app/hooks";
import { isPortfolio } from "../../../../common/utils";
import { Activate } from "./activate/Activate";
import { Manage } from "./manage/Manage";

type Props = {
  owner: string;
  pool: PoolDto;
};

export function PortfolioCell({ pool, owner }: Props) {
  const { accountMap, isPending } = usePoolAccounts();
  if (isPending) {
    return null;
  }
  const poolAccount = accountMap[pool._id];
  return isPortfolio(pool, poolAccount) ? (
    <Manage pool={pool} />
  ) : (
    <Activate owner={owner} pool_id={pool._id} poolAccount={poolAccount} />
  );
}
