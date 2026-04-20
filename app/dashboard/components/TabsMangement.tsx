"use client";

import ContactsPage from "./ContactsPage";
import { DashboardPage } from "./DashboardPage";
import FormsPage from "./PortabilityFormsPage";
import { QRCodePage } from "./QRPage";


interface Props {
  activeTab: "dashboard" |"form"|"contact"| "qr" | "info"
}

export function TabsMangement({ activeTab }: Props) {
  switch (activeTab) {
     case "dashboard":
      return <DashboardPage />;
    case "form":
      return <FormsPage/>;
    case "contact":
      return <ContactsPage/>;
    case "qr":
      return <QRCodePage/>;

    // case "info":
    //   return <RestaurantInfoPage restaurantId={restaurantId} />;
    default:
      return null;
  }
}