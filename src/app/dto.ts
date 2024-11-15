export type PoolStatus = 'Active' | 'Inactive';

export type OwnerPoolParams = {
  owner: string;
  pool_id: number;
};

export type PositionDto = {
  _id: number;
  pool_id: number;
  inst_id: number;
  owner: string;
  address: string;
};

export type PoolDto = {
  _id: number;
  name: string;
  status: PoolStatus;
  positions: PositionDto[];
};

export type PoolInfoDto = {
  _id: number;
  name: string;
  status: PoolStatus;
};

export type AccountMetaDto = {
  name: string;
  address: string;
  accessKey: string;
};
