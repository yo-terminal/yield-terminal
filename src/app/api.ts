import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PoolDto, PoolInfoDto, OwnerPoolParams, AccountMetaDto } from "./dto";

const DEV = import.meta.env.DEV;

const apiUrl = DEV ? "http://localhost:3402" : "http://localhost:3402";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  endpoints: (builder) => ({
    pools: builder.query<PoolInfoDto[], { owner: string }>({
      query: (params) => ({
        url: "/pool",
        params,
      }),
    }),
    pool: builder.query<PoolDto, OwnerPoolParams>({
      query: ({ pool_id, ...params }) => ({
        url: `/pool/${pool_id}`,
        params,
      }),
    }),
    activatePool: builder.mutation<AccountMetaDto, OwnerPoolParams>({
      query: (body) => ({
        method: "POST",
        url: "/pool/activate",
        body,
      }),
    }),
  }),
});

export const { usePoolsQuery, usePoolQuery, useActivatePoolMutation } = api;
