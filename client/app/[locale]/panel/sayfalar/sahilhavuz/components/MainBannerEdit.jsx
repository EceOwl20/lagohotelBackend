// app/[locale]/panel/sayfalar/sahilhavuz/components/MainBannerEdit.jsx
"use client";
import { useState } from "react";

export default function MainBannerEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState({}); // {"desktop.girlImage": true}

  // ---- helpers ----
  const asSrc = (p) => (p ? (p.startsWith("/") ? `${apiUrl}${p}` : p) : "");
  const get = (obj, path, def = "") =>
    path.split(".").reduce((o, k) => (o && k in o ? o[k] : undefined), obj) ?? def;

  const setImageUrl = (device, field, value) =>
    setData((prev) => ({
      ...prev,
      mainBanner: {
        ...prev?.mainBanner,
        [device]: { ...(prev?.mainBanner?.[device] || {}), [field]: value },
      },
    }));

  const uploadImage = async (file, device, field) => {
    if (!file) return;
    const key = `${device}.${field}`;
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Yükleme başarısız");
      const url = json.imageUrl || json.path;
      if (url) setImageUrl(device, field, url);
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };

  const clearImage = (device, field) => setImageUrl(device, field, "");

  const setLangField = (device, field, value) =>
    setData((prev) => ({
      ...prev,
      mainBanner: {
        ...prev?.mainBanner,
        [device]: {
          ...(prev?.mainBanner?.[device] || {}),
          [field]: {
            ...(prev?.mainBanner?.[device]?.[field] || {}),
            [activeLang]: value,
          },
        },
      },
    }));

  // ---- small UI part: uploader row ----
  const UploadRow = ({ device, field, label, contain = false }) => {
    const key = `${device}.${field}`;
    const raw = get(data?.mainBanner, `${device}.${field}`, "");
    const src = asSrc(raw);
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{label}</label>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center px-3 py-2 rounded-md bg-black text-white text-sm cursor-pointer hover:bg-black/90">
            Dosya Seç
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={!!uploading[key]}
              onChange={(e) => uploadImage(e.target.files?.[0], device, field)}
            />
          </label>
          <button
            type="button"
            className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
            onClick={() => clearImage(device, field)}
          >
            Kaldır
          </button>
          {uploading[key] && <span className="text-sm text-blue-600">Yükleniyor…</span>}
        </div>

        <div className="grid grid-cols-[180px_1fr] gap-3 items-start">
          <div className="aspect-[16/10] w-[180px] overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
            {src ? (
              <img
                src={src}
                alt={label}
                className={`h-full w-full ${contain ? "object-contain p-1" : "object-cover"}`}
              />
            ) : (
              <div className="h-full w-full grid place-items-center text-gray-400 text-xs">
                Önizleme yok
              </div>
            )}
          </div>
          <input
            type="text"
            value={raw}
            onChange={(e) => setImageUrl(device, field, e.target.value)}
            placeholder="/uploads/... veya tam URL"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
    );
  };

  // ---- render ----
  return (
    <section className="space-y-6">
      {/* DESKTOP */}
      <div className="rounded-2xl border bg-white overflow-hidden">
        <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
          <h2 className="text-lg font-semibold">🏖️ Ana Banner — Desktop</h2>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
          {/* Left: image stack */}
          <div className="space-y-5">
            <UploadRow device="desktop" field="girlImage" label="Kız Görseli (Background)" />
            <UploadRow device="desktop" field="textImage" label="Yazı Görseli (Beach & Pools)" contain />
            <UploadRow device="desktop" field="waveImage" label="Dalga Görseli" contain />
          </div>

          {/* Right: text fields (activeLang) */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Alt Başlık ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={get(data?.mainBanner, `desktop.subtitle.${activeLang}`)}
                onChange={(e) => setLangField("desktop", "subtitle", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Başlık ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={get(data?.mainBanner, `desktop.title.${activeLang}`)}
                onChange={(e) => setLangField("desktop", "title", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Açıklama ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={get(data?.mainBanner, `desktop.text.${activeLang}`)}
                onChange={(e) => setLangField("desktop", "text", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Buton Metni ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={get(data?.mainBanner, `desktop.buttonText.${activeLang}`)}
                onChange={(e) => setLangField("desktop", "buttonText", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="rounded-2xl border bg-white overflow-hidden">
        <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
          <h2 className="text-lg font-semibold">📱 Ana Banner — Mobil</h2>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
          {/* Left */}
          <div className="space-y-5">
            <UploadRow device="mobile" field="bgImage" label="Mobil Arka Plan Görseli" />
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Alt Başlık ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={get(data?.mainBanner, `mobile.subtitle.${activeLang}`)}
                onChange={(e) => setLangField("mobile", "subtitle", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Başlık (MobileTitle) ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={get(data?.mainBanner, `mobile.mobileTitle.${activeLang}`)}
                onChange={(e) => setLangField("mobile", "mobileTitle", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Açıklama ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={get(data?.mainBanner, `mobile.text.${activeLang}`)}
                onChange={(e) => setLangField("mobile", "text", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
