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

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const page = () => {
  const t = useTranslations('SwimupRoom');
  const t2 = useTranslations('SwimupRoom.RoomInfo');
  const t3 = useTranslations('SwimupRoom.RoomTour');
  const t4 = useTranslations('SwimupRoom.BackgroundSection');
  
   const locale = useLocale(); // "tr", "en", "de", "ru"
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `${apiUrl}/api/pages/rooms/subroom/SwimupRoom?lang=${locale}`
          );
          const json = await res.json();
          setData(json);
        } catch (e) {
          setData({ error: "Oda verisi alınamadı!" });
        }
      };
      fetchData();
    }, [locale]);
  
    if (!data) return <p className="p-10">Yükleniyor...</p>;
    if (data.error) return <div className="text-red-500">{data.error}</div>;
    if (!data.banner) return <div>Oda verisi eksik!</div>;
  

  return (
    <div className=' overflow-hidden flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col'>
      <SubRoomBanner
          img={apiUrl + data.banner.image}
          span={data.banner.subtitle?.[locale] }
          header={data.banner.title?.[locale] }
          texts={(data.banner.texts || []).map(t => t?.[locale] )}
          baby={data.banner.baby}
        />
        <SubroomCarousel
          images={(data.carousel || []).map(url => apiUrl + url)}
        />
      </div>
      <RoomFeatures
        span={data.features.span?.[locale] }
        header={data.features.header?.[locale] }
        text={data.features.text?.[locale] }
        header2={data.features.header2?.[locale] }
        header3={data.features.header3?.[locale] }
        text2={data.features.text2?.[locale] }
      iconsTexts={data.features.iconsTexts.map(({ text }) => text[locale] || "")}
        roomName="SwimupRoom"
        pool={data.features.pool}
      />
      <BackgroundSection
        span={data.background.subtitle?.[locale] }
        header={data.background.title?.[locale] }
        texts={(data.background.texts || []).map(t => t?.[locale] )}
        link={data.background.link}
        img={apiUrl + data.background.image}
      />
      {(data.tours || []).map((tour, i) => (
        <RoomTour
          key={i}
          span={tour.subtitle?.[locale] }
          header={tour.title?.[locale] }
          text={tour.text?.[locale] }
          link={tour.link}
        />
      ))}
      <OtherOptions />
      <ContactSection2 />
    </div>
  )
}

export default page
