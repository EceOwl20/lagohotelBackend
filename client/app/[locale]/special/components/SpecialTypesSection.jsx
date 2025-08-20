"use client";
import React, { useEffect, useState } from "react";
import honeymoon from "../images/honeymoon.webp";
import proposal from "../images/proposal.webp";
import wedding from "../images/wedding.webp";
import birthday from "../images/birthdayuzun.webp";
import pavilion from "../images/pavilion.webp";
import flowers from "../images/flowers.webp";
import { useLocale, useTranslations } from 'next-intl';

const SpecialTypesSection = () => {

   const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    const [pageData, setPageData] = useState(null);
        useEffect(() => {
          fetch(`${apiUrl}/api/pages/special`)
            .then(r => r.json())
            .then(json => setPageData(json))
            .catch(console.error);
        }, [apiUrl]);
    
const conceptImages = (pageData?.types?.items || []).map(item => {
  if (!item.image) return "";
  return item.image.startsWith("/")
    ? `${apiUrl}${item.image}`
    : item.image;
});


    const t = useTranslations('Special.InfoSection');
    
  const concepts = {
    [pageData?.types?.items?.[0]?.key?.[locale]]: {
      title: pageData?.types?.items?.[0]?.title?.[locale],
      description:
      pageData?.types?.items?.[0]?.text?.[locale],
      image: conceptImages[0],
      subtitle: pageData?.types?.items?.[0]?.subtitle?.[locale]
    },
    [pageData?.types?.items?.[1]?.key?.[locale]]: {
      title: pageData?.types?.items?.[1]?.title?.[locale],
      description:
      pageData?.types?.items?.[1]?.text?.[locale],
      image: conceptImages[1],
      subtitle: pageData?.types?.items?.[1]?.subtitle?.[locale]
    },
    // [t("key5")]: {
    //   title: t("title5"),
    //   description:
    //   t("text5"),
    //   image: wedding,
    // },
   [pageData?.types?.items?.[2]?.key?.[locale]]: {
      title: pageData?.types?.items?.[2]?.title?.[locale],
      description:
      pageData?.types?.items?.[2]?.text?.[locale],
      image: conceptImages[2],
      subtitle: pageData?.types?.items?.[2]?.subtitle?.[locale]
    },
   [pageData?.types?.items?.[3]?.key?.[locale]]: {
      title: pageData?.types?.items?.[3]?.title?.[locale],
      description:
      pageData?.types?.items?.[3]?.text?.[locale],
      image: conceptImages[3],
      subtitle: pageData?.types?.items?.[3]?.subtitle?.[locale]
    },
   [pageData?.types?.items?.[4]?.key?.[locale]]: {
      title: pageData?.types?.items?.[4]?.title?.[locale],
      description:
      pageData?.types?.items?.[4]?.text?.[locale],
      image: conceptImages[4],
      subtitle: pageData?.types?.items?.[4]?.subtitle?.[locale]
    },
  };

 const conceptKeys = Object.keys(concepts);
const [selectedConcept, setSelectedConcept] = useState(null);

// pageData yüklendiğinde ilk elemanı seç
useEffect(() => {
  if (conceptKeys.length > 0) {
    setSelectedConcept(concepts[conceptKeys[0]]);
  }
}, [pageData]);



  if (!pageData) return <p className="p-10">Yükleniyor…</p>;
  
  return (
    <div className="flex flex-col w-screen items-center justify-center gap-[30px] lg:gap-[50px]">
      {/* Başlık Alanı */}
      <div className="flex flex-col items-center justify-center text-center w-[89.79%%] md:w-[91.4%] lg:w-[76.8%] gap-[15px] md:gap-[25px] lg:gap-[35px]">
        <span className="text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase font-jost">
         {pageData.types?.title?.[locale]}
        </span>
        <h3 className="text-[28px] md:text-[32px] lg:text-[48px] font-normal leading-[120%] lg:leading-[57.6px] text-lagoBlack lg:capsizedText2 font-marcellus capitalize">
         {pageData.types?.subtitle?.[locale]}
        </h3>
        <p className="text-[14px] lg:text-[16px] font-normal leading-[24px] w-[90%] md:w-[55%] lg:w-[598px] lg:capsizedText4 font-jost">
        {pageData.types?.text?.[locale]}
        </p>
      </div>

      <div className="flex flex-col w-full">
        {/* Linkler */}
        <div className="flex w-full justify-center items-center bg-[#EDEDED] max-h-[105px]">
          <div className="flex w-[90%] md:w-[80%] justify-between items-center py-[42px] gap-[15px] md:gap-[43px] text-black font-marcellus text-[14px] md:text-[20px] lg:text-[28px] font-normal leading-[120%] lg:leading-[57.6px] overflow-x-scroll">
            {Object.keys(concepts).map((concept) => (
              <button
                key={concept}
                className={`hover:underline ${
                  selectedConcept.title === concept ? "text-gray-700 font-bold" : "text-black"
                }`}
                onClick={() => setSelectedConcept(concepts[concept])}
              >
                {concept}
              </button>
            ))}
          </div>
        </div>

        {/* Dinamik İçerik */}
        <div
          className="flex w-screen h-[51vh] 2xl:h-[53vh] items-end justify-end bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${selectedConcept.image})` }}
        >
          <div className="flex h-full w-full md:w-[45%] items-center justify-center bg-[#2D2D26]/50">
            <div className="flex flex-col items-start justify-center w-[89.79%] ml-[6.1%] md:w-[80%] gap-[35px] text-white font-jost text-start">
              <span className="text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase">{selectedConcept.title}</span>
              <h2 className="text-[26px] capitalize lg:text-[30px] md:text-[44px] font-marcellus font-normal leading-[120%] lg:leading-[57.6px] lg:capsizedText2">{selectedConcept.title}</h2>
              <p className="text-[14px] lg:text-[16px] font-normal leading-[24px] w-[90%] md:w-[80%] 2xl:w-[73%] lg:capsizedText4 lg:min-w-[443px]">{selectedConcept.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialTypesSection;
