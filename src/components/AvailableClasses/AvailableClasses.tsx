import React, { useState } from "react";
import {
  format,
  addMonths,
  eachDayOfInterval,
  startOfWeek,
  addDays,
  endOfWeek,
} from "date-fns";
import { api } from "@/utils/api";
import Card from "../Card";

const AvailableClasses = () => {
  const { data: events } = api.checkout.getAvailableClasses.useQuery();

  console.log(events);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const now = new Date();
  const start = startOfWeek(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  );
  const end = endOfWeek(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  );
  const days = eachDayOfInterval({ start, end });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const startingDayOfWeek = startOfWeek(start, { weekStartsOn: 0 }); // 0 = Sunday
  const dayNames = [...Array(7).keys()].map((i) =>
    format(addDays(startingDayOfWeek, i), "EEE")
  );

  const isEventDate = (date: Date) => {
    return events?.some((event) => {
      return (
        format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      );
    });
  };

  const isCurrentDate = (date: Date) => {
    return format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
  };
  const isSelectedDate = (date: Date) => {
    if (selectedDate) {
      return format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
    }
    return false;
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    if (currentMonth.getMonth() !== now.getMonth()) {
      setCurrentMonth(addMonths(currentMonth, -1));
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  const handleClearFilter = () => {
    setSelectedDate(null);
  };

  const filteredEvents = selectedDate
    ? events?.filter(
        (event) =>
          format(event.date, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      )
    : events;

  return (
    <div className="w-full mt-8 rounded-lg bg-white p-4 flex justify-center items-center gap-6">
      <div className="w-2/6">
      <div className="mb-4 flex items-center justify-between">
        <button
          className="rounded bg-gray-100 px-2 py-1 text-gray-700 hover:bg-gray-200"
          onClick={handlePrevMonth}
        >
          Prev
        </button>
        <div className="text-lg font-semibold text-gray-500">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <button
          className="rounded bg-gray-100 px-2 py-1 text-gray-700 hover:bg-gray-200"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid w-full grid-cols-7 gap-2 py-4">
        {dayNames.map((dayName, index) => (
          <div
            key={index}
            className="w-full border-indigo-100 bg-indigo-100 py-2 text-center text-sm font-semibold uppercase text-indigo-600"
          >
            {dayName}
          </div>
        ))}
        {days.map((date: Date, index) => (
          <div
            key={index}
            className={`flex h-12 w-full cursor-pointer items-center justify-center rounded border p-2
              ${isEventDate(date) ? "bg-blue-500 text-white" : ""}
               ${isCurrentDate(date) ? "bg-gray-100" : ""}
               ${isSelectedDate(date) ? "bg-green-500" : ""}`}
            onClick={() => handleDateClick(date)}
          >
            {format(date, "dd")}
          </div>
        ))}
      </div>
      </div>
      <div className="mt-5 rounded bg-white p-4 shadow w-4/6">
      <div className="text-lg font-bold">Events</div>
        <div className="mb-4 flex items-center justify-between">
          {selectedDate && (
            <button
              className="rounded bg-green-500 px-2 py-2.5 text-white hover:bg-green-600"
              onClick={handleClearFilter}
            >
              Clear Filter
            </button>
          )}
        </div>

        {filteredEvents ? (
          <>
            {filteredEvents?.map((event,index) => (
              <div key={index} className="">
                <Card key={event.id} price={event} />
              </div>
            ))}
          </>
        ) : (
          <>No classes available currently</>
        )}
      </div>
    </div>
  );
};

export default AvailableClasses;
