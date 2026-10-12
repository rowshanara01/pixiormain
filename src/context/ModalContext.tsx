"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ open, setOpen, refresh, setRefresh }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
