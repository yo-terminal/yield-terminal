import { useState } from "react";
import { useBalanceQuery } from "../../app/api";
import {
  initialLimitOption,
  LineChartDto,
  SpinContainer,
  Subheading,
  LineChart,
  ToolBar,
  ToolRadioGroup,
  ToolRadio,
  LimitToolBar,
} from "@trade-project/ui-toolkit";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Empty } from "./empty/Empty";

const defaultData: LineChartDto = {
  labels: [],
  dataset: [],
};

const quoteOptions = [
  { name: "USD", value: 0 },
  { name: "SUI", value: 1 },
];

const initialOption = quoteOptions[0];

export function Balance() {
  const account = useCurrentAccount();
  const [quote, setQuote] = useState(initialOption);
  const [limit, setLimit] = useState(initialLimitOption);
  const {
    data = defaultData,
    isFetching,
    isLoading,
  } = useBalanceQuery(
    { index: quote.value, limit: limit.value, owner: account?.address || "" },
    { skip: !account }
  );

  return (
    <>
      <Subheading>Balance</Subheading>
      <div className="mt-1 flex justify-end">
        <ToolBar>
          <ToolRadioGroup
            value={quote}
            disabled={isFetching}
            onChange={setQuote}
          >
            {quoteOptions.map((option) => (
              <ToolRadio key={option.name} value={option} disabled={isFetching}>
                {option.name}
              </ToolRadio>
            ))}
          </ToolRadioGroup>
        </ToolBar>
      </div>
      <div className="mt-1.5 flex justify-end">
        <LimitToolBar disabled={isFetching} value={limit} onChange={setLimit} />
      </div>
      <SpinContainer className="mt-8" spinning={isFetching}>
        {data.dataset.length === 0 && !isLoading ? (
          <Empty />
        ) : (
          <LineChart className="h-[600px]" data={data} />
        )}
      </SpinContainer>
    </>
  );
}
