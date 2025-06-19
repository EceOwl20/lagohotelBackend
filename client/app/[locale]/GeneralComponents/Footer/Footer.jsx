"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTripadvisor
} from "react-icons/fa";
import Logo from "../Header/Icons/Logo.png";
import Link from "next/link";
import logosvg from "../Header/Icons/Asset2.svg";
import Phone from "../Header/Icons/Phone";
import LocationSvg from "./LocationSvg";
import MessageSvg from "./MessageSvg";
import ArrawDown from "@/app/[locale]/HomePage/Components/Icons/ArrawDown";
import DgtlfaceSvg from "./DgtlfaceSvg";
import BSvg from "./BSvg";
import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <footer className="w-full flex flex-col bg-[#1A1A16] text-gray-200 text-sm justify-center items-center z-10">
      <div className="hidden lg:flex w-[60%] min-w-[1010px] items-center justify-center text-start gap-[4%] mt-[60px]">
      <div className="w-[47%] flex flex-col items-start pl-10 gap-[40px]">
          {/* Logo */}
          <div className="mb-3">
            <Image
              src={Logo}
              alt="Lago Logo"
              width={69}
              height={51}
              className="object-contain"
            />
          </div>

          {/* Sosyal ikonlar */}
          <div className="grid grid-cols-2 lg:flex items-center gap-[32px]">
            <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.instagram.com/lagohotels/"><FaInstagram className="w-[30px] h-[32px]" color="#fff"/></Link>
            <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.youtube.com/channel/UCjbL19l36uYQEdy2EEw1nLQ" > <FaYoutube className="w-[30px] h-[32px]" color='#fff'/></Link>
            <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.facebook.com/lagohotels"><FaFacebook className="w-[30px] h-[32px]" color="#fff" /></Link>
            <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.tripadvisor.com.tr/Hotel_Review-g1192102-d545626-Reviews-Lago_Hotel-Sorgun_Manavgat_Turkish_Mediterranean_Coast.html" ><FaTripadvisor className="w-[30px] h-[32px]" color="##ffffff"/></Link>
          </div>

          {/* Alt linkler */}
          <div className="grid-cols-2 xl:grid-cols-3 grid  items-center gap-6 whitespace-nowrap text-lagoGray2 w-full">
            <a href="/terms-of-use" className="hover:underline">
            {t('termsuse')}
            </a>
            <a href="#" className="hover:underline">
            {t('notice')}
            </a>
            <a href="/sustainability" className="hover:underline">
            {t('sustainability')}
            </a>
            <Link href="/ourpolicies" className="hover:underline">
            {t('ourpolicies')} 
            </Link>
            <a href="/certificates" className="hover:underline">
            Certificate
            </a>
          <Link className="hover:text-white cursor-pointer" href="/news">{t('blog')}</Link>

          </div>
        </div>

        <div className="hidden lg:flex w-[1px] h-[250px] bg-white"></div>

        <div className="flex w-[47%] items-start text-start">
          {/* SOL: 4 SÜTUN (QUICK MENU, TERMS, COMPANY, CONTACT) */}
          <div className="w-full ml-0 xl:w-[90%] xl:ml-[9%] grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* QUICK MENU */}
            {/* <div className="flex flex-col items-start justify-start text-start gap-[40px]">
              <h4 className="text-[15px] text-white font-marcellus font-normal leading-[26px] tracking-[0.6px] uppercase">
              <Link href="/rooms"> {t('category1')}</Link>
              </h4>
              <ul className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px] space-y-6">
                <li className="hover:text-white cursor-pointer"><Link href="/rooms/superiorroom">{t('superior')}</Link></li>
                <li className="hover:text-white cursor-pointer"><Link href="/rooms/familyroom">{t('family')}</Link></li>
                <li className="hover:text-white cursor-pointer"><Link href="/rooms/swimuproom">{t('swimup')}</Link></li>
                <li className="hover:text-white cursor-pointer"><Link href="/rooms/familyswimup">{t('familyswimup')}</Link></li>
                <li className="hover:text-white cursor-pointer"><Link href="/rooms/tinyvilla">{t('tinyvilla')}</Link></li>
             
              </ul>
            </div> */}

            {/* TERM & CONDITIONS */}
            {/* <div className="flex flex-col items-start justify-start text-start gap-[40px]">
              <h4 className="text-[15px] text-white font-marcellus font-normal leading-[26px] tracking-[0.6px] uppercase ">
              <Link href="/restaurants">{t('category2')}</Link>
              </h4>
              <ul className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px] space-y-6">
                <li className="hover:text-white cursor-pointer">
                <Link href="/restaurants/mainrestaurant">{t('mainrestaurant')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
               <Link href="/restaurants/gustorestaurant"> {t('gusto')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
              <Link href="/barcafes"> {t('barcafes')}</Link>
                </li>
                
                <li className="hover:text-white cursor-pointer">
                <Link href="/barcafes/maldivabar"> {t('maldiva')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                <Link href="/barcafes/cafedelago"> {t('cafedelago')}</Link>
                </li>
                
              </ul>
            </div> */}

            {/* COMPANY */}
            {/* <div className="flex flex-col items-start justify-start text-start gap-[40px]">
              <h4 className="text-[15px] text-white font-marcellus font-normal leading-[26px] tracking-[0.6px] uppercase ">
              <Link href="/entertainment"> {t('category3')}</Link>
              </h4>
              <ul className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px] space-y-6">
              <li className="hover:text-white cursor-pointer">
              <Link href="/spor"> {t('spor')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                <Link href="/kidsclub">{t('kidsclub')}</Link> 
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/entertainment">{t('stageshow')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                <Link href="/spawellness">{t('spa')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer"><Link href="/special">{t('special')}</Link></li>
              </ul>
            </div> */}

            {/* CONTACT */}
            <div className="flex flex-col items-start justify-start text-start gap-[40px]">
              <h4 className="text-[15px] text-white font-marcellus font-normal leading-[26px] tracking-[0.6px] uppercase ">
                <Link href="/connect">Contact</Link>
              </h4>
              <div className="flex flex-col gap-[24px]">
                <p className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px] underline">
                {t('phone')}
                </p>
                <p className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px] underline">Call Center: <Link href="tel:02425245787" className='underline '>+90 242 524 57 87</Link></p>
                <p className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px]">
                {t('email')}
                </p>
                <p className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px] ">
                {t('address')}
                </p>
              </div>
            </div>
          </div>
        </div>

      
      </div>

      {/* tablet */}
      <div className="hidden md:flex flex-col lg:hidden w-full bg-lagoBlack h-auto py-[47px] gap-[50px] items-center justify-center">
        <div className="flex w-[90%] gap-[97px] items-center justify-start ml-[10%]">
          <Image
            src={logosvg}
            alt="Logo"
            width={114}
            height={83}
            className="object-contain items-center justify-center"
          />

          <div className="grid grid-cols-2 gap-[25px] items-start justify-start font-jost text-[12px] font-normal leading-[24px] w-[66%] ml-[2%]">
            <div className="flex gap-[15px] items-center justify-center">
              <Phone className="flex" width={25} height={25} color="#A6A6A6" />
              <div className="flex flex-col gap-[10px] items-start justify-start">
                <span className="text-[#A6A6A6] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  Hotel Line
                </span>
                <div className="flex h-[1px] w-full bg-[#D9D9D9]/50"></div>
                <p className="text-[#FBFBFB] leading-[32.53px] capsizedText6">
                  + 90 242 756 99 00
                </p>
              </div>
            </div>

            <div className="flex gap-[15px] items-center justify-center">
              <Phone className="flex" width={25} height={25} color="#A6A6A6" />
              <div className="flex flex-col gap-[10px] items-start justify-start">
                <span className="text-[#A6A6A6] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  Call Center
                </span>
                <div className="flex h-[1px] w-full bg-[#D9D9D9]/50"></div>
                <p className="text-[#FBFBFB] leading-[32.53px] capsizedText6">
                  + 90 242 524 57 87
                </p>
              </div>
            </div>

            <div className="flex gap-[15px] items-center justify-center">
              <LocationSvg
                className="flex"
                width={26}
                height={26}
                color="#A6A6A6"
              />
              <div className="flex flex-col gap-[10px] items-start justify-start">
                <span className="text-[#A6A6A6] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  Adress
                </span>
                <div className="flex h-[1px] w-full bg-[#D9D9D9]/50"></div>
                <p className="text-[#FBFBFB] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  Manavgat/Antalya, TR
                </p>
              </div>
            </div>

            <div className="flex gap-[15px] items-center justify-center">
              <MessageSvg
                className="flex"
                width={26}
                height={26}
                color="#A6A6A6"
              />
              <div className="flex flex-col gap-[10px] items-start justify-start">
                <span className="text-[#A6A6A6] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  E-mail
                </span>
                <div className="flex h-[1px] w-full bg-[#D9D9D9]/50"></div>
                <p className="text-[#FBFBFB] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  info@lagohotel.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[30px] items-start justify-center w-[90%] ml-[10%]">
          <div className="flex flex-col items-start justify-start text-start gap-[40px] w-[33%]">
            <h4 className="text-[15px] text-white font-marcellus font-normal leading-[26px] tracking-[0.6px] uppercase ">
            <Link href="/rooms">{t('category1')}</Link>
            </h4>
            <ul className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px] space-y-6">
               <li className="hover:text-white cursor-pointer"><Link href="/rooms/superiorroom">{t('superior')}</Link></li>
                <li className="hover:text-white cursor-pointer"><Link href="/rooms/familyroom">{t('family')}</Link></li>
                <li className="hover:text-white cursor-pointer"><Link href="/rooms/swimuproom">{t('swimup')}</Link></li>
                <li className="hover:text-white cursor-pointer"><Link href="/rooms/familyswimup">{t('familyswimup')}</Link></li>
                {/* <li className="hover:text-white cursor-pointer"><Link href="/rooms/tinyvilla">{t('tinyvilla')}</Link></li> */}

            </ul>
          </div>

          {/* TERM & CONDITIONS */}
          <div className="flex flex-col items-start justify-start text-start gap-[40px] w-[33%]">
            <h4 className="text-[15px] text-white font-marcellus font-normal leading-[26px] tracking-[0.6px] uppercase ">
            <Link href="/restaurants">{t('category2')}</Link>
            </h4>
            <ul className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px] space-y-6">
            <li className="hover:text-white cursor-pointer">
                <Link href="/restaurants/mainrestaurant">{t('mainrestaurant')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
               <Link href="/restaurants/gustorestaurant"> {t('gusto')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
              <Link href="/barcafes"> {t('barcafes')}</Link>
                </li>
                
                <li className="hover:text-white cursor-pointer">
                <Link href="/barcafes/maldivabar"> {t('maldiva')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                <Link href="/barcafes/cafedelago"> {t('cafedelago')}</Link>
                </li>
             
            </ul>
          </div>

          {/* COMPANY */}
          <div className="flex flex-col items-start justify-start text-start gap-[40px] w-[33%]">
            <h4 className="text-[15px] text-white font-marcellus font-normal leading-[26px] tracking-[0.6px] uppercase ">
            <Link href="/entertainment"> {t('category3')}</Link>
            </h4>
            <ul className="text-lagoGray2 font-jost text-[16px] font-normal leading-[20px] space-y-6">
              <li className="hover:text-white cursor-pointer">
              <Link href="/spor"> {t('spor')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                <Link href="/kidsclub">{t('kidsclub')}</Link> 
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link href="/entertainment">{t('stageshow')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                <Link href="/spawellness">{t('spa')}</Link>
                </li>
                <li className="hover:text-white cursor-pointer"><Link href="/special">{t('special')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex w-[92%] items-center justify-center gap-[80px] py-[15px]">
          {/* Sosyal ikonlar */}
          <div className="flex items-center gap-[32px]">
          <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.instagram.com/lagohotels/"><FaInstagram className="w-[30px] h-[32px]" /></Link>
          <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.youtube.com/channel/UCjbL19l36uYQEdy2EEw1nLQ"> <FaYoutube className="w-6 h-6" color='#fff'/></Link>
          <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.facebook.com/lagohotels"><FaFacebook className="w-[30px] h-[32px]" /></Link>
          <Link  rel="norefferer nofollower"
                  target="_blank" href="https://www.tripadvisor.com.tr/Hotel_Review-g1192102-d545626-Reviews-Lago_Hotel-Sorgun_Manavgat_Turkish_Mediterranean_Coast.html"><FaTripadvisor className="w-6 h-6" color="##fff"/></Link>
          </div>

          {/* Alt linkler */}
          <div className="grid grid-cols-3 items-center gap-6 font-jost whitespace-nowrap font-normal leading-[20px] text-[16px] text-lagoGray2">
            <Link href="/terms-of-use" className="hover:underline">
            {t('termsuse')}
            </Link>
            <Link href="#" className="hover:underline">
            {t('notice')} 
            </Link>
            <Link href="/sustainability" className="hover:underline">
            {t('sustainability')} 
            </Link>
            <Link href="/ourpolicies" className="hover:underline">
            {t('ourpolicies')} 
            </Link>
            <Link href="/certificates" className="hover:underline">
            Certificate
            </Link>
            <Link className="hover:text-white cursor-pointer" href="/news">{t('blog')}</Link>
          </div>
        </div>
      </div>

      <div className="flex md:hidden bg-lagoBlack w-screen h-full pt-[29px] pb-[35px] items-center justify-center">
        <div className="flex flex-col gap-[35px] items-center justify-center w-[92%]">
          <Image
            src={logosvg}
            alt="Logo"
            width={73}
            height={54}
            className="object-contain items-center justify-center"
          />

          <div className="grid grid-cols-2 gap-[25px] items-start justify-start font-jost text-[12px] font-normal leading-[24px] w-full ">
            <div className="flex gap-[15px] items-center justify-center">
              <Phone className="flex" width={25} height={25} color="#A6A6A6" />
              <div className="flex flex-col gap-[10px] items-start justify-start">
                <span className="text-[#A6A6A6] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  Hotel Line
                </span>
                <div className="flex h-[1px] w-full bg-[#D9D9D9]/50"></div>
                <p className="text-[#FBFBFB] leading-[32.53px] capsizedText6">
                  + 90 242 756 99 00
                </p>
              </div>
            </div>

            <div className="flex gap-[15px] items-center justify-center">
              <Phone className="flex" width={25} height={25} color="#A6A6A6" />
              <div className="flex flex-col gap-[10px] items-start justify-start">
                <span className="text-[#A6A6A6] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  Call Center
                </span>
                <div className="flex h-[1px] w-full bg-[#D9D9D9]/50"></div>
                <p className="text-[#FBFBFB] leading-[32.53px] capsizedText6">
                  + 90 242 524 57 87
                </p>
              </div>
            </div>

            <div className="flex gap-[15px] items-center justify-center">
              <LocationSvg
                className="flex"
                width={26}
                height={26}
                color="#A6A6A6"
              />
              <div className="flex flex-col gap-[10px] items-start justify-start">
                <span className="text-[#A6A6A6] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  Adress
                </span>
                <div className="flex h-[1px] w-full bg-[#D9D9D9]/50"></div>
                <p className="text-[#FBFBFB] leading-[32.53px] capsizedText6 tracking-[0.3px] whitespace-nowrap">
                  Manavgat/Antalya, TR
                </p>
              </div>
            </div>

            <div className="flex gap-[15px] items-center justify-center">
              <MessageSvg
                className="flex"
                width={26}
                height={26}
                color="#A6A6A6"
              />
              <div className="flex flex-col gap-[10px] items-start justify-start">
                <span className="text-[#A6A6A6] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  E-mail
                </span>
                <div className="flex h-[1px] w-full bg-[#D9D9D9]/50"></div>
                <p className="text-[#FBFBFB] leading-[32.53px] capsizedText6 tracking-[0.3px]">
                  info@lagohotel.com
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full items-center justify-center font-jost font-normal text-[14px]">
            <div
              onClick={() => setIsRoomsOpen(!isRoomsOpen)}
              className="flex w-[98%] p-[10px] md:max-w-[306px] items-center justify-between border border-white leading-[26.667px] uppercase"
            >
              {t('accommodation')} <ArrawDown className="flex" width={25} height={25} />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isRoomsOpen ? "max-h-[260px] opacity-100 w-[90%]" : "max-h-0 opacity-0 w-[90%]"
              }`}
            >
              <div className="mt-2 space-y-[5px] pl-4 border-l border-white/30 font-jost">
              <Link
                  href="/rooms"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                  All Rooms
                </Link>
                <Link
                  href="/rooms/superiorroom"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                {t("superior")}
                </Link>
                <Link
                  href="/rooms/familyroom"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                 {t("family")}
                </Link>
                <Link
                  href="/rooms/swimuproom"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                   {t("swimup")}
                </Link>
                <Link
                  href="/rooms/familyswimuproom"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                 {t("familyswimup")}
                </Link>
                <Link
                  href="/rooms/duplexfamilyroom"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                 {t("duplex")}
                </Link>
                {/* <Link
                  href="/rooms/tinyvilla"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                 {t("tinyvilla")}
                </Link> */}
              </div>
            </div>

            <Link
              href="/special"
              className="flex w-[98%] p-[10px] md:max-w-[306px] mt-[15px] items-center justify-between border border-white leading-[26.667px] uppercase"
            >
              {t('experiences')}
            </Link>
            <Link
              href="/connect"
              className="flex w-[98%] p-[10px] md:max-w-[306px] mt-[15px] items-center justify-between border border-white leading-[26.667px]"
            >
              CONTACT US{" "}
            </Link>
            <div
                onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex w-[98%] p-[10px] md:max-w-[306px] mt-[15px] items-center justify-between border border-white leading-[26.667px]"
            >
              MORE <ArrawDown className="flex" width={25} height={25} />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isMoreOpen ? "max-h-[200px] opacity-100 w-[90%]" : "max-h-0 opacity-0 w-[90%]"
              }`}
            >
              <div className="mt-2 space-y-2 pl-4 border-l border-white/30 font-jost">
                <Link
                  href="/special"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                 {t('kidsclub')}
                </Link>
                <Link
                  href="/kidsclub"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                  {t('special')}
                </Link>
                <Link
                  href="/gallery/"
                  className="block text-[14px] text-[#A6A6A6] leading-[29.639px] uppercase"
                >
                  Gallery
                </Link>
                
              
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-[10px]">
            <Link href="https://www.tripadvisor.com.tr/Hotel_Review-g1192102-d545626-Reviews-Lago_Hotel-Sorgun_Manavgat_Turkish_Mediterranean_Coast.html" className="flex bg-white rounded-[4px] shadow-divCustom w-[42.412px] h-[42.412px] items-center justify-center ]"><FaTripadvisor className="w-6 h-6" color="#A7ABAD"/></Link>
            <div className="flex bg-white rounded-[4px] shadow-divCustom w-[42.412px] h-[42.412px] items-center justify-center ]"> <BSvg className="flex" width={70} height={63}/></div>
            <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.facebook.com/lagohotels" className="flex bg-white rounded-[4px] shadow-divCustom w-[42.412px] h-[42.412px] items-center justify-center ]"> <FaFacebook className="w-6 h-6" color='#A7ABAD'/></Link>
            <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.youtube.com/channel/UCjbL19l36uYQEdy2EEw1nLQ" className="flex bg-white rounded-[4px] shadow-divCustom w-[42.412px] h-[42.412px] items-center justify-center "> <FaYoutube className="w-6 h-6" color='#A7ABAD'/></Link>
            <Link rel="norefferer nofollower"
                  target="_blank" href="https://www.instagram.com/lagohotels/" className="flex bg-white rounded-[4px] shadow-divCustom w-[42.412px] h-[42.412px] items-center justify-center"><FaInstagram className="w-6 h-6" color='#A7ABAD'/></Link>
          </div>

          <div className="grid-cols-2 grid items-center justify-center text-center gap-[10px] whitespace-nowrap text-lagoGray2 w-full text-[14px]">
            <a href="/terms-of-use" >
            {t('termsuse')}
            </a>
            <a href="#" >
            {t('notice')}
            </a>
            <a href="/sustainability" >
            {t('sustainability')}
            </a>
            <Link href="/ourpolicies" >
            {t('ourpolicies')} 
            </Link>
            <a href="/certificates" >
            Certificate
            </a>
          <Link className="hover:text-white cursor-pointer" href="/news">{t('blog')}</Link>

          </div>
        </div>
      </div>

      {/* Alt ince çizgi */}
      <div className="md:flex hidden w-full h-[1px] bg-gray-400 mt-[60px]" />
      <Link href="https://dgtlface.com"   rel="norefferer nofollower"
                  target="_blank" className="flex w-full text-[14px] font-normal leading-normal font-jost tracking-[0.56px] mb-2 pb-[80px] md:py-[1.8%] text-center justify-center items-center gap-[9.13px] text-[#A6A6A6]">
            Powered by <DgtlfaceSvg className="flex" width={104} height={27} />
      </Link>
    </footer>
  );
}
