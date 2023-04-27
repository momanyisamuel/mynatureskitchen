import AvailableClasses from "@/components/AvailableClasses/AvailableClasses";
import Card from "@/components/Card";
import { api } from "@/utils/api";

const index = () => {
  const { data: availableClasses, refetch } = api.checkout.getAvailableClasses.useQuery();

  return (
    <div className="border">
      <div className="mt-8 border">
       <AvailableClasses/>
      </div>
    </div>
  );
};

export default index;
