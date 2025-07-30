// /app/[locale]/panel/special/page.js
"use client";

import { useState, useEffect } from "react";
import BannerEdit from "./components/SpecialBannerEdit";
import SpecialTypesEdit from "./components/SpecialTypesEdit";
import SpecialGridEdit from "./components/SpecialGridEdit";
import SpecialInfoEdit from "./components/SpecialInfoEdit";
import SpecialCarouselEdit from "./components/SpecialCarouselEdit";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SpecialPanelPage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/api/pages/special`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData({}));
  }, []);

  const handleSave = async () => {
    setStatus("Yükleniyor...");
    try {
      const res = await fetch(`${apiUrl}/api/pages/special`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      if (res.ok) setStatus("Kaydedildi!");
      else setStatus("Kaydetme hatası!");
    } catch {
      setStatus("Kaydetme hatası!");
    }
  };

  if (!data) return <p className="p-10">Yükleniyor...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">
      <h2 className="font-bold text-3xl mb-4">Special Paneli</h2>

      <BannerEdit data={data} setData={setData} langs={langs} />
      <SpecialTypesEdit data={data} setData={setData} langs={langs} />
      {/* <SpecialGridEdit data={data} setData={setData} langs={langs} />
      <SpecialInfoEdit data={data} setData={setData} langs={langs} />
      <SpecialCarouselEdit data={data} setData={setData} langs={langs} /> */}

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
