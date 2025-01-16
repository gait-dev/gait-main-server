import React, { useState, useRef } from "react";
import dayjs from "dayjs";
import SmallCalendar from "./SmallCalendar";
import { CalendarToday } from "@mui/icons-material";

interface DateTimePickerProps {
  value: dayjs.Dayjs;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value }) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [step, setStep] = useState<"date" | "hour" | "minute">("date");
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setStep("date"); // Réinitialiser à la sélection de la date
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    setStep("hour"); // Passer à la sélection de l'heure après la date
  };

  const handleHourClick = (hour: string) => {
    setSelectedHour(hour);
    setStep("minute"); // Passer à la sélection des minutes
  };

  const handleMinuteClick = (minute: string) => {
    setSelectedTime(`${selectedHour}:${minute}`);
    setIsDropdownOpen(false); // Fermer le dropdown après la sélection
  };

  const formatDisplay = () => {
    return `${selectedDate.format("DD/MM/YYYY")} ${selectedTime || "HH:MM"}`;
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input Field */}
      <div className="flex items-center border rounded px-3 py-2 bg-white shadow">
        <input
          type="text"
          readOnly
          value={formatDisplay()}
          className="flex-1 outline-none text-gray-700"
          placeholder="Select date and time"
        />
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={toggleDropdown}
        >
          <CalendarToday />
        </button>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-full bg-white border shadow-lg rounded flex">
          {/* Date Selection */}
          {step === "date" && (
            <div className="w-full">
              <SmallCalendar
                value={selectedDate}
                onChangeSelection={handleDateChange}
              />
            </div>
          )}

          {/* Hour Selection */}
          {step === "hour" && (
            <div className="grid grid-cols-6  p-4">
              {Array.from({ length: 24 }, (_, i) =>
                i.toString().padStart(2, "0")
              ).map((hour) => (
                <button
                  key={hour}
                  className="flex items-center justify-center text-sm font-medium p-3 hover:bg-gray-50 hover:text-sky-400"
                  onClick={() => handleHourClick(hour)}
                >
                  {hour}:00
                </button>
              ))}
            </div>
          )}

          {/* Minute Selection */}
          {step === "minute" && (
            <div className="grid grid-cols-4 gap-2 p-4">
              {Array.from({ length: 12 }, (_, i) =>
                (i * 5).toString().padStart(2, "0")
              ).map((minute) => (
                <button
                  key={minute}
                  className="flex items-center justify-center text-sm font-medium border rounded py-2 hover:bg-gray-200"
                  onClick={() => handleMinuteClick(minute)}
                >
                  {selectedHour}:{minute}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
