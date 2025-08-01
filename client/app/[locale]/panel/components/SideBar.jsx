"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SideBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-6 border-r flex flex-col justify-between">
      <div>
        {user && (
          <div className="text-center mb-6">
            <img
              src={
                user.profileImage
                  ? `${apiUrl}${user.profileImage}`
                  : "/default-avatar.png" // varsayılan görsel
              }
              alt="Profil"
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
            <p className="mt-2 font-semibold">{user.name}</p>
            <Link href="/panel/profil" className="text-sm text-blue-600 hover:underline">
              Profili Görüntüle
            </Link>
          </div>
        )}

        <ul className="space-y-3">
          <li><Link href="/panel/dashboard">📊 Dashboard</Link></li>
          <li><Link href="/panel/kullanicilar">👥 Kullanıcılar</Link></li>
          <li><Link href="/panel/sayfalar">Sayfalar</Link></li>
          {user?.role === "admin" && (
            <li><Link href="/panel/kullanicilar/yeni">➕ Yeni Kullanıcı</Link></li>
          )}
        </ul>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/panel/login";
        }}
        className="bg-red-500 text-white px-4 py-2 mt-10 rounded hover:bg-red-600"
      >
        🔓 Çıkış Yap
      </button>
    </aside>
  );
}