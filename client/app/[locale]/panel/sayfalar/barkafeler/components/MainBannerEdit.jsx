"use client";
import { useCallback, useMemo, useRef, useState } from "react";

export default function MainBannerEdit({
  data,
  setData,
  langs = ["tr", "en", "de", "ru"],
  activeLang, // üst bardan gelebilir
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState(false);
  const dropRef = useRef(null);

  const currentImg = data?.mainBanner?.image || "";
  const imgSrc = currentImg
    ? currentImg.startsWith("/") ? `${apiUrl}${currentImg}` : currentImg
    : "";

  const showLangs = useMemo(() => (activeLang ? [activeLang] : langs), [activeLang, langs]);

  const handleLangChange = useCallback((field, lang, value) => {
    setData(prev => ({
      ...prev,
      mainBanner: {
        ...prev.mainBanner,
        [field]: {
          ...(prev.mainBanner?.[field] || {}),
          [lang]: value,
        },
      },
    }));
  }, [setData]);

  const setImageValue = useCallback((val) => {
    setData(prev => ({
      ...prev,
      mainBanner: { ...prev.mainBanner, image: val },
    }));
  }, [setData]);

  const uploadFile = async (file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setImageValue(result.imageUrl);
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const onInputChange = (e) => uploadFile(e.target.files?.[0]);
  const onDrop = (e) => { e.preventDefault(); uploadFile(e.dataTransfer.files?.[0]); };
  const onDragOver = (e) => e.preventDefault();
  const removeImage = () => setImageValue("");

  return (
    <div className="rounded-2xl border bg-white p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sol: Görsel */}
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-gray-700 mb-2">Banner Görseli</p>
          <div
            ref={dropRef}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className={`group relative rounded-xl border-2 border-dashed p-4 transition ${
              uploading ? "opacity-70" : ""
            } ${imgSrc ? "border-gray-200" : "border-gray-300 hover:border-gray-400"}`}
          >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-50">
              {imgSrc ? (
                <div className="relative h-full w-full">
                  <img src={imgSrc} alt="Banner" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-end p-4">
                    <div className="max-w-full text-white">
                      {showLangs.map((lng) => (
                        <div key={lng} className="space-y-1">
                          <p className="text-xs uppercase tracking-wide opacity-90">
                            {data?.mainBanner?.subtitle?.[lng] || "Alt Başlık"}
                          </p>
                          <h3 className="text-lg font-semibold leading-tight line-clamp-2">
                            {data?.mainBanner?.title?.[lng] || "Başlık"}
                          </h3>
                          <p className="text-xs opacity-90 line-clamp-2">
                            {data?.mainBanner?.text?.[lng] || "Açıklama metni"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-center px-4">
                  <div className="text-gray-500">
                    <div className="text-sm font-medium">Görsel sürükleyip bırakın</div>
                    <div className="text-xs">veya aşağıdan dosya seçin</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label className="inline-flex cursor-pointer items-center rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">
                Dosya Seç
                <input type="file" accept="image/*" className="hidden" onChange={onInputChange} disabled={uploading} />
              </label>
              {imgSrc && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                >
                  Kaldır
                </button>
              )}
              {uploading && <span className="text-xs text-blue-600">Yükleniyor…</span>}
            </div>

            <input
              type="text"
              readOnly
              value={currentImg}
              className="mt-2 w-full rounded-md border bg-gray-100 p-2 text-sm"
              placeholder="/uploads/…"
            />
          </div>
        </div>

        {/* Sağ: Form (tam genişlik) */}
        <div className="lg:col-span-7">
          {/* Alt Başlık */}
          <div className="mb-5">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Alt Başlık</label>
              {activeLang && <span className="text-xs text-gray-500">Dil: {activeLang.toUpperCase()}</span>}
            </div>
            <div className={`grid gap-3 ${activeLang ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"}`}>
              {showLangs.map((lng) => (
                <LangInput
                  key={`subtitle-${lng}`}
                  placeholder={lng.toUpperCase()}
                  value={data?.mainBanner?.subtitle?.[lng] || ""}
                  onChange={(v) => handleLangChange("subtitle", lng, v)}
                />
              ))}
            </div>
          </div>

          {/* Başlık */}
          <div className="mb-5">
            <div className="mb-1.5">
              <label className="text-sm font-medium text-gray-700">Başlık</label>
            </div>
            <div className={`grid gap-3 ${activeLang ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"}`}>
              {showLangs.map((lng) => (
                <LangInput
                  key={`title-${lng}`}
                  placeholder={lng.toUpperCase()}
                  value={data?.mainBanner?.title?.[lng] || ""}
                  onChange={(v) => handleLangChange("title", lng, v)}
                  maxLength={120}
                  showCounter
                />
              ))}
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <div className="mb-1.5">
              <label className="text-sm font-medium text-gray-700">Açıklama</label>
            </div>
            <div className={`grid gap-3 ${activeLang ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
              {showLangs.map((lng) => (
                <LangTextarea
                  key={`text-${lng}`}
                  placeholder={lng.toUpperCase()}
                  value={data?.mainBanner?.text?.[lng] || ""}
                  onChange={(v) => handleLangChange("text", lng, v)}
                  maxLength={280}
                  rows={4}
                  showCounter
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- yardımcı bileşenler (full width) ---- */

function LangInput({ value, onChange, placeholder, maxLength = 0, showCounter = false }) {
  const len = value?.length || 0;
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength || undefined}
        className="w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
      />
      {showCounter && (
        <span className="pointer-events-none absolute -bottom-5 right-0 text-[10px] text-gray-400">
          {len}{maxLength ? `/${maxLength}` : ""}
        </span>
      )}
    </div>
  );
}

function LangTextarea({ value, onChange, placeholder, rows = 3, maxLength = 0, showCounter = false }) {
  const len = value?.length || 0;
  return (
    <div className="relative">
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength || undefined}
        className="min-h-[88px] w-full resize-y rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
      />
      {showCounter && (
        <span className="pointer-events-none absolute -bottom-5 right-0 text-[10px] text-gray-400">
          {len}{maxLength ? `/${maxLength}` : ""}
        </span>
      )}
    </div>
  );
}
