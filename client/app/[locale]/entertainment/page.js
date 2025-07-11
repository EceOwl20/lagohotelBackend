"use client"
import React, { useState, useEffect } from "react";
import MainBannerSection from './components/MainBannerSection'
import mainImg from "./images/eglence.webp"
import ActivitiesSection from './components/ActivitiesSection'
import EntertainmentTypesSection from './components/EntertainmentTypesSection'
import ActivityBackgroundSection from './components/ActivityBackgroundSection'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import { useLocale, useTranslations } from 'next-intl';

const page = () => {
  const locale = useLocale(); // "tr", "en", "de", "ru"

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


  const bannerImg = pageData.mainBanner?.image
    ? pageData.mainBanner.image.startsWith("/")
      ? `${apiUrl}${pageData.mainBanner.image}`
      : pageData.mainBanner.image
    : "";
  

  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
      <MainBannerSection img={bannerImg}/>
      <ActivitiesSection/>
      <EntertainmentTypesSection/>
      <ActivityBackgroundSection/>
      <ContactSection2/>
    </div>
  )
}

export default page
