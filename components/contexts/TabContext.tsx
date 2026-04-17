"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Tab = "dashboard" | "menu" | "categories" | "qr" | "info";

interface TabContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab, action?: string) => void; // allow optional action
  action?: string;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTabState] = useState<Tab>("dashboard");
  const [action, setAction] = useState<string | undefined>(undefined);
  const setActiveTab = (tab: Tab, action?: string) => {
    setActiveTabState(tab);
    setAction(action);
  };
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, action }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within TabProvider");
  }
  return context;
};
