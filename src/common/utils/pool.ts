import { PoolDto } from "../../app/dto";
import { AccountModel } from "../../app/model";

export function isPortfolio(pool: PoolDto, backupAccount: AccountModel | undefined) {
  return !!(pool.position && backupAccount);
}
