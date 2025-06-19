import React from 'react'
import MainBanner2 from '../GeneralComponents/MainBanner2'
import mainImg from "./images/mainfoto.webp"
import MissionVisionSection from '../about/components/MissionVisionSection'
import rightImg from "../about/images/sag.webp"
import leftImg from "./images/sol1.webp"
import new1 from "../restaurants/despinarestaurant/images/SRF_2325.jpg"
import new2 from "./images/news2.webp"
import new3 from "./images/news3.webp"
import new4 from "../special/images/ikili1.webp"
import new5 from "./images/waterfall.jpeg"
import new6 from "./images/news6.webp"
import new7 from "../entertainment/images/beachvoley.webp"
import new8 from "../gallery/images/genel/SRF_5774.webp"
import new9 from "./images/news9.webp"
import Beach5 from '../beachpools/Components/Beach5'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import {useTranslations} from 'next-intl';

const newsLinks=["/barcafes", "/spawellness","/kidsclub", "/special","/spor", "/special","/restaurants", "/restaurants","/restaurants"]

const page = () => {
  const t = useTranslations('BlogNews');
  const t2 = useTranslations('BlogNews.InfoSection');
  const t3 = useTranslations('BlogNews.BlogList');

const texts=[t2("subtitle"),t2("title"),t2("text")]
const texts2=[t2("secsubtitle1"),t2("sectitle1"),t2("sectext1")]
const texts3=[t2("secsubtitle2"),t2("sectitle2"),t2("sectext2")]

const newsItems = [
  {
    src: new1,
    subtitle:t3("blogsubtitle1"),
    title: t3("blogtitle1"),
    description: t3("blogtext1"),
  },
  {
    src: new2,
    subtitle:t3("blogsubtitle2"),
    title: t3("blogtitle2"),
    description: t3("blogtext2"),
  },
  {
    src: new3,
    subtitle:t3("blogsubtitle3"),
    title: t3("blogtitle3"),
    description: t3("blogtext3"),
  },
  {
    src: new4,
    subtitle:t3("blogsubtitle4"),
    title: t3("blogtitle4"),
    description: t3("blogtext4"),
  },
  {
    src: new5,
    subtitle:t3("blogsubtitle5"),
    title: t3("blogtitle5"),
    description: t3("blogtext5"),
  },
  {
    src: new6,
    subtitle:t3("blogsubtitle6"),
    title: t3("blogtitle6"),
    description: t3("blogtext6"),
  },
  {
    src: new7,
    subtitle:t3("blogsubtitle7"),
    title: t3("blogtitle7"),
    description: t3("blogtext7"),
  },
  {
    src: new8,
    subtitle:t3("blogsubtitle8"),
    title: t3("blogtitle8"),
    description: t3("blogtext8"),
  },
  {
    src: new9,
    subtitle:t3("blogsubtitle9"),
    title: t3("blogtitle9"),
    description: t3("blogtext9"),
  },
]

  return (
    <div className='flex flex-col items-center justify-center gap-[50px] lg:gap-[100px] bg-[#fbfbfb]'>
     <MainBanner2 img={mainImg} span={t("subtitle")} header={t ("title")}/> 
     <MissionVisionSection leftImg={leftImg} rightImg={rightImg} texts={texts} texts2={texts2} texts3={texts3} showLink={true} link1="/" link2="/" buttonText={t3("buttonText")}/>
     <Beach5 span="" header="" text="" poolItems={newsItems} showLink={true} links={newsLinks} buttonText={t3("buttonText")}/>
     <ContactSection2/>
    </div>
  )
}

export default page
