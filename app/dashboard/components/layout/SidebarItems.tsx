import React from "react";
import { FolderOpen, LayoutDashboard, QrCode, Settings, Smartphone, UtensilsCrossed } from "lucide-react";
import { Tab, useTab } from "@/components/contexts/TabContext";

const SidebarItems = () => {
  const { activeTab, setActiveTab } = useTab();

  const items: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      key: "form",
      label: "Formumlaire Portabilités",
      icon: <Smartphone size={18} />,
    },
    { key: "info", label: "Infos du restaurant", icon: <Settings size={18} /> },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          className={`w-full flex gap-2 cursor-pointer items-center text-left px-4 py-2 rounded-lg transition
            ${
              activeTab === item.key
                ? "bg-transaprent border-2 border-red-500 text-white"
                : "hover:text-red-500"
            }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SidebarItems;
