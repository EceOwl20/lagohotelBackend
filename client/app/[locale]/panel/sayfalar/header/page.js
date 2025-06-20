"use client";
import { useEffect, useState } from "react";
const langs = ["tr", "en", "de", "ru"];

const defaultHeader = {
  logo: "",
  phone: "",
  bookNowLink: { tr: "", en: "", de: "", ru: "" },
  bookNowText: { tr: "", en: "", de: "", ru: "" },
  contactLink: { tr: "", en: "", de: "", ru: "" },
  contactText: { tr: "", en: "", de: "", ru: "" },
  letUsCallYouLink: { tr: "", en: "", de: "", ru: "" },
  letUsCallYouText: { tr: "", en: "", de: "", ru: "" },
  menuItems: [],
  social: {
    tripadvisor: "",
    google: "",
    facebook: "",
    youtube: "",
    instagram: "",
  },
};

export default function SectionHeader() {
  const [header, setHeader] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/header");
        if (!res.ok) throw new Error("Header getirilemedi");
        const json = await res.json();
        setHeader(json || defaultHeader);
      } catch (err) {
        setHeader(defaultHeader); // Hiç veri yoksa dahi form boş gitmesin!
        setError("Header verisi alınamadı.");
      }
    };
    fetchHeader();
  }, []);

  const handleImageUpload = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setHeader((prev) => ({ ...prev, [key]: result.imageUrl }));
    } catch (err) {
      setError("Yükleme hatası: " + err.message);
    }
  };

  const addMenuItem = () => {
    setHeader((prev) => ({
      ...prev,
      menuItems: [
        ...(prev.menuItems || []),
        { text: { tr: "", en: "", de: "", ru: "" }, link: { tr: "", en: "", de: "", ru: "" } },
      ],
    }));
  };
  const removeMenuItem = (idx) => {
    const updated = [...(header.menuItems || [])];
    updated.splice(idx, 1);
    setHeader((prev) => ({ ...prev, menuItems: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5001/api/header", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(header),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Güncelleme başarısız");
      setSuccess("✅ Header başarıyla güncellendi!");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  if (!header) return <p className="p-6">Yükleniyor...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Header Düzenle</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo */}
        <label>Logo Yükle</label>
        <input type="file" accept="image/*" onChange={e => handleImageUpload(e, "logo")} className="mb-2" />
        {header.logo && (
          <img src={`http://localhost:5001${header.logo}`} alt="Logo" className="w-28 h-20 object-contain mb-2" />
        )}
        <label>Telefon</label>
        <input
          type="text"
          value={header.phone || ""}
          onChange={e => setHeader(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full border p-2 rounded mb-2"
        />
        {langs.map(lang => (
          <div key={lang} className="border-b mb-2 pb-2">
            <label>Book Now Buton Linki ({lang.toUpperCase()})</label>
            <input
              type="text"
              value={header.bookNowLink?.[lang] || ""}
              onChange={e =>
                setHeader(prev => ({
                  ...prev,
                  bookNowLink: { ...prev.bookNowLink, [lang]: e.target.value },
                }))
              }
              className="w-full border p-2 rounded mb-1"
            />
            <label>Book Now Buton Text ({lang.toUpperCase()})</label>
            <input
              type="text"
              value={header.bookNowText?.[lang] || ""}
              onChange={e =>
                setHeader(prev => ({
                  ...prev,
                  bookNowText: { ...prev.bookNowText, [lang]: e.target.value },
                }))
              }
              className="w-full border p-2 rounded mb-1"
            />

            <label>Contact Link ({lang.toUpperCase()})</label>
            <input
              type="text"
              value={header.contactLink?.[lang] || ""}
              onChange={e =>
                setHeader(prev => ({
                  ...prev,
                  contactLink: { ...prev.contactLink, [lang]: e.target.value },
                }))
              }
              className="w-full border p-2 rounded mb-1"
            />
            <label>Contact Text ({lang.toUpperCase()})</label>
            <input
              type="text"
              value={header.contactText?.[lang] || ""}
              onChange={e =>
                setHeader(prev => ({
                  ...prev,
                  contactText: { ...prev.contactText, [lang]: e.target.value },
                }))
              }
              className="w-full border p-2 rounded mb-1"
            />

            <label>Let Us Call You Link ({lang.toUpperCase()})</label>
            <input
              type="text"
              value={header.letUsCallYouLink?.[lang] || ""}
              onChange={e =>
                setHeader(prev => ({
                  ...prev,
                  letUsCallYouLink: { ...prev.letUsCallYouLink, [lang]: e.target.value },
                }))
              }
              className="w-full border p-2 rounded mb-1"
            />
            <label>Let Us Call You Text ({lang.toUpperCase()})</label>
            <input
              type="text"
              value={header.letUsCallYouText?.[lang] || ""}
              onChange={e =>
                setHeader(prev => ({
                  ...prev,
                  letUsCallYouText: { ...prev.letUsCallYouText, [lang]: e.target.value },
                }))
              }
              className="w-full border p-2 rounded mb-1"
            />
          </div>
        ))}

        {/* Dinamik Menü */}
        <div className="my-3">
          <label className="font-bold">Menü Linkleri</label>
          {(header.menuItems || []).map((item, idx) => (
            <div key={idx} className="border rounded p-2 mb-2">
              <div className="flex justify-between">
                <span className="font-semibold">Menu #{idx + 1}</span>
                <button
                  onClick={() => removeMenuItem(idx)}
                  className="text-red-600 hover:underline"
                  type="button"
                >Sil</button>
              </div>
              {langs.map(lang => (
                <div key={lang} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Metin (${lang.toUpperCase()})`}
                    value={item.text?.[lang] || ""}
                    onChange={e => {
                      const updated = [...header.menuItems];
                      updated[idx].text = { ...updated[idx].text, [lang]: e.target.value };
                      setHeader(prev => ({ ...prev, menuItems: updated }));
                    }}
                    className="border p-2 rounded mb-1 w-[49%]"
                  />
                  <input
                    type="text"
                    placeholder={`Link (${lang.toUpperCase()})`}
                    value={item.link?.[lang] || ""}
                    onChange={e => {
                      const updated = [...header.menuItems];
                      updated[idx].link = { ...updated[idx].link, [lang]: e.target.value };
                      setHeader(prev => ({ ...prev, menuItems: updated }));
                    }}
                    className="border p-2 rounded mb-1 w-[49%]"
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={addMenuItem}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            type="button"
          >+ Menü Ekle</button>
        </div>

        {/* Sosyal Medya */}
        <label>TripAdvisor Linki</label>
        <input
          type="text"
          value={header.social?.tripadvisor || ""}
          onChange={e => setHeader(prev => ({
            ...prev,
            social: { ...prev.social, tripadvisor: e.target.value }
          }))}
          className="w-full border p-2 rounded mb-1"
        />
        <label>Google Linki</label>
        <input
          type="text"
          value={header.social?.google || ""}
          onChange={e => setHeader(prev => ({
            ...prev,
            social: { ...prev.social, google: e.target.value }
          }))}
          className="w-full border p-2 rounded mb-1"
        />
        <label>Facebook Linki</label>
        <input
          type="text"
          value={header.social?.facebook || ""}
          onChange={e => setHeader(prev => ({
            ...prev,
            social: { ...prev.social, facebook: e.target.value }
          }))}
          className="w-full border p-2 rounded mb-1"
        />
        <label>YouTube Linki</label>
        <input
          type="text"
          value={header.social?.youtube || ""}
          onChange={e => setHeader(prev => ({
            ...prev,
            social: { ...prev.social, youtube: e.target.value }
          }))}
          className="w-full border p-2 rounded mb-1"
        />
        <label>Instagram Linki</label>
        <input
          type="text"
          value={header.social?.instagram || ""}
          onChange={e => setHeader(prev => ({
            ...prev,
            social: { ...prev.social, instagram: e.target.value }
          }))}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-6"
        >
          Kaydet
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}