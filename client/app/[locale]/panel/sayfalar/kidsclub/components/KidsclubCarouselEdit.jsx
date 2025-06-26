"use client";
export default function KidsclubCarouselEdit({ data, setData, langs }) {
  const carousel = data.kidsClubCarousel || {};

  // Carousel slides add/remove
  const handleAdd = () => {
    setData({
      ...data,
      kidsClubCarousel: {
        ...carousel,
        slides: [
          ...(carousel.slides || []),
          { image: "", header: { tr: "", en: "", de: "", ru: "" } }
        ]
      }
    });
  };
  const handleRemove = (i) => {
    setData({
      ...data,
      kidsClubCarousel: {
        ...carousel,
        slides: (carousel.slides || []).filter((_, idx) => idx !== i)
      }
    });
  };

  const handleChange = (key, lang, value, idx) => {
    const arr = [...(carousel.slides || [])];
    arr[idx][key][lang] = value;
    setData({
      ...data,
      kidsClubCarousel: { ...carousel, slides: arr }
    });
  };
  const handleImageChange = (value, idx) => {
    const arr = [...(carousel.slides || [])];
    arr[idx].image = value;
    setData({
      ...data,
      kidsClubCarousel: { ...carousel, slides: arr }
    });
  };

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <h3 className="font-bold text-xl mb-2">Kids Club Carousel</h3>
      <div className="mb-2 flex flex-col gap-2">
        <label>Başlık</label>
        <div className="flex gap-2">
          {langs.map(lang => (
            <input
              key={lang}
              placeholder={lang.toUpperCase()}
              className="border p-2 rounded w-full"
              value={carousel?.title?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  kidsClubCarousel: {
                    ...carousel,
                    title: { ...(carousel.title || {}), [lang]: e.target.value }
                  }
                })
              }
            />
          ))}
        </div>
      </div>
      <div className="mb-2 flex flex-col gap-2">
        <label>Açıklama</label>
        <div className="flex gap-2">
          {langs.map(lang => (
            <textarea
              key={lang}
              placeholder={lang.toUpperCase()}
              className="border p-2 rounded w-full"
              value={carousel?.text?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  kidsClubCarousel: {
                    ...carousel,
                    text: { ...(carousel.text || {}), [lang]: e.target.value }
                  }
                })
              }
            />
          ))}
        </div>
      </div>
      {/* Slides */}
      {(carousel.slides || []).map((slide, idx) => (
        <div key={idx} className="border p-2 rounded mb-2">
          <label>Görsel URL</label>
          <input
            className="border p-2 rounded w-full mb-2"
            value={slide.image}
            onChange={e => handleImageChange(e.target.value, idx)}
          />
          <div className="flex gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                placeholder={`Başlık (${lang.toUpperCase()})`}
                className="border p-2 rounded w-full"
                value={slide.header?.[lang] || ""}
                onChange={e => handleChange("header", lang, e.target.value, idx)}
              />
            ))}
          </div>
          <button
            className="text-red-600 hover:underline text-sm mt-1"
            onClick={() => handleRemove(idx)}
          >
            Sil
          </button>
        </div>
      ))}
      <button
        className="px-4 py-2 bg-green-600 text-white rounded mt-2"
        onClick={handleAdd}
      >
        + Slide Ekle
      </button>
    </section>
  );
}
