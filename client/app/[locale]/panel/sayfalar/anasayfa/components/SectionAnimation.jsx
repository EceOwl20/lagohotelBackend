import ImageUploadInput from "../../../components/ImageUploadInput";

export default function SectionAnimation({ data, setData }) {
  const langs = ["tr", "en", "de", "ru"];
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   
  // Görsel yükleme fonksiyonu aynı şekilde çalışıyor
  const handleImageUpload = async (e, key) => {
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
      setData((prev) => ({
        ...prev,
        animationSection: {
          ...prev.animationSection,
          [key]: result.imageUrl,
        },
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    }
  };

  // Görsel yüklenince URL'i güncelle
  const handleImageChange = (key, url) => {
    setData((prev) => ({
      ...prev,
      animationSection: {
        ...prev.animationSection,
        [key]: url,
      },
    }));
  };

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-2">✨ Animasyon Bloğu</h2>

      {langs.map((lang) => (
        <div key={lang} className="border-b pb-4 mb-4">
          <label className="block font-semibold">Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.animationSection?.subtitle?.[lang] || ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                animationSection: {
                  ...prev.animationSection,
                  subtitle: {
                    ...prev.animationSection?.subtitle,
                    [lang]: e.target.value,
                  },
                },
              }))
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block font-semibold">Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.animationSection?.title?.[lang] || ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                animationSection: {
                  ...prev.animationSection,
                  title: {
                    ...prev.animationSection?.title,
                    [lang]: e.target.value,
                  },
                },
              }))
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block">Açıklama 1 ({lang.toUpperCase()})</label>
          <textarea
            value={data.animationSection?.text?.[lang] || ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                animationSection: {
                  ...prev.animationSection,
                  text: {
                    ...prev.animationSection?.text,
                    [lang]: e.target.value,
                  },
                },
              }))
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block">Açıklama 2 ({lang.toUpperCase()})</label>
          <textarea
            value={data.animationSection?.text2?.[lang] || ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                animationSection: {
                  ...prev.animationSection,
                  text2: {
                    ...prev.animationSection?.text2,
                    [lang]: e.target.value,
                  },
                },
              }))
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block">Buton Metni ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.animationSection?.buttonText?.[lang] || ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                animationSection: {
                  ...prev.animationSection,
                  buttonText: {
                    ...prev.animationSection?.buttonText,
                    [lang]: e.target.value,
                  },
                },
              }))
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block">Buton Linki ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.animationSection?.buttonLink?.[lang] || ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                animationSection: {
                  ...prev.animationSection,
                  buttonLink: {
                    ...prev.animationSection?.buttonLink,
                    [lang]: e.target.value,
                  },
                },
              }))
            }
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      {/* Görsel alanları */}
      <ImageUploadInput
        label="Sol Görsel Yükle"
        value={data.animationSection?.imageLeft}
        onChange={(url) => handleImageChange("imageLeft", url)}
      />

      <ImageUploadInput
        label="Sağ Görsel Yükle"
        value={data.animationSection?.imageRight}
        onChange={(url) => handleImageChange("imageRight", url)}
      />
    </div>
  );
}