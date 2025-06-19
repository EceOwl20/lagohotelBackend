"use client";

export default function SectionAnimation({ data, setData }) {
  const langs = ["tr", "en", "de", "ru"];

  const handleImageUpload = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
  
      setData({
        ...data,
        animationSection: {
          ...data.animationSection,
          [key]: result.imageUrl,
        },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    }
  };

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-2">✨ Animasyon Bloğu</h2>

      {langs.map((lang) => (
        <div key={lang}>
          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            value={data.animationSection?.title?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                animationSection: {
                  ...data.animationSection,
                  title: {
                    ...data.animationSection?.title,
                    [lang]: e.target.value,
                  },
                },
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label>Açıklama 1 ({lang.toUpperCase()})</label>
          <textarea
            value={data.animationSection?.text?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                animationSection: {
                  ...data.animationSection,
                  text: {
                    ...data.animationSection?.text,
                    [lang]: e.target.value,
                  },
                },
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label>Açıklama 2 ({lang.toUpperCase()})</label>
          <textarea
            value={data.animationSection?.text2?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                animationSection: {
                  ...data.animationSection,
                  text2: {
                    ...data.animationSection?.text2,
                    [lang]: e.target.value,
                  },
                },
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

{langs.map((lang) => (
  <div key={lang}>
    <label className="block">Buton Metni ({lang.toUpperCase()})</label>
    <input
      type="text"
      value={data.animationSection?.buttonText?.[lang] || ""}
      onChange={(e) =>
        setData({
          ...data,
          animationSection: {
            ...data.animationSection,
            buttonText: {
              ...data.animationSection?.buttonText,
              [lang]: e.target.value,
            },
          },
        })
      }
      className="w-full border p-2 rounded mb-2"
    />
  </div>
))}

{langs.map((lang) => (
  <div key={lang}>
    <label className="block">Buton Linki ({lang.toUpperCase()})</label>
    <input
      type="text"
      value={data.animationSection?.buttonLink?.[lang] || ""}
      onChange={(e) =>
        setData({
          ...data,
          animationSection: {
            ...data.animationSection,
            buttonLink: {
              ...data.animationSection?.buttonLink,
              [lang]: e.target.value,
            },
          },
        })
      }
      className="w-full border p-2 rounded mb-2"
    />
  </div>
))}

<label className="block">Sol Görsel Yükle</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e, "imageLeft")}
  className="mb-2"
/>

<label className="block">Sağ Görsel Yükle</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e, "imageRight")}
  className="mb-2"
/>
    </div>
  );
}