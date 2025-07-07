"use client"
import React, { useState, useEffect } from "react";
import RoomsBanner from "./components/RoomsBanner";
import RoomsInfoSection from "./components/RoomsInfoSection";
import RoomsSection from "./components/RoomsSection";
import RoomsSectionReverse from "./components/RoomsSectionReverse";
import RoomsParallaxSection from "./components/RoomsParallaxSection";

import imgFamily from "./images/odalar2-1.webp";
import imgFamily2 from "./images/oda2-2.webp";
import imgSuperior from "./images/superiorRooms.png";
import imgSuperior2 from "./images/oda1-2.webp";

import imgSwim from "./images/oda3-1.webp";
import imgSwim2 from "./images/oda3-2.webp";

import imgFamilySwim from "./images/oda4-1.webp";
import imgFamilySwim2 from "./images/oda4-2.webp";

import imgTinyvilla from "./images/oda5-1.webp";
import imgTinyvilla2 from "./images/oda5-2.webp";

import imgDisable from "./disableroom/images/lago-engl1.webp"
import imgDisable2 from "./disableroom/images/lago-engl2.webp"

import imgDuplex from "./images/oda6-1.webp";
import imgDuplex2 from "./images/odalar6-2.webp";
import ContactSection2 from "../GeneralComponents/Contact/ContactSection2";
import { useLocale, useTranslations } from 'next-intl';

