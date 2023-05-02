import { type FC } from "react";
import { Skeleton } from "../ui/skeleton";

const AvailableLoading: FC = ({}) => {
  return (
    <div className="mb-5 mt-8 flex w-full flex-col items-center justify-center gap-6 rounded-lg p-4">
      <div className="flex w-full flex-col items-center justify-center gap-x-40 sm:flex-row">
        <div className="">
          <div className="">
            <div className="mb-3 mt-5 flex items-center">
              <Skeleton className="h-[61px] w-[312px]" />
            </div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <Skeleton className="h-[46px] w-[32px]" />
              <Skeleton className="h-[46px] w-[82px]" />
              <Skeleton className="h-[46px] w-[32px]" />
            </div>
            <div className="grid w-full grid-cols-7 gap-2 py-4">
              {Array.from({ length: 7 }, (dayName, index) => (
                <div key={index} className="w-full">
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
              {Array.from({ length: 35 }, (date: Date, index) => (
                <div
                  key={index}
                  className={`flex h-12 w-full cursor-pointer items-center justify-center`}
                >
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {
          <>
            {Array.from({ length: 1 }, (event, index) => (
              <div key={index} className="">
                <div className="space-y-2">
                  <Skeleton className="h-96 w-[800px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[200px]" />
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
