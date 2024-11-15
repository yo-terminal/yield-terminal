import { Activate } from "./activate/Activate";
import { usePoolQuery } from "../../../app/api";
import { PositionList } from "./positionList/PositionList";

type Props = {
  owner: string;
  pool_id: number;
};

export function OwnerPool({ pool_id, owner }: Props) {
  const { data } = usePoolQuery({ pool_id, owner });

  console.log(data);

  if (!data) {
    return;
  }

  if (data.status === "Active") {
    return <PositionList positions={data.positions} />;
  }

  return <Activate pool_id={pool_id} owner={owner} />;
}
