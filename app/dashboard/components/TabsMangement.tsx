"use client";

import ContactsPage from "./ContactsPage";
import DashboardPage from "./DashboardPage";
import FormsPage from "./FormsPage";


interface Props {
  activeTab: "dashboard" |"form"|"contact"| "info"
}

export function TabsMangement({ activeTab }: Props) {
  switch (activeTab) {
     case "dashboard":
      return <DashboardPage />;
    case "form":
      return <FormsPage/>;
    case "contact":
      return <ContactsPage/>;

    // case "info":
    //   return <RestaurantInfoPage restaurantId={restaurantId} />;
    default:
      return null;
  }
}