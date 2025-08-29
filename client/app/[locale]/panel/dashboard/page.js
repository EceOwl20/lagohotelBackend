"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [stats, setStats] = useState(null);
  const [latestUser, setLatestUser] = useState(null);
  const [user, setUser] = useState(null);

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [error, setError] = useState("");

  // initial fetch
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(currentUser);
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshAll = async () => {
    setError("");
    await Promise.all([fetchStats(), fetchLatestUser()]);
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/users/stats`, {
        headers: { Authorization: `Bearer ${token}` },
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
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchLatestUser = async () => {
    setLoadingLatest(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/users/latest`, {
        headers: { Authorization: `Bearer ${token}` },
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
    } finally {
      setLoadingLatest(false);
    }
  };

  const adminPct = useMemo(() => {
    if (!stats || !stats.total) return 0;
    return Math.round(((stats.admins || 0) / stats.total) * 100);
  }, [stats]);

  const personnelPct = useMemo(() => {
    if (!stats || !stats.total) return 0;
    return Math.round(((stats.personnel || 0) / stats.total) * 100);
  }, [stats]);

  return (
    <div className="p-6 space-y-6">
      {/* Başlık satırı */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">
          👋 Hoş geldin, {user?.name || "Kullanıcı"}!
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={refreshAll}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-white transition"
          >
            ↻ Yenile
          </button>
          <Link
            href="/panel/kullanicilar/yeni"
            className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-3 py-2 hover:bg-black/90 active:scale-[0.99] transition"
          >
            ➕ Yeni Kullanıcı
          </Link>
        </div>
      </div>

      {/* Hata bandı */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-700">
          {error}
        </div>
      )}

      {/* KPI kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loadingStats ? (
          <>
            <SkeletonStatCard />
            <SkeletonStatCard />
            <SkeletonStatCard />
          </>
        ) : (
          <>
            <StatCard
              title="👥 Toplam Kullanıcı"
              value={stats?.total ?? 0}
              hint="Sistemde kayıtlı toplam kullanıcı sayısı"
            />
            <StatCard
              title="🧑‍💼 Admin Sayısı"
              value={stats?.admins ?? 0}
              hint="Yönetici yetkisine sahip kullanıcılar"
              progress={{ current: stats?.admins ?? 0, total: stats?.total ?? 0, percent: adminPct }}
            />
            <StatCard
              title="👷‍♂️ Personel Sayısı"
              value={stats?.personnel ?? 0}
              hint="Personel rolündeki kullanıcılar"
              progress={{ current: stats?.personnel ?? 0, total: stats?.total ?? 0, percent: personnelPct }}
            />
          </>
        )}
      </div>

      {/* Alt grid: Son kullanıcı + Hızlı bağlantılar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Son kullanıcı */}
        <div className="lg:col-span-2">
          {loadingLatest ? (
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-12 bg-gray-100 rounded animate-pulse" />
            </div>
          ) : latestUser ? (
            <LatestUserCard user={latestUser} apiUrl={apiUrl} />
          ) : (
            <div className="bg-white rounded-2xl border shadow-sm p-6 text-gray-600">
              Son kullanıcı bilgisi yok.
            </div>
          )}
        </div>

        {/* Hızlı bağlantılar */}
        <QuickLinksCard />
      </div>
    </div>
  );
}

/* ----- Bileşenler ----- */

function StatCard({ title, value, hint, progress }) {
  const pct = progress?.percent ?? null;

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {pct !== null && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>%{pct}</span>
            <span>
              {progress.current}/{progress.total}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
            />
          </div>
        </div>
      )}
      {hint && <p className="text-xs text-gray-500 mt-3">{hint}</p>}
    </div>
  );
}

function LatestUserCard({ user, apiUrl }) {
  const src = user?.profileImage
    ? (user.profileImage.startsWith("/") ? `${apiUrl}${user.profileImage}` : user.profileImage)
    : null;

  const initials =
    (user?.name || "?")
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const created =
    user?.createdAt ? new Date(user.createdAt).toLocaleString() : "—";

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">🆕 Son Eklenen Kullanıcı</h2>

      <div className="flex items-center gap-4">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={user?.name} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-900 text-white grid place-items-center">
            {initials}
          </div>
        )}

        <div className="flex-1">
          <p className="font-medium text-gray-900">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>

        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
          ${user?.role === "admin" ? "bg-black text-white" : "bg-gray-200 text-gray-900"}`}>
          {user?.role === "admin" ? "Admin" : "Personel"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <InfoRow label="Kayıt tarihi" value={created} />
        <InfoRow label="Kullanıcı ID" value={user?._id || "—"} />
      </div>
    </div>
  );
}

function QuickLinksCard() {
  const linkCls =
    "flex items-center justify-between px-3 py-2 rounded-lg border hover:bg-white transition";

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">⚡ Hızlı Bağlantılar</h3>
      <div className="space-y-2">
        <Link href="/panel/kullanicilar" className={linkCls}>
          👥 Kullanıcı Yönetimi <span>→</span>
        </Link>
        <Link href="/panel/kullanicilar/yeni" className={linkCls}>
          ➕ Yeni Kullanıcı <span>→</span>
        </Link>
        <Link href="/panel/sayfalar" className={linkCls}>
          📄 Sayfalar <span>→</span>
        </Link>
        <Link href="/panel/sayfalar/anasayfa" className={linkCls}>
          🏠 Anasayfa İçeriği <span>→</span>
        </Link>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 truncate">{value}</p>
    </div>
  );
}

function SkeletonStatCard() {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5">
      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
      <div className="h-8 w-20 bg-gray-200 rounded mt-2 animate-pulse" />
      <div className="mt-3 h-2 bg-gray-200 rounded-full animate-pulse" />
      <div className="mt-2 h-3 w-32 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}
