"use client";
export default function Connect2Edit({ data, setData, langs }) {
  const value = data.connect2 || {};

  // Dosya yükle ve URL güncelle
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:5001/api/upload", {
      method: "POST",
      body: formData,
    });
    const { url } = await res.json();
    setData({ ...data, connect2: { ...value, image: url } });
  };

  const handleLang = (field, lang, val) => {
    setData({
      ...data,
      connect2: {
        ...value,
        [field]: { ...value[field], [lang]: val },
      },
    });
  };
  return (
    <div className="mb-8 p-4 rounded bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Bölüm 2 (İletişim Formu)</h3>
      <label>Form Arka Plan Görseli</label>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded"
        />
        {value.image && (
          <img src={value.image} alt="görsel" className="h-12 rounded border" />
        )}
      </div>
      {langs.map(lang => (
        <div key={lang}>
          <label>Form Başlığı ({lang})</label>
          <input type="text" value={value.formTitle?.[lang] || ""} onChange={e => handleLang("formTitle", lang, e.target.value)} className="w-full border p-2 mb-1 rounded"/>
          <label>Form Açıklama ({lang})</label>
          <input type="text" value={value.formText?.[lang] || ""} onChange={e => handleLang("formText", lang, e.target.value)} className="w-full border p-2 mb-1 rounded"/>
          <label>Gizlilik Politikası Metni ({lang})</label>
          <input type="text" value={value.policyText?.[lang] || ""} onChange={e => handleLang("policyText", lang, e.target.value)} className="w-full border p-2 mb-1 rounded"/>
        </div>
      ))}
    </div>
  );
}
