"use client"
import React, { useState, useEffect } from "react";
import imgBanner from "./images/mainbar.webp"
import ClinaryInfoSection from '../restaurants/components/ClinaryInfoSection'
import cafebar1 from "./images/cafebar1.webp"
import cafebar2 from "./images/cafebars2.webp"
import DiscoverBackground from '../restaurants/components/DiscoverBackground'
import backgroundImg from "./images/BackgroundCafes.webp"
import BackgroundSection from '../rooms/familyswimup/components/BackgroundSection'
import backgroundImg2 from "./images/fullphoto.webp"
import backgroundImg3 from "./images/fullphoto2.webp"
import BarCarouselSection from './components/BarCarouselSection'
import OtherOptions4 from './components/OtherOptions4'
import mignon from "./images/mignon.webp"
import joie from "./images/joie.webp"
import maldiva from "./images/maldiva.webp"
import vagobar from "./images/vagobar.webp"
import piano from "./images/piano.webp"
import abella from "./images/abella.webp"
import lago from "./images/lago.webp"
import house from "./images/house.webp"
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import RestaurantMainBanner from '../restaurants/components/RestaurantMainBanner'
import { useLocale, useTranslations } from 'next-intl';

const page = () => {
   const locale = useLocale(); // "tr", "en", "de", "ru"
  const t = useTranslations('BarAndCafes');
  const t2 = useTranslations('BarAndCafes.ClinaryInfoSection');
  const t3 = useTranslations('BarAndCafes.BarImageSection');
  const t4 = useTranslations('BarAndCafes.CuisinesCarousel');
  const t5 = useTranslations('BarAndCafes.BarImageSection2');
  const t6 = useTranslations('BarAndCafes.CuisinesCarousel2');
  const t7 = useTranslations('BarAndCafes.DiscoverBackground');

   const [pageData, setPageData] = useState(null);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
      
        useEffect(() => {
          const fetchPageData = async () => {
            try {
            const res = await fetch(`${apiUrl}/api/pages/barcafes`);
              const json = await res.json();
              setPageData(json);
            } catch (err) {
              console.error("Anasayfa verisi alınamadı:", err.message);
            }
          };
      
          fetchPageData();
        }, []);
      
        if (!pageData) return <p className="p-10">Yükleniyor...</p>;

  const otherOptions = [
    {
        id: 1,
        img: mignon,
        title: pageData.otherOptions?.[0]?.cuisine?.[0]?.title?.[locale],
        description: pageData.otherOptions?.[0]?.cuisine?.[0]?.subtitle?.[locale],
        text:pageData.otherOptions?.[0]?.cuisine?.[0]?.text?.[locale],
        link:pageData.otherOptions?.[0]?.cuisine?.[0]?.link,
        buttonText:pageData.otherOptions?.[0]?.cuisine?.[0]?.buttonText?.[locale]
      },
    {
        id: 2,
        img: joie,
       title: pageData.otherOptions?.[0]?.cuisine?.[1]?.title?.[locale],
        description: pageData.otherOptions?.[0]?.cuisine?.[1]?.subtitle?.[locale],
        text:pageData.otherOptions?.[0]?.cuisine?.[1]?.text?.[locale],
        link:pageData.otherOptions?.[0]?.cuisine?.[1]?.link,
        buttonText:pageData.otherOptions?.[0]?.cuisine?.[1]?.buttonText?.[locale]
      },
      {
        id: 3,
        img: maldiva,
        title: pageData.otherOptions?.[0]?.cuisine?.[2]?.title?.[locale],
        description: pageData.otherOptions?.[0]?.cuisine?.[2]?.subtitle?.[locale],
        text:pageData.otherOptions?.[0]?.cuisine?.[2]?.text?.[locale],
        link:pageData.otherOptions?.[0]?.cuisine?.[2]?.link,
        buttonText:pageData.otherOptions?.[0]?.cuisine?.[2]?.buttonText?.[locale]
      },
      {
        id: 4,
        img: vagobar,
         title: pageData.otherOptions?.[0]?.cuisine?.[3]?.title?.[locale],
        description: pageData.otherOptions?.[0]?.cuisine?.[3]?.subtitle?.[locale],
        text:pageData.otherOptions?.[0]?.cuisine?.[3]?.text?.[locale],
        link:pageData.otherOptions?.[0]?.cuisine?.[3]?.link,
        buttonText:pageData.otherOptions?.[0]?.cuisine?.[3]?.buttonText?.[locale]
      }
  ];

  const otherOptions2 = [
    {
        id: 1,
        img: piano,
       title: pageData.otherOptions?.[1]?.cuisine?.[0]?.title?.[locale],
        description: pageData.otherOptions?.[1]?.cuisine?.[0]?.subtitle?.[locale],
        text:pageData.otherOptions?.[1]?.cuisine?.[0]?.text?.[locale],
        link:pageData.otherOptions?.[1]?.cuisine?.[0]?.link,
        buttonText:pageData.otherOptions?.[1]?.cuisine?.[0]?.buttonText?.[locale]
      },
    {
        id: 2,
        img: abella,
        title: pageData.otherOptions?.[1]?.cuisine?.[1]?.title?.[locale],
        description: pageData.otherOptions?.[1]?.cuisine?.[1]?.subtitle?.[locale],
        text:pageData.otherOptions?.[1]?.cuisine?.[1]?.text?.[locale],
        link:pageData.otherOptions?.[1]?.cuisine?.[1]?.link,
        buttonText:pageData.otherOptions?.[1]?.cuisine?.[1]?.buttonText?.[locale]
      },
      {
        id: 3,
        img: lago,
         title: pageData.otherOptions?.[1]?.cuisine?.[2]?.title?.[locale],
        description: pageData.otherOptions?.[1]?.cuisine?.[2]?.subtitle?.[locale],
        text:pageData.otherOptions?.[1]?.cuisine?.[2]?.text?.[locale],
        link:pageData.otherOptions?.[1]?.cuisine?.[2]?.link,
        buttonText:pageData.otherOptions?.[1]?.cuisine?.[2]?.buttonText?.[locale]
      },
      {
        id: 4,
        img: house,
         title: pageData.otherOptions?.[1]?.cuisine?.[3]?.title?.[locale],
        description: pageData.otherOptions?.[1]?.cuisine?.[3]?.subtitle?.[locale],
        text:pageData.otherOptions?.[1]?.cuisine?.[3]?.text?.[locale],
        link:pageData.otherOptions?.[1]?.cuisine?.[3]?.link,
        buttonText:pageData.otherOptions?.[1]?.cuisine?.[3]?.buttonText?.[locale]
      }
  ];

  const clinaryTexts=[pageData.clinaryInfo?.texts?.[0]?.[locale]]
const backgroundTexts=[pageData.backgroundSections?.[0]?.texts?.[locale]]
const backgroundTexts2=[pageData.backgroundSections?.[1]?.texts?.[locale] ]

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


       const backImage = pageData.backgroundSections?.[0]?.image
    ? pageData.backgroundSections[0].image.startsWith("/")
      ? `${apiUrl}${pageData.backgroundSections[0].image}`
      : pageData.backgroundSections[0].image
    : "";

     const backImage2 = pageData.backgroundSections?.[1]?.image
    ? pageData.backgroundSections[1].image.startsWith("/")
      ? `${apiUrl}${pageData.backgroundSections[1].image}`
      : pageData.backgroundSections[1].image
    : "";

         const discoverImage = pageData.discoverBackground?.image
    ? pageData.discoverBackground.image.startsWith("/")
      ? `${apiUrl}${pageData.discoverBackground.image}`
      : pageData.discoverBackground.image
    : "";


  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <RestaurantMainBanner  img={bannerImg} span={pageData.mainBanner?.subtitle?.[locale]} header={pageData.mainBanner?.title?.[locale]} text={pageData.mainBanner?.text?.[locale]}/>
      <ClinaryInfoSection img1={rightImage} img2={leftImage} span={pageData.clinaryInfo?.subtitle?.[locale]} header={pageData.clinaryInfo?.title?.[locale]} texts={clinaryTexts}/>
      <BackgroundSection span={pageData.backgroundSections?.[0]?.subtitle?.[locale]} header={pageData.backgroundSections?.[0]?.title?.[locale]} texts={backgroundTexts} link={pageData.backgroundSections?.[0]?.link} img={backImage} buttonText={pageData.backgroundSections?.[0]?.buttonText?.[locale]}/>
      <OtherOptions4 span={pageData.otherOptions?.[0]?.subtitle?.[locale]} header={pageData.otherOptions?.[0]?.title?.[locale]} text={pageData.otherOptions?.[0]?.text?.[locale]} images={otherOptions} />
      <BackgroundSection span={pageData.backgroundSections?.[1]?.subtitle?.[locale]} header={pageData.backgroundSections?.[1]?.title?.[locale]}  link={pageData.backgroundSections?.[1]?.link}  texts={backgroundTexts2}  img={backImage2}/>
      <OtherOptions4 span={t6("subtitle")} header={t6("title")} text={t6("text")} images={otherOptions2} />
      <BarCarouselSection/>
      <DiscoverBackground span={pageData.discoverBackground?.subtitle?.[locale]} header={pageData.discoverBackground?.title?.[locale]} text={pageData.discoverBackground?.text?.[locale]} link={pageData.discoverBackground?.link} img={discoverImage} buttonText={pageData.discoverBackground?.buttonText?.[locale]}/>
      <ContactSection2/>
    </div>
  )
}

export default page
