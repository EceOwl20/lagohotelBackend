"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DownArrow from '../../GeneralComponents/Header/Icons/DownArrow';

const InfoSection = ({ 
  isImageLeft = true, 
  span, 
  header, 
  text, 
  text2,
  img, 
  link, 
  showLink,
  buttonText
}) => {
  // Açma/kapama durumunu tutan state. Başlangıçta kapalı.
  const [isOpen, setIsOpen] = useState(false);
  // Masaüstü düzeninde resim ve metin konumunu belirlemek için
  const containerDirection = isImageLeft ? "flex-row" : "flex-row-reverse";

  return (
    <div className="flex w-screen items-center justify-center max-w-[1440px]">
      <div className="flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[30px]">
        {/* Başlık kısmı – her zaman görünür */}
        <div
          className="cursor-pointer flex flex-col items-center md:items-start text-black gap-[10px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase">
            {span}
          </span>
          <h3 className="flex text-[24px] lg:text-[28px] font-normal leading-[120%] lg:leading-[57.6px] font-marcellus capitalize lg:capsizedtext2 w-full justify-between border-b">
            {header} <DownArrow
                  className="flex items-center justify-center"
                  width={20}
                  height={20}
                  color="#000"
                />
          </h3>
        </div>

        {/* İçerik kısmı – isOpen true olduğunda açılır, yumuşak animasyonla */}
        {isOpen && (
          <div className={`flex flex-col md:${containerDirection} items-center md:items-start justify-between gap-[30px] transition-all duration-500`}>
            {/* Resim */}
            <div className="w-full md:w-[42.5%]">
              <Image 
                src={img} 
                alt="indoor" 
                width={img.width} 
                height={img.height} 
                className="w-full shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl" 
              />
            </div>

            {/* Metin içeriği */}
            <div className="flex flex-col gap-[10px] md:gap-[25px] lg:gap-[20px] text-black font-jost w-full md:w-[54%]">
              <p className="text-[12px] lg:text-[14px] font-normal leading-[21px]">
                {text}
              </p>
              {text2 && (
                <p className="text-[12px] lg:text-[14px] font-normal leading-[21px]">
                  {text2}
                </p>
              )}
              {showLink && (
                <Link 
                  href={link} 
                  className="flex w-[170.585px] whitespace-nowrap py-[16px] px-[32px] font-jost text-[14px] lg:text-[16px] text-lagoBrown font-medium leading-[30px] items-center justify-center border border-lagoBrown shadow-buttonCustom uppercase"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoSection;
