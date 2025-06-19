import React from 'react'
import SubRoomBanner from '../familyswimup/components/SubRoomBanner'
import SubroomCarousel from '../familyswimup/components/SubroomCarousel'
import RoomFeatures2 from '../familyswimup/components/RoomFeatures2'
import RoomTour from '../familyswimup/components/RoomTour'
import OtherOptions from '../familyswimup/components/OtherOptions'
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'

import img1 from "./images/lago-engl1.webp";
import img2 from  "./images/lago-engl2.webp";
import img3 from  "./images/lago-engl3.webp";
import img4 from  "./images/lago-engl4.webp";
import img5 from  "./images/lago-engl5.webp";
import img6 from  "./images/lago-engl6.webp";
import img7 from  "./images/lago-engl7.webp";
import RoomsParallaxSection from '../components/RoomsParallaxSection'
import {useTranslations} from 'next-intl';

const page = () => {
  const t = useTranslations('DisabledRoom');
  const t2 = useTranslations('DisabledRoom.RoomInfo');
  const t3 = useTranslations('DisabledRoom.RoomTour');

  const subroomBannerText=[t("text1"),t("text2"),t("text3")]
  const iconTexts=[t2("list1"),t2("list2"),t2("list3")];

  const carouselImages = [img1,img2,img3,img4,img5, img6, img7,img1,img2,img3,img4,img5, img6, img7];

  return (
    <div className=' overflow-hidden flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col'>
     <SubRoomBanner img={img1} span={t("subtitle")} header={t("title")} texts={subroomBannerText} baby={false}/>
     <SubroomCarousel images={carouselImages}/>
     </div>
      <RoomFeatures2 span={t2("subtitle")} header={t2("title")} text={t2("text")} header2={t2("title2")} header3={t2("title3")}  text2={t2("text2")} iconsTexts={iconTexts}  roomName="SuperiorRoom" pool={false}/>
      <RoomsParallaxSection/>
      <RoomTour span={t3("subtitle")} header={t3("title")} text={t3("text")} link="https://kuula.co/share/collection/71m5B?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72"/>
      <OtherOptions/>
      <ContactSection2/>
    </div>
  )
}

export default page
