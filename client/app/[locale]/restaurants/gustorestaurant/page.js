import React from 'react'
import imgBanner from "./images/mainphoto.webp"
import img1 from "./images/italian1.webp"
import img2 from "./images/italian2.webp"
import ClinaryReverseInfo from '../components/ClinaryReverseInfo'
import CuisinesCarousel from '../components/CuisinesCarousel'
import wasabi from "./images/wasabi2.webp"
import despina from "../images/despina.webp"
import anatolia from "../images/anatolia.webp"
import RoomTour from '@/app/[locale]/rooms/familyswimup/components/RoomTour'
import DiscoverBackground from '../components/DiscoverBackground'
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'
import backgroundImg from "../images/Background.webp"
import RestaurantMainBanner from '../components/RestaurantMainBanner'
import { useTranslations } from "next-intl";
import KidsMomentCarousel from '../../kidsclub/components/KidsMomentCarousel'

const images=[img1,img2,img1,img2,imgBanner]


const page = () => {
  const t = useTranslations('GustoRestaurants');
  const t2 = useTranslations('GustoRestaurants.ClinaryInfoSection');
  const t3 = useTranslations('GustoRestaurants.RoomTour');
  const t4 = useTranslations('GustoRestaurants.CuisinesCarousel');
  const t5 = useTranslations('GustoRestaurants.DiscoverBackground');

  const otherOptions = [
    {
        id: 1,
        img: anatolia,
        title: t4("cuisines1subtitle"),
        description: t4("cuisines1title"),
        text: t4("cuisines1text"),
        link:"/restaurants/anatoliarestaurant",
        buttonText:t4("buttonText")
      },
    {
        id: 2,
        img: wasabi,
        title: t4("cuisines2subtitle"),
        description: t4("cuisines2title"),
        text: t4("cuisines2text"),
        link:"/restaurants/wasabi",
        buttonText:t4("buttonText")
      },
      {
        id: 3,
        img: despina,
        title: t4("cuisines3subtitle"),
        description: t4("cuisines3title"),
        text: t4("cuisines3text"),
         link:"/restaurants/despinarestaurant",
         buttonText:t4("buttonText")
      }
  ];

  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
      <RestaurantMainBanner img={imgBanner} span={t("subtitle")} header={t("title")} text={t("text")}/>
      <ClinaryReverseInfo img1={img1} img2={img2} span={t2("subtitle")} header={t2("title")} text1={t2("text1")} text2={t2("text2")}/>
      <KidsMomentCarousel images={images} header="" showheader={false}/>
      <CuisinesCarousel span={t4("subtitle")} header={t4("title")} text={t4("text")} cuisines={otherOptions}/>
      <DiscoverBackground  span={t5("subtitle")} header={t5("title")} text={t5("text")} link="/barcafes" img={backgroundImg} buttonText={t5("buttonText")}/>
      <ContactSection2/>
    </div>
  )
}

export default page
