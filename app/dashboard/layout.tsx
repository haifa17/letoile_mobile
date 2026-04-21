"use client";
import { TabProvider } from "@/components/contexts/TabContext";
import "./../globals.css";
import { Sidebar } from "./components/layout/sidebar";
import { useState } from "react";
import Header from "./components/layout/navbar";
import { ToastContainer } from "react-toastify";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <TabProvider>
      <div className="flex min-h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 h-screen overflow-y-auto flex flex-col">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 ">{children}</main>
        </div>
      </div>
      <ToastContainer />
    </TabProvider>
  );
}
