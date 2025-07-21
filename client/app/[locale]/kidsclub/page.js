"use client";
import React, { useEffect, useState } from "react";
import MainBannerSection from '../GeneralComponents/MainBannerSection'
import image from "./images/mainkids.webp"
import KidsBamboo from './components/KidsBamboo'
import KidsIconsSection from './components/KidsIconsSection'
import KidsclubCarousel from './components/KidsclubCarousel'
import ContactSection from '../GeneralComponents/Contact/ContactSection'
import kids1 from "./images/AquaMaldiva.webp"
import kids2 from "./images/KIDS2.webp"
import kids3 from "./images/KIDS.webp"
import CuisinesCarousel from '../restaurants/components/CuisinesCarousel'
import KidsRestaurantCarousel from './components/KidsRestaurantCarousel'
import KidsMomentCarousel from './components/KidsMomentCarousel'
import img1 from "./images/SRF_4307 (2).webp"
import img2 from "./images/SRF_3813.webp"
import img3 from "./images/SRF_4487.webp"
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import RestaurantMainBanner from '../restaurants/components/RestaurantMainBanner'
import { useLocale, useTranslations } from 'next-intl';

const momentImages=[img1,img2,img3]

const page = () => {
  const t = useTranslations('KidsClub')
  const t2 = useTranslations('KidsClub.CuisinesCarousel');

   const locale = useLocale(); // "tr", "en", "de", "ru"
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [pageData, setPageData] = useState(null);
      useEffect(() => {
        fetch(`${apiUrl}/api/pages/kidsclub`)
          .then(r => r.json())
          .then(json => setPageData(json))
          .catch(console.error);
      }, [apiUrl]);
    
      if (!pageData) return <p className="p-10">Yükleniyor…</p>;
  
        //const spaSection = pageData?.infoSection;
  
        const imgBanner = pageData.mainBanner?.image
        ? pageData.mainBanner.image.startsWith("/")
          ? `${apiUrl}${pageData.mainBanner.image}`
          : pageData.mainBanner.image
        : "";


const kids = [
  {
    id: 1,
    img: kids1,
    title: t2("cuisines1title"),
    description: t2("cuisines1subtitle"),
    text:t2("cuisines1text"),
    link:"/",
    buttonText:t2("buttonText")
  },
  {
    id: 2,
    img: kids2,
    title: t2("cuisines2title"),
    description: t2("cuisines2subtitle"),
    text:t2("cuisines2text"),
     link:"/",
     buttonText:t2("buttonText")
  },
  {
    id: 3,
    img: kids3,
    title: t2("cuisines3title"),
    description: t2("cuisines3subtitle"),
    text:t2("cuisines3text"),
     link:"/",
     buttonText:t2("buttonText")
  }
];

  return (
    <div className='overflow-hidden flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
      <RestaurantMainBanner img={imgBanner} span={pageData.mainBanner?.subtitle?.[locale]} header={pageData.mainBanner?.title?.[locale]} text={pageData.mainBanner?.text?.[locale]}/>
      <KidsBamboo/>
      <KidsIconsSection/>
      <KidsclubCarousel/>
      <KidsRestaurantCarousel/>
      <CuisinesCarousel span={t2("subtitle")} header={t2("title")} text={t2("text")} cuisines={kids}/>
      <KidsMomentCarousel showheader={true} images={momentImages} header={t("gallerytitle")}/>
      <ContactSection2/>
    </div>
  )
}

export default page
