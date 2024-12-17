import { useState } from "react";
import { useProfitQuery } from "../../app/api";
import {
  initialLimit,
  LineChartDto,
  SpinContainer,
  Subheading,
  LimitLineChart,
  ToolBar,
  ToolRadioGroup,
  ToolRadio,
  // ToolButton,
} from "@trade-project/ui-toolkit";
// import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Empty } from "./empty/Empty";

const defaultData: LineChartDto = {
  name: "",
  labels: [],
  dataset: [],
};

const quoteOptions = [
  { name: "USD", value: 0 },
  { name: "SUI", value: 1 },
];

const initialOption = quoteOptions[0];

export function Profit() {
  const account = useCurrentAccount();
  const [quote, setQuote] = useState(initialOption);
  const [limit, setLimit] = useState(initialLimit);
  const {
    data = defaultData,
    isFetching,
    isLoading,
    // refetch,
  } = useProfitQuery(
    { index: quote.value, limit, owner: account?.address || "" },
    { skip: !account }
  );

  return (
    <>
      <Subheading>Net Profit</Subheading>
      <div className="flex justify-end gap-2">
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
        {/* <ToolBar>
          <ToolButton onClick={refetch}>
            <ArrowPathIcon />
          </ToolButton>
        </ToolBar> */}
      </div>
      <SpinContainer className="mt-2" spinning={isFetching}>
        {data.dataset.length === 0 && !isLoading ? (
          <Empty />
        ) : (
          <LimitLineChart
            data={data}
            disabled={isFetching}
            onChangeLimit={setLimit}
          />
        )}
      </SpinContainer>
    </>
  );
}
