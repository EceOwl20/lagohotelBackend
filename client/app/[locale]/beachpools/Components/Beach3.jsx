"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Slider from "../../HomePage/Components/Slider/Slider2"
import Slide1 from '../Images/Slide/swim.png'
import Slide2 from '../Images/Slide/beachbar.png'
import Slide3 from '../Images/Slide/watersport.png'
import Slide4 from '../Images/Slide/celebration.png'

const Beach3 = () => {
  const t = useTranslations('BeachPools.Carousel');

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
      
          const videoUrl = pageData.poolSection?.video
            ? pageData.poolSection.video.startsWith("/")
              ? `${apiUrl}${pageData.poolSection.video}`
              : pageData.poolSection.video
            : "";


    const slides = [
        { src: Slide1, title: pageData.carousel.carouselItem?.[0]?.title?.[locale], span:pageData.carousel.carouselItem?.[0]?.span?.[locale] },
        { src: Slide2, title:pageData.carousel.carouselItem?.[1]?.title?.[locale], span:pageData.carousel.carouselItem?.[1]?.span?.[locale] },
        { src: Slide3, title: pageData.carousel.carouselItem?.[2]?.title?.[locale], span:pageData.carousel.carouselItem?.[2]?.span?.[locale] },
        { src: Slide4, title:pageData.carousel.carouselItem?.[3]?.title?.[locale], span:pageData.carousel.carouselItem?.[3]?.span?.[locale] },
      ]

  return (
    <div className='flex flex-col w-full gap-[30px] lg:gap-[50px] items-center justify-center'>
        <div className='flex flex-col gap-[20px] md:gap-[25px] lg:gap-[35px] w-[87.79%] md:w-[91.4%] lg:w-[76.8%] ml-[6.1%] md:ml-0 items-start justify-center text-start'>
          <p className='font-jost text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase'>{pageData.carousel?.subtitle?.[locale]}</p>
          <h3 className='font-marcellus text-[28px] md:text-[32px] lg:text-[48px] font-normal leading-[120%] lg:leading-[57.6px] capsizedText2'>{pageData.carousel?.title?.[locale]}</h3>
          <p className='font-jost text-[14px] lg:text-[16px] font-normal leading-normal lg:leading-[24px] capsizedText4 w-full md:max-w-[85%] lg:max-w-[727px]'>{pageData.carousel?.text?.[locale]}</p>
        </div>
        <Slider slides={slides} />
    </div>
  )
}

export default Beach3