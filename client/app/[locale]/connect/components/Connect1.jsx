"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"
import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { useLocale, useTranslations } from "next-intl";

// Divider bileşeni: md ve üzeri ekranlarda görünür, responsive negatif margin ile sola kayar.
const Divider = () => (
  <div className='hidden lg:flex items-center justify-start'>
    <div className='bg-lagoBlack w-[1px] h-[90px] ' />
  </div>
);

// İletişim sütunu bileşeni: ikon, başlık ve açıklama alanını içerir.
const ContactColumn = ({ icon, title, children }) => (
  <div className='flex items-start justify-start gap-[17px] '>
    <div className='flex'>
      {icon}
    </div>
    <div className='flex flex-col items-start justify-start text-start gap-[10px] lg:gap-[17px]'>
      <h4 className='text-lagoBlack font-marcellus text-[22px] lg:text-[24px] leading-[32px] capitalize font-normal'>{title}</h4>
      <p className='text-lagoGray font-jost text-[18px] font-normal leading-[26px] tracking-[0.72px] underline'>{children}</p>
    </div>
  </div>
);

const Page = () => {
  const t = useTranslations('Contact');
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [pageData, setPageData] = useState(null);
    useEffect(() => {
      fetch(`${apiUrl}/api/pages/contact`)
        .then((r) => r.json())
        .then((json) => setPageData(json))
        .catch(console.error);
    }, [apiUrl]);
  
    if (!pageData) return <p className="p-10">Yükleniyor…</p>;

    const imgBanner = pageData.connect1?.image
    ? pageData.connect1.image.startsWith("/")
      ? `${apiUrl}${pageData.connect1.image}`
      : pageData.connect1.image
    : "";

  return (
    <div className='flex flex-col justify-center items-center mb-[4%] w-screen'>
      {/* Resim ve overlay container */}
      <div className='relative flex w-full h-[60vh]'>
        <Image 
          src={imgBanner} 
          width={1000} 
          height={3000} 
          className='w-full h-full object-cover' 
          alt="Header Image" 
        />
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center gap-[30px] lg:gap-[50px]'>
          <h1 className="font-jost text-[12px] md:text-[16px] font-medium leading-[14px] tracking-[0.6px] uppercase text-white">
            {pageData.connect1?.subtitle?.[locale]}
          </h1>
          <p className="font-jost text-[40px] lg:text-[56px] md:text-[48px] font-medium leading-[48px] md:leading-[64px] tracking-[-1.6px] text-white">
          {pageData.connect1?.title?.[locale]}
          </p>
        </div>
      </div>
      
      {/* İletişim bilgileri: Özel grid yapısı */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] justify-start items-start w-[87.79%] md:w-[91.4%] lg:w-[76.8%] lg:min-w-[976px] xl:w-[1106px] gap-[30px] md:gap-[50px] xl:gap-[79px] mt-[100px]'>
        
        <ContactColumn icon={<CiLocationOn size={28} color='#1D1D1B'/>} title={pageData.connect1?.addressLabel?.[locale]}>
       <span className='text-[16px] lg:text-[18px] font-normal leading-normal lg:leading-[26px] tracking-[0.72px] text-[#4B4E4F]'>{pageData.connect1?.address?.[locale]}</span>
        </ContactColumn>
        
        <Divider />
        
        <ContactColumn icon={<FiPhone size={22} className='mt-1' color='#1D1D1B'/>} title={pageData.connect1?.phoneLabel?.[locale]}>
         <span className='text-[16px] lg:text-[18px] font-normal leading-normal lg:leading-[26px] tracking-[0.72px] text-[#4B4E4F]'>
         {pageData.connect1?.phones?.[0]}<br />{pageData.connect1?.phones?.[1]}
         </span>
        </ContactColumn>
        
        <Divider />
        
        <ContactColumn icon={<CiLocationOn size={28} color='#1D1D1B'/>} title={pageData.connect1?.emailLabel?.[locale]}>
         <span className='text-[16px] lg:text-[18px] font-normal leading-normal lg:leading-[26px] tracking-[0.72px] text-[#4B4E4F]'> {pageData.connect1?.emails?.[0]}</span>
        </ContactColumn>
      </div>
    </div>
  )
}

export default Page
