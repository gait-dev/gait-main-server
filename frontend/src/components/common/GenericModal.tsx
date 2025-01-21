import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface GenericModalProps {
  isOpen: boolean; // Contrôle si la modal est ouverte ou fermée
  onClose: () => void; // Callback pour fermer la modal
  onSubmit: () => void; // Callback pour soumettre les données
  gridWidth: number;
  title: string; // Titre affiché sur la gauche
  description?: string; // Description affichée sous le titre
  children: React.ReactNode; // Contenu principal à afficher sur la droite
  submitLabel?: string; // Texte du bouton Submit
  cancelLabel?: string; // Texte du bouton Cancel
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  gridWidth,
  title,
  description,
  children,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}) => {
  return (
    <Dialog
      open={isOpen}
      as="form"
      className="relative z-10"
      onClose={onClose}
      method="post"
      onSubmit={onSubmit}
    >
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
        <DialogBackdrop className="fixed inset-0 bg-gray-600/40" />

        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full bg-white rounded p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <div
              className={`grid gap-4 gap-y-2 text-sm  grid-cols-${gridWidth}`}
            >
              {/* Section de gauche */}
              <div className="text-gray-600 col-span-1 mb-3">
                <p className="font-medium text-lg">{title}</p>
                {description && <p className="mt-2 text-sm">{description}</p>}
              </div>

              {/* Section de droite */}
              <div className={`col-span-${gridWidth - 1}`}>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-4">
                  {children}
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                    onClick={onClose}
                  >
                    {cancelLabel}
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {submitLabel}
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default GenericModal;
