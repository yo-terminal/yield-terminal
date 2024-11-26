import { PoolDto } from "../../app/dto";
import { PoolAccountModel } from "../../app/model";

export function isPortfolio(pool: PoolDto, poolAccount: PoolAccountModel | undefined) {
  return !!(pool.position && poolAccount);
}
