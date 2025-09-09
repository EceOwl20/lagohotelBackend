// app/[locale]/panel/sayfalar/restaurants/components/SubrestaurantEdit.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import ImageUploadInput from "../../../../components/ImageUploadInput";
import MultiImageUploadInput from "../../../../components/MultiImageUploadInput";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SubrestaurantEdit({
  data,
  setData,
  langs = ["tr", "en", "de", "ru"],
  activeLang = "tr",
}) {
  const banner = data?.mainBanner || {};
  const info = data?.infoSection || {};
  const bg = data?.background || {};
  const carousel = Array.isArray(data?.carousel) ? data.carousel : [];
  const opts = data?.otheroptions || {};

  /* ---------------- helpers ---------------- */
  const update = (patch) => setData((prev) => ({ ...(prev || {}), ...patch }));

  const updateSection = (section, updater) =>
    setData((prev) => {
      const cur = prev?.[section] || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), [section]: { ...cur, ...next } };
    });

  const setLang = (section, field, value) =>
    updateSection(section, (cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  const setImage = (section, field, url) =>
    updateSection(section, { [field]: url || "" });

  const toSrc = (p) => (!p ? null : p.startsWith("http") ? p : `${apiUrl}${p}`);

  /* --- Other Options (list) --- */
  const ensureOptsList = useMemo(
    () => (Array.isArray(opts?.restaurants) ? opts.restaurants : []),
    [opts?.restaurants]
  );

  const setOptionLang = (idx, field, value) =>
    updateSection("otheroptions", (cur) => {
      const list = [...(cur?.restaurants || [])];
      const item = list[idx] || {};
      list[idx] = {
        ...item,
        [field]: { ...(item?.[field] || {}), [activeLang]: value },
      };
      return { ...(cur || {}), restaurants: list };
    });

  const setOptionField = (idx, field, value) =>
    updateSection("otheroptions", (cur) => {
      const list = [...(cur?.restaurants || [])];
      const item = list[idx] || {};
      list[idx] = { ...item, [field]: value };
      return { ...(cur || {}), restaurants: list };
    });

  const addOption = () =>
    updateSection("otheroptions", (cur) => ({
      restaurants: [
        ...(cur?.restaurants || []),
        { title: {}, description: {}, text: {}, buttonText: {}, link: "", image: "" },
      ],
    }));

  const removeOption = (idx) =>
    updateSection("otheroptions", (cur) => ({
      restaurants: (cur?.restaurants || []).filter((_, i) => i !== idx),
    }));

  /* --- Existing images (gallery) --- */
  const [existingImages, setExistingImages] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(null); // {section, field, idx?} | null

  useEffect(() => {
    if (!showGallery) return;
    (async () => {
      try {
        setModalLoading(true);
        const r = await fetch(`${apiUrl}/api/upload/list`);
        const files = await r.json();
        setExistingImages(Array.isArray(files) ? files : []);
      } catch (e) {
        console.error(e);
      } finally {
        setModalLoading(false);
      }
    })();
  }, [showGallery]);

  const pickExisting = (path) => {
    const url = path.startsWith("/uploads/") ? path : `/uploads/${path}`;
    if (showGallery?.section === "otheroptions") {
      setOptionField(showGallery.idx, "image", url);
    } else {
      setImage(showGallery.section, showGallery.field, url);
    }
    setShowGallery(null);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="flex flex-col gap-8">
      {/* ===== Ana Banner ===== */}
      <section className="rounded-2xl border bg-white overflow-hidden">
        <Header title={`Ana Banner (${activeLang.toUpperCase()})`} />
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldText
            label="Alt Başlık"
            value={banner?.subtitle?.[activeLang] || ""}
            onChange={(v) => setLang("mainBanner", "subtitle", v)}
          />
          <FieldText
            label="Başlık"
            value={banner?.title?.[activeLang] || ""}
            onChange={(v) => setLang("mainBanner", "title", v)}
          />
          <FieldArea
            label="Metin"
            rows={3}
            value={banner?.text?.[activeLang] || ""}
            onChange={(v) => setLang("mainBanner", "text", v)}
          />
          <FieldText
            label="Buton Metni"
            value={banner?.buttonText?.[activeLang] || ""}
            onChange={(v) => setLang("mainBanner", "buttonText", v)}
          />
        </div>

        <div className="px-4 pb-4">
          <label className="block text-sm font-medium mb-1">Banner Görseli</label>
          <div className="flex items-center gap-3">
            <ImageUploadInput
              value={banner?.image || ""}
              onChange={(url) => setImage("mainBanner", "image", url)}
              label="Yükle"
            />
            {toSrc(banner?.image) && (
              <img
                src={toSrc(banner.image)}
                alt="Banner"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
            <button
              className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
              type="button"
              onClick={() => setShowGallery({ section: "mainBanner", field: "image" })}
            >
              Galeriden Seç
            </button>
          </div>
        </div>
      </section>

      {/* ===== Info Section ===== */}
      <section className="rounded-2xl border bg-white overflow-hidden">
        <Header title={`Info Section (${activeLang.toUpperCase()})`} />
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldText
            label="Alt Başlık"
            value={info?.subtitle?.[activeLang] || ""}
            onChange={(v) => setLang("infoSection", "subtitle", v)}
          />
          <FieldText
            label="Başlık"
            value={info?.title?.[activeLang] || ""}
            onChange={(v) => setLang("infoSection", "title", v)}
          />
          <FieldArea
            label="Metin 1"
            rows={3}
            value={info?.text1?.[activeLang] || ""}
            onChange={(v) => setLang("infoSection", "text1", v)}
          />
          <FieldArea
            label="Metin 2"
            rows={3}
            value={info?.text2?.[activeLang] || ""}
            onChange={(v) => setLang("infoSection", "text2", v)}
          />
        </div>

        <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Resim 1</label>
            <div className="flex items-center gap-3">
              <ImageUploadInput
                value={info?.image1 || ""}
                onChange={(url) => setImage("infoSection", "image1", url)}
                label="Yükle"
              />
              {toSrc(info?.image1) && (
                <img
                  src={toSrc(info.image1)}
                  alt="Info1"
                  className="w-24 h-16 object-cover rounded border"
                />
              )}
              <button
                className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
                type="button"
                onClick={() => setShowGallery({ section: "infoSection", field: "image1" })}
              >
                Galeriden Seç
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resim 2</label>
            <div className="flex items-center gap-3">
              <ImageUploadInput
                value={info?.image2 || ""}
                onChange={(url) => setImage("infoSection", "image2", url)}
                label="Yükle"
              />
              {toSrc(info?.image2) && (
                <img
                  src={toSrc(info.image2)}
                  alt="Info2"
                  className="w-24 h-16 object-cover rounded border"
                />
              )}
              <button
                className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
                type="button"
                onClick={() => setShowGallery({ section: "infoSection", field: "image2" })}
              >
                Galeriden Seç
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Carousel ===== */}
      <section className="rounded-2xl border bg-white overflow-hidden">
        <Header title="Carousel" />
        <div className="p-4">
          <MultiImageUploadInput
            value={carousel}
            onChange={(arr) =>
              update({ carousel: (arr || []).filter((v) => v && String(v).trim()) })
            }
            label="Carousel Görselleri"
          />
        </div>
      </section>

      {/* ===== Other Options ===== */}
      <section className="rounded-2xl border bg-white overflow-hidden">
        <Header title={`Other Options (${activeLang.toUpperCase()})`} />
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FieldText
            label="Başlık"
            value={opts?.title?.[activeLang] || ""}
            onChange={(v) => setLang("otheroptions", "title", v)}
          />
          <FieldText
            label="Alt Başlık"
            value={opts?.subtitle?.[activeLang] || ""}
            onChange={(v) => setLang("otheroptions", "subtitle", v)}
          />
          <FieldArea
            label="Açıklama"
            rows={3}
            value={opts?.text?.[activeLang] || ""}
            onChange={(v) => setLang("otheroptions", "text", v)}
          />
        </div>

        <div className="px-4 pb-4 space-y-4">
          {ensureOptsList.map((item, idx) => (
            <div key={idx} className="rounded-xl ring-1 ring-black/10 p-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <strong>Restaurant #{idx + 1}</strong>
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Sil
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldText
                  label="Başlık"
                  value={item?.title?.[activeLang] || ""}
                  onChange={(v) => setOptionLang(idx, "title", v)}
                />
                <FieldText
                  label="Buton Metni"
                  value={item?.buttonText?.[activeLang] || ""}
                  onChange={(v) => setOptionLang(idx, "buttonText", v)}
                />
                <FieldArea
                  label="Açıklama"
                  rows={3}
                  value={item?.description?.[activeLang] || ""}
                  onChange={(v) => setOptionLang(idx, "description", v)}
                />
                <FieldArea
                  label="Ekstra Metin"
                  rows={3}
                  value={item?.text?.[activeLang] || ""}
                  onChange={(v) => setOptionLang(idx, "text", v)}
                />
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
                <div>
                  <label className="block text-sm font-medium mb-1">Link</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="/restaurants/..."
                    value={item?.link || ""}
                    onChange={(e) => setOptionField(idx, "link", e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <ImageUploadInput
                    value={item?.image || ""}
                    onChange={(url) => setOptionField(idx, "image", url)}
                    label="Görsel Yükle"
                  />
                  {toSrc(item?.image) && (
                    <img
                      src={toSrc(item.image)}
                      alt={`Option-${idx}`}
                      className="w-20 h-14 object-cover rounded border"
                    />
                  )}
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
                    onClick={() => setShowGallery({ section: "otheroptions", idx, field: "image" })}
                  >
                    Galeriden Seç
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            + Yeni Restaurant Ekle
          </button>
        </div>
      </section>

      {/* ===== Background ===== */}
      <section className="rounded-2xl border bg-white overflow-hidden">
        <Header title={`Background (${activeLang.toUpperCase()})`} />
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FieldText
            label="Alt Başlık"
            value={bg?.subtitle?.[activeLang] || ""}
            onChange={(v) => setLang("background", "subtitle", v)}
          />
          <FieldText
            label="Başlık"
            value={bg?.title?.[activeLang] || ""}
            onChange={(v) => setLang("background", "title", v)}
          />
          <FieldArea
            label="Metin"
            rows={3}
            value={bg?.text?.[activeLang] || ""}
            onChange={(v) => setLang("background", "text", v)}
          />
          <FieldText
            label="Buton Metni"
            value={bg?.buttonText?.[activeLang] || ""}
            onChange={(v) => setLang("background", "buttonText", v)}
          />
          <FieldText
            label="Link"
            value={bg?.link || ""}
            onChange={(v) => updateSection("background", { link: v })}
          />
        </div>

        <div className="px-4 pb-4">
          <label className="block text-sm font-medium mb-1">Arka Plan Görseli</label>
          <div className="flex items-center gap-3">
            <ImageUploadInput
              value={bg?.image || ""}
              onChange={(url) => setImage("background", "image", url)}
              label="Yükle"
            />
            {toSrc(bg?.image) && (
              <img
                src={toSrc(bg.image)}
                alt="Background"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
            <button
              className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
              type="button"
              onClick={() => setShowGallery({ section: "background", field: "image" })}
            >
              Galeriden Seç
            </button>
          </div>
        </div>
      </section>

      {/* ===== Gallery Modal ===== */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h3 className="text-base font-semibold">Mevcut Görseller</h3>
              <button
                onClick={() => setShowGallery(null)}
                className="text-2xl leading-none px-1 text-gray-700 hover:text-black"
                aria-label="Kapat"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              {modalLoading ? (
                <div className="h-32 grid place-items-center text-gray-500">
                  Yükleniyor…
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {existingImages.map((file) => (
                    <button
                      key={file}
                      type="button"
                      onClick={() => pickExisting(file)}
                      className="group relative rounded-lg overflow-hidden ring-1 ring-black/10 hover:ring-blue-500"
                      title="Seç"
                    >
                      <img
                        src={`${apiUrl}/uploads/${file}`}
                        alt={file}
                        className="w-full h-28 object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 m-1 px-2 py-0.5 rounded bg-white/90 text-xs opacity-0 group-hover:opacity-100 transition">
                        Ekle
                      </span>
                    </button>
                  ))}
                  {existingImages.length === 0 && (
                    <div className="col-span-full text-sm text-gray-500">
                      Gösterilecek görsel yok.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ Small UI Parts ============ */
function Header({ title }) {
  return (
    <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}

function FieldText({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function FieldArea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        rows={rows}
        className="w-full rounded-md border border-gray-300 px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}