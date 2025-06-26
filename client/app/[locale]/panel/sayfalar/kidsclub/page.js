"use client";
import { useEffect, useState } from "react";
import MainBannerEdit from "../restoranlar/components/MainBanner";
import KidsBambooEdit from "./components/KidsBambooEdit";
import KidsIconsEdit from "./components/KidsIconsEdit";
import KidsclubCarouselEdit from "./components/KidsclubCarouselEdit";
import KidsRestaurantCarouselEdit from "./components/KidsRestaurantCarouselEdit";
import CuisinesEdit from "../restoranlar/components/CuisinesEdit";
import KidsMomentCarouselEdit from "./components/KidsMomentCarouselEdit";

const langs = ["tr", "en", "de", "ru"];

export default function KidsClubPanelPage() {
  const [data, setData] = useState(null);
   const [status, setStatus] = useState("");
   useEffect(() => {
      fetch("http://localhost:5001/api/pages/restaurants")
        .then(res => res.json())
        .then(json => setData(json))
        .catch(() => setData({}));
    }, []);
  
    const handleSave = async () => {
      setStatus("Yükleniyor...");
      try {
        const res = await fetch("http://localhost:5001/api/pages/restaurants", {
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
      <h2 className="font-bold text-3xl mb-4">Kids Club Paneli</h2>
      <MainBannerEdit data={data} setData={setData} langs={langs} />
      <KidsBambooEdit data={data} setData={setData} langs={langs} />
      <KidsIconsEdit data={data} setData={setData} langs={langs} />
      <KidsclubCarouselEdit data={data} setData={setData} langs={langs} />
      <KidsRestaurantCarouselEdit data={data} setData={setData} langs={langs} />
      <CuisinesEdit data={data} setData={setData} langs={langs} blockName="cuisines" />
      <KidsMomentCarouselEdit data={data} setData={setData} langs={langs} />
      <button
        className="mt-6 px-6 py-3 rounded bg-blue-600 text-white font-bold max-w-[200px]"
        onClick={handleSave}
      >
        Kaydet
      </button>
      <p className="mt-2 text-lg text-green-800">{status}</p>
    </div>
  );
}
