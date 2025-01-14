import dayjs from "dayjs";
import React from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface SmallCalendarProps {
  monthGrid: Array<Array<dayjs.Dayjs>>;
  selectedMonth: dayjs.Dayjs;
}

const SmallCalendar: React.FC<SmallCalendarProps> = ({
  monthGrid,
  selectedMonth,
}) => {
  return (
    <div className="py-2">
      <header className="flex justify-between">
        <button className="hover:bg-gray-300 rounded-full py-2 px-3">
          <ChevronLeft></ChevronLeft>
        </button>

        <p className="text-gray-500 font-bold py-2">
          {selectedMonth.format("MMMM YYYY")}
        </p>

        <button className="hover:bg-gray-300 rounded-full py-2 px-3">
          <ChevronRight></ChevronRight>
        </button>
      </header>
      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {monthGrid[0].map((day, index) => (
          <span key={index} className="text-sm text-center py-1">
            {day.format("ddd")}
          </span>
        ))}
        {monthGrid.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button key={idx} className={`py-1 w-full`}>
                <span className="text-sm ">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
