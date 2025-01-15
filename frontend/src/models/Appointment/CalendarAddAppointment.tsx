import dayjs from "dayjs";
import { Close, Schedule } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

interface CalendarAddAppointmentContext {
  daySelected: dayjs.Dayjs;
  onClose: () => void;
}

const CalendarAddAppointment: React.FC<CalendarAddAppointmentContext> = ({
  daySelected,
  onClose,
}) => {
  const [title, setTitle] = useState("");

  return (
    <div
      className="h-screen w-full fixed left-0 top-0 flex justify-center items-center"
      onClick={() => onClose()}
    >
      <form
        className="bg-white shadow-md rounded "
        onClick={(e) => e.stopPropagation()}
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className=""></span>
          <button onClick={() => onClose()}>
            <span className="text-gray-400">
              <Close></Close>
            </span>
          </button>
        </header>
        <div className="px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="title"
              placeholder="Add title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>

          <DatePicker label="Basic date picker" />
          <div className="mb-6 flex flex-row">
            <span className="text-gray-400">
              <Schedule></Schedule>
            </span>
            <p className="mx-2">{daySelected.format("dddd DD MMMM")}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CalendarAddAppointment;
