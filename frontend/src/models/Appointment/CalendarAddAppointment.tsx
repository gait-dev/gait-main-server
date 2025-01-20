import dayjs from "dayjs";
import {
  Button,
  CloseButton,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import TimePicker from "../../components/Date/TimePicker";
import DatePicker from "../../components/Date/DatePicker";
import { PatientDropdown } from "../Patient";

interface CalendarAddAppointmentContext {
  daySelected: dayjs.Dayjs;
  show: boolean;
  onClose: () => void;
}

const CalendarAddAppointment: React.FC<CalendarAddAppointmentContext> = ({
  daySelected,
  show,
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
      <Dialog
        open={show}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
          <DialogBackdrop className="fixed inset-0 bg-gray-600/40" />
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full bg-white rounded p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 px-5 py-5">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Add event</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-bold">
                        Patient
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-bold">
                        Rendez vous
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <PatientDropdown></PatientDropdown>
                    </div>
                    <div className="md:col-span-2">REndez vous</div>

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
                      <TimePicker
                        value={daySelected.add(30, "minutes")}
                      ></TimePicker>
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
                      <div className="inline-flex items-end gap-2">
                        <Button
                          className="bg-rose-500 hover:bg-rose-600 text-slate-100 px-4 py-2 rounded"
                          onClick={() => onClose()}
                        >
                          Close
                        </Button>
                        <Button
                          className="bg-sky-400 hover:bg-sky-600 text-slate-100 px-4 py-2 rounded"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CalendarAddAppointment;
