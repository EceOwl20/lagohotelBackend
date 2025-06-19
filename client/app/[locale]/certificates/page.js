import React from 'react'
import BannerDark from '../GeneralComponents/BannerDark'
import imgBanner from "./images/certificateBanner.jpg"
import MainBanner2 from '../GeneralComponents/MainBanner2'
import CertificateSection1 from './components/CertificateSection1'
import Certificate from './components/Certificate'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-[50px] md:gap-[75px] lg:gap-[100px] overflow-hidden'>
      <MainBanner2 img={imgBanner} span="" header="Certificate" opacity={true}/>
      <CertificateSection1/>
      <Certificate/>
    </div>
  )
}

export default page
