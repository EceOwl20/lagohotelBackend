"use client";
import { useEffect, useState } from "react";
import MainBannerSection from '@/app/[locale]/GeneralComponents/MainBannerSection'
import React from 'react'
import imgBanner from "./images/SRF_2383.jpg"
import img1 from "./images/SRF_2312.jpg"
import img2 from "./images/SRF_2320.jpg"
import img3 from "./images/SRF_2325.jpg"
import img4 from "./images/SRF_2332.jpg"
import img5 from "./images/SRF_2347.jpg"
import img6 from "./images/SRF_2352.jpg"
import img7 from "./images/SRF_2383.jpg"
import img8 from "./images/SRF_2387.jpg"
import img9 from "./images/SRF_2392.jpg"
import img10 from "./images/SRF_3471.jpg"
import ClinaryReverseInfo from '../components/ClinaryReverseInfo'
import CuisinesCarousel from '../components/CuisinesCarousel'
import wasabi from "../gustorestaurant/images/wasabi2.webp"
import despina from "../images/despina.webp"
import anatolia from "../images/anatolia.webp"
import RoomTour from '@/app/[locale]/rooms/familyswimup/components/RoomTour'
import DiscoverBackground from '../components/DiscoverBackground'
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'
import BannerDark from '@/app/[locale]/GeneralComponents/BannerDark'
import KidsMomentCarousel from '../../kidsclub/components/KidsMomentCarousel'
import { useLocale, useTranslations } from "next-intl";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const page = () => {
  const t = useTranslations('DespinaRestaurants');
  const t2 = useTranslations('DespinaRestaurants.ClinaryInfoSection');
  const t3 = useTranslations('DespinaRestaurants.RoomTour');
  const t4 = useTranslations('DespinaRestaurants.CuisinesCarousel');
  const t5 = useTranslations('DespinaRestaurants.DiscoverBackground');

   const locale = useLocale(); // "tr", "en", "de", "ru"
    const [data, setData] = useState(null);
     
       useEffect(() => {
         const fetchData = async () => {
           try {
             const res = await fetch(
               `${apiUrl}/api/pages/restaurants/subrestaurants/despinarestaurant?lang=${locale}`
             );
             const json = await res.json();
             setData(json);
           } catch (e) {
             setData({ error: "Restaurant verisi alınamadı!" });
           }
         };
         fetchData();
       }, [locale]);
     
       if (!data) return <p className="p-10">Yükleniyor...</p>;
       if (data.error) return <div className="text-red-500">{data.error}</div>;
       if (!data.mainBanner) return <div>restaurant verisi eksik!</div>;

  // const otherOptions = [
  //   {
  //       id: 1,
  //       img: anatolia,
  //       title: t4("cuisines1subtitle"),
  //       description: t4("cuisines1title"),
  //       text: t4("cuisines1text"),
  //       link:"/restaurants/anatoliarestaurant",
  //       buttonText:t4("buttonText")
  //     },
  //   {
  //       id: 2,
  //       img: wasabi,
  //       title: t4("cuisines2subtitle"),
  //       description: t4("cuisines2title"),
  //       text: t4("cuisines2text"),
  //       link:"/restaurants/wasabi",
  //       buttonText:t4("buttonText")
  //     },
  //     {
  //       id: 3,
  //       img: despina,
  //       title: t4("cuisines3subtitle"),
  //       description: t4("cuisines3title"),
  //       text: t4("cuisines3text"),
  //        link:"/restaurants/despinarestaurant",
  //        buttonText:t4("buttonText")
  //     }
  // ];


   const restaurants = data.otheroptions?.restaurants || [];
 
      const otherOptions = restaurants.map((restaurant, idx) => ({
    id: idx + 1,
    // Resim yolunu tam URL’e dönüştür
    img: restaurant.image
      ? restaurant.image.startsWith("/")
        ? `${apiUrl}${restaurant.image}`
        : restaurant.image
      : "",
    // Çok dilli alanlardan locale’e göre al
    title: restaurant.title?.[locale] || "",
    description: restaurant.description?.[locale] || "",
    text: restaurant.text?.[locale] || "",
    link: restaurant.link || "",
    buttonText: restaurant.buttonText?.[locale] || "",
  }));


const carouselImages = (data.carousel || []).map(path =>
  path.startsWith("/")
    ? `${apiUrl}${path}`
    : path
);

    const bannerImg = data.mainBanner?.image
    ? data.mainBanner.image.startsWith("/")
      ? `${apiUrl}${data.mainBanner.image}`
      : data.mainBanner.image
    : "";

        const backgroundImg = data.background?.image
    ? data.background.image.startsWith("/")
      ? `${apiUrl}${data.background.image}`
      : data.background.image
    : "";

    const img11 = data.infoSection?.image1
    ? data.infoSection.image1.startsWith("/")
      ? `${apiUrl}${data.infoSection.image1}`
      : data.infoSection.image1
    : "";

        const img22 = data.infoSection?.image2
    ? data.infoSection.image2.startsWith("/")
      ? `${apiUrl}${data.infoSection.image2}`
      : data.infoSection.image2
    : "";

  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
     <BannerDark img={bannerImg} span={data.mainBanner.subtitle?.[locale]} header={data.mainBanner.title?.[locale]} text={data.mainBanner.text?.[locale]}/>
      <ClinaryReverseInfo img1={img11} img2={img22} span={data.infoSection?.subtitle?.[locale]} header={data.infoSection?.title?.[locale]} text1={data.infoSection?.text1?.[locale]} text2={data.infoSection?.text2?.[locale]}/>
      <KidsMomentCarousel images={carouselImages} header="" showheader={false}/>
      <CuisinesCarousel span={data.otheroptions?.restaurants?.[0]?.description?.[locale]} header={data.otheroptions?.restaurants?.[0]?.title?.[locale]} text={data.otheroptions?.restaurants?.[0]?.text?.[locale]} cuisines={otherOptions}/>
      <DiscoverBackground  span={data.background?.subtitle?.[locale]} header={data.background?.title?.[locale]} text={data.background?.text?.[locale]} link="/barcafes" img={backgroundImg}/>
      <ContactSection2/>
    </div>
  )
}

export default page
