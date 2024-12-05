import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Text, Subheading } from "@trade-project/ui-toolkit";
import { useNavigate } from "react-router-dom";

export function Empty() {
  const navigate = useNavigate();
  return (
    <div className="mt-20 text-center">
      <Subheading>No positions</Subheading>
      <Text className="mt-1">
        Get started by adding a position to your portfolio.
      </Text>
      <div className="mt-6">
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Pools
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
