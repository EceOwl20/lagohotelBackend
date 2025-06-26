"use client";
import { useState } from "react";

const clubDefault = {
  image: "",
  ageGroup: { tr: "", en: "", de: "", ru: "" },
  title: { tr: "", en: "", de: "", ru: "" },
  description: { tr: "", en: "", de: "", ru: "" }
};

export default function KidsBambooEdit({ data, setData, langs }) {
  const value = data.kidsBamboo || {};

  // Club kartı ekle/sil
  const handleClubAdd = () => {
    setData({
      ...data,
      kidsBamboo: {
        ...value,
        clubData: [...(value.clubData || []), { ...clubDefault }]
      }
    });
  };

  const handleClubRemove = (i) => {
    setData({
      ...data,
      kidsBamboo: {
        ...value,
        clubData: (value.clubData || []).filter((_, idx) => idx !== i)
      }
    });
  };

  const handleChange = (path, val) => {
    const keys = path.split(".");
    setData(prev => {
      const updated = { ...prev };
      let ref = updated.kidsBamboo = { ...prev.kidsBamboo };
      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = ref[keys[i]] || {};
        ref = ref[keys[i]];
      }
      ref[keys.at(-1)] = val;
      return updated;
    });
  };

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <h3 className="font-bold text-xl mb-2">Kids Bamboo</h3>
      {["subtitle", "title", "text", "span", "note"].map((key) => (
        <div key={key} className="mb-2">
          <label className="block font-semibold mb-1">
            {key[0].toUpperCase() + key.slice(1)}
          </label>
          <div className="flex flex-col md:flex-row gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                placeholder={`${lang.toUpperCase()}`}
                className="border p-2 rounded w-full"
                value={value?.[key]?.[lang] || ""}
                onChange={e =>
                  handleChange(`${key}.${lang}`, e.target.value)
                }
              />
            ))}
          </div>
        </div>
      ))}

      {/* Club Cards */}
      <h4 className="font-semibold text-lg mt-6 mb-2">Kulüp Kartları</h4>
      {(value.clubData || []).map((club, idx) => (
        <div key={idx} className="border p-2 rounded mb-2">
          <label className="block font-semibold mb-1">Görsel</label>
          <input
            type="text"
            className="border p-2 rounded w-full mb-2"
            value={club.image}
            onChange={e => {
              const arr = [...(value.clubData || [])];
              arr[idx].image = e.target.value;
              handleChange("clubData", arr);
            }}
          />
          {["ageGroup", "title", "description"].map(key => (
            <div key={key} className="mb-1">
              <label className="block">{key}</label>
              <div className="flex gap-2">
                {langs.map(lang => (
                  <input
                    key={lang}
                    className="border p-2 rounded w-full"
                    placeholder={lang.toUpperCase()}
                    value={club[key]?.[lang] || ""}
                    onChange={e => {
                      const arr = [...(value.clubData || [])];
                      arr[idx][key][lang] = e.target.value;
                      handleChange("clubData", arr);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
          <button
            className="text-red-600 hover:underline text-sm mt-1"
            onClick={() => handleClubRemove(idx)}
          >
            Kaldır
          </button>
        </div>
      ))}
      <button
        type="button"
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleClubAdd}
      >
        + Kulüp Kartı Ekle
      </button>
    </section>
  );
}
