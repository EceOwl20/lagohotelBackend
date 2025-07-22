"use client";
import React, { useEffect, useState } from "react";
import MainBanner2 from '../GeneralComponents/MainBanner2'
import mainImg from "./images/mainAbout.webp"
import exactImg from "./images/exactplace.webp"
import SpaTypesInfoSection from '../spawellness/components/SpaTypesInfoSection'
import MissionVisionSection from './components/MissionVisionSection'
import EmblaCarousel from "../HomePage/Components/Slider/Slider1"
import KidsMomentCarousel from '../kidsclub/components/KidsMomentCarousel'
import img1 from "./images/SRF_4978 1.webp"
import img2 from "./images/SRF_4118.webp"
import img3 from "./images/SRF_8456.webp"
import img4 from "./images/SRF_8394-min.webp"
import leftImg from "./images/sol.webp"
import rightImg from "./images/sag.webp"
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import { useLocale, useTranslations } from 'next-intl';

const images =[img1, img2,img3,img4]

const page = () => {
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const t = useTranslations('About');
  const t2 = useTranslations('About.InfoSection');
  const t3 = useTranslations('About.MissinonVision');

  const texts=[t3("subtitle"),t3("title"),t3("text")]
const texts2=[t3("clubsubtitle1"),t3("clubtitle1"),t3("clubtext1")]
const texts3=[t3("clubsubtitle2"),t3("clubtitle2"),t3("clubtext2")]

const [pageData, setPageData] = useState(null);
      useEffect(() => {
        fetch(`${apiUrl}/api/pages/about`)
          .then(r => r.json())
          .then(json => setPageData(json))
          .catch(console.error);
      }, [apiUrl]);
    
      if (!pageData) return <p className="p-10">Yükleniyor…</p>;

         const imgBanner = pageData.mainBanner?.image
              ? pageData.mainBanner.image.startsWith("/")
                ? `${apiUrl}${pageData.mainBanner.image}`
                : pageData.mainBanner.image
              : "";
      

  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
      <MainBanner2 span={pageData.mainBanner?.span?.[locale]} header={pageData.mainBanner?.header?.[locale]}  img={imgBanner} opacity={pageData.mainBanner?.opacity}/>
      <SpaTypesInfoSection isImageLeft={false} span={t2("subtitle")} header={t2("title")} text={t2("text")} link="/" showLink={true} img={exactImg} buttonText={t2("buttonText")}/>
      <KidsMomentCarousel showheader={false} header=""  images={images}/>
      <MissionVisionSection texts={texts} texts2={texts2} texts3={texts3} leftImg={leftImg} rightImg={rightImg} showLink={false} buttonText={t3("buttonText")}/>
      {/* <EmblaCarousel options={{ loop: true }}/> */}
      <ContactSection2/>
    </div>
  )
}

export default page
