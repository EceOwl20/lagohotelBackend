// app/[locale]/panel/sayfalar/certificate/page.jsx
"use client";
import { useEffect, useState } from "react";
import CertificatePageEdit from "./components/CertificatePageEdit";

export default function CertificatePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const langs = ["tr","en","de","ru"];
  const [data, setData] = useState({ certificate: {} });

  useEffect(() => {
    // sayfa datasını çek (opsiyonel)
    fetch(`${apiUrl}/api/pages/certificate`)
      .then(r => r.json())
      .then(json => setData(json))
      .catch(() => {});
  }, [apiUrl]);

  const handleSave = async () => {
    await fetch(`${apiUrl}/api/pages/certificate`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("Kaydedildi");
  };

  return (
    <div className="p-4">
      <CertificatePageEdit data={data} setData={setData} langs={langs} />
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}
