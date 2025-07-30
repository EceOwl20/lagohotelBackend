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

  const [data, setData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

  useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(
              `${apiUrl}/api/pages/rooms/subroom/SuperiorRoom?lang=${locale}`
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
        roomName="SuperiorRoom"
        pool={data.features.pool}
      />
      <RoomsParallaxSection/>
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

export default Page


//https://kuula.co/share/collection/7by5f?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72
//https://kuula.co/share/collection/7b230?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72