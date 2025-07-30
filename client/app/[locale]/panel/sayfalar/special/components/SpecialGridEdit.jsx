"use client";
import { useState, useEffect } from "react";

export default function SpecialGridEdit() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [grid, setGrid] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/pages/special`)
      .then(r=>r.json())
      .then(json=>setGrid(json.grid || []))
      .catch(console.error);
  }, []);

  const update = () => {
    setGrid(prev=>{
      const a = [...prev];
      a[idx][field] = v;
      return a;
    });
  };

  const save = async() => {
    await fetch(`${apiUrl}/api/pages/special`, {
      method:"PUT", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ grid })
    });
    alert("Grid kaydedildi");
  };

  if (!grid) return <p>Yükleniyor…</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded space-y-4">
      <h2 className="text-2xl font-bold">Grid Düzenle</h2>
      {grid.map((item,i) => (
        <div key={i} className="border p-4 rounded space-y-2">
          <h3 className="font-semibold"># {i+1}</h3>
          {["span","title","description","image"].map(f => (
            <div key={f}>
              <label className="font-medium">{f}</label>
              <input
                className="border p-1 w-full"
                value={item[f]||""}
                onChange={e=>update()}
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">
        Kaydet
      </button>
    </div>
  );
}
