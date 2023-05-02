import AvailableClasses from "@/components/AvailableClasses/AvailableClasses";
import AvailableLoading from "@/components/AvailableClasses/AvailableLoading";
import { api } from "@/utils/api";

const Classes = () => {
  const { data: availableClasses, isLoading } =
    api.checkout.getAvailableClasses.useQuery();

  return (
    <div className="mt-8">
      {isLoading ? (
        <AvailableLoading/>
      ) : (
        <AvailableClasses events={availableClasses} />
      )}
    </div>
  );
};

export default Classes;
