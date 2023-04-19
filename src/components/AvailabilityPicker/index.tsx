"use client";

import { useState } from "react";
import DatePicker from "react-tailwindcss-datepicker";
import { Minus, MinusSquare, Plus } from "lucide-react";

export const AvailabilityPicker = ({ value, onChange }: any) => {
  const [dates, setDates] = useState(value || []);

  const handleDateChange = (index: number, date: any) => {
    const updatedDates = [...dates];
    updatedDates[index] = date;
    setDates(updatedDates);
    onChange(updatedDates);
  };

  const handleAddDate = () => {
    const updatedDates = [...dates, null];
    setDates(updatedDates);
    onChange(updatedDates);
  };

  const handleRemoveDate = (index: number) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
    onChange(updatedDates);
  };

  return (
    <div className="relative w-full">
      {dates.map((date: any, index: number) => (
        <div key={index} className="flex w-full mb-2">
          <div className="w-full">
            <DatePicker
              value={date}
              onChange={(newDate) => handleDateChange(index, newDate)}
            />
          </div>
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => handleRemoveDate(index)}
            >
              <span className="sr-only">Remove date</span>
              <MinusSquare size={18} className="text-red-500" />
            </button>
        </div>
      ))}
      <button
        type="button"
        className="w-full mt-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        onClick={handleAddDate}
      >
        Add Date
      </button>
    </div>
  );
};
