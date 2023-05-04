import { api } from "@/utils/api";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import AddEvent from "./AddEvent";
import EventLoad from "./EventLoad";

const EventList = () => {
  const {
    data: events,
    refetch,
    isLoading,
  } = api.cookingClass.getEvents.useQuery();
  const [loading, setLoading] = useState<boolean>(false);
  const deleteCookingClass = api.admin.deleteEvent.useMutation();

  return (
    <div className="mt-12 bg-white py-12">
      <div className="flex items-center justify-between space-y-2 px-12">
        <h2 className="text-3xl font-medium tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="grid gap-2">
            <AddEvent />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 px-12">
        {isLoading ? (
          <EventLoad />
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {events?.map((cookingClass) => (
              <div
                key={cookingClass.id}
                className="relative rounded-md border shadow-sm"
              >
                <Button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setLoading(true);
                    deleteCookingClass
                      .mutateAsync({ id: cookingClass.id })
                      .then(() => {
                        void refetch();
                        setLoading(false);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                  className="m-2 bg-red-500 transition-colors duration-300 hover:bg-red-600"
                >
                  {loading ? (
                    <Skeleton className="h-5 w-5" />
                  ) : (
                    <Trash size={20} className="p-1 text-white" />
                  )}
                </Button>
                <div className="p-4">
                  {loading ? (
                    <div className="">
                      <h3 className="mb-2 text-lg font-medium">
                        <Skeleton className="h-4 w-6" />
                      </h3>
                      <p className="text-gray-600">
                        <Skeleton className="h-[400px] w-full" />
                      </p>
                    </div>
                  ) : (
                    <div className="">
                      <h3 className="mb-2 text-lg font-medium">
                        {cookingClass.title}
                      </h3>
                      <p className="text-gray-600">
                        {cookingClass.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
