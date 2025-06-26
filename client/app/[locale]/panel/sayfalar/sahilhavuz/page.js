"use client";
import { useEffect, useState } from "react";
import MainBannerEdit from "./components/MainBannerEdit";
import ClinaryInfoEdit from "../restoranlar/components/ClinaryInfoEdit";
import ImageBackgroundEdit from "./components/ImageBackgroundEdit";
import CarouselEdit from "./components/CarouselEdit";
import PoolSectionEdit from "./components/PoolSectionEdit";
import PoolListEdit from "./components/PoolListEdit";

const langs = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "İngilizce" },
  { key: "de", label: "Almanca" },
  { key: "ru", label: "Rusça" },
];


const langs2 = ["tr", "en", "de", "ru"];

export default function BeachPoolsPanelPage() {
  const [data, setData] = useState(null);
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      fetch("http://localhost:5001/api/pages/beachpools")
        .then(res => res.json())
        .then(json => setData(json))
        .catch(() => setData({}));
    }, []);
  
    const handleSave = async () => {
      setStatus("Yükleniyor...");
      try {
        const res = await fetch("http://localhost:5001/api/pages/beachpools", {
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
    <div className="max-w-4xl mx-auto py-6">
      <MainBannerEdit data={data} setData={setData} langs={langs} />
      <ClinaryInfoEdit data={data} setData={setData} langs={langs2} />
      <ImageBackgroundEdit data={data} setData={setData} langs={langs} />
      <CarouselEdit data={data} setData={setData} langs={langs} />
      <PoolSectionEdit data={data} setData={setData} langs={langs} />
      <PoolListEdit data={data} setData={setData} langs={langs} />
       <button
        className="mt-6 px-6 py-3 rounded bg-blue-600 text-white font-bold"
        onClick={handleSave}
      >
        Kaydet
      </button>
      <p className="mt-2 text-lg text-green-800">{status}</p>
    </div>
  );
}
