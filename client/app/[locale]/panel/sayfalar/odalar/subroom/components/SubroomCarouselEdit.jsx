// app/[locale]/panel/sayfalar/rooms/components/SubroomCarouselEdit.jsx
"use client";
import { useMemo } from "react";
import MultiImageUploadInput from "../../../../components/MultiImageUploadInput";

export default function SubroomCarouselEdit({ data, setData }) {
  // Giriş verisini güvenli hale getir
  const images = useMemo(
    () => (Array.isArray(data.carousel) ? data.carousel.filter(Boolean) : []),
    [data.carousel]
  );

  // Çıkışı da daima temizle yazar
  const setImages = (arr) => {
    const cleaned = (arr || []).filter(Boolean);
    setData((prev) => ({ ...prev, carousel: cleaned }));
  };

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🖼️ Carousel Resimleri</h2>
      </div>
      <div className="p-4">
        <MultiImageUploadInput
          label="Carousel Görselleri"
          value={images}      // <- her zaman temiz dizi
          onChange={setImages}
        />
      </div>
    </section>
  );
}