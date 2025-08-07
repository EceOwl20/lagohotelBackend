"use client";
import React, { useState } from "react";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function EntertainmentTypesEdit({ data, setData, langs }) {
  const ent = data.entertainmentTypes || {
    subtitle: {}, title: {}, text: {}, activities: []
  };
  const activities = Array.isArray(ent.activities) ? ent.activities : [];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const updateMainField = (field, lang, value) => {
    const updated = {
      ...ent,
      [field]: { ...ent[field], [lang]: value }
    };
    setData({ ...data, entertainmentTypes: updated });
  };

  const addActivity = () => {
    const empty = {
      image: "",
      title: {}, category: {}, description: {}, link: ""
    };
    langs.forEach(lang => {
      empty.title[lang] = "";
      empty.category[lang] = "";
      empty.description[lang] = "";
    });
    setData({
      ...data,
      entertainmentTypes: {
        ...ent,
        activities: [...activities, empty]
      }
    });
  };

  const removeActivity = idx => {
    setData({
      ...data,
      entertainmentTypes: {
        ...ent,
        activities: activities.filter((_, i) => i !== idx)
      }
    });
  };

  const updateActivityLang = (idx, field, lang, value) => {
    const updated = activities.map((act, i) =>
      i === idx
        ? { ...act, [field]: { ...(act[field] || {}), [lang]: value } }
        : act
    );
    setData({ ...data, entertainmentTypes: { ...ent, activities: updated } });
  };

  const updateActivityLink = (idx, value) => {
    const updated = activities.map((act, i) =>
      i === idx ? { ...act, link: value } : act
    );
    setData({ ...data, entertainmentTypes: { ...ent, activities: updated } });
  };

  const updateImage = (idx, value) => {
    const updated = activities.map((act, i) =>
      i === idx ? { ...act, image: value } : act
    );
    setData({ ...data, entertainmentTypes: { ...ent, activities: updated } });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-6 space-y-6">
      <h4 className="font-bold text-xl">Eğlence Tipleri Bölümü</h4>

      {["subtitle", "title", "text"].map(field => (
        <div key={field}>
          <h5 className="font-semibold mb-2">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {langs.map(lang => (
              field === "text" ? (
                <textarea
                  key={lang}
                  rows={2}
                  placeholder={`${field} (${lang.toUpperCase()})`}
                  value={ent[field]?.[lang] || ""}
                  onChange={e => updateMainField(field, lang, e.target.value)}
                  className="border p-2 rounded"
                />
              ) : (
                <input
                  key={lang}
                  type="text"
                  placeholder={`${field} (${lang.toUpperCase()})`}
                  value={ent[field]?.[lang] || ""}
                  onChange={e => updateMainField(field, lang, e.target.value)}
                  className="border p-2 rounded"
                />
              )
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={addActivity}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Aktivite Kartı Ekle
        </button>
      </div>

      {activities.map((act, idx) => (
        <div key={idx} className="border rounded p-4 bg-white space-y-4">
          <div className="flex justify-between items-center">
            <strong>Kart #{idx + 1}</strong>
            <button
              type="button"
              onClick={() => removeActivity(idx)}
              className="text-red-600 hover:underline"
            >
              Sil
            </button>
          </div>

          <div>
            <label className="block font-semibold mb-1">Resim Yükle</label>
            <ImageUploadInput
              value={act.image || ""}
              onChange={(val) => updateImage(idx, val)}
              apiPath="/api/upload"
              previewHeight={64}
            />
          </div>

          {["title", "category", "description"].map(field => (
            <div key={field}>
              <label className="block font-semibold mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {langs.map(lang => (
                  <input
                    key={lang}
                    type="text"
                    placeholder={`${field} (${lang.toUpperCase()})`}
                    value={act[field]?.[lang] || ""}
                    onChange={e => updateActivityLang(idx, field, lang, e.target.value)}
                    className="border p-2 rounded"
                  />
                ))}
              </div>
            </div>
          ))}

          <div>
            <label className="block font-semibold mb-1">Link</label>
            <input
              type="text"
              placeholder="https://..."
              value={act.link || ""}
              onChange={e => updateActivityLink(idx, e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
