"use client"
import React from 'react'

const trainings = [
  { href: "/documents/YanginEgitimi.pptx", label: "Yangın Eğitimi" },
  { href: "/documents/TEHLiKELiMADDEEGiTiMi.pptx", label: "Tehlikeli Madde Eğitimi" },
  { href: "/documents/KimyasalEgitimi.pptx", label: "Kimyasal Eğitimi" },
  { href: "/documents/GdaGuvenligiEgitimi.pptx", label: "Gıda Güvenliği Eğitimi" },
  { href: "/documents/EngelliBireylerileiletisimEgitimi.pptx", label: "Engelli Bireyler İle İletişim Eğitimi" },
  { href: "/documents/cocukistismariegitimi.pptx", label: "Çocuk İstismarı Eğitimi" },
  { href: "/documents/Alkol-MaddeEgitimi.pptx", label: "Alkol Madde Eğitimi" },
];

const EgitimSection = () => {
  const handleDownload = (e, href, label) => {
    e.preventDefault();
    if (window.confirm(`“${label}” dosyasını indirmek istediğinize emin misiniz?`)) {
      window.open(href, "_blank");
    }
  };

  return (
    <div className='flex flex-col h-[65vh] gap-10 items-center justify-start'>
      <div className='flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[80%] items-center justify-center text-center gap-[50px]'>
        <h4 className='text-[28px] lg:text-[36px] font-marcellus'>Eğitimlerimiz</h4>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 text-lagoGray'>
          {trainings.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleDownload(e, href, label)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-[10px] px-[20px] text-[20px] cursor-pointer border-b hover:text-lagoBlack2 hover:border-lagoBlack2 hover:font-medium whitespace-nowrap font-jost"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EgitimSection
