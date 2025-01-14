import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { Appointment } from "../../utils/types";
import CalendarSidebar from "./CalendarSidebar";
import CalendarCentralWidget from "./CalendarCentralWidget";
import { getMonth } from "../../utils/calendar";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";

interface CalendarContext {
  selectedMonth: dayjs.Dayjs;
}

const Calendar: React.FC = () => {
  const { selectedMonth } = useOutletContext<CalendarContext>();
  const [currentMonthGrid, setCurrentMonthGrid] = useState(getMonth());

  useEffect(() => {
    setCurrentMonthGrid(getMonth(selectedMonth));
  }, [selectedMonth]);

  return (
    <div className="flex flex-1">
      <CalendarSidebar
        selectedMonth={selectedMonth}
        monthGrid={currentMonthGrid}
      />
      <CalendarCentralWidget
        monthGrid={currentMonthGrid}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default Calendar;
