"use client";
import { useState, useEffect } from "react";

const langs = ["tr", "en", "de", "ru"];
const iconOptions = [
  "PoolSvg2", "AreaSvg", "DresserSvg", "SmokingSvg", "FridgeSvg",
  "SafeboxSvg", "HairdryerSvg", "HandsoapSvg", "TeaCoffeeSvg",
  "LedTvSvg", "BalconySvg", "ShowerSvg"
];

function makeEmptyItem(icon = "") {
  return { text: {}, icon };
}

export default function RoomFeaturesPanelEdit() {
  const [saved, setSaved] = useState(false);
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const [data, setData] = useState({
    span: {}, header: {}, text: {},
    header2: {}, header3: {}, text2: {},
    iconsTexts: [{}, {}, {}],
    pool: false,
    items: Array.from({ length: 12 }, (_, i) => makeEmptyItem(iconOptions[i] || "")),
    reservation: {
      title: {}, text: {}, checkin: {}, checkout: {},
      adult: {}, kids: {}, booknow: {}, contact: {},
      phone: ""
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/api/roomFeatures`)
      .then(res => res.json())
      .then(resData => {
        // Eğer eksik item varsa tamamla
        let items = Array.isArray(resData.items) ? resData.items : [];
        if (items.length < 12) {
          // Eksik itemları varsayılan ile doldur
          items = [
            ...items,
            ...Array.from({ length: 12 - items.length }, (_, i) => makeEmptyItem(iconOptions[items.length + i] || ""))
          ];
        }
        setData(prev => ({
          ...prev,
          ...resData,
          items
        }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Multi-lang
  const handleMultiLangChange = (field, lang, value) => {
    setData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value }
    }));
  };
  const handleIconTextChange = (idx, lang, value) => {
    setData(prev => {
      const arr = [...(prev.iconsTexts || [{}, {}, {}])];
      arr[idx][lang] = value;
      return { ...prev, iconsTexts: arr };
    });
  };

  // Items özelliklerini güncelle
  const handleItemChange = (idx, key, langOrValue, value) => {
    setData(prev => {
      const items = [...(prev.items || [])];
      if (key === "text") {
        items[idx].text = { ...items[idx].text, [langOrValue]: value };
      } else if (key === "icon") {
        items[idx].icon = langOrValue;
      }
      return { ...prev, items };
    });
  };

  // Rezervasyon alanı
  const handleResChange = (field, langOrValue, value) => {
    setData(prev => {
      let reservation = { ...prev.reservation };
      if (typeof reservation[field] === "object") {
        reservation[field][langOrValue] = value;
      } else {
        reservation[field] = langOrValue;
      }
      return { ...prev, reservation };
    });
  };

  // Kaydet
 const handleSave = async () => {
    await fetch(`${apiUrl}/api/roomFeatures`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000); // 2sn sonra tekrar Kaydet'e döner
  };


  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Oda Özellikleri (RoomFeatures) Paneli</h2>

      {/* Genel Bilgi */}
      {["span", "header", "text", "header2", "header3", "text2"].map(field => (
        <div key={field} className="mb-3">
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

      {/* iconsTexts */}
      <div className="mb-3">
        <b>Özel 3 Bilgi (Havuz, Yatak, Bebek yatağı vb.)</b>
        {[0, 1, 2].map(idx => (
          <div key={idx} className="flex gap-2 my-1">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-1 rounded w-1/4"
                placeholder={`iconsTexts${idx+1} (${lang})`}
                value={data.iconsTexts?.[idx]?.[lang] || ""}
                onChange={e => handleIconTextChange(idx, lang, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="my-8 flex flex-col items-center gap-3">
        <hr className="w-full border-lagoBrown border-t-2 my-2"/>
        <span className="text-lagoBrown text-lg font-semibold">ODANIN TÜM ÖZELLİKLERİ (Items)</span>
        <hr className="w-full border-lagoBrown border-t-2 my-2"/>
      </div>
      {/* items */}
      {data.items?.slice(0, 12).map((item, idx) => (
        <div key={idx} className="mb-3 flex gap-2 items-center">
          <b className="w-10 text-gray-600">#{idx+1}</b>
          {langs.map(lang => (
            <input
              key={lang}
              className="border p-1 rounded w-1/5"
              placeholder={`Özellik metni (${lang})`}
              value={item.text?.[lang] || ""}
              onChange={e => handleItemChange(idx, "text", lang, e.target.value)}
            />
          ))}
          <select
            className="border p-1 rounded"
            value={item.icon || ""}
            onChange={e => handleItemChange(idx, "icon", e.target.value)}
          >
            <option value="">İkon Seç</option>
            {iconOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}

      {/* Pool checkbox */}
      <div className="mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.pool || false}
          onChange={e => setData(prev => ({ ...prev, pool: e.target.checked }))}
        />
        <b>Bu oda için HAVUZ bilgisi gösterilsin</b>
      </div>

      {/* Ayraç */}
      <div className="my-8 flex flex-col items-center gap-3">
        <hr className="w-full border-lagoBrown border-t-2 my-2"/>
        <span className="text-lagoBrown text-lg font-semibold">REZERVASYON ALANI</span>
        <hr className="w-full border-lagoBrown border-t-2 my-2"/>
      </div>
      {/* Rezervasyon widget alanı */}
      {["title", "text", "checkin", "checkout", "adult", "kids", "booknow", "contact"].map(field => (
        <div key={field} className="mb-3">
          <b>Rezervasyon: {field}</b>
          <div className="flex gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-1 rounded w-1/4"
                placeholder={`${field} (${lang})`}
                value={data.reservation?.[field]?.[lang] || ""}
                onChange={e => handleResChange(field, lang, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}
      {/* Telefon alanı */}
      <div className="mb-3">
        <b>Rezervasyon: phone</b>
        <input
          className="border p-1 rounded w-full"
          placeholder="Telefon numarası"
          value={data.reservation?.phone || ""}
          onChange={e => handleResChange("phone", e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        className={`mt-4 px-6 py-2 ${saved ? "bg-green-600" : "bg-black"} text-white rounded transition-colors`}
        disabled={saved}
      >
        {saved ? "Kaydedildi!" : "Kaydet"}
      </button>
    </div>
  );
}
