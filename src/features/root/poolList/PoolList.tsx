// import { ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Badge } from "@trade-project/ui-toolkit";
import { Link } from "react-router-dom";
import { usePoolsQuery } from "../../../app/api";

type Props = {
  className?: string;
  owner: string;
};

export function PoolList({ className, owner }: Props) {
  const { data = [] } = usePoolsQuery({ owner });
  return (
    <ul
      role="list"
      className={classNames(
        "text-slate-950 dark:text-white divide-y divide-slate-950/5 dark:divide-white/5 border-b border-slate-950/5 dark:border-white/5",
        className
      )}
    >
      {data.map((slot) => (
        <li
          key={slot._id}
          className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 hover:bg-slate-950/5 dark:hover:bg-white/5"
        >
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <h2 className="min-w-0 text-sm font-semibold leading-6">
                <Link to={`/pool/${slot._id}`} className="flex gap-x-2">
                  <span className="truncate">{slot.name}</span>
                  <span className="absolute inset-0" />
                </Link>
              </h2>
            </div>
          </div>
          <Badge color={slot.status === "Active" ? "emerald" : "slate"}>
            {slot.status}
          </Badge>
          {/* <ChevronRightIcon
            aria-hidden="true"
            className="h-5 w-5 flex-none text-slate-400"
          /> */}
        </li>
      ))}
    </ul>
  );
}
