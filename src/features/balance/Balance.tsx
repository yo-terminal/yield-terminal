import clsx from "clsx";
import { useState } from "react";
import { useBalanceQuery } from "../../app/api";
import {
  initialUntil,
  LimitLineChart,
  LineChartDto,
  Subheading,
} from "@trade-project/ui-toolkit";
import { Radio, RadioGroup } from "@headlessui/react";
import { useCurrentAccount } from "@mysten/dapp-kit";

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

export function Balance() {
  const account = useCurrentAccount();
  const [quote, setQuote] = useState(initialOption);
  const [until, setUntil] = useState(initialUntil);
  const { data = defaultData, isFetching } = useBalanceQuery(
    { index: quote.value, until, owner: account?.address || "" },
    { skip: !account }
  );

  return (
    <>
      <Subheading>Balance</Subheading>
      <div className="flex justify-end">
        <RadioGroup
          value={quote}
          onChange={(option) => {
            setQuote(option);
          }}
          disabled={isFetching}
          className="grid grid-cols-2 gap-0.5"
        >
          {quoteOptions.map((option) => (
            <Radio
              key={option.name}
              value={option}
              disabled={isFetching}
              className={clsx(
                !isFetching
                  ? "cursor-pointer focus:outline-none"
                  : "cursor-not-allowed opacity-50",
                "flex items-center justify-center rounded-md bg-white px-2.5 py-2 text-sm font-semibold uppercase text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50 data-[checked]:bg-slate-900 data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-slate-600 data-[focus]:ring-offset-2 data-[checked]:hover:bg-slate-800 sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-950 dark:data-[checked]:bg-blue-600"
              )}
            >
              {option.name}
            </Radio>
          ))}
        </RadioGroup>
      </div>
      <LimitLineChart
        className="mt-4"
        data={data}
        disabled={isFetching}
        onChangeUntil={setUntil}
      />
    </>
  );
}
