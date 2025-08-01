"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image'
import minigallery from "./images/minigallery2.png"
import Link from 'next/link'
import { PiInstagramLogoLight, PiMetaLogoLight, PiFacebookLogoLight, PiYoutubeLogoLight } from "react-icons/pi";
import { useLocale, useTranslations } from 'next-intl';

const ContactDetails = () => {
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const t = useTranslations('ContactSection2');
  const [pageData, setPageData] = useState(null);
   const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

    useEffect(() => {
           const fetchPageData = async () => {
             try {
               const res = await fetch(`${apiUrl}/api/contactsection2`);
               const json = await res.json();
               setPageData(json);
             } catch (err) {
               console.error("Contact section 2 verisi alınamadı:", err.message);
             }
           };
       
           fetchPageData();
         }, []);
       
         if (!pageData) return <p className="p-10">Yükleniyor...</p>;


   const imgGallery  = pageData.image
     const backgroundImgSrc = imgGallery
    ? imgGallery.startsWith("/uploads")
      ? `${apiUrl}${imgGallery}`
      : imgGallery
    : "";
  
  return (
    <div className="flex flex-col justify-center items-center w-full md:w-[40%] md:pl-6">
      <div className="flex flex-col w-full max-w-[313px] items-center md:items-start justify-center gap-[20px] md:gap-[30px]">
        <span className="font-jost text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase">
          {pageData.subtitle?.[locale] || t('subtitle')}
        </span>
        <h2 className="font-marcellus text-[28px] md:text-[32px] lg:text-[48px] leading-[36px] md:leading-[57.6px] lg:capsizedText2">
        {pageData.title?.[locale] || t('title')}
        </h2>
        <p className="font-jost text-[14px] md:text-[16px] leading-[24px] underline-offset-2 flex flex-col gap-2 ">
          {/* Mobil görünüm (lg'den küçük) */}
          <span className="capsizedText4 lg:hidden">
          {pageData.address?.[locale] || t('address')}
          </span>
          <span className="capsizedText4 lg:hidden">
          {pageData.phone?.[locale] || t('phone')}
          </span>
          <span className="capsizedText4 lg:hidden">
          {pageData.callcenter?.[locale] || t('callcenter')}
          </span>
          <span className="capsizedText4 lg:hidden">
          {pageData.email?.[locale] || t('email')}
          </span>

          {/* Desktop görünüm (lg ve üstü) */}
          <span className="hidden lg:block">
          {pageData.address?.[locale] || " Sorgun Mah. Titreyengol Mevkii No:26 Manavgat/ Antalya / TR "} 
          </span>
          <span className="hidden lg:block">
          {pageData.phone?.[locale] || t('phone')}
          </span>
          <span className="hidden lg:block">
          {pageData.callcenter?.[locale] || t('callcenter')}
          </span>
          <span className="hidden lg:block">
          {pageData.email?.[locale] || "Email: info@lagohotel.com"} 
          </span>
        </p>
        <div className="flex gap-[20px] whitespace-nowrap">
          <div className="flex items-center justify-center gap-[18px]">
           <Link rel="norefferer nofollower"
                  target="_blank" href= {pageData.social?.instagram ||  "https://www.instagram.com/lagohotels/"} > <PiInstagramLogoLight size={28} /></Link>
            {/* <PiMetaLogoLight size={30} /> */}
            <Link rel="norefferer nofollower"
                  target="_blank" href={pageData.social?.facebook ||  "https://www.facebook.com/lagohotels"}><PiFacebookLogoLight size={28} /></Link>
            <Link rel="norefferer nofollower"
                  target="_blank" href={pageData.social?.youtube ||  "https://www.youtube.com/channel/UCjbL19l36uYQEdy2EEw1nLQ"}><PiYoutubeLogoLight size={28} /></Link>
          </div>
          <div className="flex bg-black h-[20px] w-[1px] self-center"></div>
          <Link href={pageData.social?.meta ||  "https://lagohotel.orsmod.com/"} className="text-lagoBrown font-marcellus underline underline-offset-[6px] text-[16px] font-normal leading-[30px] uppercase">
          {pageData.buttonText?.[locale] || t('buttonText')}
          </Link>
        </div>
      </div>
    </div>
  )
}

const GallerySection = ({pageData}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 2.5; // Daha yavaş kayma için 1px
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        scrollContainer.scrollTop += scrollSpeed;
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
          setTimeout(() => {
            scrollContainer.scrollTop = 0;
          }, 500);
        }
      }, 40);
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, []);

   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

   const imggallery  = pageData.image
     const backgroundImgSrc = imggallery
    ? imggallery.startsWith("/uploads")
      ? `${apiUrl}${imggallery}`
      : imggallery
    : "";


  return (
    <div className="flex justify-center md:justify-end items-center w-[90%] md:w-[60%] h-full">
      <div
        style={{ scrollBehavior: "smooth" }}
        ref={scrollRef}
        className="w-full h-[30vh] sm:h-[40vh] justify-center items-center md:h-[322px] max-w-[789px] overflow-hidden custom-scroll scroll-smooth md:mr-[4%]"
      >
        <div className="flex flex-col">
          {[...Array(100)].flatMap((_, loopIndex) =>
            [backgroundImgSrc].map((img, index) => (
              <Image
                key={`${loopIndex}-${index}`}
                src={img}
                height={img.height || 2781}
                width={img.width || 790}
                alt="Minigallery"
                loading="lazy"
                className="xl:w-[100%] h-auto overflow-hidden"
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const ContactSection2 = () => {
  const [pageData, setPageData] = useState(null);
   const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

    useEffect(() => {
           const fetchPageData = async () => {
             try {
               const res = await fetch(`${apiUrl}/api/contactsection2`);
               const json = await res.json();
               setPageData(json);
             } catch (err) {
               console.error("Contact section 2 verisi alınamadı:", err.message);
             }
           };
       
           fetchPageData();
         }, []);
       
         if (!pageData) return <p className="p-10">Yükleniyor...</p>;

  return (
    <div className="flex w-screen max-w-[1440px] mb-[100px] justify-start">
      {/* Desktop görünüm: İki bölüm arasında ekstra boşluk */}
      <div className="hidden md:flex justify-center items-center gap-8 border-[1px] border-lagoBlack xl:min-w-[90vw] 2xl:min-w-[1401px]  h-[34vh] min-h-[422px]">
        <ContactDetails />
        <GallerySection  pageData={pageData}/>
      </div>
      {/* Mobil görünüm: Arkaplan resmi kaldırıldı */}
      <div className="flex flex-col w-full md:hidden justify-center items-center h-[65vh] bg-[#fbfbfb]">
        <div className="flex flex-col w-[90%] sm:w-[85%] bg-[#fbfbfb] gap-[33px] min-h-content h-[55vh] py-[30px] items-center justify-center text-center">
          <ContactDetails />
          <GallerySection pageData={pageData}/>
        </div>
      </div>
    </div>
  )
}

export default ContactSection2
