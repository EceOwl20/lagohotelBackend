"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function KullaniciListesi() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null); // mevcut kullanıcının rolü için
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name"); // name | email | role
  const [sortDir, setSortDir] = useState("asc"); // asc | desc

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [editingUser, setEditingUser] = useState(null); // modal için
  const [showModal, setShowModal] = useState(false);

  const [confirmDeleteUser, setConfirmDeleteUser] = useState(null);

  // ---- fetch users ----
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setMe(JSON.parse(storedUser));

    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Kullanıcılar yüklenemedi");
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiUrl]);

  // ---- derived list (search + sort) ----
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? users.filter(
          (u) =>
            u.name?.toLowerCase().includes(term) ||
            u.email?.toLowerCase().includes(term) ||
            u.role?.toLowerCase().includes(term)
        )
      : users.slice();

    base.sort((a, b) => {
      const va = (a[sortKey] || "").toString().toLowerCase();
      const vb = (b[sortKey] || "").toString().toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return base;
  }, [users, search, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const rows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const roleBadge = (role) => {
    const base =
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";
    if (role === "admin")
      return <span className={`${base} bg-black text-white`}>Admin</span>;
    return <span className={`${base} bg-gray-200 text-gray-900`}>Personel</span>;
  };

  const avatar = (u) => {
    const src = u.profileImage
      ? (u.profileImage.startsWith("/") ? `${apiUrl}${u.profileImage}` : u.profileImage)
      : null;
    const initials =
      (u.name || "?")
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "?";
    return src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
    ) : (
      <div className="w-8 h-8 rounded-full bg-gray-900 text-white grid place-items-center text-xs">
        {initials}
      </div>
    );
  };

  const handleOpenEdit = (user) => {
    setEditingUser({ ...user });
    setShowModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/users/${editingUser._id}`, {
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
      setUsers((prev) => prev.map((u) => (u._id === editingUser._id ? data : u)));
      setShowModal(false);
      setNotice("Kullanıcı güncellendi.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteUser) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/users/${confirmDeleteUser._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Silme başarısız");
      setUsers((prev) => prev.filter((u) => u._id !== confirmDeleteUser._id));
      setConfirmDeleteUser(null);
      setNotice("Kullanıcı silindi.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      {/* Başlık + Aksiyonlar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Kullanıcılar</h1>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Ara: ad, email, rol…"
              className="pl-9 pr-3 py-2 rounded-lg border bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-black/30"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔎</span>
          </div>
          {me?.role === "admin" && (
            <Link
              href="/panel/kullanicilar/yeni"
              className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-3 py-2 hover:bg-black/90 active:scale-[0.99] transition"
            >
              ➕ Yeni Kullanıcı
            </Link>
          )}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-700">
          {error}
        </div>
      )}
      {notice && (
        <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-700">
          {notice}
        </div>
      )}

      {/* Kart + Tablo */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <Th label="Ad Soyad" k="name" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                <Th label="Email" k="email" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                <Th label="Rol" k="role" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                <th className="px-4 py-3 w-40">İşlem</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading skeleton */}
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`sk-${i}`} className="border-t">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-3 w-44 bg-gray-200 rounded animate-pulse" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
                    </td>
                  </tr>
                ))}

              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-gray-500">
                    Sonuç bulunamadı.
                  </td>
                </tr>
              )}

              {!loading &&
                rows.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {avatar(u)}
                        <span className="font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{u.email}</td>
                    <td className="px-4 py-3">{roleBadge(u.role)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-3 py-1.5 rounded-md border hover:border-black hover:bg-black hover:text-white transition"
                          onClick={() => handleOpenEdit(u)}
                        >
                          Düzenle
                        </button>
                        <button
                          className="px-3 py-1.5 rounded-md border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition"
                          onClick={() => setConfirmDeleteUser(u)}
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t bg-gray-50">
          <span className="text-sm text-gray-600">
            Toplam {filtered.length} kullanıcı • Sayfa {currentPage}/{pageCount}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-md border disabled:opacity-50 hover:bg-white transition"
            >
              ← Önceki
            </button>
            <button
              disabled={currentPage >= pageCount}
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              className="px-3 py-1.5 rounded-md border disabled:opacity-50 hover:bg-white transition"
            >
              Sonraki →
            </button>
          </div>
        </div>
      </div>

      {/* Düzenle Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border bg-white shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Kullanıcıyı Düzenle</h2>
              <button
                onClick={() => setShowModal(false)}
                className="px-2 py-1 rounded hover:bg-gray-100"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-5 space-y-4">
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
                placeholder="Ad Soyad"
                required
              />
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
                placeholder="Email"
                required
              />
              <select
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                <option value="personel">Personel</option>
                <option value="admin">Admin</option>
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90 disabled:opacity-60"
                >
                  {saving ? "Kaydediliyor…" : "Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Silme onayı */}
      {confirmDeleteUser && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl border bg-white shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h3 className="text-lg font-semibold">Kullanıcıyı Sil</h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-gray-700">
                <strong>{confirmDeleteUser.name}</strong> adlı kullanıcıyı silmek istediğinize emin misiniz?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmDeleteUser(null)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-60"
                >
                  {saving ? "Siliniyor…" : "Evet, Sil"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- küçük yardımcı başlık bileşeni (sıralama için) ---
function Th({ label, k, sortKey, sortDir, onSort }) {
  const active = sortKey === k;
  return (
    <th className="px-4 py-3 sticky top-0">
      <button
        type="button"
        onClick={() => onSort(k)}
        className={`inline-flex items-center gap-2 font-medium ${
          active ? "text-black" : "text-gray-600"
        }`}
        title="Sırala"
      >
        {label}
        <span className="text-xs">
          {active ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
        </span>
      </button>
    </th>
  );
}
