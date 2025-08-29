"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logosvg from "../../GeneralComponents/Header/Icons/blacklogo.svg";
import Image from "next/image";

export default function SideBar() {
  const [user, setUser] = useState(null); // admin linki için role kontrol
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // (Opsiyonel) locale önekini kaldır: /tr/... /en/... /de/... /ru/...
  const normalize = (p) => {
    if (!p) return "/";
    const parts = p.split("/").filter(Boolean);
    const langs = new Set(["tr", "en", "de", "ru"]);
    if (parts.length && langs.has(parts[0])) parts.shift();
    return "/" + parts.join("/");
  };

  const current = normalize(pathname);
  const isActive = (href) =>
    current === href || current.startsWith(href + "/");

  const baseCls =
    "block px-3 py-2 rounded-md font-medium text-gray-800 " +
    "transition-all duration-200 transform-gpu " +
    "hover:scale-[1.03] hover:bg-black hover:text-white " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40";

  // ! ile hover/diğer stilleri ezdiriyoruz ki aktifken hep siyah-beyaz kalsın
  const activeCls = "!bg-black !text-white !scale-[1.03] shadow-sm";

  return (
    <aside className="w-[270px] bg-white min-h-screen border-r hidden md:flex md:flex-col items-center font-jost text-[17px]">
      <Image
        src={logosvg}
        alt="Logo"
        width={80}
        height={82}
        className="object-contain h-auto mt-6"
        priority
      />


      <div className="w-[60%] min-w-[190px] text-start mt-12">
        <ul className="space-y-4 text-left">
          <li>
            <Link
              href="/panel/dashboard"
              className={`${baseCls} ${isActive("/panel/dashboard") ? activeCls : ""}`}
              aria-current={isActive("/panel/dashboard") ? "page" : undefined}
            >
              📊 Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/panel/kullanicilar"
              className={`${baseCls} ${isActive("/panel/kullanicilar") ? activeCls : ""}`}
              aria-current={isActive("/panel/kullanicilar") ? "page" : undefined}
            >
              👥 Kullanıcılar
            </Link>
          </li>

          <li>
            <Link
              href="/panel/sayfalar"
              className={`${baseCls} ${isActive("/panel/sayfalar") ? activeCls : ""}`}
              aria-current={isActive("/panel/sayfalar") ? "page" : undefined}
            >
              📄 Sayfalar
            </Link>
          </li>

          {user?.role === "admin" && (
            <li>
              <Link
                href="/panel/kullanicilar/yeni"
                className={`${baseCls} ${isActive("/panel/kullanicilar/yeni") ? activeCls : ""}`}
                aria-current={isActive("/panel/kullanicilar/yeni") ? "page" : undefined}
              >
                ➕ Yeni Kullanıcı
              </Link>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}
