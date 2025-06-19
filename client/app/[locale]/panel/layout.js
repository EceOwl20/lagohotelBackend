"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/SideBar.jsx";

export default function PanelLayout({ children }) {
  const pathname = usePathname();

  const hideSidebar = pathname.includes("/panel/login");

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <main className={`flex-1 p-6 ${hideSidebar ? 'w-full' : ''}`}>
        {children}
      </main>
    </div>
  );
}