"use client";
import { useState } from "react";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function ActivitiesSectionEdit({ data, setData, langs }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const section = data.activitiesSection || {};

  const handleFieldChange = (key, lang, val) => {
    setData({
      ...data,
      activitiesSection: {
        ...section,
        [key]: { ...section[key], [lang]: val },
      },
    });
  };

  const handleInfoChange = (infoKey, field, lang, val) => {
    setData({
      ...data,
      activitiesSection: {
        ...section,
        [infoKey]: {
          ...section[infoKey],
          [field]: { ...section[infoKey]?.[field], [lang]: val },
        },
      },
    });
  };

  const handleImageChange = (field, value) => {
    setData({
      ...data,
      activitiesSection: {
        ...section,
        [field]: value,
      },
    });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-4">Aktiviteler Bölümü</h4>

      {/* ——— Çok Dilli Metinler ——— */}
      {["subtitle", "title", "text"].map((key) => (
        <div key={key} className="mb-4">
          <h5 className="font-semibold mb-2">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {langs.map((lang) => (
              <div key={lang} className="flex flex-col">
                <label className="text-sm mb-1">{lang.toUpperCase()}</label>
                {key === "text" ? (
                  <textarea
                    className="border p-2 rounded"
                    value={section.text?.[lang] || ""}
                    onChange={(e) =>
                      handleFieldChange("text", lang, e.target.value)
                    }
                  />
                ) : (
                  <input
                    type="text"
                    className="border p-2 rounded"
                    value={section[key]?.[lang] || ""}
                    onChange={(e) =>
                      handleFieldChange(key, lang, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ——— Görseller ——— */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {["image1", "image2"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-semibold mb-1">{field.toUpperCase()}</label>
            <ImageUploadInput
              value={section[field] || ""}
              onChange={(url) => handleImageChange(field, url)}
              label={field}
            />
          </div>
        ))}
      </div>

      {/* ——— Info1 & Info2 Bölümleri ——— */}
      {["info1", "info2"].map((infoKey) => (
        <div key={infoKey} className="mb-6">
          <h5 className="font-semibold mb-2">
            {infoKey === "info1" ? "Bilgi 1" : "Bilgi 2"}
          </h5>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {langs.map((lang) => (
              <div key={lang} className="flex flex-col">
                <label className="text-xs mb-1">{lang.toUpperCase()}</label>
                <input
                  type="text"
                  className="border p-2 rounded"
                  placeholder={`Başlık (${lang})`}
                  value={section[infoKey]?.title?.[lang] || ""}
                  onChange={(e) =>
                    handleInfoChange(infoKey, "title", lang, e.target.value)
                  }
                />
                <textarea
                  rows={2}
                  className="border p-2 rounded mt-2"
                  placeholder={`Metin (${lang})`}
                  value={section[infoKey]?.text?.[lang] || ""}
                  onChange={(e) =>
                    handleInfoChange(infoKey, "text", lang, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
