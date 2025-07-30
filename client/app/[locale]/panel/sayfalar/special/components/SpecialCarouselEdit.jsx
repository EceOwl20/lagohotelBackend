"use client";
import { useState, useEffect } from "react";

export default function SpecialCarouselEdit() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [carousel, setCarousel] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/pages/special`)
      .then(r=>r.json()).then(json=>setCarousel(json.carousel))
      .catch(console.error);
  }, []);

  const upd = () => {
    setCarousel(prev=> {
      const a = prev ? [...prev] : [];
      a[i] = v;
      return a;
    });
  };

  const save = async() => {
    await fetch(`${apiUrl}/api/pages/special`, {
      method:"PUT", headers:{"Content-Type":"application/json"},
       headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ carousel })
    });
    alert("Carousel kaydedildi");
  };

  if (!carousel) return <p>Yükleniyor…</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded space-y-4">
      <h2 className="text-2xl font-bold">Carousel Düzenle</h2>
      {carousel.map((u,i)=>(
        <div key={i} className="flex gap-2">
          <input
            className="border p-1 flex-1"
            value={u||""}
            onChange={e=>upd(i,e.target.value)}
          />
          <button
            onClick={()=>setCarousel(c=>c?.filter((_,j)=>j!==i)||[])}
            className="text-red-600"
          >Sil</button>
        </div>
      ))}
      <button
        onClick={()=>setCarousel(c => c ? [...c,""] : [""])}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >+ Ekle</button>
      <button
        onClick={save}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >Kaydet</button>
    </div>
  );
}
