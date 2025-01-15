import React from "react";
import dayjs from "dayjs";

interface CalendarCentralWidgetProps {
  day: dayjs.Dayjs;
  selectedMonth: dayjs.Dayjs;
  onChangeSelection: (day: dayjs.Dayjs) => void;
  onAddAppointment: () => void;
}

const CalendarDayGrid: React.FC<CalendarCentralWidgetProps> = ({
  day,
  selectedMonth,
  onChangeSelection,
  onAddAppointment,
}) => {
  const currentFormatted = dayjs().format("DD-MM-YY");

  function getCurrentDaySelectionStyle() {
    let formatted = day.format("DD-MM-YY");
    return formatted === currentFormatted
      ? "border border-sky-400 rounded-full w-8"
      : "";
  }

  function getCurrentDayGridStyle() {
    return day.month() === selectedMonth.month()
      ? day.day() === 0 || day.day() === 6
        ? "text-sky-400"
        : "text-gray-700 "
      : "text-gray-400";
  }

  return (
    <div
      className={`border border-gray-200 flex flex-col ${getCurrentDayGridStyle()}`}
      onClick={() => {
        onChangeSelection(day);
        onAddAppointment();
      }}
    >
      <header className="">
        <p className={`p-1 ${getCurrentDaySelectionStyle()}`}>
          {day.format("D")}
        </p>
      </header>
    </div>
  );
};

export default CalendarDayGrid;
