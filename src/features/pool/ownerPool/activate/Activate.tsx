import { PlayIcon } from "@heroicons/react/20/solid";
import { Button, Text } from "@trade-project/ui-toolkit";
import { useActivatePoolMutation } from "../../../../app/api";
import { OwnerPoolParams } from "../../../../app/dto";

export function Activate(params: OwnerPoolParams) {
  const [activatePool] = useActivatePoolMutation();

  return (
    <div className="flex gap-4 items-center">
      <Button
        onClick={() => {
          activatePool(params)
            .unwrap()
            .then((data) => console.log(data));
        }}
      >
        <PlayIcon />
        Activate Pool
      </Button>
      <Text>Get started by creating a new slot.</Text>
    </div>
  );
}
