import ImageUploadInput from "../../../components/ImageUploadInput";

export default function EmblaCarouselEdit({ data, setData, langs }) {
  const items = data.emblaCarousel || [];

  const handleChange = (idx, field, langOrValue, value) => {
    setData(prev => {
      const newArr = [...(prev.emblaCarousel || [])];
      if (!newArr[idx]) {
        newArr[idx] = { src: "", title: {}, link: "" };
      }
      if (field === "title") {
        newArr[idx].title = { ...(newArr[idx].title || {}), [langOrValue]: value };
      } else {
        newArr[idx][field] = value;
      }
      return { ...prev, emblaCarousel: newArr };
    });
  };

  const handleAdd = () => {
    setData(prev => ({
      ...prev,
      emblaCarousel: [
        ...(prev.emblaCarousel || []),
        {
          src: "",
          title: langs.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
          link: ""
        }
      ]
    }));
  };

  const handleDelete = idx => {
    setData(prev => ({
      ...prev,
      emblaCarousel: (prev.emblaCarousel || []).filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-3">Embla Carousel Kartları</h3>
      {items.length === 0 && (
        <p className="text-gray-500 mb-4">Hiç kart yok, ekleyin!</p>
      )}
      {items.map((item, idx) => (
        <div key={idx} className="border-b pb-4 mb-4">
          <ImageUploadInput
            value={item.src}
            onChange={url => handleChange(idx, "src", null, url)}
          />
          {langs.map(lang => (
            <div key={lang} className="mb-2">
              <input
                className="border p-2 w-full"
                placeholder={`Başlık (${lang})`}
                value={item.title?.[lang] ?? ""}
                onChange={e => handleChange(idx, "title", lang, e.target.value)}
              />
            </div>
          ))}
          <input
            className="border p-2 w-full"
            placeholder="Link"
            value={item.link || ""}
            onChange={e => handleChange(idx, "link", null, e.target.value)}
          />
          <button
            type="button"
            className="text-red-600 mt-2"
            onClick={() => handleDelete(idx)}
          >
            Sil
          </button>
        </div>
      ))}
      <button
        type="button"
        className="mt-2 px-4 py-1 border rounded"
        onClick={handleAdd}
      >
        + Yeni Kart Ekle
      </button>
    </div>
  );
}
