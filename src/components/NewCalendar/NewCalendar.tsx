import React, { useState } from "react";
import {
  format,
  addMonths,
  eachDayOfInterval,
  startOfWeek,
  addDays,
  endOfWeek,
} from "date-fns";

const events = [
  {
    date: new Date(2023, 3, 1),
    title: "Event 1",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    date: new Date(2023, 3, 5),
    title: "Event 2",
    description: "Consectetur adipiscing elit",
  },
  {
    date: new Date(2023, 3, 10),
    title: "Event 3",
    description: "Sed do eiusmod tempor incididunt",
  },
];

const Calendar = () => {
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
    return events.some((event) => {
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
    ? events.filter(
        (event: any) =>
          format(event.date, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      )
    : events;

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <button
          className="rounded bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
          onClick={handlePrevMonth}
        >
          Prev
        </button>
        <div className="text-lg font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <button
          className="rounded bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 border w-full">
        {dayNames.map((dayName, index) => (
          <div key={index} className="text-left font-bold text-gray-600 w-full border">
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
      <div className="rounded-lg bg-white p-4 shadow">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-bold">Events</div>
          {selectedDate && (
            <button
              className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
              onClick={handleClearFilter}
            >
              Clear Filter
            </button>
          )}
        </div>
        {filteredEvents.length > 0 ? (
          <ul className="list-inside list-disc">
            {filteredEvents.map((event: any, index) => (
              <li key={index}>
                <div className="text-lg font-bold">{event.title}</div>
                <div className="text-gray-500">{event.description}</div>
                <div className="text-gray-500">{format(event.date, "yyyy-MM-dd")}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No events for selected date</div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
