import React from "react";
import { Add } from "@mui/icons-material";
import SmallCalendar from "../../components/Date/SmallCalendar";
import dayjs from "dayjs";

interface CalendarSidebarProps {
  selectedMonth: dayjs.Dayjs;
  onChangeSelection: (day: dayjs.Dayjs) => void;
  onAddAppointment: () => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedMonth,
  onChangeSelection,
  onAddAppointment,
}) => {
  return (
    <aside className="border p-5 w-64 flex flex-col gap-2">
      <SmallCalendar
        value={selectedMonth}
        onChangeSelection={onChangeSelection}
        weekendHighlight={true}
      />
      <button
        className="bg-rose-500 hover:bg-rose-600 text-slate-100 px-4 py-2 rounded w-full"
        onClick={onAddAppointment}
      >
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
