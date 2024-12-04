export type OwnerPoolParams = {
  owner: string;
  pool_id: number;
};

export type PositionDto = {
  _id: number;
  pool_id: number;
  inst_id: number;
  owner_id: number;
  address: string;
  profit: number;
  profitValue: number;
  deposit: number;
  balance: number;
  reserve: number;
};

export type PoolDto = {
  _id: number;
  quote_symbol: string;
  asset_symbol: string;
  quote_type: string;
  quote_decimals: number;
  position: PositionDto | null;
  profit_30d: number;
  quote_round: number;
  min_deposit: number;
  tvl: number;
};

export type AccountMetaDto = {
  name: string;
  address: string;
  accessKey: string;
};
