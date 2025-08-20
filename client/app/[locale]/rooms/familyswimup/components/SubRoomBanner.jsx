import React from 'react'
import Image from 'next/image'
import ForestSvg from './ForestSvg'
import BabySvg from './BabySvg'
import LivingroomSvg from './LivingroomSvg'
import BedSvg from './BedSvg'
import SeaSvg from './SeaSvg'
import ParentsSvg from './ParentsSvg'

/**
 * img: string (mutlaka Next/Image domain whitelist'inde olmalı)
 * isLCP: bu bölüm hero ise true ver → priority + fetchPriority=high
 * blurDataURL: opsiyonel düşük çözünürlüklü placeholder
 */
const SubRoomBanner = ({ img, span, header, texts = [], baby, isLCP = true, blurDataURL }) => {
  return (
    <div className="relative w-screen h-[100svh] lg:h-[80svh] overflow-hidden">
      {/* ARKA PLAN GÖRSELİ */}
      <Image
        src={img}
        alt=""
        fill
        className="object-cover"
        priority={isLCP}
        fetchPriority={isLCP ? 'high' : 'auto'}
        loading={isLCP ? 'eager' : 'lazy'}
        quality={80}
        placeholder={blurDataURL ? 'blur' : undefined}
        blurDataURL={blurDataURL}
        sizes="100vw"
      />

      {/* Koyu overlay */}
      <div className="absolute inset-0 bg-lagoBlack/40 z-[1]" />

      {/* İçerik */}
      <div className="relative z-[2] flex flex-col w-[100%] h-full items-center justify-center text-white font-jost gap-[35px] md:gap-[39px]">
        <span className="text-[12px] lg:text-[16px] font-medium leading-[14px] tracking-[0.6px] uppercase text-center whitespace-nowrap">
          {span}
        </span>
        <h2 className="capsizedText text-[40px] md:text-[56px] lg:text-[80px] leading-[42px] lg:leading-[106px] font-medium">
          {header}
        </h2>

        <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-[16px] lg:h-[103px]">
          <div className="flex items-center justify-center gap-[20px] px-[26px]">
            <div className="flex flex-col gap-[18px] items-center justify-center">
              <div className="flex gap-[20px] items-center justify-center">
                <ForestSvg width={35} height={36} />
                <SeaSvg width={35} height={35} />
              </div>
              <p className="text-[14px] lg:text-[16px] font-medium leading-normal capitalize">{texts[0]}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-[20px] px-[26px]">
            <div className="flex flex-col gap-[18px] items-center justify-center">
              <div className="flex gap-[20px] items-center justify-center">
                <ParentsSvg width={43} height={35} />
                {baby && <BabySvg width={35} height={36} />}
              </div>
              <p className="text-[14px] lg:text-[16px] font-medium leading-normal">{texts[1]}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-[20px] px-[26px]">
            <div className="flex flex-col gap-[18px] items-center justify-center">
              <div className="flex gap-[20px] items-center justify-center">
                <LivingroomSvg width={40} height={45} />
                <BedSvg width={35} height={36} />
              </div>
              <p className="text-[14px] lg:text-[16px] font-medium leading-normal">{texts[2]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubRoomBanner
