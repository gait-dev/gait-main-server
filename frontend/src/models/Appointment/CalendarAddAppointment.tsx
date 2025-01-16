import dayjs from "dayjs";
import { Close, Schedule } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DateTimePicker from "../../components/Date/DateTimePicker";
import TimePicker from "../../components/Date/TimePicker";
import DatePicker from "../../components/Date/DatePicker";

interface CalendarAddAppointmentContext {
  daySelected: dayjs.Dayjs;
  onClose: () => void;
}

const CalendarAddAppointment: React.FC<CalendarAddAppointmentContext> = ({
  daySelected,
  onClose,
}) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log("Title" + title);
  }, [title]);

  useEffect(() => {
    console.log("Day" + daySelected);
  }, [daySelected]);

  function handleSubmit(): any {}

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gray-400 opacity-50"></div>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
        <form className="bg-white shadow-md rounded">
          <header className="bg-sky-400 px-4 py-2 flex justify-between items-center rounded-t">
            <span className=""></span>
            <button onClick={() => onClose()}>
              <span className="text-white">
                <Close></Close>
              </span>
            </button>
          </header>
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 px-5 py-5">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Add event</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Add title"
                    value={title}
                    onChange={(e) => {
                      console.log("Chnage title" + title);
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="md:col-span-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Start date
                  </label>
                </div>

                <div className="md:col-span-2">
                  <DatePicker value={daySelected}></DatePicker>
                </div>

                <div className="md:col-span-2">
                  <TimePicker value={daySelected}></TimePicker>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    End date
                  </label>
                </div>

                <div className="md:col-span-2">
                  <DatePicker value={daySelected}></DatePicker>
                </div>

                <div className="md:col-span-2">
                  <TimePicker value={daySelected}></TimePicker>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-gray-700 text-sm font-bold">
                    Description
                  </label>
                  <textarea
                    rows={10}
                    className="p-2.5 w-full text-sm text-gray-400 rounded-lg border"
                    placeholder="Description"
                  ></textarea>
                </div>

                <div className="md:col-span-4 text-right">
                  <div className="inline-flex items-end">
                    <button
                      onClick={handleSubmit}
                      className="bg-rose-500 hover:bg-rose-600 text-slate-100 px-4 py-2 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CalendarAddAppointment;
