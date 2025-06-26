"use client";
import React, { useEffect, useState } from "react";
import SectionRestaurantPage from "./components/SectionRestaurantPage";
import MainBannerEdit from "./components/MainBanner";
import ClinaryInfoEdit from "./components/ClinaryInfoEdit";
import MainRestaurantSectionEdit from "./components/MainRestaurantSectionEdit";
import CuisinesEdit from "./components/CuisinesEdit";
import ClinaryReverseInfoEdit from "./components/ClinaryReverseInfoEdit";
import DiscoverBackgroundEdit from "./components/DiscoverBackgroundEdit";

const langs = ["tr", "en", "de", "ru"];

export default function RestaurantPanelPage() {
  
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
    <div className="max-w-6xl mx-auto p-2 space-y-9">
       <MainBannerEdit data={data} setData={setData} langs={langs} />
      <ClinaryInfoEdit data={data} setData={setData} langs={langs} />
      <MainRestaurantSectionEdit data={data} setData={setData} langs={langs} />
      <CuisinesEdit data={data} setData={setData} langs={langs} blockName="cuisines" />
      <ClinaryReverseInfoEdit data={data} setData={setData} langs={langs} />
      <CuisinesEdit data={data} setData={setData} langs={langs} blockName="cuisines2" />
      <DiscoverBackgroundEdit data={data} setData={setData} langs={langs} />
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
