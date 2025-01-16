import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getMonth } from "../../utils/calendar";

interface SmallCalendarProps {
  value: dayjs.Dayjs;
  onChangeSelection: (day: dayjs.Dayjs) => void;
  weekendHighlight?: boolean;
}

const SmallCalendar: React.FC<SmallCalendarProps> = ({
  value,
  onChangeSelection,
  weekendHighlight,
}) => {
  const currentFormatted = dayjs().format("DD-MM-YY");

  function getCurrentDaySelectionStyle(day: dayjs.Dayjs) {
    let formatted = day.format("DD-MM-YY");
    let selectionFormatted = value.format("DD-MM-YY");
    return formatted === currentFormatted
      ? "bg-sky-400 hover:bg-sky-400 text-white"
      : selectionFormatted === formatted
      ? "bg-sky-200 hover:bg-sky-200 text-sky-400"
      : "";
  }

  function getCurrentDayGridStyle(day: dayjs.Dayjs) {
    return day.month() === selectedSmallCalendarMonth.month()
      ? weekendHighlight && (day.day() === 0 || day.day() === 6)
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
    setSelectedSmallCalendarMonth(value);
  }, [value]);

  useEffect(() => {
    setSelectedMonthGrid(getMonth(selectedSmallCalendarMonth));
  }, [selectedSmallCalendarMonth]);

  return (
    <div className="py-2">
      <header className="flex justify-between">
        <button
          type="button"
          className="text-gray-400 hover:text-sky-300 rounded-full py-2 pr-3"
          onClick={goToPreviousMonth}
        >
          <ChevronLeft></ChevronLeft>
        </button>

        <p className="text-sm text-gray-500 font-bold py-3">
          {selectedSmallCalendarMonth.format("MMMM YYYY")}
        </p>

        <button
          type="button"
          className="text-gray-400 hover:text-sky-300 rounded-full py-2 pl-3"
          onClick={goToNextMonth}
        >
          <ChevronRight></ChevronRight>
        </button>
      </header>
      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {selectedMonthGrid[0].map((day, index) => (
          <span
            key={index}
            className="text-xs justify-center text-gray-500 flex items-end"
          >
            {day.format("ddd")}
          </span>
        ))}
        {selectedMonthGrid.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`w-full min-w-10 hover:bg-gray-200 rounded-full aspect-square ${getCurrentDaySelectionStyle(
                  day
                )}`}
                onClick={() => {
                  onChangeSelection(day);
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
