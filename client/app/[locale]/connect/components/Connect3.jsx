
"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const Connect3 = () => {
  const t = useTranslations('Contact.Form');
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    const [pageData, setPageData] = useState(null);
    useEffect(() => {
      fetch(`${apiUrl}/api/pages/contact`)
        .then((r) => r.json())
        .then((json) => setPageData(json))
        .catch(console.error);
    }, [apiUrl]);
  
    if (!pageData) return <p className="p-10">Yükleniyor…</p>;

  return (
    <div className="flex flex-col items-center w-full px-4 py-8">
      {/* Üst Çizgi kaldırıldı veya başka yerde kullanılabilir */}

      {/* Başlık */}
      <h2 className="text-[32px] lg:text-[40px] font-marcellus font-normal text-center mt-5 mb-5">
        {pageData.connect3?.addressHeader?.[locale]}
      </h2>

      {/* Yatay çizgi: Başlığın hemen altında */}
      <hr className="w-full max-w-4xl border-gray-300 mb-6 mx-auto" />

      {/* Adres Metni */}
      <p className="text-center text-lagoBlack font-normal font-jost text-[14px] lg:text-[16px] leading-[24px] mb-12 underline">
        {pageData.connect3?.addressText?.[locale]}
      </p>

      {/* Harita Alanı */}
      <div className="w-full max-w-4xl h-[500px]">
        <iframe
          src={pageData.connect3?.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
    </div>
  )
}

export default Connect3
