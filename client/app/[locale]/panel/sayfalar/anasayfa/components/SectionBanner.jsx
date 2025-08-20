
const langs = ["tr", "en", "de", "ru"];

export default function SectionBanner({ data, setData }) {
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Görsel yükleme fonksiyonu
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

      setData(prev => ({
        ...prev,
        banner: {
          ...(prev.banner || {}),
          [key]: result.imageUrl,
        },
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    }
  };

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-2">📢 Banner Alanı</h2>

      {langs.map((lang) => (
        <div key={lang}>
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.banner?.subtitle?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                banner: {
                  ...data.banner,
                  subtitle: { ...data.banner?.subtitle, [lang]: e.target.value },
                },
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.banner?.title?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                banner: {
                  ...data.banner,
                  title: { ...data.banner?.title, [lang]: e.target.value },
                },
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label>Açıklama ({lang.toUpperCase()})</label>
          <textarea
            value={data.banner?.text?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                banner: {
                  ...data.banner,
                  text: { ...data.banner?.text, [lang]: e.target.value },
                },
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label>Buton Metni ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.banner?.discoverMoreText?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                banner: {
                  ...data.banner,
                  discoverMoreText: {
                    ...data.banner?.discoverMoreText,
                    [lang]: e.target.value,
                  },
                },
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label>Buton Linki ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.banner?.discoverMoreLink?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                banner: {
                  ...data.banner,
                  discoverMoreLink: {
                    ...data.banner?.discoverMoreLink,
                    [lang]: e.target.value,
                  },
                },
              })
            }
            className="w-full border p-2 rounded mb-4"
          />
        </div>
      ))}

      <label className="block mt-4">Arka Plan Resmi Yükle</label>
      <input
        type="file"
        accept="image/*"
        onChange={e => handleImageUpload(e, "backgroundImage")}
        className="mb-2"
      />
      {data.banner?.backgroundImage && (
        <img
          src={`${apiUrl}${data.banner.backgroundImage}`}
          alt="Background"
          className="w-32 h-24 object-cover rounded mb-2"
        />
      )}
    </div>
  );
}