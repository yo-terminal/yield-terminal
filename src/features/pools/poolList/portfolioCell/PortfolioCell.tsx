import { PoolDto } from "../../../../app/dto";
import { PoolAccountModel } from "../../../../app/model";
import { isPortfolio } from "../../../../common/utils";
import { Activate } from "./activate/Activate";
import { Manage } from "./manage/Manage";

type Props = {
  owner: string;
  pool: PoolDto;
  poolAccount: PoolAccountModel | undefined;
};

export function PortfolioCell({ pool, owner, poolAccount }: Props) {
  return isPortfolio(pool, poolAccount) ? (
    <Manage pool={pool} />
  ) : (
    <Activate owner={owner} pool_id={pool._id} poolAccount={poolAccount} />
  );
}
