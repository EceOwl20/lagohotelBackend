"use client";
import { useEffect, useState } from "react";
import RoomTour from '@/app/[locale]/rooms/familyswimup/components/RoomTour'
import KidsMomentCarousel from '@/app/[locale]/kidsclub/components/KidsMomentCarousel'
import gallery2 from "./images/img-1.jpg"
import gallery1 from "./images/img-1.jpg"
import gallery3 from "./images/img-1.jpg"
import gallery4 from "./images/img-1.jpg"
import ClinaryReverseInfo from '@/app/[locale]/restaurants/components/ClinaryReverseInfo'
import backgroundImg from "../images/BackgroundCafes.webp"
import DiscoverBackground from '../../restaurants/components/DiscoverBackground'
import OtherOptions4 from '../components/OtherOptions4'
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'
import BannerDark from '@/app/[locale]/GeneralComponents/BannerDark'
import { useLocale, useTranslations } from "next-intl";

const galleryImages=[gallery1,gallery2,gallery3,gallery4];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const page = () => {
  const t = useTranslations('Cafedelago');
  const t2 = useTranslations('Cafedelago.ClinaryInfoSection');
  const t3 = useTranslations('Cafedelago.RoomTour');
  const t4 = useTranslations('Cafedelago.CuisinesCarousel');
  const t5 = useTranslations('Cafedelago.DiscoverBackground');

  const locale = useLocale(); // "tr", "en", "de", "ru"
      const [data, setData] = useState(null);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(
              `${apiUrl}/api/pages/barcafes/subbarcafes/cafedelago?lang=${locale}`
            );
            const json = await res.json();
            setData(json);
          } catch (e) {
            setData({ error: "Bar verisi alınamadı!" });
          }
        };
        fetchData();
      }, [locale]);
    
      if (!data) return <p className="p-10">Yükleniyor...</p>;
      if (data.error) return <div className="text-red-500">{data.error}</div>;
      if (!data.mainBanner) return <div>bar verisi eksik!</div>;
  
      const cafes = data.otheroptions?.cafes || [];
   
        const otherOptions = cafes.map((cafe, idx) => ({
      id: idx + 1,
      // Resim yolunu tam URL’e dönüştür
      img: cafe.image
        ? cafe.image.startsWith("/")
          ? `${apiUrl}${cafe.image}`
          : cafe.image
        : "",
      // Çok dilli alanlardan locale’e göre al
      title: cafe.title?.[locale] || "",
      description: cafe.description?.[locale] || "",
      text: cafe.text?.[locale] || "",
      link: cafe.link || "",
      buttonText: cafe.buttonText?.[locale] || "",
    }));
  
  
      const bannerImg = data.mainBanner?.image
      ? data.mainBanner.image.startsWith("/")
        ? `${apiUrl}${data.mainBanner.image}`
        : data.mainBanner.image
      : "";
  
         const img1 = data.infoSection?.image1
      ? data.infoSection.image1.startsWith("/")
        ? `${apiUrl}${data.infoSection.image1}`
        : data.infoSection.image1
      : "";
  
         const img2 = data.infoSection?.image2
      ? data.infoSection.image2.startsWith("/")
        ? `${apiUrl}${data.infoSection.image2}`
        : data.infoSection.image2
      : "";
  
           const backgroundImg = data.background?.image
      ? data.background.image.startsWith("/")
        ? `${apiUrl}${data.background.image}`
        : data.background.image
      : "";
  
      const carouselImages = (data.carousel || []).map(path =>
    path.startsWith("/")
      ? `${apiUrl}${path}`
      : path
  );


  return (
    <div className='flex flex-col items-center justify-center gap-[50px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <BannerDark img={bannerImg} span={data.mainBanner?.subtitle?.[locale]} header={data.mainBanner?.title?.[locale]} text={data.mainBanner?.text?.[locale]}/>
       <ClinaryReverseInfo img1={img2} img2={img1} span={data.infoSection?.subtitle?.[locale]} header={data.infoSection?.title?.[locale]} text1={data.infoSection?.text1?.[locale]} text2={data.infoSection?.text2?.[locale]}/>
      <KidsMomentCarousel images={carouselImages} header="" showheader={false}/>
      <OtherOptions4 span={data.otheroptions?.cafes?.[0]?.description?.[locale]} header={data.otheroptions?.cafes?.[0]?.title?.[locale]} text={data.otheroptions?.cafes?.[0]?.text?.[locale]} images={otherOptions}/>
      <DiscoverBackground span={data.background?.subtitle?.[locale]} header={data.background?.title?.[locale]} text={data.background?.text?.[locale]} link="/barcafes" img={backgroundImg}/>
      <ContactSection2/>
    </div>
  )
}

export default page
