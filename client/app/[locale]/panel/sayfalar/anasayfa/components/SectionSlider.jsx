
export default function SectionSlider({ data, setData }) {
  const languages = ["tr", "en", "de", "ru"];
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");

      // Görsel URL'yi güncelle
      const updatedSlides = [...data.slider];
      updatedSlides[index].image = result.imageUrl;
      setData({ ...data, slider: updatedSlides });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    }
  };

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-2">🖼️ Slider</h2>

      {data.slider?.map((slide, index) => (
  <div key={index} className="border p-2 rounded bg-gray-50 space-y-2">
    <h4 className="font-semibold mb-2">Slayt #{index + 1}</h4>

    {slide.image && (
      <img
        src={`${apiUrl}${slide.image}`}
        alt="Slider görseli"
        className="w-full h-40 object-cover rounded mb-2"
      />
    )}

    <label className="block">Görsel Yükle</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, index)}
      className="mb-2"
    />

    <label className="block">Görsel URL</label>
    <input
      type="text"
      value={slide.image}
      onChange={(e) => {
        const updatedSlides = [...data.slider];
        updatedSlides[index].image = e.target.value;
        setData({ ...data, slider: updatedSlides });
      }}
      className="w-full border p-2 rounded mb-2"
    />

    {/* Başlıklar */}
    {languages.map((lang) => (
      <div key={lang}>
        <label className="block">Başlık ({lang.toUpperCase()})</label>
        <input
          type="text"
          value={slide.title?.[lang] || ""}
          onChange={(e) => {
            const updatedSlides = [...data.slider];
            updatedSlides[index].title = {
              ...slide.title,
              [lang]: e.target.value,
            };
            setData({ ...data, slider: updatedSlides });
          }}
          className="w-full border p-2 rounded mb-2"
        />
      </div>
    ))}

    {/* Linkler */}
    {languages.map((lang) => (
      <div key={lang}>
        <label className="block">Link ({lang.toUpperCase()})</label>
        <input
          type="text"
          value={slide.link?.[lang] || ""}
          onChange={(e) => {
            const updatedSlides = [...data.slider];
            updatedSlides[index].link = {
              ...slide.link,
              [lang]: e.target.value,
            };
            setData({ ...data, slider: updatedSlides });
          }}
          className="w-full border p-2 rounded mb-2"
        />
      </div>
    ))}
  </div>
))}
      <div className="flex gap-4">
  <button
    type="button"
    onClick={() => {
      const newSlide = {
        image: "",
        title: { tr: "", en: "", de: "", ru: "" },
        link: "",
      };
      setData({ ...data, slider: [...(data.slider || []), newSlide] });
    }}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    + Slayt Ekle
  </button>

  <button
    type="button"
    onClick={() => {
      const exampleSlides = [
        "Konaklama", "Havuz & Plaj", "Eğlence", "Lezzetler",
        "Çocuk Kulübü", "SPA & Wellness", "Barlar"
      ].map((title, i) => ({
        image: "",
        title: {
          tr: title,
          en: `Slide ${i + 1}`,
          de: `Slide ${i + 1}`,
          ru: `Слайд ${i + 1}`
        },
        link: "/",
      }));
      setData({ ...data, slider: exampleSlides });
    }}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    🚀 7 Örnek Slayt Ekle
  </button>
</div>
    </div>
    
  );
}