import React from 'react'
import MainBanner2 from '../GeneralComponents/MainBanner2'
import mainImg from "./images/maingallery.webp"
import GalleryScrollSection from './components/GalleryScrollSection'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import {useTranslations} from 'next-intl';

const page = () => {
  const t = useTranslations('Gallery');

  return (
    <div className='flex flex-col items-center justify-center overflow-hidden gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col items-center justify-center'>
     <MainBanner2 img={mainImg} span={t("subtitle")} header={t("title")}/>
     <GalleryScrollSection/>
     </div>
      <ContactSection2/>
    </div>
  )
}

export default page
