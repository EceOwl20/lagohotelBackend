
"use client";
import React, { useCallback, useEffect, useState } from "react";
import mainImg from "./images/mainSpa.webp"
import SpaInfoSection from './components/SpaInfoSection'
import SpaHeaderSection from './components/SpaHeaderSection'
import gallery1 from "./images/img-1.jpg"
import gallery2 from "./images/img-2.jpg"
import gallery3 from "./images/img-3.jpg"
import gallery4 from "./images/img-4.jpg"
import gallery5 from "./images/img-5.jpg"
import gallery6 from "./images/img-6.jpg"
import gallery7 from "./images/img-7.jpg"
import gallery8 from "./images/img-08.jpg"
import gallery9 from "./images/img-09.jpg"
import gallery10 from "./images/img-10.jpg"
import gallery11 from "./images/img-11.jpg"
import gallery12 from "./images/img-12.jpg"
import gallery13 from "./images/img-13.jpg"
import MassageCarousel from './components/MassageCarousel'
import SpaTypesInfoSection from './components/SpaTypesInfoSection'
import SpaReverse from './components/SpaReverse'
import indoorImg from "./images/indoor.webp"
import turkishImg from "./images/turkish.webp"
import img1 from "./images/Spa.webp";
import img2 from "./images/Sauna and hamam.webp";
import aromatic from "./images/aromatic.webp"
import oriental from "./images/oriental.webp"
import clasmassage from "./images/clasmassage.webp"
import facial from "./images/masagefaci.webp"
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import RestaurantMainBanner from '../restaurants/components/RestaurantMainBanner'
import { useLocale, useTranslations } from 'next-intl';

