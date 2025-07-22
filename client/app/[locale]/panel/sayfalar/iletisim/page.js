"use client";
import { useEffect, useState } from "react";
import Connect1Edit from "./components/Connect1Edit";
import Connect2Edit from "./components/Connect2Edit";
import Connect3Edit from "./components/Connect3Edit";

const langs = ["tr", "en", "de", "ru"];
 const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ConnectPanelPage() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/api/pages/contact`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`${apiUrl}/api/pages/contact`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (!data) return <p>Yükleniyor...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">
      <h2 className="font-bold text-3xl mb-4">İletişim Sayfası Paneli</h2>
      <Connect1Edit data={data} setData={setData} langs={langs} />
      <Connect2Edit data={data} setData={setData} langs={langs} />
      <Connect3Edit data={data} setData={setData} langs={langs} />
      <button
        className="mt-8 px-6 py-2 bg-green-600 text-white rounded text-lg w-[250px]"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
