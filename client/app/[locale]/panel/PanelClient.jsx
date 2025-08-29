"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";

export default function PanelClient({ children }) {
  const pathname = usePathname();

  // Login sayfasında hem sidebar hem topbar gizli
  const hideChrome = pathname.includes("/panel/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!hideChrome && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {!hideChrome && <TopBar />}

        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
