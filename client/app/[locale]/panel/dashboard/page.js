"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [latestUser, setLatestUser] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);

    const fetchStats = async () => {
        const token = localStorage.getItem("token");
        try {
          const res = await fetch("http://localhost:5001/api/users/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            const text = await res.text();
            console.error("🔴 HTML döndü:", text.slice(0, 100));
            throw new Error("Sunucudan geçersiz cevap geldi (JSON değil)");
          }
      
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "İstatistik hatası");
          setStats(data);
        } catch (err) {
          setError(err.message);
        }
      };

      const fetchLatestUser = async () => {
        const token = localStorage.getItem("token");
        try {
          const res = await fetch("http://localhost:5001/api/users/latest", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            const text = await res.text();
            console.error("🔴 HTML döndü:", text.slice(0, 100));
            throw new Error("Sunucudan geçersiz cevap geldi (JSON değil)");
          }
      
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Son kullanıcı hatası");
          setLatestUser(data);
        } catch (err) {
          setError(err.message);
        }
      };

    fetchStats();
    fetchLatestUser();
  }, []);

  if (error) return <p className="text-red-500 p-6">{error}</p>;

return (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">👋 Hoş geldin, {user?.name || "Kullanıcı"}!</h1>

    {!stats ? (
      <p className="text-gray-600">İstatistikler yükleniyor...</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="👥 Toplam Kullanıcı" value={stats.total} />
        <StatCard title="🧑‍💼 Admin Sayısı" value={stats.admins} />
        <StatCard title="👷‍♂️ Personel Sayısı" value={stats.personnel || 0} />
      </div>
    )}

    {latestUser ? (
      <div className="bg-white border rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-2">🆕 Son Eklenen Kullanıcı</h2>
        <p><strong>Ad:</strong> {latestUser.name}</p>
        <p><strong>Email:</strong> {latestUser.email}</p>
        <p><strong>Rol:</strong> {latestUser.role}</p>
      </div>
    ) : (
      <p className="text-gray-600">Son kullanıcı bilgisi yükleniyor...</p>
    )}
  </div>
);
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-lg shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-blue-700 mt-2">{value}</p>
    </div>
  );
}