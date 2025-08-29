"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function KullaniciEkle() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [authorized, setAuthorized] = useState(null); // null: kontrol ediliyor
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("personel");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --- Yetki kontrolü ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/panel/login");
      return;
    }
    const parsed = JSON.parse(storedUser);
    if (parsed.role === "admin") {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      setTimeout(() => router.push("/panel/dashboard"), 2500);
    }
  }, [router]);

  // --- Basit şifre gücü ---
  const passScore = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[a-z]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return Math.min(s, 4); // 0..4
  }, [password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kayıt başarısız");

      setSuccess("✅ Kullanıcı başarıyla eklendi!");
      router.push("/panel/kullanicilar");
    } catch (err) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Yükleniyor/Yetkisiz ekranları ---
  if (authorized === null) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded mt-6 animate-pulse" />
        </div>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold text-red-600">🚫 Bu sayfayı görüntülemek için yetkiniz yok.</h1>
        <p className="mt-2 text-gray-600">Dashboard'a yönlendiriliyorsunuz...</p>
      </div>
    );
  }

  // --- Form ---
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Yeni Kullanıcı Ekle</h2>
        <Link
          href="/panel/kullanicilar"
          className="rounded-lg border px-3 py-2 hover:bg-white transition"
        >
          ← Listeye Dön
        </Link>
      </div>

      {/* Alerts */}
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

      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ad Soyad */}
          <div className="sm:col-span-1">
            <label className="block text-sm mb-1 text-gray-700">Ad Soyad</label>
            <input
              type="text"
              placeholder="Ad Soyad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
              required
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-1">
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="ornek@site.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
              required
            />
          </div>

          {/* Şifre */}
          <div className="sm:col-span-2">
            <label className="block text-sm mb-1 text-gray-700">Şifre</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="En az 8 karakter, önerilir"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-black/30"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-black transition"
                aria-label={showPass ? "Şifreyi gizle" : "Şifreyi göster"}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Şifre gücü */}
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    passScore <= 1
                      ? "bg-red-500"
                      : passScore === 2
                      ? "bg-yellow-500"
                      : passScore === 3
                      ? "bg-lime-500"
                      : "bg-black"
                  }`}
                  style={{ width: `${(passScore / 4) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {(passScore <= 1 && "Zayıf") ||
                  (passScore === 2 && "Orta") ||
                  (passScore === 3 && "İyi") ||
                  "Güçlü"}
              </p>
            </div>
          </div>

          {/* Rol (segmented) */}
          <div className="sm:col-span-2">
            <label className="block text-sm mb-1 text-gray-700">Rol</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("personel")}
                className={`rounded-lg border px-3 py-2 transition ${
                  role === "personel"
                    ? "bg-black text-white hover:bg-black/90"
                    : "hover:bg-gray-50"
                }`}
              >
                👷‍♂️ Personel
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`rounded-lg border px-3 py-2 transition ${
                  role === "admin"
                    ? "bg-black text-white hover:bg-black/90"
                    : "hover:bg-gray-50"
                }`}
              >
                🧑‍💼 Admin
              </button>
            </div>
            {/* Erişilebilirlik için (form değeri) gizli input */}
            <input type="hidden" name="role" value={role} />
          </div>

          {/* Aksiyonlar */}
          <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
            <Link href="/panel/kullanicilar" className="px-4 py-2 rounded-lg border hover:bg-gray-50">
              İptal
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90 disabled:opacity-60"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Kaydediliyor…
                </span>
              ) : (
                "Kaydet"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
