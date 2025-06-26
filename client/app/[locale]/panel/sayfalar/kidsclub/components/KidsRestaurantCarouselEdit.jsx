"use client";
export default function KidsRestaurantCarouselEdit({ data, setData, langs }) {
  const val = data.kidsRestaurantCarousel || {};
  const handleListChange = (lang, value) => {
    setData({
      ...data,
      kidsRestaurantCarousel: {
        ...val,
        list: { ...(val.list || {}), [lang]: value.split("\n") }
      }
    });
  };
  const handleImageChange = (idx, value) => {
    const arr = [...(val.images || [])];
    arr[idx] = value;
    setData({ ...data, kidsRestaurantCarousel: { ...val, images: arr } });
  };
  const addImage = () =>
    setData({
      ...data,
      kidsRestaurantCarousel: {
        ...val,
        images: [...(val.images || []), ""]
      }
    });
  const removeImage = (idx) =>
    setData({
      ...data,
      kidsRestaurantCarousel: {
        ...val,
        images: (val.images || []).filter((_, i) => i !== idx)
      }
    });

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <h3 className="font-bold text-xl mb-2">Kids Restaurant Carousel</h3>
      {["subtitle", "title", "text"].map((key) => (
        <div key={key} className="mb-2">
          <label className="block font-semibold mb-1">
            {key[0].toUpperCase() + key.slice(1)}
          </label>
          <div className="flex gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                placeholder={lang.toUpperCase()}
                className="border p-2 rounded w-full"
                value={val?.[key]?.[lang] || ""}
                onChange={e =>
                  setData({
                    ...data,
                    kidsRestaurantCarousel: {
                      ...val,
                      [key]: { ...(val[key] || {}), [lang]: e.target.value }
                    }
                  })
                }
              />
            ))}
          </div>
        </div>
      ))}
      <div className="mb-2">
        <label className="block font-semibold mb-1">Liste (her satır bir madde)</label>
        <div className="flex gap-2">
          {langs.map(lang => (
            <textarea
              key={lang}
              placeholder={lang.toUpperCase()}
              className="border p-2 rounded w-full"
              value={val?.list?.[lang]?.join("\n") || ""}
              onChange={e => handleListChange(lang, e.target.value)}
            />
          ))}
        </div>
      </div>
      <h4 className="mt-4 mb-2 font-semibold">Görseller</h4>
      {(val.images || []).map((img, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            className="border p-2 rounded w-full"
            value={img}
            onChange={e => handleImageChange(idx, e.target.value)}
          />
          <button
            className="text-red-600 hover:underline"
            onClick={() => removeImage(idx)}
          >
            Sil
          </button>
        </div>
      ))}
      <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={addImage}>
        + Görsel Ekle
      </button>
    </section>
  );
}
