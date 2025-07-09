import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const DiscoverBackground = ({span,header,text,buttonText,
  link,
  img,
}) => {

  return (
    <div
      className="flex w-screen h-[36vh] min-h-[400px]  items-center justify-center bg-center bg-cover relative"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Yarı saydam siyah katman */}
      <div className="absolute inset-0 z-[1] bg-lagoBlack/40"></div>

      {/* İçerik */}
      <div className="flex flex-col w-[87.79%] md:w-[91.4%] lg:max-w-[1440px] items-center justify-center gap-[15px] md:gap-[25px] lg:gap-[30px] font-jost text-white text-center z-10">
        {/* span varsa göster */}
        {span && (
          <span className="text-[12px] lg:w-[30.7%] font-medium leading-[14px] tracking-[0.48px] uppercase">
            {span}
          </span>
        )}

        {/* header varsa göster */}
        {header && (
          <h3 className="text-[28px] md:text-[32px] lg:text-[48px] lg:w-[30.7%] font-marcellus font-normal leading-[120%] lg:leading-[57.6px] lg:capsizedText2">
           {header}
          </h3>
        )}

        {/* text varsa göster */}
        {text && (
          <p className="text-[14px] lg:text-[16px] md:w-[66%] lg:w-[36.7%] font-normal leading-[18px] lg:leading-[24px] list-disc capsizedText4">
           {text}
          </p>
        )}

        {/* Link; gönderilmezse "#" kullanılır */}
        <Link
            href={link}
            className="text-[14px] lg:text-[16px] font-normal leading-normal ml-[4px] font-marcellus uppercase border-b border-white pb-[8px] h-[24px] text-center w-auto items-center justify-center"
          >
           {buttonText}
          </Link>
      </div>
    </div>
  );
};

export default DiscoverBackground;
