"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from 'next-intl';

const Beach4 = () => {
    const t = useTranslations('BeachPools.PoolSection');

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
    

  return (
    <div className='flex flex-col justify-center items-center w-full gap-[30px] lg:gap-[50px]'>
        <div className='flex flex-col justify-center items-center gap-[15px] md:gap-[25px] lg:gap-[35px] text-center w-[87.79%] md:w-[91.4%] lg:w-[76.8%]'>
            <p className='font-jost text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase'>{pageData.poolSection?.subtitle?.[locale]}</p>
            <h2 className='font-marcellus text-[28px] md:text-[32px] lg:text-[48px] leading-[120%] lg:leading-[57.6px] lg:capsizedText2'>{pageData.poolSection?.title?.[locale]}</h2>
            <p className='font-jost text-[14px] lg:text-[16px] leading-normal w-[90%] md:w-[70%] xl:w-[60%]'>{pageData.poolSection?.text?.[locale]}</p>
        </div>
        <div className="relative w-screen min-h-[calc(50vh+73px)] overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover object-center"
            >
                <source 
                src={videoUrl}
                type="video/mp4"
                />
                Tarayıcınız bu videoyu desteklemiyor.
            </video>
        </div>   
    </div>
  )
}

export default Beach4