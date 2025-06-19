"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function KullaniciEkle() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("personel");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authorized, setAuthorized] = useState(null); // null = henüz kontrol edilmedi

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.role === "admin") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        setTimeout(() => {
          router.push("/panel/dashboard");
        }, 2500); // 2.5 saniye sonra yönlendir
      }
    } else {
      router.push("/panel/login");
    }
  }, [router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Kayıt başarısız");
      }

      setSuccess("✅ Kullanıcı başarıyla eklendi!");
      router.push("/panel/kullanicilar");
    } catch (err) {
      setError(err.message);
    }
  };

  // ⏳ Yükleniyor
  if (authorized === null) return <p className="p-6">Yükleniyor...</p>;

  // 🚫 Yetki yoksa uyarı göster
  if (authorized === false)
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold text-red-600">🚫 Bu sayfayı görüntülemek için yetkiniz yok.</h1>
        <p className="mt-2 text-gray-600">Dashboard'a yönlendiriliyorsunuz...</p>
      </div>
    );

  // ✅ Yetkili kullanıcıya formu göster
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Yeni Kullanıcı Ekle</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="personel">Personel</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kaydet
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}