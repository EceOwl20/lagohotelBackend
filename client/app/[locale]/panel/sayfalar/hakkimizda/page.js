"use client";
import { useEffect, useState } from "react";
import MainBanner2Edit from "./components/MainBanner2Edit";
import SpaTypesInfoSectionEdit from "../spa/components/SpaTypesInfoSectionEdit";
import KidsMomentCarouselEdit from "../kidsclub/components/KidsMomentCarouselEdit";
import MissionVisionSectionEdit from "./components/MissionVisionSectionEdit";
import EmblaCarouselEdit from "./components/EmblaCarouselEdit";

const langs = ["tr", "en", "de", "ru"];

export default function AboutPanelPage() {
 const [data, setData] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/pages/about")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(() => setData({}));
  }, []);

  const handleSave = async () => {
    setStatus("Yükleniyor...");
    try {
      const res = await fetch("http://localhost:5001/api/pages/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("token") },
        body: JSON.stringify(data)
      });
      if (res.ok) setStatus("Kaydedildi!");
      else setStatus("Kaydetme hatası!");
    } catch {
      setStatus("Kaydetme hatası!");
    }
  };

  if (!data) return <p>Yükleniyor...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">
      <h2 className="font-bold text-3xl mb-4">Hakkımızda Paneli</h2>
      <MainBanner2Edit data={data} setData={setData} langs={langs} />
      <SpaTypesInfoSectionEdit data={data} setData={setData} langs={langs} blockName="infoSection" />
      <KidsMomentCarouselEdit data={data} setData={setData} langs={langs} />
      <MissionVisionSectionEdit data={data} setData={setData} langs={langs} />
      <EmblaCarouselEdit data={data} setData={setData} langs={langs} />
       <button
        className="mt-6 px-6 py-3 rounded bg-blue-600 text-white font-bold"
        onClick={handleSave}>
        Kaydet
      </button>
      <p className="mt-2 text-lg text-green-800">{status}</p>
    </div>
  );
}
