import { Button } from "@trade-project/ui-toolkit";
import { useActivatePoolMutation } from "../../../../app/api";
import { OwnerPoolParams } from "../../../../app/dto";

export function Activate(params: OwnerPoolParams) {
  const [activatePool] = useActivatePoolMutation();

  return (
    <Button
      onClick={() => {
        activatePool(params)
          .unwrap()
          .then((data) => console.log(data));
      }}
    >
      Activate
    </Button>
  );
}
