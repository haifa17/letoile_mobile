"use client";
import { useTab } from "@/components/contexts/TabContext";
import { TabsMangement } from "./components/TabsMangement";

const page = () => {
  const { activeTab } = useTab();

  return (
    <div className="p-8">
      <TabsMangement activeTab={activeTab} />
    </div>
  );
};

export default page;
