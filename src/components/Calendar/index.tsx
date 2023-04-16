import { FC, useState } from "react";
import ReactCalendar from "react-calendar";
import add from "date-fns/add";
import { format } from "date-fns";
import { CLOSE_OF_DAY, INTERVAL, START_OF_DAY } from "@/constants/config";

interface indexProps {}

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const index: FC<indexProps> = ({}) => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  console.log(date.dateTime);

  const getTimes = () => {
    if (!date.justDate) return;

    const { justDate } = date;
    const start = add(justDate, { hours: START_OF_DAY });
    const end = add(justDate, { hours: CLOSE_OF_DAY });
    const interval = INTERVAL; // 30 minutes

    const times = [];

    for (let i = start; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  return (
    <div className="flex h-screen items-center justify-center">
      {date.justDate ? (
        <div className="flex flex-col gap-4">
          {times?.map((time: any, i) => (
            <div className="flex">
              <div className="rounded-sm bg-gray-100 p-2" key={`time-${i}`}>
                <button
                  type="button"
                  onClick={() =>
                    setDate((prev) => ({ ...prev, dateTime: time }))
                  }
                >
                  {format(time, "kk:mm")}
                </button>
              </div>
              <div className="ml-2 border items-center">
              <h1>Events</h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <ReactCalendar
            className="REACT_CALENDAR p-2"
            minDate={new Date()}
            view="month"
            onClickDay={(date) =>
              setDate((prev) => ({ ...prev, justDate: date }))
            }
          />
        </>
      )}
    </div>
  );
};

export default index;
