"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TopBar() {
  const [user, setUser] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/panel/login";
  };

  const avatarSrc =
    user?.profileImage
      ? (user.profileImage.startsWith("/")
          ? `${apiUrl}${user.profileImage}`
          : user.profileImage)
      : "/default-avatar.png"; // public/ içine koy

  return (
    <header className="sticky top-0 z-30 h-[76px] bg-white border-b px-4 sm:px-6 flex items-center justify-between">
      <div className="font-semibold text-[28px] font-jost text-lagoBlack2">Yönetim Paneli</div>

      <div className="flex items-center gap-3">
        {user && (
          <>
            <img
              src={avatarSrc}
              alt="Profil"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden sm:flex sm:flex-col sm:items-end leading-tight">
              <span className="text-sm font-medium">{user.name}</span>
              <Link href="/panel/profil" className="text-xs text-blue-600 hover:underline">
                Profili Görüntüle
              </Link>
            </div>
          </>
        )}

        <button
          onClick={handleLogout}
          className="ml-2 bg-red-500 text-white text-sm px-3 py-1.5 rounded hover:bg-red-600"
        >
          🔓 Çıkış Yap
        </button>
      </div>
    </header>
  );
}
