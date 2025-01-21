import React, { useEffect, useState } from "react";
import CalendarSidebar from "./CalendarSidebar";
import CalendarCentralWidget from "./CalendarCentralWidget";
import { getMonth } from "../../utils/calendar";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
import CalendarAddAppointment from "./CalendarAddAppointment";

interface CalendarContext {
  selectedMonth: dayjs.Dayjs;
  onSmallCalendarChange: (day: dayjs.Dayjs) => void;
}

const Calendar: React.FC = () => {
  const { selectedMonth, onSmallCalendarChange } =
    useOutletContext<CalendarContext>();
  const [currentMonthGrid, setCurrentMonthGrid] = useState(getMonth());
  const [showEventModal, setEventShowModal] = useState(false);

  useEffect(() => {
    setCurrentMonthGrid(getMonth(selectedMonth));
  }, [selectedMonth]);

  function onAddAppointment() {
    setEventShowModal(true);
  }

  function onCloseAppointment() {
    console.log("close");
    setEventShowModal(false);
  }

  return (
    <div className="flex flex-1">
      <CalendarAddAppointment
        daySelected={selectedMonth}
        onClose={onCloseAppointment}
        show={showEventModal}
      />

      <CalendarSidebar
        selectedMonth={selectedMonth}
        onChangeSelection={onSmallCalendarChange}
        onAddAppointment={onAddAppointment}
      />
      <CalendarCentralWidget
        monthGrid={currentMonthGrid}
        selectedMonth={selectedMonth}
        onChangeSelection={onSmallCalendarChange}
        onAddAppointment={onAddAppointment}
      />
    </div>
  );
};

export default Calendar;
