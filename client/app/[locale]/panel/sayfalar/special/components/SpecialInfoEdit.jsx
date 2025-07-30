"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

export default function SpecialInfoEdit() {
  const locale = useLocale();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [info, setInfo] = useState(null);
  const langs = ["tr","en","de","ru"];

  useEffect(() => {
    fetch(`${apiUrl}/api/pages/special`)
      .then(r=>r.json()).then(json=>setInfo(json.infoSection))
      .catch(console.error);
  }, []);

  const handle = () =>
    setInfo(()=>({ ...p, [field]:{ ...(p[field]||{}), [lang]:v } }));

  const save = async()=> {
    await fetch(`${apiUrl}/api/pages/special`, {
      method:"PUT", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ infoSection: info })
    });
    alert("Info kaydedildi");
  };

  if (!info) return <p>Yükleniyor…</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded space-y-4">
      <h2 className="text-2xl font-bold">Info Section Düzenle</h2>
      {["subtitle","title","text1","text2"].map(f => (
        <div key={f}>
          <h3 className="font-semibold">{f}</h3>
          {langs.map(l=>(
            <input
              key={l}
              className="border p-1 w-full mb-1"
              placeholder={`${f} (${l})`}
              value={info[f]?.[l]||""}
              onChange={e=>handle()}
            />
          ))}
        </div>
      ))}
      <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">
        Kaydet
      </button>
    </div>
  );
}
