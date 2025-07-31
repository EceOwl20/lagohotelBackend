"use client";
import React, { useEffect, useState } from "react";
import mainImg from "./images/specialMain.webp"
import SpecialTypesSection from './components/SpecialTypesSection'
import SpecialGridSection from './components/SpecialGridSection'
import SpecialInfoSection from './components/SpecialInfoSection'
import SpecialCarousel from './components/SpecialCarousel'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import BannerDark from '../GeneralComponents/BannerDark'
import { useLocale, useTranslations } from 'next-intl';

const page = () => {
  const t = useTranslations('Special');

   const locale = useLocale(); // "tr", "en", "de", "ru"
     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    const [pageData, setPageData] = useState(null);
        useEffect(() => {
          fetch(`${apiUrl}/api/pages/special`)
            .then(r => r.json())
            .then(json => setPageData(json))
            .catch(console.error);
        }, [apiUrl]);
      
        if (!pageData) return <p className="p-10">Yükleniyor…</p>;
    
          //const spaSection = pageData?.infoSection;
    
          const imgBanner = pageData.banner?.image
          ? pageData.banner.image.startsWith("/")
            ? `${apiUrl}${pageData.banner.image}`
            : pageData.banner.image
          : "";
  
  

  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px]  lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <BannerDark span={pageData.banner?.subtitle?.[locale]} header={pageData.banner?.title?.[locale]} text={pageData.banner?.text?.[locale]} img={imgBanner}/>
      <SpecialTypesSection/>
      <SpecialGridSection/>
      <SpecialInfoSection/>
      <SpecialCarousel/>
      <ContactSection2/>
    </div>
  )
}

export default page
