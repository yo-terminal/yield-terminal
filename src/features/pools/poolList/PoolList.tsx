import {
  Avatar,
  Subheading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@trade-project/ui-toolkit";
import { usePoolsQuery } from "../../../app/api";
import { usePoolAccounts } from "../../../app/hooks";
import { PortfolioCell } from "./portfolioCell/PortfolioCell";

type Props = {
  className?: string;
  owner: string;
};

export function PoolList({ owner }: Props) {
  const { data = [] } = usePoolsQuery({ owner });
  const { accountMap, isPending } = usePoolAccounts();

  return (
    <>
      <Subheading>Pools</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            {/* <TableHeader>Pool number</TableHeader> */}
            <TableHeader>Name</TableHeader>
            <TableHeader>Profit (30d)</TableHeader>

            {/* <TableHeader>Asset</TableHeader> */}
            <TableHeader className="text-right">Portfolio</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((pool) => (
            <TableRow key={pool._id} title={`Order #${pool._id}`}>
              {/* <TableCell>{pool._id}</TableCell> */}
              {/* <TableCell className="text-slate-500">{pool.name}</TableCell> */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <Avatar src={pool.asset_url} className="size-6" />
                    <Avatar src={pool.quote_url} className="size-6" />
                  </div>
                  <span>
                    {pool.asset_symbol} - {pool.quote_symbol}
                  </span>
                </div>
              </TableCell>
              <TableCell>{pool.profit_30d}%</TableCell>

              {/* <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={pool.asset_url} className="size-6" />
                  <span>{pool.asset_symbol}</span>
                </div>
              </TableCell> */}
              <TableCell className="text-right">
                {!isPending && (
                  <PortfolioCell
                    pool={pool}
                    owner={owner}
                    poolAccount={accountMap[pool._id]}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
