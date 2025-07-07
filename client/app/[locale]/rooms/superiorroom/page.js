"use client"
import React, { useState, useEffect } from 'react'
import SubRoomBanner from '../familyswimup/components/SubRoomBanner'
import SubroomCarousel from '../familyswimup/components/SubroomCarousel'
import RoomFeatures from '../familyswimup/components/RoomFeatures'
import RoomTour from '../familyswimup/components/RoomTour'
import OtherOptions from '../familyswimup/components/OtherOptions'
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'
import img1 from "./images/SRF_3999.jpg";
import img2 from "./images/SRF_4001.jpg";
import img3 from "./images/SRF_4008.jpg";
import img4 from "./images/SRF_4016.jpg";
import RoomsParallaxSection from '../components/RoomsParallaxSection'
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl';
import { ROOM_URL_TO_SLUG } from "@/utils/routeMap"; // doğru yolu ayarla
import { usePathname } from "next/navigation";

const Page = () => {
  const t = useTranslations('SuperiorRoom');
  const t2 = useTranslations('SuperiorRoom.RoomInfo');
  const t3 = useTranslations('SuperiorRoom.RoomTour');
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


  const subroomBannerText=[t("text1"),t("text2"),t("text3")]
  const iconTexts=[t2("list1"),t2("list2"),t2("list3")];

  const carouselImages = [img1,img2,img3,img4,img1,img2,img3,img4];

  return (
    <div className=' overflow-hidden flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col'>
     <SubRoomBanner img={img1} span={t("subtitle")} header={t("title")} texts={subroomBannerText} baby={true}/>
     <SubroomCarousel images={carouselImages}/>
     </div>
      <RoomFeatures span={t2("subtitle")} header={t2("title")} text={t2("text")} header2={t2("title2")} header3={t2("title3")}  text2={t2("text2")} iconsTexts={iconTexts}  roomName="SuperiorRoom" pool={false}/>
      <RoomsParallaxSection/>
      <RoomTour span={t3("subtitle")} header={t3("title")} text={t3("text")} link="https://kuula.co/share/collection/7by5f?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72"/>
      <RoomTour span={t3("subtitle2")} header={t3("title2")} text={t3("text2")} link="https://kuula.co/share/collection/7b230?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72"/>
      <OtherOptions/>
      <ContactSection2/>
    </div>
  )
}

export default Page
