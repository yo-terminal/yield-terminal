import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PoolDto, OwnerPoolParams, AccountMetaDto } from "./dto";
import { LineChartDto } from "@trade-project/ui-toolkit";

// const DEV = import.meta.env.DEV;

// const apiUrl = DEV ? "http://localhost:3402" : "https://yield.terminal.mobi:3402";
const apiUrl = "https://yield.terminal.mobi:3402";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ["Pool"],
  endpoints: (builder) => ({
    pools: builder.query<PoolDto[], { owner: string }>({
      query: (params) => ({
        url: "/pool",
        params,
      }),
      providesTags: ["Pool"],
    }),
    activatePool: builder.mutation<AccountMetaDto, OwnerPoolParams>({
      query: (body) => ({
        method: "POST",
        url: "/pool/activate",
        body,
      }),
      invalidatesTags: ["Pool"],
    }),
    queueProcess: builder.mutation<void, void>({
      query: (body) => ({
        method: "POST",
        url: "/queue/process",
        body,
      }),
      invalidatesTags: ["Pool"],
    }),
    balance: builder.query<LineChartDto, { index: number; until: number; owner: string }>({
      query: (params) => ({
        params,
        url: "/balance",
      }),
    }),
    profit: builder.query<LineChartDto, { index: number; until: number; owner: string }>({
      query: (params) => ({
        params,
        url: "/profit",
      }),
    }),
  }),
});

export const {
  usePoolsQuery,
  useActivatePoolMutation,
  useQueueProcessMutation,
  useBalanceQuery,
  useProfitQuery,
} = api;