const page = () => {
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const t = useTranslations('Spa');
  const t2 = useTranslations('Spa.InfoSection');
  const t3 = useTranslations('Spa.SpaGallery');
  const t4 = useTranslations('Spa.Carousel');
  const t5 = useTranslations('Spa.SpaType');
  
    // sayfa verisini çek
    const [pageData, setPageData] = useState(null);
    useEffect(() => {
      fetch(`${apiUrl}/api/pages/spa`)
        .then(r => r.json())
        .then(json => setPageData(json))
        .catch(console.error);
    }, [apiUrl]);
  
    if (!pageData) return <p className="p-10">Yükleniyor…</p>;
      const spaSection = pageData?.SpaInfoSection;

      const sliderMassage = [
  {
    src: aromatic,
    title: "Aromatherapy Massage",
    link: "/",
  },
  {
    src: oriental,
    title: "Oriental Massage",
    link: "/",
  },
  {
    src: clasmassage,
    title: "Classic Massage",
    link: "/",
  },
  {
    src: facial,
    title: "FacialSpecai Massage",
    link: "/",
  }
];

const galleryImages=[gallery12,gallery3,gallery1,gallery4,gallery5,gallery6,gallery7,gallery8,gallery9,gallery10,gallery10,gallery11,gallery13,gallery2]

  const right = spaSection.right || {};
  const lists = right.lists || [];

  const spaTextsInfo1=[pageData.SpaInfoSection?.subtitle?.[locale],pageData.SpaInfoSection?.title?.[locale],pageData.SpaInfoSection?.text?.[locale]]
  const  spaTextsInfo2=[pageData.SpaInfoSection?.left?.subtitle?.[locale],pageData.SpaInfoSection?.left?.title?.[locale],pageData.SpaInfoSection?.left?.text?.[locale]]

  // 4) spaTextsInfo3: önce sağ overlay metinleri, sonra en fazla 4 liste maddesini alın
const headerTexts = [
  right.subtitle[locale] || "",
  right.title[locale]    || "",
  right.text[locale]     || "",
];

  const listTexts = [0,1,2,3].map(i => lists[i]?.[locale] || "");

   // Sonuç:
   const spaTextsInfo3 = [...headerTexts, ...listTexts];


    const bannerImg = pageData.mainBanner?.image
    ? pageData.mainBanner.image.startsWith("/")
      ? `${apiUrl}${pageData.mainBanner.image}`
      : pageData.mainBanner.image
    : "";

  const infoImage1 = pageData.SpaInfoSection?.img1
    ? pageData.SpaInfoSection.img1.startsWith("/")
      ? `${apiUrl}${pageData.SpaInfoSection.img1}`
      : pageData.SpaInfoSection.img1
    : "";

      const infoImage2 = pageData.SpaInfoSection?.img2
    ? pageData.SpaInfoSection.img2.startsWith("/")
      ? `${apiUrl}${pageData.SpaInfoSection.img2}`
      : pageData.SpaInfoSection.img2
    : "";


    const indoor = pageData.spaTypesInfoSection?.img
    ? pageData.spaTypesInfoSection.img.startsWith("/")
      ? `${apiUrl}${pageData.spaTypesInfoSection.img}`
      : pageData.spaTypesInfoSection.img
    : "";

        const hamam = pageData.spaReverse?.img
    ? pageData.spaReverse.img.startsWith("/")
      ? `${apiUrl}${pageData.spaReverse.img}`
      : pageData.spaReverse.img
    : "";

const raw = pageData.massageCarousel?.carouselCards || [];
const massageImages = [0,1,2,3].map(i => {
  const img = raw[i]?.image;
  if (!img) return null;
  return img.startsWith("/") ? `${apiUrl}${img}` : img;
}).filter(Boolean);

  const massageHeaders=[pageData.massageCarousel?.carouselCards?.[0]?.title?.[locale],pageData.massageCarousel?.carouselCards?.[1]?.title?.[locale],pageData.massageCarousel?.carouselCards?.[2]?.title?.[locale],pageData.massageCarousel?.carouselCards?.[3]?.title?.[locale]]

  const massageTime=[pageData.massageCarousel?.carouselCards?.[0]?.text?.[locale],pageData.massageCarousel?.carouselCards?.[1]?.text?.[locale],pageData.massageCarousel?.carouselCards?.[2]?.text?.[locale],pageData.massageCarousel?.carouselCards?.[3]?.text?.[locale]]

  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <RestaurantMainBanner span={pageData.mainBanner?.subtitle?.[locale]} header={pageData.mainBanner?.title?.[locale]} text={pageData.mainBanner?.text?.[locale]} img={bannerImg}  />
      <SpaInfoSection img1={infoImage1} img2={infoImage2} texts={spaTextsInfo1} texts2={spaTextsInfo2} texts3={spaTextsInfo3}/> 
      <SpaHeaderSection span={pageData.spaHeaderSection?.subtitle?.[locale]} header={pageData.spaHeaderSection?.title?.[locale]} text={pageData.spaHeaderSection?.text?.[locale]}  images={galleryImages}/>
      <MassageCarousel span={pageData.massageCarousel?.subtitle?.[locale]} header={pageData.massageCarousel?.title?.[locale]} text={pageData.massageCarousel?.text?.[locale]} headers={massageHeaders} images={massageImages} time={massageTime}/>
      <div className='flex flex-col gap-[40px] lg:gap-[50px]'>
      <SpaTypesInfoSection span={pageData.spaTypesInfoSection?.subtitle?.[locale]} header={pageData.spaTypesInfoSection?.title?.[locale]} text={pageData.spaTypesInfoSection?.text?.[locale]} isImageLeft={true} showLink={false}  img={indoor} buttonText={pageData.spaTypesInfoSection?.buttonText?.[locale]}/>
      <SpaReverse isImageLeft={false} showLink={false} span={pageData.spaReverse?.subtitle?.[locale]} header={pageData.spaReverse?.title?.[locale]} text={pageData.spaReverse?.text?.[locale]} img={hamam}/>
      </div>
      <ContactSection2/>
    </div>
  )
}

export default page
