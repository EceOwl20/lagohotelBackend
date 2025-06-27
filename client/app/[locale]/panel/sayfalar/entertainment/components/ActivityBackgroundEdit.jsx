"use client";
export default function ActivityBackgroundEdit({ data, setData, langs }) {
  const value = data.activityBackground || {};

  // Galeri görselleri
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Upload işlemi ile eklersin
    // setData({ ...data, activityBackground: { ...value, images: [...(value.images || []), uploadedUrl] } })
  };
  const handleRemoveImage = idx => {
    setData({
      ...data,
      activityBackground: {
        ...value,
        images: (value.images || []).filter((_, i) => i !== idx),
      },
    });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Galeri & Arka Plan</h4>
      {langs.map(lang => (
        <div key={lang} className="mb-4">
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={value.subtitle?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                activityBackground: {
                  ...value,
                  subtitle: { ...value.subtitle, [lang]: e.target.value },
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={value.title?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                activityBackground: {
                  ...value,
                  title: { ...value.title, [lang]: e.target.value },
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Açıklama ({lang.toUpperCase()})</label>
          <textarea
            value={value.text?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                activityBackground: {
                  ...value,
                  text: { ...value.text, [lang]: e.target.value },
                }
              })
            }
            className="w-full border p-2 rounded"
          />
          <label>Ek Bilgi (span) ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={value.span?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                activityBackground: {
                  ...value,
                  span: { ...value.span, [lang]: e.target.value },
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
        </div>
      ))}
      <label>Galeri Görselleri</label>
      <input type="file" accept="image/*" onChange={handleAddImage} className="block my-2" />
      <div className="flex gap-2 flex-wrap">
        {(value.images || []).map((img, idx) => (
          <div key={idx} className="relative w-[120px] h-[80px]">
            <img src={img} className="w-full h-full object-cover rounded" />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
              onClick={() => handleRemoveImage(idx)}
              type="button"
            >Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}
