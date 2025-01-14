import React from "react";
import { Add } from "@mui/icons-material";
import SmallCalendar from "./SmallCalendar";
import dayjs from "dayjs";

interface CalendarSidebarProps {
  monthGrid: Array<Array<dayjs.Dayjs>>;
  selectedMonth: dayjs.Dayjs;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedMonth,
  monthGrid,
}) => {
  return (
    <aside className="border p-5 w-64 flex flex-col gap-2">
      <SmallCalendar selectedMonth={selectedMonth} monthGrid={monthGrid} />
      <button className="bg-rose-500 hover:bg-rose-600 text-slate-100 px-4 py-2 rounded w-full">
        <Add className="mr-2"></Add>
        Add event
      </button>
      <button className="bg-rose-500 hover:bg-rose-600 text-slate-100 px-4 py-2 rounded w-full">
        <Add className="mr-2"></Add>
        Add calendar
      </button>
    </aside>
  );
};

export default CalendarSidebar;
