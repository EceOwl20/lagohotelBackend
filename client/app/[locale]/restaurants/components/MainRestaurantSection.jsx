"use client"
import React, { useState, useEffect } from "react";
import img from "../images/magnafull.webp"
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl';

const MainRestaurantSection = () => {
  const t = useTranslations('Restaurants.MainRestaurantSection');
  const locale = useLocale(); // "tr", "en", "de", "ru"

   const [pageData, setPageData] = useState(null);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
      
        useEffect(() => {
          const fetchPageData = async () => {
            try {
            const res = await fetch(`${apiUrl}/api/pages/restaurants`);
              const json = await res.json();
              setPageData(json);
            } catch (err) {
              console.error("Anasayfa verisi alınamadı:", err.message);
            }
          };
      
          fetchPageData();
        }, []);
      
        if (!pageData) return <p className="p-10">Yükleniyor...</p>;
        
         const bannerImg = pageData.mainRestaurantSection?.image
            ? pageData.mainRestaurantSection.image.startsWith("/")
              ? `${apiUrl}${pageData.mainRestaurantSection.image}`
              : pageData.mainRestaurantSection.image
            : "";
        

  return (
    <div className='flex w-screen h-[45vh] min-h-[460px] items-center justify-center bg-center bg-cover  relative' style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className='absolute inset-0 z-[1] bg-lagoBlack/40'></div>
      <div className='flex w-[1106px] items-center md:items-start justify-center md:justify-start'>
      <div className='flex flex-col ml-0 md:ml-8 lg:ml-0 w-[87.79%] md:w-[91.4%] lg::w-[48.19%] items-center text-center md:text-start md:items-start justify-center gap-[20px] lg:gap-[30px] font-jost text-white z-10'>
        <span className='text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase'>{pageData.mainRestaurantSection?.subtitle?.[locale]}</span>
        <h3 className='text-[28px] md:text-[32px] lg:text-[48px] font-marcellus font-normal leading-[120%] lg:leading-[63.6094px] lg:capsizedText2'>{pageData.mainRestaurantSection?.title?.[locale]}</h3>
        <p className='text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[24px] list-disc capsizedText4 w-[50%]'>{pageData.mainRestaurantSection?.text?.[locale]}</p>
        <ul className='text-[14px] lg:text-[16px] font-normal leading-[18px] lg:leading-[24px] marker:text-[8px] pl-4 list-disc'>
            <li>{pageData.mainRestaurantSection?.list?.[0]?.[locale]}</li>
            <li>{pageData.mainRestaurantSection?.list?.[1]?.[locale]}</li>
            <li>{pageData.mainRestaurantSection?.list?.[2]?.[locale]}</li>
        </ul>
        <Link
            href={pageData.mainRestaurantSection.buttonLink}
            className="text-[14px] lg:text-[16px] font-normal leading-normal ml-[4px] font-marcellus uppercase border-b border-white pb-[8px] h-[24px] text-center w-auto items-center justify-center"
          >
            {pageData.mainRestaurantSection?.buttonText?.[locale]}
          </Link>
      </div>
      </div>
    </div>
  )
}

export default MainRestaurantSection
