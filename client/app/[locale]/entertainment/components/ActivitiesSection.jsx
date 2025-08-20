"use client"
import React, { useState, useEffect } from "react";
import Image from 'next/image'
import daytime from "../images/Daytime_fin.jpg"
import nighttime from "../images/Nighttme_fin.jpg"
import LSvg from './LSvg'
import ASvg from './ASvg'
import GSvg from './GSvg'
import OSvg from './OSvg'
import { useLocale, useTranslations } from 'next-intl';

const ActivitiesSection = () => {
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const t = useTranslations('Entertainment');
  const t2 = useTranslations('Entertainment.InfoSection');

  const [pageData, setPageData] = useState(null);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
        
          useEffect(() => {
            const fetchPageData = async () => {
              try {
              const res = await fetch(`${apiUrl}/api/pages/entertainment`);
                const json = await res.json();
                setPageData(json);
              } catch (err) {
                console.error("Anasayfa verisi alınamadı:", err.message);
              }
            };
        
            fetchPageData();
          }, []);
        
          if (!pageData) return <p className="p-10">Yükleniyor...</p>;

            const image1 = pageData.activitiesSection?.image1
    ? pageData.activitiesSection.image1.startsWith("/")
      ? `${apiUrl}${pageData.activitiesSection.image1}`
      : pageData.activitiesSection.image1
    : "";

      const image2 = pageData.activitiesSection?.image2
    ? pageData.activitiesSection.image2.startsWith("/")
      ? `${apiUrl}${pageData.activitiesSection.image2}`
      : pageData.activitiesSection.image2
    : "";

  return (
    <div className='flex w-screen h-auto  items-center justify-center'>
      <div className='flex flex-col w-full items-center justify-center gap-[30px] lg:gap-[50px]'>
        <div className='flex flex-col  w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[15px] md:gap-[25px] lg:gap-[35px] items-center justify-center text-black font-jost text-center max-w-[1106px]'>
            <span className='text-[12px] leading-[14px] font-medium uppercase tracking-[0.48px]'>{pageData.activitiesSection?.subtitle?.[locale]}</span>
            <h2 className='text-[28px] md:text-[32px] lg:text-[48px] leading-[120%] lg:leading-[57.6px] font-normal font-marcellus lg:capsizedText2'>{pageData.activitiesSection?.title?.[locale]}</h2>
            <p className='text-[14px] leading-[18px] lg.text-[16px] font-normal lg:leading-[24px] lg:w-[55%]'>{pageData.activitiesSection?.text?.[locale]}</p>
        </div>

        <div className='flex w-full items-center justify-center relative max-w-[1440px]'>
           <div className='flex flex-col md:flex-row  w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[20px] lg:gap-[30px] items-center justify-center '>

           <div className='flex flex-col  w-[300px] md:w-[538px] h-full relative'>
           <Image src={image1}  loading="lazy" alt="daytime" width={538} height={600} className='w-full'/>
           <div className='flex flex-col absolute bottom-[38px] left-[35px] items-start justify-center text-start gap-[25px] pb-[10px] text-white '>
            <span className='text-[12px] font-normal uppercase  font-jost leading-normal tracking-[0.48px]'>{pageData.activitiesSection?.info1?.title?.[locale]}</span>
            <h4 className='font-marcellus text-[30px] font-normal capsizedText3 leading-[40px]' >{pageData.activitiesSection?.info1?.text?.[locale]}</h4>
           </div>
           </div>
           
            <div className='flex flex-col w-[300px] md:w-[538px] h-full relative'>
            <Image src={image2}  loading="lazy" alt="nighttime" width={538} height={600} className='w-full'/>
           <div className='flex flex-col absolute bottom-[38px] left-[35px] items-start justify-center text-start gap-[15px] md:gap-[25px] pb-[10px] text-white '>
            <span className='text-[12px] font-normal uppercase  font-jost leading-normal tracking-[0.48px]'>{pageData.activitiesSection?.info2?.title?.[locale]}</span>
            <h4 className='font-marcellus text-[30px] font-normal leading-[120%] lg:capsizedText3 '>{pageData.activitiesSection?.info2?.text?.[locale]}</h4>
           </div>
           </div>
           </div>

            <div className='absolute inset-0 items-center justify-between flex w-full'>
                <LSvg className="flex w-[15.5%] h-auto" />
                <ASvg className="flex w-[23.3%]  h-auto" />
                <GSvg className="flex w-[21.6%]  h-auto" />
                <OSvg className="flex w-[21.5%]  h-auto" />
            </div>
        </div>
       
      </div>
    </div>
  )
}

export default ActivitiesSection
