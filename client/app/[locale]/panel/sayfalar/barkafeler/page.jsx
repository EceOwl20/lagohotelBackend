"use client";
import { useEffect, useState } from "react";
import MainBannerEdit from "./components/MainBannerEdit";
import ClinaryInfoEdit from "../restoranlar/components/ClinaryInfoEdit";
import BackgroundSectionsEdit from "./components/BackgroundSectionsEdit";
import OtherOptions4Edit from "./components/OtherOptions4Edit";
import BarCarouselEdit from "./components/BarCarouselEdit";
import DiscoverBackgroundEdit from "./components/DiscoverBackgroundEdit";

const langs = ["tr", "en", "de", "ru"];

export default function BarCafesPanel() {
 const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
 
   useEffect(() => {
     fetch(`${apiUrl}/api/pages/barcafes`)
       .then(res => res.json())
       .then(json => setData(json))
       .catch(() => setData({}));
   }, []);
 
   const handleSave = async () => {
     setStatus("Yükleniyor...");
     try {
       const res = await fetch(`${apiUrl}/api/pages/barcafes`, {
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
    <div className="max-w-4xl mx-auto p-8 space-y-10">
      <MainBannerEdit data={data} setData={setData} langs={langs} />
      <ClinaryInfoEdit data={data} setData={setData} langs={langs} />
      <BackgroundSectionsEdit data={data} setData={setData} langs={langs} />
      <OtherOptions4Edit data={data} setData={setData} langs={langs} blockName="otherOptions" />
      <OtherOptions4Edit data={data} setData={setData} langs={langs} blockName="otherOptions2" />
      <BarCarouselEdit data={data} setData={setData} langs={langs} />
      <DiscoverBackgroundEdit data={data} setData={setData} langs={langs} />
      {/* Kaydet butonu vs */}
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
        onClick={handleSave}
      >
        Kaydet
      </button>
      <p className="mt-1 text-lg text-green-800">{status}</p>
    </div>
  );
}
