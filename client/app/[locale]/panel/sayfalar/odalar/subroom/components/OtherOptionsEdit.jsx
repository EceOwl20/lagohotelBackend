import ImageUploadInput from "@/app/[locale]/panel/components/ImageUploadInput";

const defaultLangs = ['tr', 'en', 'de', 'ru'];

export default function OtherOptionsEdit({ data, setData, langs = defaultLangs }) {
  // Diğer odaların kartlarını çek/yaz
  const options = data.otherOptions || [];

  // Alanı güncelle
  const handleChange = (idx, field, langOrValue, value) => {
    const updated = [...options];
    if (!updated[idx]) updated[idx] = {};
    if (["title", "description", "text", "buttonText"].includes(field)) {
      updated[idx][field] = { ...(updated[idx][field] || {}), [langOrValue]: value };
    } else {
      updated[idx][field] = value;
    }
    setData({ ...data, otherOptions: updated });
  };

  // Kart ekle
  const handleAdd = () => {
    setData({
      ...data,
      otherOptions: [
        ...options,
        {
          img: "",
          title: langs.reduce((acc, l) => ({ ...acc, [l]: "" }), {}),
          description: langs.reduce((acc, l) => ({ ...acc, [l]: "" }), {}),
          size: "",
          capacity: "",
          text: langs.reduce((acc, l) => ({ ...acc, [l]: "" }), {}),
          link: "",
          buttonText: langs.reduce((acc, l) => ({ ...acc, [l]: "" }), {}),
        },
      ],
    });
  };

  // Kart sil
  const handleDelete = idx => {
    setData({
      ...data,
      otherOptions: options.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-3">Diğer Oda Seçenekleri (Other Options)</h3>
      {options.length === 0 && (
        <p className="text-gray-500 mb-4">Kart yok, ekleyin!</p>
      )}
      {options.map((option, idx) => (
        <div key={idx} className="border-b pb-4 mb-4">
          <div className="mb-2">
            <ImageUploadInput
              value={option.img}
              onChange={url => handleChange(idx, "img", null, url)}
            />
          </div>
          {langs.map(lang => (
            <div key={lang} className="mb-1 grid grid-cols-2 gap-2">
              <input
                className="border p-2"
                placeholder={`Başlık (${lang})`}
                value={option.title?.[lang] || ""}
                onChange={e => handleChange(idx, "title", lang, e.target.value)}
              />
              <input
                className="border p-2"
                placeholder={`Açıklama (${lang})`}
                value={option.description?.[lang] || ""}
                onChange={e => handleChange(idx, "description", lang, e.target.value)}
              />
              <input
                className="col-span-2 border p-2"
                placeholder={`Metin (${lang})`}
                value={option.text?.[lang] || ""}
                onChange={e => handleChange(idx, "text", lang, e.target.value)}
              />
              <input
                className="col-span-2 border p-2"
                placeholder={`Buton Yazısı (${lang})`}
                value={option.buttonText?.[lang] || ""}
                onChange={e => handleChange(idx, "buttonText", lang, e.target.value)}
              />
            </div>
          ))}
          <div className="flex gap-2 my-2">
            <input
              className="border p-2 w-1/2"
              placeholder="Metrekare / Size"
              value={option.size || ""}
              onChange={e => handleChange(idx, "size", null, e.target.value)}
            />
            <input
              className="border p-2 w-1/2"
              placeholder="Kapasite / Capacity"
              value={option.capacity || ""}
              onChange={e => handleChange(idx, "capacity", null, e.target.value)}
            />
          </div>
          <input
            className="border p-2 w-full my-1"
            placeholder="Odaya Git Linki"
            value={option.link || ""}
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
