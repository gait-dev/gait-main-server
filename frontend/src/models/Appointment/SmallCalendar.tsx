import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getMonth } from "../../utils/calendar";

interface SmallCalendarProps {
  selectedMonth: dayjs.Dayjs;
  onChangeSelection: (day: dayjs.Dayjs) => void;
  onAddAppointment: () => void;
}

const SmallCalendar: React.FC<SmallCalendarProps> = ({
  selectedMonth,
  onChangeSelection,
  onAddAppointment,
}) => {
  const currentFormatted = dayjs().format("DD-MM-YY");

  function getCurrentDaySelectionStyle(day: dayjs.Dayjs) {
    let formatted = day.format("DD-MM-YY");
    let selectionFormatted = selectedMonth.format("DD-MM-YY");
    return formatted === currentFormatted
      ? "bg-sky-400 hover:bg-sky-400 text-white"
      : selectionFormatted === formatted
      ? "bg-sky-200 hover:bg-sky-200 text-sky-400"
      : "";
  }

  function getCurrentDayGridStyle(day: dayjs.Dayjs) {
    return day.month() === selectedSmallCalendarMonth.month()
      ? day.day() === 0 || day.day() === 6
        ? "text-sky-400"
        : "text-gray-700 "
      : "text-gray-400";
  }

  const [selectedSmallCalendarMonth, setSelectedSmallCalendarMonth] = useState(
    dayjs()
  );

  const [selectedMonthGrid, setSelectedMonthGrid] = useState(getMonth());
  const goToNextMonth = () =>
    setSelectedSmallCalendarMonth((prev) => prev.add(1, "month"));
  const goToPreviousMonth = () =>
    setSelectedSmallCalendarMonth((prev) => prev.subtract(1, "month"));

  useEffect(() => {
    setSelectedSmallCalendarMonth(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    setSelectedMonthGrid(getMonth(selectedSmallCalendarMonth));
  }, [selectedSmallCalendarMonth]);

  return (
    <div className="py-2">
      <header className="flex justify-between">
        <button
          className="hover:bg-gray-300 rounded-full py-2 px-3"
          onClick={goToPreviousMonth}
        >
          <ChevronLeft></ChevronLeft>
        </button>

        <p className="text-gray-500 font-bold py-2">
          {selectedSmallCalendarMonth.format("MMMM YYYY")}
        </p>

        <button
          className="hover:bg-gray-300 rounded-full py-2 px-3"
          onClick={goToNextMonth}
        >
          <ChevronRight></ChevronRight>
        </button>
      </header>
      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {selectedMonthGrid[0].map((day, index) => (
          <span key={index} className="text-sm text-center py-1">
            {day.format("ddd")}
          </span>
        ))}
        {selectedMonthGrid.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`py-1 w-full hover:bg-gray-200 rounded-full ${getCurrentDaySelectionStyle(
                  day
                )}`}
                onClick={() => {
                  onChangeSelection(day);
                  onAddAppointment();
                }}
              >
                <span className={`text-sm ${getCurrentDayGridStyle(day)}`}>
                  {day.format("D")}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
