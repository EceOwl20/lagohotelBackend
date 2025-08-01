"use client";

import { useEffect, useState } from "react";
import SectionHero from "./components/SectionHero";
import Section1 from "./components/Section1";
import SectionSlider from "./components/SectionSlider";
import SectionAnimation from "./components/SectionAnimation";
import SectionAccommodation from "./components/SectionAccommodation";
import SectionEssentials from "./components/SectionEssentials";
import SectionContact from "./components/SectionContact";
import SectionBanner from "./components/SectionBanner";

export default function HomePageEdit() {
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/pages/homepage`);
        const json = await res.json();
        if (!json.slider || json.slider.length === 0) {
            json.slider = [
              {
                image: "",
                title: {
                  tr: "",
                  en: "",
                  de: "",
                  ru: ""
                },
                link: ""
              }
            ];
          }
        setData(json);
      } catch (err) {
        setError("Sayfa verisi alınamadı.");
      }
    };

    fetchPage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${apiUrl}/api/pages/homepage`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Güncelleme başarısız");

      setSuccess("✅ Anasayfa başarıyla güncellendi!");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  if (!data) return <p className="p-6">Yükleniyor...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Anasayfa Düzenle</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <SectionHero data={data} setData={setData} />
        <Section1 data={data} setData={setData} />
        <SectionSlider data={data} setData={setData} />
        <SectionAnimation data={data} setData={setData} />
        <SectionAccommodation data={data} setData={setData} />
        <SectionEssentials data={data} setData={setData} />
        <SectionContact data={data} setData={setData} />
        <SectionBanner data={data} setData={setData} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kaydet
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}