export type PoolStatus = 'Active' | 'Inactive';

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
};

export type PoolDto = {
  _id: number;
  name: string;
  quote_url: string;
  asset_url: string;
  quote_symbol: string;
  asset_symbol: string;
  quote_type: string;
  quote_decimals: number;
  status: PoolStatus;
  position: PositionDto | null;
};

export type AccountMetaDto = {
  name: string;
  address: string;
  accessKey: string;
};
