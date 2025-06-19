"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function KullaniciListesi() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const [editingUser, setEditingUser] = useState(null); // modal açmak için
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5001/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Kullanıcılar yüklenemedi");
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Listesi</h1>
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Ad Soyad</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rol</th>
            <th className="p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => {
                    setEditingUser(user);
                    setShowModal(true);
                    }}
                >
                    Düzenle
                </button>
                <button className="text-red-600 hover:underline">Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && editingUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Kullanıcıyı Düzenle</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const token = localStorage.getItem("token");

          try {
            const res = await fetch(`http://localhost:5001/api/users/${editingUser._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                name: editingUser.name,
                email: editingUser.email,
                role: editingUser.role,
              }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Güncelleme başarısız");

            // Sayfayı yenile veya state güncelle
            setUsers((prev) =>
              prev.map((u) => (u._id === editingUser._id ? data : u))
            );
            setShowModal(false);
          } catch (err) {
            alert(err.message);
          }
        }}
        className="space-y-4"
      >
        <input
          type="text"
          value={editingUser.name}
          onChange={(e) =>
            setEditingUser({ ...editingUser, name: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          value={editingUser.email}
          onChange={(e) =>
            setEditingUser({ ...editingUser, email: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <select
          value={editingUser.role}
          onChange={(e) =>
            setEditingUser({ ...editingUser, role: e.target.value })
          }
          className="w-full border p-2 rounded"
        >
          <option value="personel">Personel</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}