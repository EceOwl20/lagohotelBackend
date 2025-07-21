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
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BeachPoolsPanelPage() {
  const [data, setData] = useState(null);
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      fetch(`${apiUrl}/api/pages/beachpools`)
        .then(res => res.json())
        .then(json => setData(json))
        .catch(() => setData({}));
    }, []);
  
    const handleSave = async () => {
      setStatus("Yükleniyor...");
      try {
        const res = await fetch(`${apiUrl}/api/pages/beachpools`, {
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
      <div className="flex h-[2px] w-full bg-blue-500 my-6"></div>
      <ClinaryInfoEdit data={data} setData={setData} langs={langs2} />
       <div className="flex h-[2px] w-full bg-blue-500 my-6"></div>
      <ImageBackgroundEdit data={data} setData={setData} langs={langs} />
       <div className="flex h-[2px] w-full bg-blue-500 my-6"></div>
      <CarouselEdit data={data} setData={setData} langs={langs} />
       <div className="flex h-[2px] w-full bg-blue-500 my-6"></div>
      <PoolSectionEdit data={data} setData={setData} langs={langs} />
       <div className="flex h-[2px] w-full bg-blue-500 my-6"></div>
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
