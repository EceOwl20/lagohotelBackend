"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import foto from "../Images/beachfull.webp";
import BirthDay from "../Images/Icons/BirthDay";
import Baloon from "../Images/Icons/Baloon";

const Beach2 = () => {
  const t = useTranslations('BeachPools.ImageBackground');
  // Arka plan resmi yoksa en azından "none" vererek olası hataların önüne geçebiliriz.

  const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [pageData, setPageData] = useState(null);
          useEffect(() => {
            fetch(`${apiUrl}/api/pages/beachpools`)
              .then(r => r.json())
              .then(json => setPageData(json))
              .catch(console.error);
          }, [apiUrl]);
        
          if (!pageData) return <p className="p-10">Yükleniyor…</p>;

      const imgBackground = pageData.imageBackground?.image
      ? pageData.imageBackground.image.startsWith("/")
        ? `${apiUrl}${pageData.imageBackground.image}`
        : pageData.imageBackground.image
      : "";

        const backgroundImage = imgBackground? `url(${imgBackground})` : "none";

  return (
    <div
      className="flex flex-col w-screen bg-cover bg-center h-[50vh] sm:h-[48vh] min-h-[532px] items-center md:items-start justify-center md:justify-start z-[90] relative"
      style={{ backgroundImage }}
    >
      {/* Yarı saydam siyah blok (arka plan) */}
      <div className="absolute inset-0 z-[1] bg-[#2D2D26]/50"> </div>
        <div className="flex flex-col h-full md:w-[46%] lg:gap-[35px] z-20 lg:min-w-[480px] max-w-[840px] text-start items-start justify-center  text-white w-[89.79%] ml-[6.10%] gap-[20px]">
        <p className="font-jost text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase ">
         {pageData.imageBackground?.subtitle?.[locale]}
        </p>
        <h3 className="font-marcellus text-[28px] md:text-[32px] lg:text-[48px] font-normal leading-[120%] lg:leading-[57.6px] lg:capsizedText2 ">
        {pageData.imageBackground?.title?.[locale]}
        </h3>
        <p className="font-jost text-[14px] lg:text-[16px] font-normal leading-[130%] lg:leading-[24px] lg:capsizedText4 w-[89.79%] lg:w-[65%] ">
        {pageData.imageBackground?.text1?.[locale]}
          
        </p>

        <span className="font-marcellus text-[18px] lg:text-[20px] font-normal leading-[130%] lg:leading-[24px] -tracking-[0.4px]  ">
        {pageData.imageBackground?.text2?.[locale]}
        </span>

        {/* İkonlar ve Yanlarındaki Yazılar */}
        <div className="flex flex-row w-[88%] gap-[15px] sm:gap-[2%] p-2 text-white justify-start items-start">
          <div className="flex items-center w-[49%] max-w-[233px] gap-[30px] bg-[#EBEBEB]/15 h-[60px]">
            <BirthDay width={35} height={35} className="flex p-[13px] bg-[#EBEBEB]/15"/>
            <span className="text-[14px] lg:text-[16px] font-marcellus leading-normal lg:leading-[30px] font-normal">   {pageData.imageBackground?.icon1Text?.[locale]}</span>
          </div>
          <div className="flex items-center w-[49%] max-w-[233px] gap-[30px] bg-[#EBEBEB]/15 h-[60px]">
            <Baloon width={35} height={35} className="flex p-[13px] bg-[#EBEBEB]/15"/>
            <span className="text-[14px] lg:text-[16px] font-marcellus leading-normal lg:leading-[30px] font-normal">   {pageData.imageBackground?.icon2Text?.[locale]}</span>
          </div>
        </div>
        </div>
   
    </div>
  );
};

export default Beach2;
