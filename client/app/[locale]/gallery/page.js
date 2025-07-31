"use client";
import React, { useEffect, useState } from "react";
import MainBanner2 from '../GeneralComponents/MainBanner2'
import mainImg from "./images/maingallery.webp"
import GalleryScrollSection from './components/GalleryScrollSection'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import { useLocale, useTranslations} from 'next-intl';

const page = () => {
  const t = useTranslations('Gallery');

  const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

   const [pageData, setPageData] = useState(null);
          useEffect(() => {
            fetch(`${apiUrl}/api/pages/gallery`)
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
    <div className='flex flex-col items-center justify-center overflow-hidden gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col items-center justify-center'>
     <MainBanner2 img={imgBanner} span={pageData.banner?.subtitle?.[locale]} header={pageData.banner?.title?.[locale]}/>
     <GalleryScrollSection/>
     </div>
      <ContactSection2/>
    </div>
  )
}

export default page
