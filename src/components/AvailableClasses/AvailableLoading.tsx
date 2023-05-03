import { type FC } from "react";
import { Skeleton } from "../ui/skeleton";

const AvailableLoading: FC = ({}) => {
  return (
    <div className="mb-5 mt-8 flex w-full flex-col items-center justify-center gap-6 rounded-lg px-8">
      <div className="flex w-full flex-col items-start justify-center gap-x-40 sm:flex-row">
        <div className="mb-3 w-full sm:w-2/6">
          <div className="">
            <div className="mb-3 mt-5 flex items-center">
              <Skeleton className="h-[61px] w-full" />
            </div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <Skeleton className="h-8 w-[42px]" />
              <Skeleton className="h-8 w-[82px]" />
              <Skeleton className="h-8 w-[42px]" />
            </div>
            <div className="grid w-full grid-cols-7 gap-2 py-4">
              {Array.from({ length: 7 }, (dayName, index) => (
                <div key={index} className="w-full flex items-center justify-center">
                  <Skeleton className="h-9 w-14" />
                </div>
              ))}
              {Array.from({ length: 35 }, (date: Date, index) => (
                <div
                  key={index}
                  className={`flex h-12 w-full cursor-pointer items-center justify-center`}
                >
                  <Skeleton className="h-12 w-14" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {
          <>
            {Array.from({ length: 1 }, (event, index) => (
              <div key={index} className="flex w-full flex-col items-center justify-center sm:w-4/6">
                <div className="space-y-2">
                  <Skeleton className="h-96 w-full sm:w-[800px]" />
                  <Skeleton className="h-12 w-[450px]" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-8 w-[150px]" />
                </div>
              </div>
            ))}
          </>
        }
      </div>
    </div>
  );
};

export default AvailableLoading;
