import { AccessTime } from "@mui/icons-material";
import dayjs from "dayjs";
import React, { useState, useRef } from "react";

interface TimePickerProps {
  value: dayjs.Dayjs;
}

const TimePicker: React.FC<TimePickerProps> = ({ value }) => {
  const [selectedTime, setSelectedTime] = useState(value);
  const [step, setStep] = useState<"hour" | "minute">("hour");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timePickerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setStep("hour"); // Réinitialiser à la sélection de l'heure
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      timePickerRef.current &&
      !timePickerRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHourClick = (hour: number) => {
    setSelectedTime(selectedTime.set("hour", hour));
    setStep("minute"); // Passer à la sélection des minutes
  };

  const handleMinuteClick = (minute: number) => {
    setSelectedTime(selectedTime.set("minute", minute));
    setIsDropdownOpen(false); // Fermer le dropdown après la sélection
  };

  const formatDisplay = () => {
    return selectedTime.format("HH:mm");
  };

  return (
    <div className="relative" ref={timePickerRef}>
      {/* Input Field */}
      <div
        className="flex items-center border rounded px-3 py-2 "
        onClick={toggleDropdown}
      >
        <input
          type="text"
          readOnly
          value={formatDisplay()}
          className="flex-1 outline-none text-gray-400"
          placeholder="Select time"
        />
        <span className="text-gray-400 hover:text-sky-300">
          <AccessTime></AccessTime>
        </span>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-full bg-white border shadow-lg rounded z-10">
          {/* Hour Selection */}
          {step === "hour" && (
            <div className="grid grid-cols-6 gap-2 p-4">
              {Array.from({ length: 24 }, (_, i) =>
                i.toString().padStart(2, "0")
              ).map((hour) => (
                <button
                  key={hour}
                  className="flex items-center justify-center text-sm font-medium p-3 hover:bg-gray-50 hover:text-sky-400"
                  onClick={() => handleHourClick(parseInt(hour))}
                >
                  {hour}h
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
                  className="flex items-center justify-center text-sm font-medium p-3 hover:bg-gray-50 hover:text-sky-400"
                  onClick={() => handleMinuteClick(parseInt(minute))}
                >
                  {selectedTime.format("HH")}:{minute}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimePicker;
