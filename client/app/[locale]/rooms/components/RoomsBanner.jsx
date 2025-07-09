"use client"
import React from 'react'
import imgBanner from "../images/roomsBanner.png"
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl';

const RoomsBanner = ({roomsBanner}) => {
  const t = useTranslations('Accommodation');
  const locale = useLocale(); // "tr", "en", "de", "ru"
   const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

    const header = roomsBanner?.header?.[locale] || t('header');
  const buttonText1 = roomsBanner?.buttons?.[0]?.header?.[locale] || t('buttonText1');
  const buttonText2 = roomsBanner?.buttons[1].header?.[locale] || t('buttonText2');
  const buttonText3 = roomsBanner?.buttons[2].header?.[locale] || t('buttonText3');
  const buttonText4 = roomsBanner?.buttons[3].header?.[locale] || t('buttonText4');
  const buttonText5 = roomsBanner?.buttons[4].header?.[locale] || t('buttonText5');
       const buttonText6 = roomsBanner?.buttons[5].header?.[locale] || t('buttonText6');
        const buttonText7 = roomsBanner?.buttons[6].header?.[locale] || t('buttonText7');

  const buttonLink1 = roomsBanner?.buttons[0].link || "/rooms#superiorroom";
   const buttonLink2 = roomsBanner?.buttons[1].link || "/rooms#familyroom";
    const buttonLink3 = roomsBanner?.buttons[2].link || "/rooms#swimuproom";
     const buttonLink4 = roomsBanner?.buttons[3].link || "/rooms#familyswimup";
      const buttonLink5 = roomsBanner?.buttons[4].link || "/rooms#duplexfamilyroom";
       const buttonLink6 = roomsBanner?.buttons[5].link || "/rooms#tinyvilla";
        const buttonLink7 = roomsBanner?.buttons[6].link || "/rooms#disableroom";
        
  const bannerImgSrc = roomsBanner?.bannerImage
    ? roomsBanner.bannerImage.startsWith("/uploads")
      ? apiUrl + roomsBanner.bannerImage
      : roomsBanner.bannerImage
    : "";

  return (
    <div className='flex w-screen h-screen lg:items-end md:items-center md:justify-center lg:justify-end bg-center bg-cover '    style={{ backgroundImage: `url(${bannerImgSrc})` }}>
      <div className='flex h-full w-full lg:w-[42%] bg-[#1D1D1B]/40 justify-center items-end md:items-center'>
      <div className="flex flex-col gap-[34px] 2xl:gap-[45px] md:gap-10 w-[80%] h-auto text-white text-center justify-center items-center mt-[16%] mb-[20px] lg:mb-0">
        <h2 className='font-marcellus text-[36px] lg:text-[44px] leading-[20px] -tracking-[0.88px] font-normal 2xl:mb-4'>{header}</h2>
        <Link href={buttonLink1} className='flex py-[10px] px-[40px] border-[2px] border-white justify-center items-center shadow-buttonCustom gap-[65px] font-jost uppercase text-[14px] lg:text-[16px] font-medium leading-[30px] text-center bg-transparent w-[90%] md:w-[50%] xl:w-[45%] lg:min-w-[337px]'>{buttonText1}</Link>
        <Link href={buttonLink2} className='flex py-[10px] px-[40px] border-[2px] border-white justify-center items-center shadow-buttonCustom gap-[65px] font-jost uppercase text-[14px] lg:text-[16px] font-medium leading-[30px] text-center bg-transparent w-[90%] md:w-[50%] xl:w-[45%] lg:min-w-[337px]'>{buttonText2}</Link>
        <Link href={buttonLink3} className='flex py-[10px] px-[40px] border-2 border-white justify-center items-center shadow-buttonCustom gap-[65px] font-jost uppercase text-[14px] lg:text-[16px] font-medium leading-[30px] text-center bg-transparent w-[90%] md:w-[50%] xl:w-[45%] lg:min-w-[337px]'>{buttonText3}</Link>
        <Link href={buttonLink4} className='flex py-[10px] px-[40px] border-[2px] border-white justify-center items-center shadow-buttonCustom gap-[65px] font-jost uppercase text-[14px] lg:text-[16px] font-medium leading-[30px] text-center bg-transparent w-[90%] md:w-[50%] xl:w-[45%] lg:min-w-[337px]'>{buttonText4}</Link>
        <Link href={buttonLink5} className='flex py-[10px] px-[40px] border-[2px] border-white justify-center items-center shadow-buttonCustom gap-[65px] font-jost uppercase text-[14px] lg:text-[16px] font-medium leading-[30px] text-center bg-transparent w-[90%] xl:w-[45%] md:w-[50%] lg:min-w-[337px]'>{buttonText5}</Link>
        <Link href={buttonLink6} className='flex py-[10px] px-[40px] border-[2px] border-white justify-center items-center shadow-buttonCustom gap-[65px] font-jost uppercase text-[14px] lg:text-[16px] font-medium leading-[30px] text-center bg-transparent w-[90%] md:w-[50%] xl:w-[45%] lg:min-w-[337px]'>{buttonText6}</Link>
        <Link href={buttonLink7} className='flex py-[10px] px-[40px] border-[2px] border-white justify-center items-center shadow-buttonCustom gap-[65px] font-jost uppercase text-[14px] lg:text-[16px] font-medium leading-[30px] text-center bg-transparent w-[90%] xl:w-[45%] md:w-[50%] lg:min-w-[337px]'>{buttonText7}</Link>
        
      </div>
      </div>
    </div>
  )
}

export default RoomsBanner
