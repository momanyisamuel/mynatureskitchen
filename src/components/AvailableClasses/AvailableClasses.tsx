"use client";

import React, { useState } from "react";
import {
  format,
  addMonths,
  eachDayOfInterval,
  startOfWeek,
  addDays,
  endOfWeek,
} from "date-fns";
import Card from "../Card";
import { type Price } from "@/types/types";

interface AvailableClasesProps {
  events: Price[] | undefined;
}

const AvailableClasses = ({ events }: AvailableClasesProps) => {
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
      return format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
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
    <div className="mb-5 mt-8 flex w-full flex-col items-center justify-center gap-6 rounded-lg px-8">
      <div className="flex w-full flex-col items-start justify-center gap-x-40 sm:flex-row">
        <div className="mb-3 w-full sm:w-2/6">
          <div className="">
            <div className="mb-3 flex items-center justify-between rounded border border-atlantis-900 p-4">
              <div className="text-lg font-medium">Filter Events</div>
              <div className="flex items-center justify-between">
                {selectedDate && (
                  <button
                    className="rounded bg-green-500 px-2 py-2.5 text-white hover:bg-green-600"
                    onClick={handleClearFilter}
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <button
                className="rounded bg-atlantis-100 px-2 py-1 text-atlantis-700 hover:bg-gray-200"
                onClick={handlePrevMonth}
              >
                Prev
              </button>
              <div className="text-lg font-semibold text-atlantis-900">
                {format(currentMonth, "MMMM yyyy")}
              </div>
              <button
                className="rounded bg-atlantis-100 px-2 py-1 text-atlantis-700 hover:bg-atlantis-200"
                onClick={handleNextMonth}
              >
                Next
              </button>
            </div>
            <div className="grid w-full grid-cols-7 gap-2 py-4">
              {dayNames.map((dayName, index) => (
                <div
                  key={index}
                  className="font-base w-full border-atlantis-100 bg-atlantis-100 py-2 text-center text-sm uppercase text-atlantis-900"
                >
                  {dayName}
                </div>
              ))}
              {days.map((date: Date, index) => (
                <div
                  key={index}
                  className={`flex h-12 w-full cursor-pointer items-center justify-center rounded border p-2
              ${isEventDate(date) ? "bg-atlantis-500 text-white" : ""}
               ${isCurrentDate(date) ? "bg-atlantis-300 text-red-400" : ""}
               ${isSelectedDate(date) ? "bg-atlantis-500 text-white" : ""}`}
                  onClick={() => handleDateClick(date)}
                >
                  {format(date, "dd")}
                </div>
              ))}
            </div>
          </div>
        </div>
        {filteredEvents ? (
          <div className="flex w-full flex-col items-center justify-center sm:w-4/6">
            {filteredEvents?.map((event, index) => (
              <div key={index} className="">
                <Card key={event.id} price={event} />
              </div>
            ))}
          </div>
        ) : (
          <div>No classes available currently</div>
        )}
      </div>
    </div>
  );
};

export default AvailableClasses;
