"use client";
import { useState, useEffect } from "react";
import SubBarCafeEdit from "./components/SubBarCafeEdit"; // Aşağıda

const barCafeSlugs = [
  "abellapatisserie",
  "cafedehouse",
  "cafedelago",
  "joiebar",
  "maldivabar",
  "mignonbar",
  "pianobar",
  "vagobar"
];

const langs = ["tr", "en", "de", "ru"];
const defaultBarCafeData = {
  slug: "",
  mainBanner: {
    subtitle: {}, title: {}, text: {}, image: ""
  },
  infoSection: {
    subtitle: {}, title: {}, text1: {}, text2: {}, image1: "", image2: ""
  },
  carousel: [],
  cafes: [],
  background: {
    subtitle: {}, title: {}, text: {}, buttonText: {}, link: "", image: ""
  }
};

export default function BarCafesPanelPage() {
  const [barcafes, setBarcafes] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

   //api/pages/barcafes/subbarcafes
  useEffect(() => {
    fetch(`${apiUrl}/api/pages/barcafes/subbarcafes`)
      .then(res => res.json())
      .then(data => {
        setBarcafes(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectedBarcafe =
    barcafes.find(b => b.slug === selectedSlug)
    || (selectedSlug ? { ...defaultBarCafeData, slug: selectedSlug } : null);

  const setBarcafeData = (updateFnOrObject) => {
    setBarcafes(prev =>
      prev.some(b => b.slug === selectedSlug)
        ? prev.map(b =>
            b.slug === selectedSlug
              ? typeof updateFnOrObject === "function"
                ? updateFnOrObject(b)
                : { ...b, ...updateFnOrObject }
              : b
          )
        : [
            ...prev,
            typeof updateFnOrObject === "function"
              ? updateFnOrObject({ ...defaultBarCafeData, slug: selectedSlug })
              : { ...defaultBarCafeData, slug: selectedSlug, ...updateFnOrObject }
          ]
    );
  };

  const handleSave = async () => {
    if (!selectedSlug) return;
    const toSave = barcafes.find(b => b.slug === selectedSlug)
      || { ...defaultBarCafeData, slug: selectedSlug };
    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/api/pages/barcafes/subbarcafes/${selectedSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSave)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Save failed");
      alert("Kaydedildi!");
    } catch (error) {
      alert("Kaydetme hatası: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Bar/Cafe Sayfaları Paneli</h1>
      <div className="flex gap-3 mb-6 flex-wrap">
        {barCafeSlugs.map(slug => (
          <button
            key={slug}
            className={`px-4 py-2 rounded transition-all duration-150
              ${slug === selectedSlug ? "bg-blue-600 text-white shadow" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setSelectedSlug(slug)}
          >
            {slug}
          </button>
        ))}
      </div>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : selectedBarcafe && selectedSlug ? (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          <SubBarCafeEdit
            data={selectedBarcafe}
            setData={setBarcafeData}
            langs={langs}
          />
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-lagoBlack text-white rounded text-lg mt-4"
            disabled={saving}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      ) : (
        <div className="text-gray-500">Bir bar/cafe seçiniz.</div>
      )}
    </div>
  );
}
