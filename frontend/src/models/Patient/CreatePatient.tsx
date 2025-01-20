import React, { useState } from "react";
import { Patient } from "../../utils/types";
import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface CreatePatientModalProps {
  onClose: () => void;
  onPatientCreated: (patient: Patient) => void;
  show: boolean;
}

const CreatePatientModal: React.FC<CreatePatientModalProps> = ({
  onClose,
  onPatientCreated,
  show,
}) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l’ajout d’un patient (API ou local)
    if (patient) onPatientCreated(patient); // Appelle la modal principale avec le nom du patient
  };

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
                    <div className="md:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="block w-full border rounded py-2 px-3"
                        value={patient?.name}
                        required
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mt-4"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="block w-full border rounded py-2 px-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
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

export default CreatePatientModal;
