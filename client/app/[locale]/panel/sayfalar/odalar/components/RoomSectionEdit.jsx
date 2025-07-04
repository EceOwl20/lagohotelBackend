import React, { useState } from "react";
const langsRoom = ["tr", "en", "de", "ru"];
const sectionFields = ["title", "subtitle", "m", "view", "buttonText", "buttonLink"];

export default function RoomSectionEdit({ sectionKey, data, setData }) {
  const [uploading, setUploading] = useState({});

  // Alan yoksa otomatik boş obje olarak ata!
  const sectionData = {
    ...langsRoom.reduce(
      (acc, lang) => ({
        ...acc,
        ...sectionFields.reduce(
          (acc2, field) => ({
            ...acc2,
            [field]: { ...(data?.[sectionKey]?.[field] || {}), [lang]: data?.[sectionKey]?.[field]?.[lang] ?? "" }
          }),
          {}
        )
      }),
      {}
    ),
    img: data?.[sectionKey]?.img ?? "",
    img2: data?.[sectionKey]?.img2 ?? "",
  };

  const handleChange = (path, value) => {
    setData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = obj[keys[i]] ?? {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, [field]: true }));

    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");

      setData((prev) => ({
        ...prev,
        [sectionKey]: { ...(prev[sectionKey] || {}), [field]: result.imageUrl },
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }));
    }
  };

  return (
    <section className="border border-gray-300 rounded-md p-4 bg-slate-50">
      <h2 className="text-[22px] font-semibold mb-4">
        Bölüm {sectionKey.replace("roomSection", "")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionFields.map((field) =>
          langsRoom.map((lang) => (
            <label key={`${sectionKey}-${field}-${lang}`} className="block font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)} ({lang.toUpperCase()})
              <input
                type="text"
                className="mt-1 w-full border rounded p-2"
                value={data?.[sectionKey]?.[field]?.[lang] ?? ""}
                onChange={(e) => handleChange(`${sectionKey}.${field}.${lang}`, e.target.value)}
                autoComplete="off"
              />
            </label>
          ))
        )}

        {/* img yükle */}
        <label className="block font-semibold">
          Görsel (img)
          <input
            type="file"
            accept="image/*"
            className="mt-1 w-full"
            onChange={e => handleImageUpload(e, "img")}
            disabled={uploading.img}
          />
          {uploading.img && <p className="text-sm text-gray-500">Yükleniyor...</p>}
          {data?.[sectionKey]?.img && (
            <img
              src={`http://localhost:5001${data[sectionKey].img}`}
              alt="img"
              className="mt-2 h-32 object-cover border rounded"
            />
          )}
        </label>
        {/* img2 yükle */}
        <label className="block font-semibold">
          Görsel (img2)
          <input
            type="file"
            accept="image/*"
            className="mt-1 w-full"
            onChange={e => handleImageUpload(e, "img2")}
            disabled={uploading.img2}
          />
          {uploading.img2 && <p className="text-sm text-gray-500">Yükleniyor...</p>}
          {data?.[sectionKey]?.img2 && (
            <img
              src={`http://localhost:5001${data[sectionKey].img2}`}
              alt="img2"
              className="mt-2 h-32 object-cover border rounded"
            />
          )}
        </label>
      </div>
    </section>
  );
}
