"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import SidebarItems from "./SidebarItems";
import { useRouter } from "next/navigation";
import axios from "axios";
export const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72 bg-red-900 text-white
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 
          lg:sticky lg:top-0 lg:h-screen
          border-r px-4 flex flex-col
        `}
      >
        {/* Top Section */}
        <div className="space-y-10 py-6 flex-1 overflow-y-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="relative ">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-900 rounded-full blur-2xl opacity-30" />
              <Link
                href="/"
                className="flex flex-col justify-center items-center gap-3 group hover:opacity-80 transition-opacity"
              >
                <div className="w-20 h-20 relative ">
                  <img
                    src="/logo.jpg"
                    alt="LETOILE MOBILE"
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-2xl font-extrabold bg-clip-text font-heading text-white  hidden sm:block">
                  LETOILE MOBILE
                </span>
              </Link>
            </div>
          </div>

          {/* Sidebar navigation */}
          <div onClick={onClose}>
            <SidebarItems />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-6 pt-4 border-t flex flex-col items-center gap-2">
          <Button
            onClick={async () => {
              await axios.post("/api/auth/logout");
              router.push("/login");
              router.refresh();
            }}
            variant="outline"
            className="w-full flex items-center gap-2 hover:text-white hover:scale-95 bg-gradient-to-r from-red-500 to-red-900 border-none cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </Button>

          <div className="mt-4 text-center text-xs text-gray-200">
            <div>
              Powered by{" "}
              <Link
                href="https://www.h2a-group.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-400"
              >
                H2A
              </Link>
            </div>
            <div>© {currentYear} H2A. All rights reserved.</div>
          </div>
        </div>
      </aside>
    </>
  );
};
