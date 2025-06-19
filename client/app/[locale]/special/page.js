import React from 'react'
import mainImg from "./images/specialMain.webp"
import SpecialTypesSection from './components/SpecialTypesSection'
import SpecialGridSection from './components/SpecialGridSection'
import SpecialInfoSection from './components/SpecialInfoSection'
import SpecialCarousel from './components/SpecialCarousel'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import BannerDark from '../GeneralComponents/BannerDark'
import {useTranslations} from 'next-intl';

const page = () => {
  const t = useTranslations('Special');

  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px]  lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <BannerDark span={t("subtitle")} header={t("title")} text={t("text")} img={mainImg}/>
      <SpecialTypesSection/>
      <SpecialGridSection/>
      <SpecialInfoSection/>
      <SpecialCarousel/>
      <ContactSection2/>
    </div>
  )
}

export default page
