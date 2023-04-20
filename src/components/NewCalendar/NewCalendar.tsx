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
import Router from "next/router";


const Calendar = () => {
  const { data: events, refetch } =
  api.cookingClass.getAvailability.useQuery();

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
  const [selectedDate, setSelectedDate] = useState(null);
  const startingDayOfWeek = startOfWeek(start, { weekStartsOn: 0 }); // 0 = Sunday
  const dayNames = [...Array(7).keys()].map((i) =>
    format(addDays(startingDayOfWeek, i), "EEE")
  );

  const isEventDate = (date: any) => {
    return events?.some((event) => {
      return format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    });
  };

  const isCurrentDate = (date: any) => {
    return format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
  };
  const isSelectedDate = (date: any) => {
    if(selectedDate) {
      return format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
    }
    return false
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    if (currentMonth.getMonth() !== now.getMonth()) {
      setCurrentMonth(addMonths(currentMonth, -1));
    }
  };

  const handleDateClick = (date: any) => {
    setSelectedDate(date);
  };
  const handleClearFilter = () => {
    setSelectedDate(null);
  };

  const filteredEvents = selectedDate
    ? events?.filter(
        (event: any) =>
          format(event.date, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      )
    : events;

  return (
    <div className="rounded-lg bg-white p-4 mt-8">
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
      <div className="grid grid-cols-7 gap-2 py-4 w-full">
        {dayNames.map((dayName, index) => (
          <div key={index} className="text-center uppercase bg-indigo-100 font-semibold text-sm py-2 text-indigo-600 w-full border-indigo-100">
            {dayName}
          </div>
        ))}
        {days.map((date: any, index) => (
          <div
            key={index}
            className={`flex h-12 items-center justify-center rounded cursor-pointer p-2 w-full border
              ${isEventDate(date) ? "bg-blue-500 text-white" : ""}
               ${isCurrentDate(date) ? "bg-gray-100" : ""}
               ${isSelectedDate(date) ? "bg-green-500" : ""}`}
            onClick={() => handleDateClick(date)}
          >
            {format(date, "dd")}
          </div>
        ))}
      </div>
      <div className="rounded bg-white p-4 shadow mt-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-bold">Events</div>
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
          <div className="list-inside list-disc">
            {filteredEvents?.map((event: any, index) => (
              <div key={index} className="mb-2 border py-4 px-5">
                <div className="text-lg font-bold">{event.title}</div>
                <div className="text-gray-500">{event.description}</div>
                <div className="text-gray-500 mb-2">{format(event.date, "yyyy-MM-dd")}</div>
                <button className="rounded py-2 px-3 bg-green-500 text-white" onClick={()=> Router.push("/classes")}>Book class</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No events for selected date</div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
