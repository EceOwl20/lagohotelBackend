"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setName(parsed.name);
      setEmail(parsed.email);
      setProfileImage(parsed.profileImage || "");
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("profileImage", file);
  
    setUploading(true);
    const token = localStorage.getItem("token");
  
    try {
      const res = await fetch(`http://localhost:5001/api/users/upload/${user._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız");
  
      // LocalStorage'ı güncelle
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setProfileImage(data.profileImage);
      setSuccess("Profil fotoğrafı güncellendi!");
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5001/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Güncelleme başarısız");

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setSuccess("Profil başarıyla güncellendi!");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  if (!user) return <p className="p-6">Yükleniyor...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">👤 Profil Bilgileri</h1>
      <div>
  <label className="block text-sm font-medium mb-1">Profil Fotoğrafı</label>
  
  {profileImage ? (
    <img
      src={`http://localhost:5001${profileImage}`}
      alt="Profil"
      className="w-24 h-24 rounded-full object-cover mb-2"
    />
  ) : (
    <p className="text-gray-400 italic mb-2">Henüz yüklenmedi</p>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="block"
  />

  {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
</div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Ad Soyad</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
  <label className="block text-sm font-medium">Yeni Şifre</label>
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border p-2 rounded"
    placeholder="Değiştirmek istemiyorsan boş bırak"
  />
</div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Güncelle
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}