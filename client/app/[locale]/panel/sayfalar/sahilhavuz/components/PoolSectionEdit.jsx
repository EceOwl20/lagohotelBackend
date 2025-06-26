"use client";
export default function PoolSectionEdit({ data, setData, langs }) {
  const handleLangChange = (field, lang, value) =>
    setData({
      ...data,
      poolSection: {
        ...data.poolSection,
        [field]: { ...(data.poolSection?.[field] || {}), [lang]: value }
      }
    });
  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Pool Section (Video arka planlı)</h3>
      <label className="font-semibold">Video URL (mp4)</label>
      <input
        type="text"
        value={data.poolSection?.video || ""}
        onChange={e => setData({ ...data, poolSection: { ...data.poolSection, video: e.target.value } })}
        className="w-full border p-2 rounded mb-2"
      />
      {["subtitle", "title", "text"].map(field => (
        <div className="mb-2" key={field}>
          <label className="block font-semibold mt-2 mb-1">{field}</label>
          <div className="flex flex-wrap gap-2">
            {langs.map(({ key, label }) => (
              <input
                key={key}
                placeholder={label}
                value={data.poolSection?.[field]?.[key] || ""}
                onChange={e => handleLangChange(field, key, e.target.value)}
                className="border rounded p-2 w-[180px]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
