"use client"
import React,{ useEffect, useRef } from "react";
import Image from 'next/image'
import imgBackground from "./images/socialgalleryback3.webp"
import LeafSvg from '../Header/Icons/LeafSvg'
import minigallery from "./images/minigallery2.png"
import Link from 'next/link'
import { PiInstagramLogoLight,PiMetaLogoLight,PiFacebookLogoLight, PiYoutubeLogoLight} from "react-icons/pi";
import {useTranslations} from 'next-intl';
import { useLocale } from "next-intl";

const ContactSection = ({contact}) => {
  const t = useTranslations('ContactSection');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const locale = useLocale();
  const scrollRef = useRef(null);
  // if (!contact) return null;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 2.5; // Daha yavaş kayma için 1px
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        scrollContainer.scrollTop += scrollSpeed;

        // Eğer en sona geldiyse, biraz bekleyip başa dön
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
          setTimeout(() => {
            scrollContainer.scrollTop = 0; // Baştan başlat (ani sıçrama yapmadan)
          }, 500); // 0.5 saniye bekleyip baştan başlat
        }
      }, 40); // Daha smooth kayma için 30ms
    };

    startScrolling();

    return () => clearInterval(scrollInterval); // Component unmount olursa temizle
  }, []);



  return (
    <div className='flex w-screen h-screen md:h-[497px] lg:h-[750px] 2xl:h-[850px] items-center md:justify-start bg-cover bg-center relative  max-w-[1920px] overflow-hidden justify-center z-10' style={{
  backgroundImage: contact.backgroundImage
    ? `url(${apiUrl}${contact.backgroundImage})`
    : undefined
}}>
      <LeafSvg className="absolute top-6 -left-24 z-20" width={498} height={652}/>
      <div className='flex flex-col md:flex-row w-[95%] md:w-[88%] lg:w-[80%] items-center justify-center bg-white h-[85%] lg:h-[88%] max-w-[1440px] gap-[20px]'>

        <div className='flex h-[39%] md:h-auto w-[90%] md:w-[45%] lg:w-[39%] font-jost text-black items-center md:items-start justify-center '>
           <div className='flex flex-col md:w-[79%] items-center text-center md:text-start md:items-start justify-center gap-[15px] md:gap-[23.19px] lg:gap-[30px]'>
           <span className='z-50 text-[12px] font-medium leading-[14px] uppercase tracking-[0.48px] mt-[10%] md:mt-0'>{contact.subtitle?.[locale] || ""}</span>
            <h2 className='z-50 font-marcellus font-normal text-[32px] lg:text-[48px] leading-[150%] lg:leading-[57.6px] capsizedText3 lg:capsizedText2'>{contact.title?.[locale] || ""}</h2>
            <p className=' z-50 text-[14px] lg:text-[16px] font-normal leading-[24px] '>
             {contact.addressHtml?.[locale] || ""}<br></br>
            {contact.phoneLabel?.[locale] || ""} <Link href="tel:02427569900" className='underline '> {contact.phone || ""} </Link> <br></br>
             {contact.callcenterLabel?.[locale] || ""} <Link href="tel:02425245787" className='underline '>{contact.callcenter || ""}</Link> <br></br>
             {contact.emailLabel?.[locale] || ""} <Link href="/" className='underline '>{contact.email || ""}</Link> <br></br>
            </p>
            <div className='flex z-50 w-full items-center justify-start gap-[20px] '>
                <div className='flex items-center justify-center gap-[18px]'>
                <Link rel="norefferer nofollower"
                  target="_blank" href={contact.instagram || ""}> <PiInstagramLogoLight size={28} /></Link>
                {/* <PiMetaLogoLight size={30} /> */}
                <Link rel="norefferer nofollower"
                  target="_blank" href={contact.facebook || ""}><PiFacebookLogoLight size={28} /></Link>
                <Link rel="norefferer nofollower"
                  target="_blank" href={contact.youtube || ""}><PiYoutubeLogoLight size={28} /></Link>
                </div>
                <div className='flex bg-black h-[20px] w-[1px]'></div>
                <Link rel="norefferer nofollower"
                  target="_blank" href="https://lagohotel.orsmod.com/" className="text-lagoBrown font-marcellus underline underline-offset-[6px] text-[16px] font-normal hidden lg:flex leading-[30px] uppercase">{t('buttonText')}</Link>
                <Link rel="norefferer nofollower"
                  target="_blank" href="https://lagohotel.orsmod.com/" className="z-50 text-lagoBrown font-marcellus underline underline-offset-[6px] text-[14px] font-normal md:leading-[19.88px] flex lg:hidden uppercase">{t('buttonText')}</Link>
            </div>
           </div>
        </div>

        <div className='flex w-[90%] md:w-[55%] lg:w-[60%] h-[59%] md:h-[95%] '>
        <div style={{ scrollBehavior: "smooth" }} ref={scrollRef} className="w-full h-[96%] md:h-full min-h-[322px] max-w-[99%] overflow-hidden custom-scroll scroll-smooth ">
      <div className="flex flex-col">
          {[...Array(8)].flatMap((_, loopIndex) =>
            [minigallery].map((img, index) => (
              <Image
                key={`${loopIndex}-${index}`}
                src={`${apiUrl}${contact.galleryImage}`}
                height={img.height}
                width={img.width}
                alt="Minigallery"
                loading="lazy"
                className="xl:w-[100%] h-auto overflow-hidden"
              />
            ))
          )}
        </div>
       
      </div>
          </div>       

      </div>
    </div>
  )
}

export default ContactSection
