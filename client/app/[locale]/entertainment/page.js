import React from 'react'
import MainBannerSection from './components/MainBannerSection'
import mainImg from "./images/eglence.webp"
import ActivitiesSection from './components/ActivitiesSection'
import EntertainmentTypesSection from './components/EntertainmentTypesSection'
import ActivityBackgroundSection from './components/ActivityBackgroundSection'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
      <MainBannerSection img={mainImg}/>
      <ActivitiesSection/>
      <EntertainmentTypesSection/>
      <ActivityBackgroundSection/>
      <ContactSection2/>
    </div>
  )
}

export default page