const Page = () => {
    const locale = useLocale(); // "tr", "en", "de", "ru"

  const room1 = useTranslations('Accommodation.RoomSection1');
  const room2 = useTranslations('Accommodation.RoomSection2');
  const room3 = useTranslations('Accommodation.RoomSection3');
  const room4 = useTranslations('Accommodation.RoomSection4');
  const room5 = useTranslations('Accommodation.RoomSection5');
  const room6 = useTranslations('Accommodation.RoomSection6');
  const room7 = useTranslations('Accommodation.RoomSection7');

  const [pageData, setPageData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
  
    useEffect(() => {
      const fetchPageData = async () => {
        try {
        const res = await fetch(`${apiUrl}/api/pages/rooms`);
          const json = await res.json();
          setPageData(json);
        } catch (err) {
          console.error("Anasayfa verisi alınamadı:", err.message);
        }
      };
  
      fetchPageData();
    }, []);
  
    if (!pageData) return <p className="p-10">Yükleniyor...</p>;


  return (
    <div className="overflow-hidden flex flex-col items-center justify-center gap-[50px] lg:gap-[100px] bg-[#fbfbfb]">
      <RoomsBanner roomsBanner={pageData.roomsBanner}/>
      <RoomsInfoSection roomsInfoSection={pageData.roomsInfoSection}/>
      <RoomsSection
      id="superiorroom"
        img={ pageData.roomSection1?.img
      ? `${apiUrl}${pageData.roomSection1.img}`
      : imgSuperior}
        img2={pageData.roomSection1?.img2
      ? `${apiUrl}${pageData.roomSection1.img2}`
      : imgSuperior2}
        header={pageData.roomSection1?.title?.[locale] || room1('title')}
        text={pageData.roomSection1?.subtitle?.[locale] || room1('subtitle')}
         span={pageData.roomSection1?.m?.[locale] || room1('m')}
        span2={pageData.roomSection1?.view?.[locale] || room1('view')}
        buttonText={pageData.roomSection1?.buttonText?.[locale] || room1('buttonText')}
        link={pageData.roomSection1?.buttonLink?.[locale]}
        //"/rooms/superiorroom" 
      />
      <RoomsSectionReverse
      id="familyroom"
      img={ pageData.roomSection2?.img
      ? `${apiUrl}${pageData.roomSection2.img}`
      : imgFamily}
        img2={pageData.roomSection2?.img2
      ? `${apiUrl}${pageData.roomSection2.img2}`
      : imgFamily2}
        header={pageData.roomSection2?.title?.[locale] || room2('title')}
        text={pageData.roomSection2?.subtitle?.[locale] || room2('subtitle')}
         span={pageData.roomSection2?.m?.[locale] || room2('m')}
        span2={pageData.roomSection2?.view?.[locale] || room2('view')}
        buttonText={pageData.roomSection2?.buttonText?.[locale] || room2('buttonText')}
        link={pageData.roomSection2?.buttonLink?.[locale]}
      />

      <RoomsSection
      id="swimuproom"
        img={ pageData.roomSection3?.img
      ? `${apiUrl}${pageData.roomSection3.img}`
      : imgFamily}
        img2={pageData.roomSection3?.img2
      ? `${apiUrl}${pageData.roomSection3.img2}`
      : imgFamily2}
        header={pageData.roomSection3?.title?.[locale] || room3('title')}
        text={pageData.roomSection3?.subtitle?.[locale] ||  room3('subtitle')}
         span={pageData.roomSection3?.m?.[locale] ||  room3('m')}
        span2={pageData.roomSection3?.view?.[locale] ||  room3('view')}
        buttonText={pageData.roomSection3?.buttonText?.[locale] ||  room3('buttonText')}
        link={pageData.roomSection3?.buttonLink?.[locale]}
      />
      <RoomsSectionReverse
       id="familyswimup"
         img={ pageData.roomSection4?.img
      ? `${apiUrl}${pageData.roomSection4.img}`
      : imgFamily}
        img2={pageData.roomSection4?.img2
      ? `${apiUrl}${pageData.roomSection4.img2}`
      : imgFamily2}
        header={pageData.roomSection4?.title?.[locale] || room4('title')}
        text={pageData.roomSection4?.subtitle?.[locale] ||  room4('subtitle')}
         span={pageData.roomSection4?.m?.[locale] ||  room4('m')}
        span2={pageData.roomSection4?.view?.[locale] ||  room4('view')}
        buttonText={pageData.roomSection4?.buttonText?.[locale] ||  room4('buttonText')}
        link={pageData.roomSection4?.buttonLink?.[locale]}
      />

      <RoomsSection
      id="duplexfamilyroom"
       img={ pageData.roomSection5?.img
      ? `${apiUrl}${pageData.roomSection5.img}`
      : imgFamily}
        img2={pageData.roomSection5?.img2
      ? `${apiUrl}${pageData.roomSection5.img2}`
      : imgFamily2}
        header={pageData.roomSection5?.title?.[locale] || room5('title')}
        text={pageData.roomSection5?.subtitle?.[locale] ||  room5('subtitle')}
         span={pageData.roomSection5?.m?.[locale] ||  room5('m')}
        span2={pageData.roomSection5?.view?.[locale] ||  room5('view')}
        buttonText={pageData.roomSection5?.buttonText?.[locale] ||  room5('buttonText')}
        link={pageData.roomSection5?.buttonLink?.[locale]}
      />

     <RoomsSectionReverse
      id="tinyvilla"
         img={ pageData.roomSection6?.img
      ? `${apiUrl}${pageData.roomSection6.img}`
      : imgFamily}
        img2={pageData.roomSection6?.img2
      ? `${apiUrl}${pageData.roomSection6.img2}`
      : imgFamily2}
        header={pageData.roomSection6?.title?.[locale] || room6('title')}
        text={pageData.roomSection6?.subtitle?.[locale] ||  room6('subtitle')}
         span={pageData.roomSection6?.m?.[locale] ||  room6('m')}
        span2={pageData.roomSection6?.view?.[locale] ||  room6('view')}
        buttonText={pageData.roomSection6?.buttonText?.[locale] ||  room6('buttonText')}
        link={pageData.roomSection6?.buttonLink?.[locale]}
      />

      <RoomsSection
      id="disableroom"
          img={ pageData.roomSection7?.img
      ? `${apiUrl}${pageData.roomSection7.img}`
      : imgFamily}
        img2={pageData.roomSection7?.img2
      ? `${apiUrl}${pageData.roomSection7.img2}`
      : imgFamily2}
        header={pageData.roomSection7?.title?.[locale] || room7('title')}
        text={pageData.roomSection7?.subtitle?.[locale] ||  room7('subtitle')}
         span={pageData.roomSection7?.m?.[locale] ||  room7('m')}
        span2={pageData.roomSection7?.view?.[locale] ||  room7('view')}
        buttonText={pageData.roomSection7?.buttonText?.[locale] ||  room7('buttonText')}
        link={pageData.roomSection7?.buttonLink?.[locale]}
      /> 

      <RoomsParallaxSection />
      <ContactSection2/>
    </div>
  );
};

export default Page;
