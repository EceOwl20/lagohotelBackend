"use client";
export default function KidsMomentCarouselEdit({ data, setData, langs }) {
  const val = data.kidsMomentCarousel || {};

  const handleImageChange = (idx, value) => {
    const arr = [...(val.images || [])];
    arr[idx] = value;
    setData({ ...data, kidsMomentCarousel: { ...val, images: arr } });
  };
  const addImage = () =>
    setData({
      ...data,
      kidsMomentCarousel: {
        ...val,
        images: [...(val.images || []), ""]
      }
    });
  const removeImage = (idx) =>
    setData({
      ...data,
      kidsMomentCarousel: {
        ...val,
        images: (val.images || []).filter((_, i) => i !== idx)
      }
    });

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <h3 className="font-bold text-xl mb-2">Kids Moment Carousel</h3>
      <div className="mb-2">
        <label>Başlık</label>
        <div className="flex gap-2">
          {langs.map(lang => (
            <input
              key={lang}
              className="border p-2 rounded w-full"
              placeholder={lang.toUpperCase()}
              value={val?.header?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  kidsMomentCarousel: {
                    ...val,
                    header: { ...(val.header || {}), [lang]: e.target.value }
                  }
                })
              }
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
