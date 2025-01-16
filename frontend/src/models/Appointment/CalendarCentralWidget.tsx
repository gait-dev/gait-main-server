import React from "react";
import CalendarDayGrid from "./CalendarDayGrid";
import dayjs from "dayjs";

interface CalendarCentralWidgetProps {
  monthGrid: Array<Array<dayjs.Dayjs>>;
  selectedMonth: dayjs.Dayjs;
  onChangeSelection: (day: dayjs.Dayjs) => void;
  onAddAppointment: () => void;
}

const CalendarCentralWidget: React.FC<CalendarCentralWidgetProps> = ({
  monthGrid,
  selectedMonth,
  onChangeSelection,
  onAddAppointment,
}) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="grid grid-cols-7">
        {monthGrid.map((row, index) => (
          <React.Fragment key={index}>
            {row.map(
              (day, row_index) =>
                index == 0 && (
                  <p
                    key={row_index}
                    className="text-gray-600 text-sm text-center mt-1 py-1"
                  >
                    {day.format("ddd")}
                  </p>
                )
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {monthGrid.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((day, col_index) => (
              <CalendarDayGrid
                day={day}
                selectedMonth={selectedMonth}
                key={col_index}
                onChangeSelection={onChangeSelection}
                onAddAppointment={onAddAppointment}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarCentralWidget;
