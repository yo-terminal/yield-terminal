import { Radio, RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import EChartsComponent, { EChartsOption } from 'echarts-rc'
import { DateTime } from 'luxon'
import { useEffect, useMemo, useState } from 'react'

const mediaQuery = '(prefers-color-scheme: dark)'

function getSystemTheme() {
  if (window.matchMedia(mediaQuery).matches) {
    return 'dark'
  }
  return 'light'
}

export type LineChartDto = {
  name: string
  labels: string[]
  dataset: [string, ...number[]][]
}

const opts = { notMerge: true }
const styles = { height: 600 }

const limitOptions = [
  { name: '24h', value: DateTime.now().minus({ hours: 24 }).toMillis() },
  { name: '3d', value: DateTime.now().minus({ days: 3 }).toMillis() },
  { name: '7d', value: DateTime.now().minus({ days: 7 }).toMillis() },
  { name: '1m', value: DateTime.now().minus({ months: 1 }).toMillis() },
  { name: '3m', value: DateTime.now().minus({ months: 3 }).toMillis() },
  { name: '1y', value: DateTime.now().minus({ years: 1 }).toMillis() },
  { name: 'Max', value: 0 },
]

const initialOption = limitOptions[0]
export const initialUntil = initialOption.value

type Props = {
  className?: string
  data: LineChartDto
  disabled?: boolean
  onChangeUntil?: (until: number) => void
}

export function LimitLineChart({ className, data, disabled, onChangeUntil }: Props) {
  const [limit, setLimit] = useState(initialOption)
  const [theme, setTheme] = useState(getSystemTheme)

  const options: EChartsOption = useMemo(
    () => ({
      legend: {
        show: true,
      },
      backgroundColor: 'transparent',
      dataset: {
        source: data.dataset,
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value',
        min: 'dataMin',
      },
      tooltip: {
        trigger: 'axis',
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      series: data.labels.map((x) => ({
        type: 'line',
        showSymbol: false,
        name: x,
      })),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  useEffect(() => {
    const handler = ({ matches }: { matches: boolean }) => {
      if (matches) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    }
    const mediaQueryList = window.matchMedia(mediaQuery)
    mediaQueryList.addEventListener('change', handler)
    return () => {
      mediaQueryList.removeEventListener('change', handler)
    }
  }, [])

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="flex justify-between gap-10">
        <div className="text-base/6 font-semibold text-slate-950 dark:text-white">{data.name}</div>
        <RadioGroup
          value={limit}
          onChange={(option) => {
            setLimit(option)
            onChangeUntil?.(option.value)
          }}
          disabled={disabled}
          className="grid grid-cols-7 gap-0.5"
        >
          {limitOptions.map((option) => (
            <Radio
              key={option.name}
              value={option}
              disabled={disabled}
              className={clsx(
                !disabled ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-80',
                'flex items-center justify-center rounded-md bg-white px-2 py-1.5 text-sm font-semibold uppercase text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50',
                'data-[checked]:bg-slate-900 data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-slate-600 data-[focus]:ring-offset-2 data-[checked]:hover:bg-slate-800 [&:not([data-focus],[data-checked])]:ring-inset',
                'dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-950 dark:data-[checked]:bg-blue-600 dark:data-[checked]:hover:bg-blue-700'
              )}
            >
              {option.name}
            </Radio>
          ))}
        </RadioGroup>
      </div>
      <div>
        <EChartsComponent key={theme} theme={theme} option={options} opts={opts} style={styles} />
      </div>
    </div>
  )
}
