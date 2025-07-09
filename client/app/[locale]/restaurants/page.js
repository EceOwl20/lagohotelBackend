"use client"
import React, { useState, useEffect } from "react";
import RestaurantMainBanner from './components/RestaurantMainBanner'
import ClinaryInfoSection from './components/ClinaryInfoSection'
import MainRestaurantSection from './components/MainRestaurantSection'
import CuisinesCarousel from './components/CuisinesCarousel'
import ClinaryReverseInfo from './components/ClinaryReverseInfo'
import anatolia from "./images/anatolia.webp"
import gusto from "./images/gusto.webp"
import despina from "./images/despina.webp"
import bistro from "./images/bistrogorsel.png"

import wasabi from "./images/wasabi.webp"
import tapaz from "./images/tapaz.webp"
import fuego from "./images/fuego.webp"
import DiscoverBackground from './components/DiscoverBackground'
import backgroundImg from "./images/Background.webp"

import img1 from "./images/bistres1.webp"
import img2 from "./images/bist2.webp"

import img3 from "./images/art1.webp"
import img4 from "./images/art2.webp"
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import Image from 'next/image'
import mainBanner from "./images/restaurantMain.webp"
import { useLocale, useTranslations } from 'next-intl';

const page = () => {
   const locale = useLocale(); // "tr", "en", "de", "ru"
   
  const t = useTranslations('Restaurants');
  const t2 = useTranslations('Restaurants.ClinaryInfoSection');
  const t3 = useTranslations('Restaurants.CuisinesCarousel');
  const t4 = useTranslations('Restaurants.ClinaryReverseSection');
  const t5 = useTranslations('Restaurants.CuisinesCarousel2');
  const t6 = useTranslations('Restaurants.DiscoverBackground');

  const [pageData, setPageData] = useState(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
    
      useEffect(() => {
        const fetchPageData = async () => {
          try {
          const res = await fetch(`${apiUrl}/api/pages/restaurants`);
            const json = await res.json();
            setPageData(json);
          } catch (err) {
            console.error("Anasayfa verisi alınamadı:", err.message);
          }
        };
    
        fetchPageData();
      }, []);
    
      if (!pageData) return <p className="p-10">Yükleniyor...</p>;

  const cuisines = [
    {
      id: 1,
      img: anatolia,
      title: pageData.cuisines?.[0]?.cuisine?.[0]?.title?.[locale],
      description: pageData.cuisines?.[0]?.cuisine?.[0]?.subtitle?.[locale],
      text:pageData.cuisines?.[0]?.cuisine?.[0]?.description?.[locale],
      link:pageData.cuisines?.[0]?.cuisine?.[0]?.link,
      buttonText:pageData.cuisines?.[0]?.buttonText?.[locale],
    },
    {
      id: 2,
      img: gusto,
      title: pageData.cuisines?.[0]?.cuisine?.[1]?.title?.[locale],
      description: pageData.cuisines?.[0]?.cuisine?.[1]?.subtitle?.[locale],
      text:pageData.cuisines?.[0]?.cuisine?.[1]?.description?.[locale],
       link:pageData.cuisines?.[0]?.cuisine?.[1]?.link,
          buttonText:pageData.cuisines?.[0]?.buttonText?.[locale],
    },
    {
      id: 3,
      img: despina,
     title: pageData.cuisines?.[0]?.cuisine?.[2]?.title?.[locale],
      description: pageData.cuisines?.[0]?.cuisine?.[2]?.subtitle?.[locale],
      text:pageData.cuisines?.[0]?.cuisine?.[2]?.description?.[locale],
       link:pageData.cuisines?.[0]?.cuisine?.[2]?.link,
         buttonText:pageData.cuisines?.[0]?.buttonText?.[locale],
    }
  ];

  const cuisines2 = [
    {
      id: 1,
      img: wasabi,
      title: t5("cuisines1title"),
      description: t5("cuisines1subtitle"),
      text:t5("cuisines1text"),
      link:"restaurants/wasabi",
      buttonText:t5("buttonText")
    },
    {
      id: 2,
      img: fuego,
      title: t5("cuisines2title"),
      description: t5("cuisines2subtitle"),
      text:t5("cuisines2text"),
       link:"/restaurants/fuego",
       buttonText:t5("buttonText")
       
    },
    {
      id: 3,
      img: tapaz,
      title: t5("cuisines3title"),
      description: t5("cuisines3subtitle"),
      text:t5("cuisines3text"),
       link:"/restaurants/tapazrestaurant",
       buttonText:t5("buttonText")
    }
  ];

    // banner.image mutlak URL’e çevir
  const bannerImg = pageData.mainBanner?.image
    ? pageData.mainBanner.image.startsWith("/")
      ? `${apiUrl}${pageData.mainBanner.image}`
      : pageData.mainBanner.image
    : "";

  const leftImage = pageData.clinaryInfo?.image1
    ? pageData.clinaryInfo.image1.startsWith("/")
      ? `${apiUrl}${pageData.clinaryInfo.image1}`
      : pageData.clinaryInfo.image1
    : "";

    const rightImage = pageData.clinaryInfo?.image2
    ? pageData.clinaryInfo.image2.startsWith("/")
      ? `${apiUrl}${pageData.clinaryInfo.image2}`
      : pageData.clinaryInfo.image2
    : "";

      const leftImage2 = pageData.clinaryReverseInfo?.image1
    ? pageData.clinaryReverseInfo.image1.startsWith("/")
      ? `${apiUrl}${pageData.clinaryReverseInfo.image1}`
      : pageData.clinaryReverseInfo.image1
    : "";

    const rightImage2 = pageData.clinaryReverseInfo?.image2
    ? pageData.clinaryReverseInfo.image2.startsWith("/")
      ? `${apiUrl}${pageData.clinaryReverseInfo.image2}`
      : pageData.clinaryReverseInfo.image2
    : "";

    const discoverBanner = pageData.discoverBackground?.image
    ? pageData.discoverBackground.image.startsWith("/")
      ? `${apiUrl}${pageData.discoverBackground.image}`
      : pageData.discoverBackground.image
    : "";


 const textsClinary=[pageData.clinaryInfo?.texts?.[0]?.[locale],pageData.clinaryInfo?.texts?.[1]?.[locale],pageData.clinaryInfo?.texts?.[2]?.[locale],pageData.clinaryInfo?.texts?.[3]?.[locale]]

  return (
    <div className='overflow-hidden items-center justify-center flex flex-col gap-[60px]  md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
      <RestaurantMainBanner img={bannerImg} span={pageData.mainBanner?.subtitle?.[locale]} header={pageData.mainBanner?.title?.[locale]} text={pageData.mainBanner?.text?.[locale]}/>
      <ClinaryInfoSection img1={rightImage} img2={leftImage} span={pageData.clinaryInfo?.subtitle?.[locale]} header={pageData.clinaryInfo?.title?.[locale]} texts={textsClinary}/>
      <MainRestaurantSection/>
      <CuisinesCarousel span={pageData.cuisines?.[0]?.description?.[locale]} header={pageData.cuisines?.[0]?.title?.[locale]} text={pageData.cuisines?.[0]?.text?.[locale]} cuisines={cuisines}/>
      <ClinaryReverseInfo img1={rightImage2} img2={leftImage2} span={pageData.clinaryReverseInfo?.subtitle?.[locale]} header={pageData.clinaryReverseInfo?.title?.[locale]} text1={pageData.clinaryReverseInfo?.text1?.[locale]} text2={pageData.clinaryReverseInfo?.text2?.[locale]}/>
     <div className='flex flex-col relative'>
     <Image src={bistro} width={bistro.width} height={bistro.header} className='hidden lg:flex absolute right-0 w-[172px] h-[203px] sm:w-[252px] sm:h-[304px] md:w-[343px] md:h-[407px] top-0 md:-top-[12%]  xl:right-[190px] lg:-top-[30%]' alt='bistro'/>
     <CuisinesCarousel span={pageData.cuisines?.[0]?.description?.[locale]} header={pageData.cuisines?.[0]?.title?.[locale]} text={pageData.cuisines?.[0]?.text?.[locale]} cuisines={cuisines}/>
     </div>
      <DiscoverBackground span={pageData.discoverBackground?.subtitle?.[locale]} header={pageData.discoverBackground?.title?.[locale]} text={pageData.discoverBackground?.text?.[locale]} link={pageData.discoverBackground?.link} img={discoverBanner} buttonText={pageData.discoverBackground?.buttonText?.[locale]}/>
      <ContactSection2/>
    </div>
  )
}

export default page
