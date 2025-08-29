"use client";
import React, { useEffect, useState } from "react";
import Banner from "../ourpolicies/components/Banner";
import ExploreManavgat from "./components/ExploreManavgat";
import { useLocale } from 'next-intl';

export default function Page() {
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

  // Güvenli banner URL hesaplama
  const bannerSrc = (() => {
    const p = pageData?.banner?.image || "";
    if (!p) return "";
    // p tam URL ise direkt dön
    try { return new URL(p).href; } catch (_) {}
    // relative ise apiUrl ile birleştir
    return p.startsWith("/") ? `${apiUrl}${p}` : p;
  })();

  const href = "/documents/SürdürülebilirlikRaporu2024-2025.pptx";

  const handleClick = (e) => {
    e.preventDefault();
    if (window.confirm("Sunumu indirmek istediğinize emin misiniz?")) {
      window.open(href, "_blank");
    }
  };

  return (
    <div className="flex flex-col max-w-screen min-h-screen items-center justify-start">
      {/* Prop adından emin değilsek hepsini verelim */}
      <Banner img={bannerSrc} image={bannerSrc} src={bannerSrc} span="" header="Sustainability" />

      <a
        href={href}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-[10px] px-[20px] mt-10 text-[20px] cursor-pointer border-b hover:text-lagoBlack2 hover:border-lagoBlack2 hover:font-medium whitespace-nowrap font-jost"
      >
        Sürdürülebilirlik Raporu 2024-2025
      </a>

      <ExploreManavgat />
    </div>
  );
}