import React from 'react'
import SubRoomBanner from './components/SubRoomBanner'
import SubroomCarousel from './components/SubroomCarousel'
import RoomFeatures from './components/RoomFeatures'
import BackgroundSection from './components/BackgroundSection'
import RoomTour from './components/RoomTour'
import OtherOptions from './components/OtherOptions'
import backgroundImg from "./images/odafull.webp"
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'
import img3 from "./images/SRF_2053.jpg";
import img4 from "./images/SRF_2064.jpg";
import img5 from "./images/SRF_2069.jpg";
import img6 from "./images/SRF_2073.jpg";
import img7 from "./images/SRF_2086.jpg";
import img8 from "./images/SRF_2092.jpg";
import img9 from "./images/SRF_2119.jpg";
import img10 from "./images/SRF_3168.jpg";
import img11 from "./images/SRF_3176.jpg";

import {useTranslations} from 'next-intl';

const page = () => {
  const t = useTranslations('FamilySwimupRoom');
  const t2 = useTranslations('FamilySwimupRoom.RoomInfo');
  const t3 = useTranslations('FamilySwimupRoom.RoomTour');
  const t4 = useTranslations('FamilySwimupRoom.BackgroundSection');

  const backgroundTexts=[t4("text1"),t4("text2"),t4("text3")]
  const subroomBannerText=[t("text1"),t("text2"),t("text3")]
  const iconTexts=[t2("list1"),t2("list2"),t2("list3")];

  const carouselImages = [img3,img4,img5,img6,img7,img8,img9,img10,img11];

  return (
    <div className=' overflow-hidden flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col'>
     <SubRoomBanner img={img3} span={t("subtitle")} header={t("title")} texts={subroomBannerText} baby={true}/>
     <SubroomCarousel images={carouselImages}/>
     </div>
      <RoomFeatures span={t2("subtitle")} header={t2("title")} text={t2("text")} header2={t2("title2")} header3={t2("title3")}  text2={t2("text2")} iconsTexts={iconTexts}  roomName="FamilySwimupRoom" pool={true}/>
      <BackgroundSection span={t4("subtitle")} header={t4("title")} texts={backgroundTexts} link="/" img={backgroundImg}/>
      <RoomTour span={t3("subtitle")} header={t3("title")} text={t3("text")} link="https://kuula.co/share/collection/71pLl?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72"/>
      <RoomTour span={t3("subtitle2")} header={t3("title2")} text={t3("text2")} link="https://kuula.co/share/collection/7bwhq?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72"/>
      <OtherOptions/>
      <ContactSection2/>
    </div>
  )
}

export default page
