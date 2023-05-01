import AvailableClasses from "@/components/AvailableClasses/AvailableClasses";
import { api } from "@/utils/api";

const index = () => {
  const { data: availableClasses, refetch } =
    api.checkout.getAvailableClasses.useQuery();

  return (
    <div className="mt-8">
      <AvailableClasses events={availableClasses} />
    </div>
  );
};

export default index;
