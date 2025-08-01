"use client";
import { useEffect, useState } from "react";

const langs = ["tr", "en", "de", "ru"];

export default function ContactSection2Edit() {
  const [data, setData] = useState({
    subtitle: {},
    title: {},
    address: {},
    phone: {},
    callcenter: {},
    email: {},
    buttonText: {},
    social: { instagram: "", facebook: "", youtube: "", meta: "" },
    image: "" 
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Tek görsel yükleme
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setData(prev => ({
        ...prev,
        image: result.imageUrl // Tek resim olarak set et!
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/contactSection2`)
      .then(res => res.json())
      .then(resData => {
        setData(prev => ({ ...prev, ...resData }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Diğer fonksiyonlar aynı
  const handleMultiLangChange = (field, lang, value) => {
    setData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value }
    }));
  };

  const handleSocialChange = (network, value) => {
    setData(prev => ({
      ...prev,
      social: { ...prev.social, [network]: value }
    }));
  };

  // Kaydet
  const handleSave = async () => {
    await fetch(`${apiUrl}/api/contactSection2`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Kaydedildi!");
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">İletişim Alanı Paneli</h2>
      {["subtitle", "title", "address", "phone", "callcenter", "email", "buttonText"].map(field => (
        <div key={field} className="mb-4">
          <b>{field}</b>
          <div className="flex gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-1 rounded w-1/4"
                placeholder={`${field} (${lang})`}
                value={data[field]?.[lang] || ""}
                onChange={e => handleMultiLangChange(field, lang, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="mb-4">
        <b>Sosyal Medya Linkleri</b>
        {["instagram", "facebook", "youtube", "meta"].map(net => (
          <input
            key={net}
            className="border p-1 rounded w-full mb-1"
            placeholder={net}
            value={data.social?.[net] || ""}
            onChange={e => handleSocialChange(net, e.target.value)}
          />
        ))}
      </div>

      <div className="mb-4">
        <b>İletişim Resmi</b>
        <div className="flex items-center gap-3">
          <input
            className="border p-1 rounded w-full"
            placeholder="Resim URL"
            value={data.image || ""}
            onChange={e => setData(prev => ({ ...prev, image: e.target.value }))}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </div>
        {data.image && (
          <img
            src={
              data.image.startsWith("/uploads")
                ? apiUrl + data.image
                : data.image
            }
            alt="İletişim görseli"
            className="w-32 h-auto rounded mt-2 border"
          />
        )}
      </div>

      <button onClick={handleSave} className="mt-4 px-6 py-2 bg-black text-white rounded">
        Kaydet
      </button>
    </div>
  );
}
