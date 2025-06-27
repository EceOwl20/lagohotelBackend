"use client";
import { useEffect, useState } from "react";
import MainBannerEdit from "./components/MainBannerEdit";
import ActivitiesSectionEdit from "./components/ActivitiesSectionEdit";
import EntertainmentTypesEdit from "./components/EntertainmentTypesEdit";
import ActivityBackgroundEdit from "./components/ActivityBackgroundEdit";

const langs = ["tr", "en", "de", "ru"];

export default function EntertainmentPanelPage() {
  const [data, setData] = useState(null);
   const [status, setStatus] = useState("");
   useEffect(() => {
      fetch("http://localhost:5001/api/pages/entertainment")
        .then(res => res.json())
        .then(json => setData(json))
        .catch(() => setData({}));
    }, []);
  
    const handleSave = async () => {
      setStatus("Yükleniyor...");
      try {
        const res = await fetch("http://localhost:5001/api/pages/entertainment", {
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
      <h2 className="font-bold text-3xl mb-4">Entertainment Paneli</h2>
      <MainBannerEdit data={data} setData={setData} />
      <ActivitiesSectionEdit data={data} setData={setData} langs={langs} />
      <EntertainmentTypesEdit data={data} setData={setData} langs={langs} />
      <ActivityBackgroundEdit data={data} setData={setData} langs={langs} />
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
