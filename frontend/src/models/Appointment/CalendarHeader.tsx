import React from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import dayjs from "dayjs";

interface CalendarHeaderProps {
  previous: () => void;
  next: () => void;
  today: () => void;
  selectedMonth: dayjs.Dayjs;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  previous,
  next,
  today,
  selectedMonth,
}) => {
  return (
    <div className="px-10 py-2 flex items-center">
      <h1 className="mr-10 text-xl font-bold">Calendar</h1>

      <button
        className="hover:bg-sky-300 rounded-full py-2 px-3 mr-5"
        onClick={previous}
      >
        <ChevronLeft></ChevronLeft>
      </button>

      <div>{selectedMonth.format("MMMM YYYY")}</div>

      <button
        className="hover:bg-sky-300 rounded-full py-2 px-3 ml-5"
        onClick={next}
      >
        <ChevronRight></ChevronRight>
      </button>

      <button className="hover:bg-sky-300 py-2 px-4 mr-5" onClick={today}>
        Today
      </button>
    </div>
  );
};

export default CalendarHeader;
