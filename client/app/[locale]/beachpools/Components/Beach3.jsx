import React from 'react'
import Slider from "../../HomePage/Components/Slider/Slider2"
import Slide1 from '../Images/Slide/swim.png'
import Slide2 from '../Images/Slide/beachbar.png'
import Slide3 from '../Images/Slide/watersport.png'
import Slide4 from '../Images/Slide/celebration.png'
import {useTranslations} from 'next-intl';

const Beach3 = () => {
  const t = useTranslations('BeachPools.Carousel');

    const slides = [
        { src: Slide1, title: t("activities1"), span:t("activities1Text") },
        { src: Slide2, title: t("activities2"), span:t("activities2Text") },
        { src: Slide3, title: t("activities3"), span:t("activities3Text") },
        { src: Slide4, title: t("activities4"), span:t("activities4Text") },
      ]
  return (
    <div className='flex flex-col w-full gap-[30px] lg:gap-[50px] items-center justify-center'>
        <div className='flex flex-col gap-[20px] md:gap-[25px] lg:gap-[35px] w-[87.79%] md:w-[91.4%] lg:w-[76.8%] ml-[6.1%] md:ml-0 items-start justify-center text-start'>
          <p className='font-jost text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase'>{t("subtitle")}</p>
          <h3 className='font-marcellus text-[28px] md:text-[32px] lg:text-[48px] font-normal leading-[120%] lg:leading-[57.6px] capsizedText2'>{t("title")}</h3>
          <p className='font-jost text-[14px] lg:text-[16px] font-normal leading-normal lg:leading-[24px] capsizedText4 w-full md:max-w-[85%] lg:max-w-[727px]'>{t("text")}</p>
        </div>
        <Slider slides={slides} />
    </div>
  )
}

export default Beach3