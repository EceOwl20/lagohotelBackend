import React from 'react'
import MainBannerSection from '../GeneralComponents/MainBannerSection'
import mainImg from "./images/fitness.webp"
import SpaInfoSection from '../spawellness/components/SpaInfoSection'
import infoImg from "./images/Spa TReatments.webp"
import infoImg2 from "./images/Sauna and hamam (1).webp"
import SpaHeaderSection from '../spawellness/components/SpaHeaderSection'
import gallery1 from "./images/gallery1.webp"
import gallery2 from "./images/gallery2.webp"
import gallery3 from "./images/gallery3.webp"
import yoga from "./images/yogapilates.webp"
import zumba from "./images/zumba.webp"
import hitcardio from "./images/hitcardio.webp"
import step from "./images/step.webp"
import MassageCarousel from '../spawellness/components/MassageCarousel'
import Spa from '../HomePage/Components/Icons/Spa'
import SpaTypesInfoSection from '../spawellness/components/SpaTypesInfoSection'
import beachvolley from "./images/beachvoleyball.webp"
import personal from "./images/personal.webp"
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import {useTranslations} from 'next-intl';

const galleryImages =[gallery1,gallery2,gallery3]
const activitiesImage=[yoga,zumba,hitcardio,step]

const page = () => {
  const t = useTranslations('Fitness');
  const t2 = useTranslations('Fitness.InfoSection');
  const t3 = useTranslations('Fitness.SpaGallery');
  const t4 = useTranslations('Fitness.Carousel');
  const t5 = useTranslations('Fitness.SpaType');

const texts=[t2("subtitle"),t2("title"),t2("text")]
const texts2=[t2("subtitle2"),t2("title2"),t2("text2")]
const texts3=[t2("subtitle3"),t2("title3"),t2("text3"),t2("list1"),t2("list2"),t2("list3"),t2("list4"),t2("list5")]
const activitiesHeaders=[t4("massage1"),t4("massage2"),t4("massage3"),t4("massage4")]

  return (
    <div className='flex flex-col items-center justify-center gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <MainBannerSection img={mainImg} span={t("subtitle")} header={t("title")} text={t("text")}/>
      <SpaInfoSection img1={infoImg} img2={infoImg2} texts={texts} texts2={texts2} texts3={texts3}/>
      <SpaHeaderSection span={t3("subtitle")} header={t3("title")} text={t3("text")} images={galleryImages}/>
      <MassageCarousel  span={t4("subtitle")} header={t4("title")} text={t4("text")}  images={activitiesImage} headers={activitiesHeaders}/>
      <SpaTypesInfoSection isImageLeft={true} showLink={false} span={t5("subtitle")} header={t5("title")} text={t5("text")} img={beachvolley}/>
      <SpaTypesInfoSection isImageLeft={false} showLink={false} span={t5("subtitle2")} header={t5("title2")} text={t5("text2")} img={personal}/>
      <ContactSection2/>
    </div>
  )
}

export default page
