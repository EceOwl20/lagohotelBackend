"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import logosvg from "../../GeneralComponents/Header/Icons/blacklogo.svg"
import Image from 'next/image'

export default function SideBar() {
  const [user, setUser] = useState(null); // admin linki için role kontrol
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const itemCls =
  "block px-3 py-2 rounded-md font-medium text-gray-800 " +
  "transition-all duration-200 transform-gpu " +
  "hover:scale-[1.03] hover:bg-black hover:text-white " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40";

  return (
    <aside className="w-64 bg-gray-100 min-h-screen items-center border-r hidden md:flex md:flex-col font-jost text-[17px]">
      <Image 
                      src={logosvg}
                      alt="Logo"
                      width={62}
                      height={46}
                      className="object-contain lg:max-w-[300px] h-auto items-center justify-center  mt-6"
        
                    />
      <div className="w-[55%] min-w-[170px] items-center text-start mt-12">
       <ul className="space-y-7 text-left">
  <li>
    <Link href="/panel/dashboard" className={itemCls}>
      📊 Dashboard
    </Link>
  </li>
  <li>
    <Link href="/panel/kullanicilar" className={itemCls}>
      👥 Kullanıcılar
    </Link>
  </li>
  <li>
    <Link href="/panel/sayfalar" className={itemCls}>
      📄 Sayfalar
    </Link>
  </li>
  {user?.role === "admin" && (
    <li>
      <Link href="/panel/kullanicilar/yeni" className={itemCls}>
        ➕ Yeni Kullanıcı
      </Link>
    </li>
  )}
</ul>
      </div>
    </aside>
  );
}
