import { PoolDto } from "../../../../app/dto";
import { AccountModel } from "../../../../app/model";
import { isPortfolio } from "../../../../common/utils";
import { Activate } from "./activate/Activate";
import { Manage } from "./manage/Manage";

type Props = {
  owner: string;
  pool: PoolDto;
  backupAccount: AccountModel | undefined;
};

export function PortfolioCell({ pool, owner, backupAccount }: Props) {
  return isPortfolio(pool, backupAccount) ? (
    <Manage pool={pool} />
  ) : (
    <Activate owner={owner} pool_id={pool._id} backupAccount={backupAccount} />
  );
}
