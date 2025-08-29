'use client';
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

// yerel fallback görseller (istersen)
import side from "../images/side.jpg";
import aspendos from "../images/aspendos.jpg";
import oymapinar from "../images/oymapinar.jpg";
import waterfall from "../images/manavgatwaterfall.webp";
import seleukeia from "../images/Seleukeia.jpg";
import koprulukanyon from "../images/koprulukanyon.jpg";

export default function GeziRehberiPage() {
  const t = useTranslations('Explore');
  const locale = useLocale();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/pages/sustainability`)
      .then(r => r.json())
      .then(json => setPageData(json))
      .catch(console.error);
  }, [apiUrl]);

  if (!pageData) return <p className="p-10">Yükleniyor…</p>;

  // relative/tam URL normalize eden yardımcı
  const toSrc = (p) => {
    if (!p) return "";
    try { return new URL(p).href; } catch {}
    return p.startsWith("/") ? `${apiUrl}${p}` : p;
  };

  const fallbacks = [waterfall, side, aspendos, koprulukanyon, oymapinar, seleukeia];

  const geziVerileri = (pageData.places || [])
    .slice(0, 6)
    .map((place, i) => {
      const src = toSrc(place?.image);
      return {
        baslik: place?.title?.[locale] || "",
        aciklama: place?.text?.[locale] || "",
        // src boşsa yerel fallback kullan
        resim: src || fallbacks[i] || fallbacks[0],
        mesafe: place?.distance || "",
      };
    });

  return (
    <main className="w-[87.79%] md:w-[90%] lg:w-[76.8%] max-w-[1440px] mx-auto py-8 space-y-10 lg:py-12 lg:space-y-20">
      <h2 className="text-[28px] md:text-[32px] lg:text-[44px] font-marcellus text-lagoBlack">{t("header")}</h2>

      {geziVerileri.map((yer, i) => (
        <section
          key={i}
          className={`flex h-full flex-col-reverse lg:flex-row ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''} items-center gap-6 md:gap-10 lg:gap-[8%] justify-center`}
        >
          <div className="w-full lg:w-[46%]">
            <Image
              src={yer.resim}
              alt={yer.baslik || `place-${i+1}`}
              width={600}
              height={400}
              loading="lazy"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-[46%] text-lagoGray">
            <h3 className="text-[28px] md:text-[32px] lg:text-[36px] font-marcellus text-lagoBlack2 mb-2">{yer.baslik}</h3>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] font-jost">{yer.aciklama}</p>
            <span className="block mt-2 text-sm md:text-base font-jost text-lagoGray font-medium capitalize">
              {t("distance")} {yer.mesafe}
            </span>
          </div>
        </section>
      ))}
    </main>
  );
}