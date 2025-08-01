"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; // Sayfa değişimini takip etmek için
import Image from "next/image";
import Link from "next/link";
import Hamburger from "./Icons/Hamburger";
import Phone from "./Icons/Phone";
import TripAdvisor from "./Icons/SocialMedia/TripAdvisor";
import Google from "./Icons/SocialMedia/Google";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import logosvg from "./Icons/Asset2.svg";
import gradient4 from "./Icons/header.png";
import DownArrow from "./Icons/DownArrow";
import { IoMdArrowDropdown } from "react-icons/io";
import Form from "../Form";
import { RxCross2 } from "react-icons/rx";
import panda from "./Icons/panda.png"
import LangSwitcher from "@/LangSwitcher";
import {useLocale, useTranslations} from 'next-intl';

export default function Header() {
  const locale = useLocale();
  const [headerData, setHeaderData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
     const t = useTranslations('Header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname(); // Şu anki sayfanın yolunu al
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);


  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/header`);
        const json = await res.json();
        setHeaderData(json);
      } catch (err) {
        console.error("Header verisi alınamadı:", err.message);
      }
    };

    fetchPageData();
  }, []);

  // **Sayfanın herhangi bir yerine tıklayınca kapansın**
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]); // pathname değiştiğinde sidebar kapanacak

   if (!headerData) return <p className="p-10">Yükleniyor...</p>;

  return (
    <div className="flex w-screen">
      <header className="absolute right-0  left-0 w-full z-[99] items-center justify-center">
        <div
          className="
            relative
            h-[100px]
            flex
            items-center justify-center
            to-transparent
            w-full
          "
        >
          <div className="absolute flex -top-[6px] w-full">
            <Image
              src={gradient4}
              width={gradient4.width}
              height={gradient4.header}
              className="w-full h-[110px]"
              alt="header"
              priority 
            />
          </div>

          {!isMenuOpen && (
            <div className="flex flex-row-reverse md:flex-row items-center mb-[2%] md:mb-[0.5%] lg:mb-[0.5%] h-full justify-center ml-[73%] sm:ml-[80%] md:ml-[4%] ">
              <button className="flex z-20 h-full items-center justify-center" onClick={toggleMenu}>
                <Hamburger
                  alt="menu"
                  width={30}
                  height={30}
                  color="white"
                  className="object-contain"
                />
              </button>
              <div className="flex items-center justify-center h-full gap-[4px] mr-[15px] md:ml-[15px] z-[20]">
                <span className="text-white text-[16px] font-medium leading-[125%] uppercase -tracking-[0.352px] font-jost capsizedText4 flex">
                <LangSwitcher />  
                <DownArrow
                  className="flex items-center justify-center"
                  width={12}
                  height={12}
                  color="#ffffff"
                />
                </span>
               
              </div>
            </div>
          )}

          {/* EN bar */}

          {/* Ortadaki Logo */}
          <div className="absolute left-[16%] sm:left-[13%] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-[65%] md:-translate-y-1/2">
            <Link className="w-full items-center justify-center flex" href="/">
              <Image
                src={logosvg}
                alt="Logo"
                className="object-contain w-[62px] h-[46px] lg:w-[30%] lg:max-w-[300px] lg:h-auto items-center justify-center"
              />
            </Link>
          </div>

          {/* Sağ Contact & Book Now */}
          <div className="ml-auto flex items-center justify-center space-x-[5px] mr-[4%] z-20 h-full">
            <Link
               href={headerData.contactLink?.[locale] }
              className="
              hidden lg:flex
                text-white
                text-[16px]
                font-medium
                leading-normal
                uppercase
                 underline
                underline-offset-[5px]
                decoration-solid
                px-[30px]
                pb-[15px]
                pt-[8px]
                font-jost
                h-[41px]">
           {headerData.contactText?.[locale] }
            </Link>
            <Link
            href={headerData.contactLink?.[locale] }
              rel="norefferer nofollower"
                  target="_blank"
              className="
                hidden 
                md:flex
                px-[35px]
                py-[17px]
                text-white
                text-[16px]
                font-medium
                leading-normal
                uppercase
                bg-transparent
                border
                border-white
                border-solid
                 h-[42px]
                 w-auto
                 items-center justify-center
                 font-jost
              "
            >
               {headerData.bookNowText?.[locale] }
            </Link>
          </div>
        </div>
      </header>

      {/* Arkaya karartma (menü açıkken) */}
      {isMenuOpen && (
        <div onClick={toggleMenu} className="relative inset-0 z-[9999] " />
      )}

      {/* Menü paneli => lighten blend mode lg:h-[calc(100vh-84.2px)]*/}
      <div
        ref={menuRef} // **Referans atadık**
        className={`
          fixed top-0 left-0
          w-full
          lg:w-[420px]
          h-[100vh]
          lg:bg-[#1D1D1B] lg:bg-opacity-50  
            bg-[rgba(29,29,27,0.70)] backdrop-blur-[10px]
          z-[9999]
          transform transition-transform duration-300
          items-center justify-center
          ${
            isMenuOpen
              ? "translate-x-0 md:translate-x-0"
              : "translate-x-full md:-translate-x-full"
          }
        `}>
        {/* Menü kapatma butonu */}
        {/* <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white text-3xl font-bold p-2 hover:text-gray-200 "
        >
          <div className='flex bg-black/50 items-center justify-center h-10 w-10 rounded-[4px] '>
          <div className='flex h-[2px] w-6 rotate-[-45deg] flex-shrink-0 bg-white'></div>
          <div className='flex absolute h-[2px] w-6 rotate-[45deg] flex-shrink-0 bg-white'></div>
          </div>
        </button> */}

        {/* MENÜ LİNKLERİ */}
        <div className="flex flex-col w-[98%] ml-[1%] h-[95%] items-center justify-around py-[30px] lg:py-[15px] gap-[30px]">
        <button
              onClick={toggleMenu}
              className="hidden lg:flex absolute top-8 right-6 text-[40px] p-2 text-stoneLight text-white"
            >
              <RxCross2 size={24} color="#fff" />
            </button>
        <div className="flex lg:hidden  w-[90%] lg:w-[90%] items-center justify-between -mt-[10px]">
            <Image
              src={logosvg}
              alt="Logo"
              className="flex object-contain w-[62px] h-[46px] items-center justify-center"
            />
            <button
              onClick={toggleMenu}
              className="flex text-[40px] text-stoneLight text-white"
            >
              <RxCross2 size={24} color="#fff" />
            </button>
          </div>

          <nav className=" items-center md:w-[90%] justify-center lg:mt-10 mt-6 px-4 w-[80%] sm:w-[60%] lg:max-w-[392px] space-y-[10px] text-[16px] lg:text-[18px] text-white font-jost uppercase h-[521px] overflow-y-auto thin-scrollbar">
            <div className="relative">
              <div
                onClick={() => setIsRoomsOpen(!isRoomsOpen)}
                className="flex items-center font-normal leading-[26.667px] gap-[11.11px] w-[70%] md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
              >
                 {headerData.menuItems[0]?.text?.[locale]}
                <IoMdArrowDropdown
                  className={`w-4 h-4 transition-transform ${
                    isRoomsOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isRoomsOpen
                    ? "max-h-[300px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="mt-2 space-y-2 pl-4  border-white/30 font-jost">
                <Link
                      href={headerData.menuItems[1]?.link?.[locale] }
                    className="block text-[14px] text-[#FBFBFB] leading-[29.639px] uppercase"
                  >
                   {headerData.menuItems[1]?.text?.[locale] }
                  </Link>
                  <Link
                    href="/rooms/superiorroom"
                    className="block text-[14px] text-[#FBFBFB] leading-[29.639px] uppercase"
                  >
                        {headerData.menuItems[2]?.text?.[locale] }
                  </Link>
                  <Link
                    href="/rooms/familyroom"
                    className="block text-[14px] text-[#FBFBFB] leading-[29.639px] uppercase"
                  >
                       {headerData.menuItems[3]?.text?.[locale] }
                  </Link>
                  <Link
                    href="/rooms/swimuproom"
                    className="block text-[14px] text-[#FBFBFB] leading-[29.639px] uppercase"
                  >
                     {headerData.menuItems[4]?.text?.[locale] }
                  </Link>
                  <Link
                    href="/rooms/familyswimup"
                    className="block text-[14px] text-[#FBFBFB] leading-[29.639px] uppercase"
                  >
                         {headerData.menuItems[5]?.text?.[locale] }
                  </Link>
                  <Link
                    href="/rooms/duplexfamilyroom"
                    className="block text-[14px] text-[#FBFBFB] leading-[29.639px] uppercase"
                  >
                       {headerData.menuItems[6]?.text?.[locale] }
                  </Link>
                  <Link
                    href="/rooms/disableroom"
                    className="block text-[14px] text-[#FBFBFB] leading-[29.639px] uppercase"
                  >
                         {headerData.menuItems[7]?.text?.[locale] }
                  </Link>
                  <Link
                    href="/rooms/tinyvilla"
                    className="block text-[14px] text-[#FBFBFB] leading-[29.639px] uppercase"
                  >
                         {headerData.menuItems[8]?.text?.[locale] }
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/beachpools"
              className="block  font-normal leading-[26.667px] w-[70%] md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
            {headerData.menuItems[9]?.text?.[locale] }
            </Link>
            <Link
              href="/restaurants"
              className="block font-normal leading-[26.667px] w-[70%]  md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
              {headerData.menuItems[10]?.text?.[locale] }
            </Link>
            <Link
              href="/barcafes"
              className="block font-normal leading-[26.667px] w-[70%]  md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
           {headerData.menuItems[11]?.text?.[locale] }
            </Link>
            <Link
              href="/entertainment"
              className="block font-normal leading-[26.667px] w-[70%]  md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
              {headerData.menuItems[12]?.text?.[locale] }
            </Link>
            <Link
              href="/kidsclub"
              className="font-normal leading-[26.667px] items-center gap-[6px] flex w-[70%]  md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
               {headerData.menuItems[13]?.text?.[locale] }
              <Image src={panda} alt="KidIcon" width={23} height={28} />
            </Link>
            <Link
              href="/spawellness"
              className="block text-white  font-normal leading-normal w-[70%]  md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
                {headerData.menuItems[14]?.text?.[locale] }
            </Link>
            <Link
              href="/special"
              className="block text-white  font-normal leading-normal w-[70%]  md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
              {headerData.menuItems[15]?.text?.[locale] }
            </Link>
            <Link
              href="/gallery"
              className="block text-white  font-normal leading-normal w-[70%]  md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
             {headerData.menuItems[16]?.text?.[locale] }
            </Link>
            <Link
              href="/about"
              className="block text-white font-normal leading-normal w-[70%]  md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
                 {headerData.menuItems[17]?.text?.[locale] }
            </Link>
            <Link
              href="/connect"
              className="block text-white font-normal leading-normal w-[70%]  md:w-[90%] lg:max-w-[360.114px] py-[11px] border-b border-b-[#A6A6A6] lg:border-none"
            >
                  {headerData.menuItems[18]?.text?.[locale] }
            </Link>
          </nav>

          {/* TELEFON + BUTON ALANI */}
          <div className=" px-4 w-full lg:max-w-[392px] flex flex-col items-center font-jost">
            <div className="flex items-center justify-center gap-[15px] text-white">
              <Phone className="flex" width={18} height={18} color="#ffffff" />
              <p className="text-[15px] font-normal leading-[24px]">
              {headerData.phone }
              </p>
            </div>
            <span
                onClick={() => setIsFormOpen(true)}
              className="
             flex justify-center
             items-center
              mt-[20px]
              min-w-[253px]
              h-[42px]
              bg-[#181818]
              text-white
              uppercase
              text-center
              font-semibold
              hover:bg-gray-800
              leading-[24px]
              py-[15px]
              px-[19px]">
             {headerData.letUsCallYouText?.[locale] }
            </span>
              {/* Contact Form bileşeni burada çağrılıyor */}
          <Form isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} color="rgba(29, 29, 27, 0.85)" colorText={'#ffffff'}/>

            {/* Sosyal İkonlar */}
            <div className="flex items-center justify-center gap-4 mt-[18.79px]">
              <Link
               href= {headerData.social.tripadvisor?.[locale] ||"https://www.tripadvisor.com.tr/Hotel_Review-g1192102-d545626-Reviews-Lago_Hotel-Sorgun_Manavgat_Turkish_Mediterranean_Coast.html"}
                target="_blank"
                 rel="norefferer nofollower"
                className="bg-white h-[42.412px] w-[42.412px] rounded-[4px] shadow-custom flex items-center justify-center"
              >
                <TripAdvisor className="flex" width={34} height={34} />
              </Link>
              <Link
               href= {headerData.social.google?.[locale] ||"https://maps.app.goo.gl/6Bdt7s5LWH1xxAXX6"}
                target="_blank"
                 rel="norefferer nofollower"
                className="bg-white h-[42.412px] w-[42.412px] rounded-[4px] shadow-custom flex items-center justify-center"
              >
                <Google className="flex" width={70} height={70} />
              </Link>
              <Link
                href= {headerData.social.facebook?.[locale] || "https://www.facebook.com/lagohotels"}
                target="_blank"
                 rel="norefferer nofollower"
                className="bg-white h-[42.412px] w-[42.412px] rounded-[4px] shadow-custom flex items-center justify-center"
              >
                <FaFacebookF className="w-6 h-6" color="#505050" />
              </Link>
              <Link
               href= {headerData.social.youtube?.[locale] || "https://www.youtube.com/channel/UCjbL19l36uYQEdy2EEw1nLQ"}
                target="_blank" rel="norefferer nofollower"
                className="bg-white h-[42.412px] w-[42.412px] rounded-[4px] shadow-custom flex items-center justify-center"
              >
                <FaYoutube className="w-6 h-6" color="#505050" />
              </Link>
              <Link
                 href= {headerData.social.instagram?.[locale] || "https://www.instagram.com/lagohotels/"}
                target="_blank"  rel="norefferer nofollower"
                className="bg-white h-[42.412px] w-[42.412px] rounded-[4px] shadow-custom flex items-center justify-center"
              >
                <FaInstagram className="w-6 h-6" color="#505050" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
