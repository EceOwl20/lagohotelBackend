import React from 'react'
import Beach1 from './Components/Beach1'
import Beach2 from './Components/Beach2'
import Beach3 from './Components/Beach3'
import Beach4 from './Components/Beach4'
import Beach5 from './Components/Beach5'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import pool1 from "./Images/map/main.webp"
import pool2 from "./Images/map/relaxpool.webp"
import pool3 from "./Images/map/maldivas.webp"
import pool4 from "./Images/map/ınfınıty.webp"
import pool5 from "./Images/map/maldivaskids.webp"
import pool6 from "./Images/map/ındoor.webp"
import pool7 from "./Images/map/aquapool.webp"
import pool8 from "./Images/map/kıdsaqua.webp"
import pool9 from "./Images/map/megaaqua.webp"
import hover1 from "./Images/map/PoolHover1.png"
import hover2 from "./Images/map/PoolHover2.png"
import hover3 from "./Images/map/PoolHover3.png"
import hover4 from "./Images/map/PoolHover4.png"
import hover5 from "./Images/map/PoolHover5.png"
import hover6 from "./Images/map/PoolHover6.png"
import hover7 from "./Images/map/PoolHover7.png"
import hover8 from "./Images/map/PoolHover8.png"
import hover9 from "./Images/map/PoolHover9.png"
import Form from '../GeneralComponents/Form'
import BeachMobile from './Components/BeachMobile'
import img1 from "./Images/beach1.webp";
import img2 from "./Images/beach2.webp";
import ClinaryInfoSection from '../restaurants/components/ClinaryInfoSection'
import {useTranslations} from 'next-intl';

const page = () => {
  const t = useTranslations('BeachPools.ClinaryInfoSection');
  const t2 = useTranslations('BeachPools.PoolList');

  const texts = [
    t("text1"),
    t("text2"),
    t("text3"),
    t("text4"),
    t("text5")
  ];


const poolItems = [
  {
    src: pool1,
    hoverSrc: hover1,
    subtitle: t2("poolSubTitle1"),
    title: t2("poolTitle1"),
    description: t2("poolText1"),
  },
  {
    src: pool2,
    hoverSrc: hover2,
    subtitle: t2("poolSubTitle2"),
    title: t2("poolTitle2"),
    description: t2("poolText2"),
  },
  {
    src: pool3,
    hoverSrc: hover3,
    subtitle: t2("poolSubTitle3"),
    title: t2("poolTitle3"),
    description: t2("poolText3"),
  },
  {
    src: pool4,
    hoverSrc: hover4,
    subtitle: t2("poolSubTitle4"),
    title: t2("poolTitle4"),
    description: t2("poolText4"),
  },
  {
    src: pool5,
    hoverSrc: hover5,
    subtitle: t2("poolSubTitle5"),
    title:t2("poolTitle5"),
    description: t2("poolText5"),
  },
  {
    src: pool6,
    hoverSrc: hover6,
    subtitle:t2("poolSubTitle6"),
    title: t2("poolTitle6"),
    description: t2("poolText6"),
  },
  {
    src: pool7,
    hoverSrc: hover7,
    subtitle: t2("poolSubTitle7"),
    title: t2("poolTitle7"),
    description: t2("poolText7"),
  },
  {
    src: pool8,
    hoverSrc: hover8,
    subtitle: t2("poolSubTitle8"),
    title: t2("poolTitle8"),
    description: t2("poolText8"), 
  },
  {
    src: pool9,
    hoverSrc: hover9,
    subtitle: t2("poolSubTitle9"),
    title: t2("poolTitle9"),
    description: t2("poolText9"),
  },
]
  

  return (
    <div className='overflow-hidden overflow-y-hidden bg-[#fbfbfb]'>
      <Beach1 /> 
     <div className='flex w-screen flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] lg:mt-[100px] bg-[#fbfbfb]'>
     <BeachMobile/>
    <div className='flex lg:hidden'>
    <ClinaryInfoSection
            img1={img1}
            img2={img2}
            span={t("subtitle")}
            header={t("title")}
            texts={texts}
          />
    </div>
     <Beach2 />
      <Beach3 />
      <Beach4 />
      <Beach5 id="pools" showLink={false} span={t2("subtitle")} header={t2("title")} text={t2("text")} poolItems={poolItems}/>
      <ContactSection2 />
      <Form/>
     </div>
    </div>
  )
}

export default page