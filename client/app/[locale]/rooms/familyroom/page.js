import React from 'react'
import SubRoomBanner from '../familyswimup/components/SubRoomBanner'
import SubroomCarousel from '../familyswimup/components/SubroomCarousel'
import RoomFeatures from '../familyswimup/components/RoomFeatures'
import RoomTour from '../familyswimup/components/RoomTour'
import OtherOptions from '../familyswimup/components/OtherOptions'
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'

import img1 from "./images/SRF_3936.jpg";
import img2 from "./images/SRF_3946.jpg";
import img3 from "./images/SRF_3953.jpg";
import img4 from "./images/SRF_3974.jpg";
import RoomsParallaxSection from '../components/RoomsParallaxSection'
import {useTranslations} from 'next-intl';

const page = () => {
  const carouselImages = [img1,img2,img3,img4,img1,img2,img3,img4];
  const t = useTranslations('FamilyRoom');
  const t2 = useTranslations('FamilyRoom.RoomInfo');
  const t3 = useTranslations('FamilyRoom.RoomTour');

  const subroomBannerText=[t("text1"),t("text2"),t("text3")]
  const iconTexts=[t2("list1"),t2("list2"),t2("list3")];

  return (
    <div className=' overflow-hidden flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col'>
     <SubRoomBanner img={img1} span={t("subtitle")} header={t("title")} texts={subroomBannerText} baby={true}/>
     <SubroomCarousel images={carouselImages}/>
     </div>
      <RoomFeatures span={t2("subtitle")} header={t2("title")} text={t2("text")} header2={t2("title2")} header3={t2("title3")}  text2={t2("text2")} iconsTexts={iconTexts} roomName="FamilyRoom" pool={false}/>
      <RoomsParallaxSection/>
      <RoomTour span={t3("subtitle")} header={t3("title")} text={t3("text")} link="https://kuula.co/share/collection/7byM9?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72"/>
      <RoomTour span={t3("subtitle2")} header={t3("title2")} text={t3("text2")} link="https://kuula.co/share/collection/7bWS8?logo=1&info=0&fs=1&vr=1&autorotate=0.22&autop=10&autopalt=1&thumbs=4&margin=2&alpha=0.72"/>
      <OtherOptions/>
      <ContactSection2/>
    </div>
  )
}

export default page
