"use client";
import { useState, useEffect } from "react";
import MainBannerEdit from "../restoranlar/components/MainBanner";
import SpaInfoSectionEdit from "./components/SpaInfoSectionEdit";
import SpaHeaderSectionEdit from "./components/SpaHeaderSectionEdit";
import MassageCarouselEdit from "./components/MassageCarouselEdit";
import SpaTypesInfoSectionEdit from "./components/SpaTypesInfoSectionEdit";
import SpaReverseEdit from "./components/SpaReverseEdit";

const langs = ["tr", "en", "de", "ru"];

export default function SpaPanelPage() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
   const apiUrl  = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/pages/spa`)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData({ error: "Veri alınamadı" }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${apiUrl}/api/pages/spa`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (!data) return <p>Yükleniyor...</p>;
  if (data.error) return <p>Hata: {data.error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">
      <h2 className="font-bold text-3xl mb-4">SPA Paneli</h2>
      <MainBannerEdit data={data} setData={setData} langs={langs} blockName="mainBanner"/>
      <SpaInfoSectionEdit data={data} setData={setData} langs={langs} blockName="SpaInfoSection"/>
      <SpaHeaderSectionEdit data={data} setData={setData} langs={langs} blockName="spaHeaderSection"/>
      <MassageCarouselEdit data={data} setData={setData} langs={langs} blockName="massageCarousel"/>
      <SpaTypesInfoSectionEdit data={data} setData={setData} langs={langs} blockName="spaTypesInfoSection"/>
      <SpaReverseEdit data={data} setData={setData} langs={langs} blockName="spaReverse"/>
      <button
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded text-lg max-w-[200px]"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
