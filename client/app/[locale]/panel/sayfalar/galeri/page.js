"use client";
import { useState, useEffect } from "react";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Çok dilli input bileşeni
function MultiLangInputs({ label, value = {}, onChange }) {
  return (
    <div className="mb-2">
      <b className="block mb-1">{label}</b>
      <div className="flex gap-2">
        {langs.map((lang) => (
          <input
            key={lang}
            className="border p-1 rounded w-1/4"
            placeholder={`${label} (${lang})`}
            value={value?.[lang] || ""}
            onChange={(e) => onChange(lang, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

// Upload helper
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${apiUrl}/api/upload`, {
    method: "POST",
    body: formData,
  });
  const { imageUrl } = await res.json();
  if (res.ok && imageUrl) return imageUrl;
  throw new Error("Upload failed");
}

export default function GalleryPanelPage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [uploading, setUploading] = useState({});

  // İlk yüklenme
  useEffect(() => {
    fetch(`${apiUrl}/api/pages/gallery`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData({}));

    // upload klasöründeki mevcut resimler
    fetch(`${apiUrl}/api/upload/list`)
      .then((r) => r.json())
      .then((files) => setExistingImages(files))
      .catch(console.error);
  }, []);

  const handleChange = (path, value) => {
    setData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addCategory = () => {
    setData((prev) => ({
      ...prev,
      categories: [...(prev.categories || []), { key: "", title: {}, images: [] }],
    }));
  };

  const addImage = (catIndex) => {
    setData((prev) => {
      const categories = [...(prev.categories || [])];
      categories[catIndex].images.push("");
      return { ...prev, categories };
    });
  };

  const handleImageUpload = async (file, path) => {
    if (!file) return;
    setUploading((u) => ({ ...u, [path]: true }));
    try {
      const url = await uploadImage(file);
      handleChange(path, url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading((u) => ({ ...u, [path]: false }));
    }
  };

  const handleSave = async () => {
    setStatus("Kaydediliyor...");
    try {
      const res = await fetch(`${apiUrl}/api/pages/gallery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "Kaydedildi!" : "Kaydetme hatası!");
    } catch {
      setStatus("Kaydetme hatası!");
    }
  };

  if (!data) return <p className="p-10">Yükleniyor...</p>;

  const ImageSelector = ({ path, value }) => (
    <div className="mb-2">
      <input
        className="border rounded p-2 w-full mb-2"
        placeholder="Image URL"
        value={value || ""}
        onChange={(e) => handleChange(path, e.target.value)}
      />
      <div className="flex gap-2 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files?.[0], path)}
        />
        <select
          className="border p-2 rounded"
          value={value || ""}
          onChange={(e) => handleChange(path, e.target.value)}
        >
          <option value="">— Mevcut resim seç —</option>
          {existingImages.map((file) => {
            const url = `/uploads/${file}`;
            return (
              <option key={file} value={url}>
                {file}
              </option>
            );
          })}
        </select>
      </div>
      {uploading[path] && <p className="text-blue-600">Yükleniyor...</p>}
      {value && (
        <img
          src={value.startsWith("/uploads") ? `${apiUrl}${value}` : value}
          className="mt-2 max-h-32 border rounded"
          alt="preview"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-8">
      <h2 className="font-bold text-3xl">Gallery Panel</h2>

      {/* Banner */}
      <div className="border p-4 rounded">
        <h3 className="font-bold text-xl mb-2">Banner</h3>
        {["subtitle", "title"].map((field) => (
          <div key={field}>
            {langs.map((lang) => (
              <input
                key={lang}
                className="border rounded p-2 w-full mb-2"
                placeholder={`${field} (${lang})`}
                value={data.banner?.[field]?.[lang] || ""}
                onChange={(e) =>
                  handleChange(`banner.${field}.${lang}`, e.target.value)
                }
              />
            ))}
          </div>
        ))}
        <ImageSelector path="banner.image" value={data.banner?.image} />
      </div>

      {/* Categories */}
      <div className="border p-4 rounded">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Categories</h3>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={addCategory}
          >
            + Category
          </button>
        </div>

        {(data.categories || []).map((cat, i) => (
          <div key={i} className="border p-4 mb-4 rounded">
            <input
              className="border rounded p-2 w-full mb-2"
              placeholder="Key (ör: general, rooms)"
              value={cat.key}
              onChange={(e) => handleChange(`categories.${i}.key`, e.target.value)}
            />
            {langs.map((lang) => (
              <input
                key={lang}
                className="border rounded p-2 w-full mb-2"
                placeholder={`Title (${lang})`}
                value={cat.title?.[lang] || ""}
                onChange={(e) =>
                  handleChange(`categories.${i}.title.${lang}`, e.target.value)
                }
              />
            ))}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Images</h4>
              {(cat.images || []).map((img, idx) => (
                <ImageSelector
                  key={idx}
                  path={`categories.${i}.images.${idx}`}
                  value={img}
                />
              ))}
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => addImage(i)}
              >
                + Image
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="bg-blue-600 text-white font-bold px-6 py-3 rounded"
        onClick={handleSave}
      >
        Kaydet
      </button>
      <p className="text-green-600">{status}</p>
    </div>
  );
}
