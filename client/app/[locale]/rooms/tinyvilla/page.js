import React from 'react'
import SubRoomBanner from '../familyswimup/components/SubRoomBanner'
import SubroomCarousel from '../familyswimup/components/SubroomCarousel'
import RoomFeatures from '../familyswimup/components/RoomFeatures'
import BackgroundSection from '../familyswimup/components/BackgroundSection'
import RoomTour from '../familyswimup/components/RoomTour'
import OtherOptions from '../familyswimup/components/OtherOptions'
import backgroundImg from "../familyswimup/images/odafull.webp"
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'

import img1 from "./images/SRF_2169.jpg";
import img2 from "./images/SRF_2184.jpg";
import img3 from "./images/SRF_2192.jpg";
import img4 from "./images/SRF_2205.jpg";
import img5 from "./images/SRF_2216.jpg";
import img6 from "./images/SRF_2220.jpg";
import img7 from "./images/SRF_2231.jpg";
import img8 from "./images/SRF_2237.jpg";
import img9 from "./images/SRF_2246.jpg";
import img10 from "./images/SRF_2251.jpg";
import img11 from "./images/SRF_2253.jpg";
import img12 from "./images/SRF_2266.jpg";
import img13 from "./images/SRF_2276.jpg";
import img14 from "./images/SRF_6783.jpg";
import img15 from "./images/SRF_6830.jpg";
import img16 from "./images/SRF_7175.jpg";
import img17 from "./images/SRF_7207.jpg";
import {useTranslations} from 'next-intl';

const page = () => {
  const t = useTranslations('TinyVilla');
  const t2 = useTranslations('TinyVilla.RoomInfo');
  const t3 = useTranslations('TinyVilla.RoomTour');
  const t4 = useTranslations('TinyVilla.BackgroundSection');

  const backgroundTexts=[t4("text1"),t4("text2"),t4("text3")]
  const subroomBannerText=[t("text1"),t("text2"),t("text3")]
  const iconTexts=[t2("list1"),t2("list2"),t2("list3")];

  const carouselImages = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17];

  return (
    <div className=' overflow-hidden flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col'>
     <SubRoomBanner img={img1} span={t("subtitle")} header={t("title")} texts={subroomBannerText} baby={true}/>
     <SubroomCarousel images={carouselImages}/>
     </div>
      <RoomFeatures span={t2("subtitle")} header={t2("title")} text={t2("text")} header2={t2("title2")} header3={t2("title3")}  text2={t2("text2")} iconsTexts={iconTexts} roomName="TinyVilla" pool={true}/>
       <BackgroundSection span={t4("subtitle")} header={t4("title")} texts={backgroundTexts} link="/" img={backgroundImg}/>
       <RoomTour span={t3("subtitle")} header={t3("title")} text={t3("text")} link="https://kuula.co/share/collection/7bQNW?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72"/>
      <OtherOptions/>
      <ContactSection2/>
    </div>
  )
}

export default page
