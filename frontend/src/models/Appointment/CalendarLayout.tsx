import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import CalendarHeader from "./CalendarHeader";
import dayjs from "dayjs";

interface CalendarLayoutProps {}

const CalendarLayout: React.FC<CalendarLayoutProps> = () => {
  // État pour gérer la vue ou la date du calendrier
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const goToNextMonth = () => setSelectedMonth((prev) => prev.add(1, "month"));
  const goToPreviousMonth = () =>
    setSelectedMonth((prev) => prev.subtract(1, "month"));

  const goToToday = () => setSelectedMonth(dayjs());

  function onSmallCalendarChange(day: dayjs.Dayjs) {
    console.log("Change day" + day);
    setSelectedMonth(day);
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header avec le composant central */}
      <Header
        centralComponent={
          <CalendarHeader
            previous={goToPreviousMonth}
            next={goToNextMonth}
            today={goToToday}
            selectedMonth={selectedMonth}
          />
        }
      />

      {/* Contenu principal */}
      <main className="flex flex-1 bg-gray-100">
        <Outlet context={{ selectedMonth, onSmallCalendarChange }} />
      </main>
    </div>
  );
};

export default CalendarLayout;
