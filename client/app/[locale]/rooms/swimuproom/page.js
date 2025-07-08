"use client"
import React, { useState, useEffect } from 'react'
import SubRoomBanner from '../familyswimup/components/SubRoomBanner'
import SubroomCarousel from '../familyswimup/components/SubroomCarousel'
import RoomFeatures from '../familyswimup/components/RoomFeatures'
import BackgroundSection from '../familyswimup/components/BackgroundSection'
import RoomTour from '../familyswimup/components/RoomTour'
import OtherOptions from '../familyswimup/components/OtherOptions'
import backgroundImg from "../familyswimup/images/odafull.webp"
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'
import { useLocale, useTranslations } from 'next-intl';
import { ROOM_URL_TO_SLUG } from "@/utils/routeMap"; // doğru yolu ayarla
import { usePathname } from "next/navigation";
import img1 from "./images/SRF_2131.jpg";
import img2 from "./images/SRF_2136.jpg";
import img3 from "./images/SRF_2163.jpg";
import img4 from "./images/SRF_2167.jpg";


const page = () => {
  const t = useTranslations('SwimupRoom');
  const t2 = useTranslations('SwimupRoom.RoomInfo');
  const t3 = useTranslations('SwimupRoom.RoomTour');
  const t4 = useTranslations('SwimupRoom.BackgroundSection');
  
  const backgroundTexts=[t4("text1"),t4("text2"),t4("text3")]

  const iconTexts=[t2("list1"),t2("list2"),t2("list3")];
  const carouselImages = [img1,,img2,img3,img4,img1,img2,img3,img4];

   const locale = useLocale();                  // "tr", "en", "de", "ru"
    const pathname = usePathname();              // "/tr/rooms/superiorroom"
    const segment = pathname.split("/").pop();    // "superiorroom"
    const slug = ROOM_URL_TO_SLUG[locale]?.[segment];
  
    const [pageData, setPageData] = useState(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // "http://localhost:5001"
  
    useEffect(() => {
      if (!slug) {
        console.error("Unknown segment for slug:", segment);
        return;
      }
      fetch(`${apiUrl}/api/pages/rooms/subroom/${slug}`)
        .then(res => {
          if (!res.ok) throw new Error(`Fetch error ${res.status}`);
          return res.json();
        })
        .then(json => setPageData(json))
        .catch(err => console.error("Subroom fetch failed:", err));
    }, [apiUrl, slug, segment]);
  
    if (!pageData) {
      return (
        <div className="p-10">
          <p>Yükleniyor…</p>
          <p>segment: {segment}</p>
          <p>mapped slug: {slug}</p>
        </div>
      );
    }

      const subroomBannerText=[pageData.banner.texts[0]?.[locale], pageData.banner.texts[1]?.[locale], pageData.banner.texts[2]?.[locale]]

  return (
    <div className=' overflow-hidden flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col'>
     <SubRoomBanner img={img3} span={pageData.banner.subtitle?.[locale] } header={pageData.banner.title?.[locale] } texts={subroomBannerText} baby={true}/>
     <SubroomCarousel images={carouselImages}/>
     </div>
      <RoomFeatures span={pageData.features.span?.[locale] } header={pageData.features.header?.[locale] } text={pageData.features.text?.[locale] } header2={pageData.features.header2?.[locale] } header3={pageData.features.header3?.[locale] }  text2={pageData.features.text2?.[locale] } iconsTexts={iconTexts}  roomName="SwimupRoom" pool={true}/>
      <BackgroundSection span={t4("subtitle")} header={t4("title")} texts={backgroundTexts} link="/" img={backgroundImg}/>
      
      <RoomTour span={pageData.tours?.[0]?.subtitle?.[locale]} header={pageData.tours?.[0]?.title?.[locale]} text={pageData.tours?.[0]?.text?.[locale] } link={pageData.tours?.[0]?.link}/>
      <RoomTour span={pageData.tours?.[1]?.subtitle?.[locale]} header={pageData.tours?.[1]?.title?.[locale]} text={pageData.tours?.[1]?.text?.[locale] } link={pageData.tours?.[1]?.link}/>
      <OtherOptions/>
      <ContactSection2/>
    </div>
  )
}

export default page
