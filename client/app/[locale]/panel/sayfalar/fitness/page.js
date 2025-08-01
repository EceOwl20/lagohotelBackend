"use client";
import { useEffect, useState } from "react";
import MainBannerEdit from "../restoranlar/components/MainBanner"; 
import SpaInfoSectionEdit from "../spa/components/SpaInfoSectionEdit";
import SpaHeaderSectionEdit from "../spa/components/SpaHeaderSectionEdit";
import MassageCarouselEdit from "../spa/components/MassageCarouselEdit";
import SpaTypesInfoSectionEdit from "../spa/components/SpaTypesInfoSectionEdit";
import SpaReverseEdit from "../spa/components/SpaReverseEdit";

const langs = ["tr", "en", "de", "ru"];

export default function FitnessPanelPage() {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/pages/fitness`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${apiUrl}/api/pages/fitness`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (!data) return <p>Yükleniyor...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">
      <h2 className="font-bold text-3xl mb-4">Fitness & Wellness Paneli</h2>
      <MainBannerEdit data={data} setData={setData} langs={langs} blockName="mainBanner" />
      <SpaInfoSectionEdit data={data} setData={setData} langs={langs} blockName="infoSection" />
      <SpaHeaderSectionEdit data={data} setData={setData} langs={langs} blockName="spaGallery" />
      <MassageCarouselEdit data={data} setData={setData} langs={langs} blockName="massageCarousel" />
      <SpaTypesInfoSectionEdit data={data} setData={setData} langs={langs} blockName="fitnessTypesInfoSection" />
      <SpaReverseEdit data={data} setData={setData} langs={langs} blockName="fitnessReverse"/>
      <button
        className="mt-8 px-6 py-2 bg-lagoBlack text-white rounded text-lg"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
