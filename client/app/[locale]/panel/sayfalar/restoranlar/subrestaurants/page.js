"use client";
import { useState, useEffect } from "react";
import SubrestaurantEdit from "./components/SubrestaurantEdit";

const restaurantSlugs = [
  "anatoliarestaurant",
  "despinarestaurant",
  "fuego",
  "gustorestaurant",
  "mainrestaurant",
  "tapazrestaurant",
  "wasabi"
];

// Default şema (dilersen detayları artırabilirsin)
const defaultRestaurantData = {
  slug: "",
  mainBanner: {
    subtitle: { tr: "", en: "", de: "", ru: "" },
    title: { tr: "", en: "", de: "", ru: "" },
    text: { tr: "", en: "", de: "", ru: "" },
    image: ""
  },
  // Diğer alanlar:
  // carousel: [],
  // section1: {...}, vb.
};

const langs = ["tr", "en", "de", "ru"];

export default function RestaurantPanelPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [restaurants, setRestaurants] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // API'den restoran datalarını çek
  useEffect(() => {
    fetch(`${apiUrl}/api/pages/restaurants/subrestaurants`)
      .then(res => res.json())
      .then(data => {
        setRestaurants(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Seçili restoranı getir, yoksa default ile oluştur
  const selectedRestaurant =
    restaurants.find(r => r.slug === selectedSlug)
    || (selectedSlug
        ? { ...defaultRestaurantData, slug: selectedSlug }
        : null);

  // State güncelle (slug yoksa yeni restaurant ekler)
  const setRestaurantData = (updateFnOrObject) => {
    setRestaurants(prev =>
      prev.some(r => r.slug === selectedSlug)
        ? prev.map(r =>
            r.slug === selectedSlug
              ? typeof updateFnOrObject === "function"
                ? updateFnOrObject(r)
                : { ...r, ...updateFnOrObject }
              : r
          )
        : [
            ...prev,
            typeof updateFnOrObject === "function"
              ? updateFnOrObject({ ...defaultRestaurantData, slug: selectedSlug })
              : { ...defaultRestaurantData, slug: selectedSlug, ...updateFnOrObject }
          ]
    );
  };

  // KAYDET
  const handleSave = async () => {
    if (!selectedSlug) return;
    const restaurantToSave = restaurants.find(r => r.slug === selectedSlug)
      || { ...defaultRestaurantData, slug: selectedSlug };
    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/api/pages/restaurants/subrestaurants/${selectedSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restaurantToSave)
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
      <h1 className="text-2xl font-bold mb-4">Restaurant Sayfaları Paneli</h1>
      <div className="flex gap-3 mb-6 flex-wrap">
        {restaurantSlugs.map(slug => (
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
      ) : selectedRestaurant && selectedSlug ? (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          <SubrestaurantEdit
            data={selectedRestaurant}
            setData={setRestaurantData}
            langs={langs}
          />
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white rounded text-lg mt-4 w-[250px]"
            disabled={saving}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      ) : (
        <div className="text-gray-500">Bir restaurant seçiniz.</div>
      )}
    </div>
  );
}
