"use client";

import { useEffect, useState } from "react";
import { LogOut, Menu, UserStar } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/me").then((res) => {
      setUser(res.data);
    });
  }, []);
  console.log(user);
  return (
    <header className="sticky top-0 z-30 bg-white flex flex-row justify-between md:justify-end items-center px-4 py-6 gap-4 shadow">
      {/* Hamburger only mobile */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 justify-end"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-2">
        <UserStar size={20} />
        {user && <div className="text-sm font-medium">{user.email}</div>}
      </div>
      <Button
        className="cursor-pointer "
        onClick={async () => {
          await axios.post("/api/auth/logout");
          router.push("/login");
          router.refresh();
        }}
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </header>
  );
};

export default Header;
