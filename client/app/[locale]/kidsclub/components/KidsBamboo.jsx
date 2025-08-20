"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import bamboo from "../images/bamboo2.png";
import miniclub from "../images/1kids.webp";
import juniorclub from "../images/childactivite-1.webp";
import teenageclub from "../images/kids3.webp";
import { useLocale, useTranslations } from 'next-intl';

const KidsBamboo = () => {
  const t = useTranslations('KidsClub.InfoSection');
  
      const locale = useLocale(); // "tr", "en", "de", "ru"
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  const [emblaRef, emblaApi] = useEmblaCarousel({  loop: true,
    align: "start",
    startIndex: 0, });

  const [selectedIndex, setSelectedIndex] = useState(0);
    
  const scrollPrev = useCallback(() => {
    if (emblaApi && emblaApi.scrollPrev) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi && emblaApi.scrollNext) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const [pageData, setPageData] = useState(null);
      useEffect(() => {
        fetch(`${apiUrl}/api/pages/kidsclub`)
          .then(r => r.json())
          .then(json => setPageData(json))
          .catch(console.error);
      }, [apiUrl]);
    
      if (!pageData) return <p className="p-10">Yükleniyor…</p>;

        const bambooImg = pageData.kidsBamboo?.image
      ? pageData.kidsBamboo.image.startsWith("/")
        ? `${apiUrl}${pageData.kidsBamboo.image}`
        : pageData.kidsBamboo.image
      : "";

       const clubs = (pageData.kidsBamboo.clubData || []).map(item => {
  if (!item.image) return "";                  
  return item.image.startsWith("/")
    ? `${apiUrl}${item.image}`                 
    : item.image;                          
});

const club1 = clubs[0];
const club2 = clubs[1];
const club3 = clubs[2];

  const clubItems = [
    {
      id: 1,
      ageGroup: pageData.kidsBamboo.clubData?.[0]?.ageGroup?.[locale],
      title: pageData.kidsBamboo.clubData?.[0]?.title?.[locale],
      description:pageData.kidsBamboo.clubData?.[0]?.description?.[locale],
      image: club1,
    },
    {
      id: 2,
     ageGroup: pageData.kidsBamboo.clubData?.[1]?.ageGroup?.[locale],
      title: pageData.kidsBamboo.clubData?.[1]?.title?.[locale],
      description:pageData.kidsBamboo.clubData?.[1]?.description?.[locale],
      image: club2,
    },
    {
      id: 3,
      ageGroup: pageData.kidsBamboo.clubData?.[2]?.ageGroup?.[locale],
      title: pageData.kidsBamboo.clubData?.[2]?.title?.[locale],
      description:pageData.kidsBamboo.clubData?.[2]?.description?.[locale],
      image: club3,
    },
  ];
  

  return (
    <div className="flex flex-col w-screen items-center justify-center h-auto gap-[30px] lg:gap-[50px] lg:max-w-[1440px]">
      {/* Başlık Alanı */}
      <div className="flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[14px] justify-start items-start font-jost text-black">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[66px] w-full">
          <Image
            src={bamboo}
            alt="bamboo"
            width={633}
            height={188}
            className="lg:w-[59%] flex"
          />
          <div className="flex flex-col gap-[17px] items-start justify-center text-start lg:w-[39%]">
            <span className="text-[12px] font-medium leading-[26px] uppercase">
            {pageData.kidsBamboo?.subtitle?.[locale]}
            </span>
            <h3 className="text-[25px] lg:text-[30px] leading-[26px] font-normal font-marcellus lg:capsizedText3">
            {pageData.kidsBamboo?.title?.[locale]}
            </h3>
            <p className="text-[14px] lg:text-[16px] leading-[18px] lg:leading-[24px] font-normal">
            {pageData.kidsBamboo?.text?.[locale]}
            </p>
          </div>
        </div>
        <span className="text-[12px] lg:text-[14px] font-medium uppercase leading-[21px]">
        {pageData.kidsBamboo?.span?.[locale]}
        </span>
      </div>

      {/* Club Kartları */}
      <div className="hidden lg:flex flex-col md:flex-row gap-[28px] w-[87.79%] md:w-[91.4%] lg:w-[76.8%] justify-between items-center text-white font-jost">
        {clubItems.map((club) => (
          <div
            key={club.id}
            className="flex flex-col w-[70%] md:w-[33%] items-center justify-end pb-6 h-[300px] md:h-[360px] lg:h-[510px] bg-center bg-cover relative group overflow-y-hidden"
            style={{ backgroundImage: `url(${club.image})` }}
          >
            {/* Hafif karartma (her zaman görünür) */}
            <div className="absolute bg-black/10 inset-0 z-1"></div>

            {/* Normal Başlık ve Alt Yazı (Hover'da kaybolacak) */}
            <div className="flex flex-col w-5/6 items-start justify-end z-10 lg:gap-[25px] pointer-events-none">
              <span className="text-[12px] font-normal uppercase tracking-[0.48px] leading-[14px] transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0">
                {club.ageGroup}
              </span>
              <h4 className="text-[25px] lg:text-[30px] leading-[120%] lg:leading-[57.6px] font-marcellus font-normal capitalize transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0">
                {club.title}
              </h4>
            </div>

            {/* Tam Karartma (Hover ile açılacak) */}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Hover ile Aşağıdan Kayan İçerik */}
            <div
              className="absolute inset-0 text-white flex flex-col justify-start items-center text-start font-montserrat gap-[20px] top-1/2 
              translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out h-[540px]"
            >
              <div className="flex flex-col w-5/6 lg:gap-[10px] items-start justify-center">
                <span className="text-[12px] font-normal uppercase tracking-[0.48px] leading-[14px]">
                  {club.ageGroup}
                </span>
                <h4 className="text-[30px] leading-[57.6px] font-marcellus font-normal capitalize">
                  {club.title}
                </h4>
                <div className="flex w-full h-[1px] bg-grayLight"></div>
                <p className="text-[11px]">{club.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* other options */}
      <div className="lg:hidden flex flex-col gap-6 w-[87.79%] md:w-[91.4%] lg:w-[76.8%]">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex items-start justify-start w-full">
            {clubItems.map((club,index) => (
              <div
                key={index}
                className="flex-[0_0_auto] h-[390px] min-w-0 mr-[1.5%]"
              >
                <div className="flex flex-col relative w-full items-start text-start justify-center gap-[15px] lg:gap-[20px] font-jost text-black ">
                  <Image
                    src={club.image}
                    alt={club.title || "Kulüp Kartı Görseli"}
                    width={349.97}
                    height={510}
                     className="flex h-[383px] md:h-[400px] w-auto md:w-full"
                  />
                  <div className="absolute inset-0 bg-black/40 z-[1]"></div>
                  <div className="absolute bottom-[30px] left-[30px] text-white z-20">
                  <span className="text-[12px] font-normal uppercase tracking-[0.48px] leading-[14px]">
                {club.ageGroup}
              </span>
              <h4 className="text-[25px] leading-[120%] font-marcellus font-normal ">
                {club.title}
              </h4>
                  </div>
                
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex lg:hidden items-end justify-end w-full mt-[0px] md:mt-[20px] xl:mt-[50px] relative">
  {clubItems.map((_, i) => (
    <div
      key={i}
      className={`transition-all w-[33.3%] h-[1px] bg-[#24292C] rounded-full ${
        selectedIndex === i ? "p-[1px]" : "bg-[#848383] "
      }`}
      onClick={() => handleJump(i)}
    />
  ))}
</div>
        </div>

      <span className="text-[14px] text-lagoGray font-jost leading-[26px] font-normal text-center">
      {pageData.kidsBamboo?.note?.[locale]}
      </span>
    </div>
  );
};

export default KidsBamboo;
