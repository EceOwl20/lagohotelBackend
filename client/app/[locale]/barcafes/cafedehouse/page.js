import React from 'react'
import mainImg from "./images/img-3.jpg"
import img1 from "./images/img-4.jpg"
import img2 from "./images/img-1.jpg"
import RoomTour from '@/app/[locale]/rooms/familyswimup/components/RoomTour'
import KidsMomentCarousel from '@/app/[locale]/kidsclub/components/KidsMomentCarousel'
import gallery2 from "./images/img-3.jpg"
import gallery1 from "./images/img-4.jpg"
import gallery3 from "./images/img-2.jpg"
import gallery4 from "./images/img-1.jpg"
import ClinaryReverseInfo from '@/app/[locale]/restaurants/components/ClinaryReverseInfo'
import backgroundImg from "../images/BackgroundCafes.webp"
import piano from "../images/piano.webp"
import abella from "../images/abella.webp"
import lago from "../images/lago.webp"
import house from "../images/house.webp"
import DiscoverBackground from '../../restaurants/components/DiscoverBackground'
import OtherOptions4 from '../components/OtherOptions4'
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'
import BannerDark from '@/app/[locale]/GeneralComponents/BannerDark'
import { useTranslations } from "next-intl";

const galleryImages=[gallery1,gallery2,gallery3,gallery4];

const page = () => {
  const t = useTranslations('Cafedehouse');
  const t2 = useTranslations('Cafedehouse.ClinaryInfoSection');
  const t3 = useTranslations('Cafedehouse.RoomTour');
  const t4 = useTranslations('Cafedehouse.CuisinesCarousel');
  const t5 = useTranslations('Cafedehouse.DiscoverBackground');


const otherOptions = [
  {
      id: 1,
      img: piano,
      title: t4("cuisines1title"),
      description: t4("cuisines1subtitle"),
      text:t4("cuisines1text"),
      link:"/barcafes/piano",
      buttonText:t4("buttonText")
    },
  {
      id: 2,
      img: abella,
      title: t4("cuisines2title"),
      description: t4("cuisines2subtitle"),
      text:t4("cuisines2text"),
      link:"/barcafes/abellapatisserie",
      buttonText:t4("buttonText")
    },
    {
      id: 3,
      img: lago,
      title: t4("cuisines3title"),
      description: t4("cuisines3subtitle"),
      text:t4("cuisines3text"),
       link:"/barcafes/cafedelago",
       buttonText:t4("buttonText")
    },
    {
      id: 4,
      img: house,
      title: t4("cuisines4title"),
      description: t4("cuisines4subtitle"),
      text:t4("cuisines4text"),
       link:"/barcafes/cafedehouse",
       buttonText:t4("buttonText")
    }
];

  return (
    <div className='flex flex-col items-center justify-center gap-[50px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
     <BannerDark img={mainImg} span={t("subtitle")} header={t("title")} text={t("text")}/>
      <ClinaryReverseInfo img1={img1} img2={img2} span={t2("subtitle")} header={t2("title")} text1={t2("text1")} text2={t2("text2")}/>
      <KidsMomentCarousel images={galleryImages} header="" showheader={false}/>
      <OtherOptions4 span={t4("subtitle")} header={t4("title")} text={t4("text")} images={otherOptions}/>
      <DiscoverBackground span={t5("subtitle")} header={t5("subtitle")} text={t5("text")} link="/barcafes" img={backgroundImg}/>
      <ContactSection2/>
    </div>
  )
}

export default page
