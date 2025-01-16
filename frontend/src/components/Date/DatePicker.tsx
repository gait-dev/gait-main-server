import React, { useState, useRef } from "react";
import dayjs from "dayjs";
import SmallCalendar from "./SmallCalendar";
import { CalendarToday } from "@mui/icons-material";

interface DatePickerProps {
  value: dayjs.Dayjs;
}

const DatePicker: React.FC<DatePickerProps> = ({ value }) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: dayjs.Dayjs) => {
    console.log("Date cahnge");
    setSelectedDate(date);
    setIsCalendarOpen(false); // Fermer le calendrier après la sélection
  };

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target as Node)
    ) {
      setIsCalendarOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Input Field */}
      <div
        className="flex items-center border rounded px-3 py-2 bg-white shadow"
        onClick={toggleCalendar}
      >
        <input
          type="text"
          readOnly
          value={selectedDate.format("DD/MM/YYYY")}
          className="outline-none text-gray-400"
          placeholder="Select a date"
        />
        <span className="text-gray-400 hover:text-sky-300">
          <CalendarToday />
        </span>
      </div>

      {/* Calendar Dropdown */}
      {isCalendarOpen && (
        <div
          className="absolute mt-2 w-auto bg-white border shadow-lg rounded z-10"
          ref={datePickerRef}
        >
          <SmallCalendar
            value={selectedDate}
            onChangeSelection={handleDateChange}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
