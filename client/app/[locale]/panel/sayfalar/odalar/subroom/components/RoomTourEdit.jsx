const langs = ["tr", "en", "de", "ru"];

export default function RoomTourEdit({ data, setData }) {
  const tours = data.roomTour || [
    {
      span: { tr: "", en: "", de: "", ru: "" },
      header: { tr: "", en: "", de: "", ru: "" },
      text: { tr: "", en: "", de: "", ru: "" },
      link: ""
    }
  ];

  const handleChange = (idx, field, lang, value) => {
    setData(prev => {
      const newTours = [...(prev.roomTour || [])];
      if (field === "link") {
        newTours[idx].link = value;
      } else {
        newTours[idx][field][lang] = value;
      }
      return { ...prev, roomTour: newTours };
    });
  };

  const handleAdd = () => {
    setData(prev => ({
      ...prev,
      roomTour: [
        ...(prev.roomTour || []),
        {
          span: { tr: "", en: "", de: "", ru: "" },
          header: { tr: "", en: "", de: "", ru: "" },
          text: { tr: "", en: "", de: "", ru: "" },
          link: ""
        }
      ]
    }));
  };

  const handleDelete = idx => {
    setData(prev => ({
      ...prev,
      roomTour: (prev.roomTour || []).filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">Room Tour</h3>
      {tours.map((tour, idx) => (
        <div key={idx} className="border-b pb-4 mb-4">
          {["span", "header", "text"].map(field => (
            <div key={field} className="grid grid-cols-2 gap-2 mb-2">
              {langs.map(lang => (
                <input
                  key={lang}
                  className="border p-2"
                  placeholder={`${field} (${lang})`}
                  value={tour[field][lang] || ""}
                  onChange={e => handleChange(idx, field, lang, e.target.value)}
                />
              ))}
            </div>
          ))}
          <input
            className="border p-2 w-full"
            placeholder="Tour Link"
            value={tour.link}
            onChange={e => handleChange(idx, "link", null, e.target.value)}
          />
          <button
            className="text-red-600 mt-2"
            onClick={() => handleDelete(idx)}
          >
            Sil
          </button>
        </div>
      ))}
      <button className="mt-2 px-4 py-1 border rounded" onClick={handleAdd}>
        + Yeni Tour Ekle
      </button>
    </div>
  );
}
