"use client";

import { useEffect, useMemo, useState } from "react";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setName(parsed.name || "");
      setEmail(parsed.email || "");
      setProfileImage(parsed.profileImage || "");
    }
  }, []);

  // Görsel için güvenli src
  const avatarSrc = useMemo(() => {
    if (!profileImage) return null;
    return profileImage.startsWith("/") ? `${apiUrl}${profileImage}` : profileImage;
  }, [profileImage, apiUrl]);

  const createdAt = useMemo(() => {
    if (!user?.createdAt) return "—";
    try {
      return new Date(user.createdAt).toLocaleString();
    } catch {
      return "—";
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user?._id) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    setUploading(true);
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${apiUrl}/api/users/upload/${user._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız");

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setProfileImage(data.profileImage || "");
      setSuccess("Profil fotoğrafı güncellendi!");
    } catch (err) {
      setError(err.message || "Yükleme hatası");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user?._id) return;

    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${apiUrl}/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Şifreyi burada backend destekliyorsa ekleyebilirsin; şu an sadece ad/email gönderiliyor.
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Güncelleme başarısız");

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setSuccess("Profil başarıyla güncellendi!");
    } catch (err) {
      setError(err.message || "Güncelleme hatası");
    }
  };

  if (!user) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border rounded-2xl shadow-sm p-6">
            <div className="w-28 h-28 rounded-full bg-gray-200 animate-pulse mx-auto mb-4" />
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
            <div className="h-3 w-24 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="lg:col-span-2 bg-white border rounded-2xl shadow-sm p-6">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">👤 Profil</h1>

      {/* Uyarılar */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-700">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol: Avatar kartı */}
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <div className="relative w-32 h-32 mx-auto">
            {avatarSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarSrc}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-900 text-white grid place-items-center text-2xl">
                {user.name
                  ?.split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "?"}
              </div>
            )}

            {/* Foto değiştir butonu */}
            <label
              htmlFor="avatar-input"
              className="absolute inset-0 rounded-full bg-black/0 hover:bg-black/40 text-white flex items-center justify-center text-sm opacity-0 hover:opacity-100 transition cursor-pointer"
              title="Fotoğrafı değiştir"
            >
              {uploading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Yükleniyor…
                </span>
              ) : (
                "Değiştir"
              )}
            </label>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </div>

          <div className="mt-5 space-y-2 text-center">
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                user.role === "admin" ? "bg-black text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {user.role === "admin" ? "Admin" : "Personel"}
            </span>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <InfoBox label="Kayıt tarihi" value={createdAt} />
              <InfoBox label="Kullanıcı ID" value={user._id || "—"} />
            </div>
          </div>
        </div>

        {/* Sağ: Form kartı */}
        <div className="lg:col-span-2 bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Bilgileri Güncelle</h2>
          <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-sm mb-1 text-gray-700">Ad Soyad</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
                placeholder="Ad Soyad"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm mb-1 text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
                placeholder="ornek@site.com"
                required
              />
            </div>

            {/* Şifre (opsiyonel, API'ye gönderilmiyor) */}
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-gray-700">Yeni Şifre (opsiyonel)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
                placeholder="Değiştirmek istemiyorsan boş bırak"
              />
              <p className="text-xs text-gray-500 mt-1">
                Not: Şifre değişikliği backend’de ayrı bir endpoint ile yapılacaksa buraya bağlanabilir.
              </p>
            </div>

            <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setName(user.name || "");
                  setEmail(user.email || "");
                  setPassword("");
                  setSuccess("");
                  setError("");
                }}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Sıfırla
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90"
              >
                Güncelle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Küçük bilgi kutusu */
function InfoBox({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-left">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 break-all">{value}</p>
    </div>
  );
}
