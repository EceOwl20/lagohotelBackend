"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function TopBar() {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
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

  // Aynı avatar src mantığı
  const avatarSrc = useMemo(() => {
    if (!user?.profileImage) return null;
    return user.profileImage.startsWith("/")
      ? `${apiUrl}${user.profileImage}`
      : user.profileImage;
  }, [user, apiUrl]);

  // Görsel yoksa ilk harflerden avatar
  const initials = useMemo(() => {
    if (!user?.name) return "?";
    return user.name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [user]);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user?._id) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      const token = localStorage.getItem("token");

      const res = await fetch(`${apiUrl}/api/users/upload/${user._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız");

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (err) {
      alert(err.message || "Yükleme hatası");
    } finally {
      setUploading(false);
      e.target.value = ""; // aynı dosyayı tekrar seçebilmek için
    }
  };

  return (
    <header className="sticky top-0 z-30 h-[76px] bg-white border-b px-4 sm:px-6 flex items-center justify-between">
      <div className="font-semibold text-[28px] font-jost text-lagoBlack2">Yönetim Paneli</div>

      <div className="flex items-center gap-3">
        {user && (
          <>
            {/* Avatar + hover overlay + upload */}
            <div className="relative w-9 h-9 group">
              {avatarSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarSrc}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-900 text-white grid place-items-center text-xs border">
                  {initials}
                </div>
              )}

              <label
                htmlFor="topbar-avatar-input"
                className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 text-[10px] flex items-center justify-center cursor-pointer transition"
                title="Profil fotoğrafını değiştir"
              >
                {uploading ? (
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                ) : (
                  "Değiştir"
                )}
              </label>
              <input
                id="topbar-avatar-input"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
            </div>

            <div className="hidden sm:flex sm:flex-col sm:items-start leading-tight font-jost">
              <span className="text-[15px] font-medium capitalize mb-1 ">{user.name}</span>
              <Link href="/panel/profil" className="text-xs text-lagoBlack2 hover:underline">
                Profili Görüntüle
              </Link>
            </div>
          </>
        )}

        <button
          onClick={handleLogout}
          className="ml-2 bg-red-700 text-white text-sm px-3 py-1.5 rounded hover:bg-red-600 font-jost"
        >
          🔓 Çıkış Yap
        </button>
      </div>
    </header>
  );
}
