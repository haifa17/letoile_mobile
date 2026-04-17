"use client";

import DashboardPage from "./DashboardPage";
import FormsPage from "./FormsPage";


interface Props {
  activeTab: "dashboard" |"form"| "info"
}

export function TabsMangement({ activeTab }: Props) {
  switch (activeTab) {
     case "dashboard":
      return <DashboardPage />;
    case "form":
      return <FormsPage/>;
    
    // case "info":
    //   return <RestaurantInfoPage restaurantId={restaurantId} />;
    default:
      return null;
  }
}