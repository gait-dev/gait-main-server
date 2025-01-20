import React, { useState, useEffect } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CircularProgress } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

interface GenericDropdownProps<T> {
  fetchData: () => Promise<T[]>; // Fonction pour récupérer les données
  onSelect: (item: T) => void; // Callback pour l'élément sélectionné
  searchFields: (keyof T)[]; // Champs utilisés pour la recherche
  displayField: keyof T;
  placeholder?: string; // Placeholder pour le champ de recherche
  addNewModal?: () => void; // Composant modal pour ajouter un nouvel élément
}

const GenericDropdown = <T extends Record<string, any>>({
  fetchData,
  onSelect,
  searchFields,
  placeholder = "Search...",
  displayField,
  addNewModal = undefined,
}: GenericDropdownProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T>();
  const [items, setItems] = useState<T[]>([]);
  const [filteredItems, setFilteredItems] = useState<T[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);

  // Type guard pour vérifier si la valeur est de type T
  const isInstanceOfT = (value: any): value is T => {
    return (
      value &&
      typeof value === "object" &&
      searchFields.every((field) => field in value)
    );
  };

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [fetchData]);

  useEffect(() => {
    if (selectedItem) onSelect(selectedItem);
  }, [selectedItem]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Filtrer les éléments en fonction des champs de recherche
    const lowercasedQuery = query.toLowerCase();
    const filtered = items.filter((item) =>
      searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(lowercasedQuery)
      )
    );
    setFilteredItems(filtered);
  };

  const handleSelection = (value: unknown) => {
    if (isInstanceOfT(value)) setSelectedItem(value);
    else if (typeof value === "string" && value === "add") {
      if (addNewModal) addNewModal();
    }
  };

  return (
    <div className="relative w-full">
      <Combobox onChange={handleSelection}>
        <div className="relative">
          {/* Input Field */}
          <ComboboxInput
            autoComplete="off"
            placeholder={placeholder}
            onChange={(e) => handleSearch(e.target.value)}
            displayValue={(item: T) => {
              return item[displayField];
            }}
            className="w-full border px-3 py-2 rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ArrowDropDown className="text-gray-400"></ArrowDropDown>
          </ComboboxButton>

          {/* Dropdown Items */}

          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] mt-2 z-10 rounded border bg-white [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          >
            {/* Loading State */}
            {loading && (
              <ComboboxOption
                value={"loading"}
                className="flex items-center justify-center py-4"
              >
                <CircularProgress size={24} />
              </ComboboxOption>
            )}

            {/* Add New Option */}
            {addNewModal && (
              <ComboboxOption
                className=" text-sky-400 data-[focus]:bg-sky-400 data-[focus]:text-white data-[focus]:font-semibold  p-2"
                onClick={() => {
                  console.log("add new");
                  addNewModal();
                }}
                value={"add"}
              >
                + Add New
              </ComboboxOption>
            )}

            {/* Filtered Items */}
            {!loading &&
              filteredItems.map((item) => (
                <ComboboxOption
                  key={item.id}
                  value={item}
                  className="data-[focus]:bg-sky-400 data-[focus]:text-white data-[focus]:font-semibold p-2"
                >
                  {item[displayField]}
                </ComboboxOption>
              ))}

            {/* Empty State */}
            {!loading && filteredItems.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500 text-center">
                No results found.
              </div>
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};

export default GenericDropdown;
