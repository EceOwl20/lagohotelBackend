"use client";
import React, { useEffect, useState } from "react";
import MainBannerSection from '../GeneralComponents/MainBannerSection'
import mainImg from "./images/fitness.webp"
import SpaInfoSection from '../spawellness/components/SpaInfoSection'
import infoImg from "./images/Spa TReatments.webp"
import infoImg2 from "./images/Sauna and hamam (1).webp"
import SpaHeaderSection from '../spawellness/components/SpaHeaderSection'
import gallery1 from "./images/gallery1.webp"
import gallery2 from "./images/gallery2.webp"
import gallery3 from "./images/gallery3.webp"
import yoga from "./images/yogapilates.webp"
import zumba from "./images/zumba.webp"
import hitcardio from "./images/hitcardio.webp"
import step from "./images/step.webp"
import MassageCarousel from '../spawellness/components/MassageCarousel'
import Spa from '../HomePage/Components/Icons/Spa'
import SpaTypesInfoSection from '../spawellness/components/SpaTypesInfoSection'
import beachvolley from "./images/beachvoleyball.webp"
import personal from "./images/personal.webp"
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import { useLocale, useTranslations } from 'next-intl';

const page = () => {
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const t = useTranslations('Fitness');
  const t2 = useTranslations('Fitness.InfoSection');
  const t3 = useTranslations('Fitness.SpaGallery');
  const t4 = useTranslations('Fitness.Carousel');
  const t5 = useTranslations('Fitness.SpaType');

// sayfa verisini çek
    const [pageData, setPageData] = useState(null);
    useEffect(() => {
      fetch(`${apiUrl}/api/pages/fitness`)
        .then(r => r.json())
        .then(json => setPageData(json))
        .catch(console.error);
    }, [apiUrl]);
  
    if (!pageData) return <p className="p-10">Yükleniyor…</p>;
      const spaSection = pageData?.infoSection;


const raw = pageData.massageCarousel?.carouselCards || [];
const activitiesImage = [0,1,2,3].map(i => {
  const img = raw[i]?.image;
  if (!img) return null;
  return img.startsWith("/") ? `${apiUrl}${img}` : img;
}).filter(Boolean);

const activitiesHeaders=[pageData.massageCarousel?.carouselCards?.[0]?.title?.[locale],pageData.massageCarousel?.carouselCards?.[1]?.title?.[locale],pageData.massageCarousel?.carouselCards?.[2]?.title?.[locale],pageData.massageCarousel?.carouselCards?.[3]?.title?.[locale]]
  const activitiesTime=[pageData.massageCarousel?.carouselCards?.[0]?.text?.[locale],pageData.massageCarousel?.carouselCards?.[1]?.text?.[locale],pageData.massageCarousel?.carouselCards?.[2]?.text?.[locale],pageData.massageCarousel?.carouselCards?.[3]?.text?.[locale]]

    const infoImage1 = pageData.infoSection?.img1
      ? pageData.infoSection.img1.startsWith("/")
        ? `${apiUrl}${pageData.infoSection.img1}`
        : pageData.infoSection.img1
      : "";

         const infoImage2 = pageData.infoSection?.img2
      ? pageData.infoSection.img2.startsWith("/")
        ? `${apiUrl}${pageData.infoSection.img2}`
        : pageData.infoSection.img2
      : "";


const texts=[pageData.infoSection?.subtitle?.[locale],pageData.infoSection?.title?.[locale],pageData.infoSection?.text?.[locale]]
const texts2=[pageData.infoSection?.left?.subtitle?.[locale],pageData.infoSection?.left?.title?.[locale],pageData.infoSection?.left?.text?.[locale]]
//const texts3=[t2("subtitle3"),t2("title3"),t2("text3"),t2("list1"),t2("list2"),t2("list3"),t2("list4"),t2("list5")]
  const right = spaSection.right || {};
  const lists = right.lists || [];
const headerTexts = [
  right.subtitle[locale] || "",
  right.title[locale]    || "",
  right.text[locale]     || "",
];

const listTexts = [0,1,2,3].map(i => lists[i]?.[locale] || "");
const texts3 = [...headerTexts, ...listTexts];

const galleryImages =[gallery1,gallery2,gallery3]

  return (
    <div className='flex flex-col items-center justify-center gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <MainBannerSection img={mainImg} span={pageData.mainBanner?.subtitle?.[locale]} header={pageData.mainBanner?.title?.[locale]} text={pageData.mainBanner?.text?.[locale]}/>
      <SpaInfoSection img1={infoImage2} img2={infoImage1} texts={texts} texts2={texts2} texts3={texts3}/>
      <SpaHeaderSection span={pageData.spaGallery?.subtitle?.[locale]} header={pageData.spaGallery?.title?.[locale]} text={pageData.spaGallery?.text?.[locale]} images={galleryImages}/>
      <MassageCarousel  span={pageData.massageCarousel?.subtitle?.[locale]} header={pageData.massageCarousel?.title?.[locale]} text={pageData.massageCarousel?.text?.[locale]}  images={activitiesImage} headers={activitiesHeaders} time={activitiesTime}/>
      <SpaTypesInfoSection isImageLeft={true} showLink={false} span={t5("subtitle")} header={t5("title")} text={t5("text")} img={beachvolley}/>
      <SpaTypesInfoSection isImageLeft={false} showLink={false} span={t5("subtitle2")} header={t5("title2")} text={t5("text2")} img={personal}/>
      <ContactSection2/>
    </div>
  )
}

export default page
