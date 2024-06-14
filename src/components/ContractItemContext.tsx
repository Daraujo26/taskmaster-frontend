import React, { createContext, useState, useContext, ReactNode } from "react";
import { ContractItem } from "../interfaces/contractItem";

interface SelectedItem {
  contractItemId: number;
  quantity: number;
}

interface ContractItemContextProps {
  selectedItems: { [key: number]: SelectedItem };
  addItem: (item: ContractItem, quantity: number) => void;
  removeItem: (id: number) => void;
  resetItems: () => void;
}

const ContractItemContext = createContext<ContractItemContextProps | undefined>(
  undefined
);

export const ContractItemProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: SelectedItem;
  }>({});

  const addItem = (item: ContractItem, quantity: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item.id]: { contractItemId: item.id, quantity },
    }));
  };

  const removeItem = (id: number) => {
    const newItems = { ...selectedItems };
    delete newItems[id];
    setSelectedItems(newItems);
  };

  const resetItems = () => {
    setSelectedItems({});
  };

  return (
    <ContractItemContext.Provider
      value={{ selectedItems, addItem, removeItem, resetItems }}
    >
      {children}
    </ContractItemContext.Provider>
  );
};

export const useContractItem = () => {
  const context = useContext(ContractItemContext);
  if (!context) {
    throw new Error(
      "useContractItem must be used within a ContractItemProvider"
    );
  }
  return context;
};
