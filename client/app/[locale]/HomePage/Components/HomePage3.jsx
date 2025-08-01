"use client";
import React, { useState } from "react";
import Image from "next/image";
import Area from "./Icons/Area";
import Tree from "./Icons/Tree";
import Sea from "./Icons/Sea";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

// Bu component artık props ile oda verisini almalı
export default function HomePage3({ accommodation }) {
  const t = useTranslations('HomePage.Accommodation');
  const locale = useLocale();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Eğer veri yoksa fallback
  if (!accommodation || !accommodation.rooms) return null;

  return (
    <div className="flex flex-col w-screen gap-[30px] lg:gap-[64px] items-center justify-center">
      <div className="flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[17px] md:gap-[25px] lg:gap-[30px] items-center justify-center text-center">
        <span className="text-[12px] leading-[14px] uppercase tracking-[0.48px] font-medium font-jost">
          {accommodation.subtitle?.[locale] || ""}
        </span>
        <h3 className="text-[28px] md:text-[32px] md:leading-[57.6px] lg:text-[48px] capsizedText2 font-marcellus font-normal leading-normal">
          {accommodation.title?.[locale] || ""}
        </h3>
      </div>

      <div className="flex flex-col md:flex-row w-full md:h-[49vh] md:min-h-[354px] lg:h-[498px]">
        {accommodation.rooms.map((room, index) => {
          let widthClass;
          if (hoveredIndex === null) widthClass = "w-full md:w-1/3";
          else if (hoveredIndex === index) widthClass = "w-full md:w-1/2";
          else widthClass = "w-full md:w-1/4";

          return (
            <div
              key={index}
              className={`
                relative 
                overflow-hidden 
                group 
                transition-all 
                duration-[1000ms] 
                ease-in-out
                ${widthClass}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Oda görseli */}
              {room.image && (
                <Image
                  src={
                    room.image.startsWith("/uploads")
                      ? `${apiUrl}${room.image}`
                      : room.image
                  }
                  alt={room.title?.[locale] || ""}
                  width={600}
                  height={400}
                  sizes="100vw"
                  className="w-full h-[44vh] md:h-[498px] object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105 relative"
                />
              )}

              {/* Hover overlay */}
              <div
                className="
                  absolute 
                  top-0 
                  left-0 
                  w-full 
                  h-full 
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-[1200ms]
                  text-white
                  z-10
                  flex
                  items-center
                "
              >
                {/* Soldaki dikey yarı saydam şerit */}
                <div
                  className="
                    h-full bg-black bg-opacity-50 flex flex-col lg:justify-end lg:pb-12 w-full md:w-1/3 md:min-w-[437px] gap-[20px]
                    md:opacity-0 md:translate-x-[-10px] opacity-100 md:group-hover:opacity-100 md:group-hover:translate-x-0
                    transition-all duration-[800ms] ease-in-out font-jost items-start justify-center
                  "
                >
                  <h3 className="text-[28px] lg:text-[30px] leading-[37.5px] tracking-[-0.66px] capitalize font-marcellus font-normal text-left w-auto ml-6 lg:ml-16 ">
                    {room.title?.[locale] || ""}
                  </h3>
                  <p
                    className="text-[14px] lg:text-[16px] w-[80%] font-jost font-normal leading-normal text-left ml-6 lg:ml-16 line-clamp-3 md:line-clamp-4 lg:line-clamp-6"
                    dangerouslySetInnerHTML={{
                      __html: room.description?.[locale] || "",
                    }}
                  />

                  {/* İkon satırı */}
                  <div className="flex items-center gap-4 ml-6 lg:ml-16 text-[14px] lg:text-[16px]">
                    <div className="flex items-center gap-1">
                      <Area width={24} height={24} />
                      <span className="font-jost">
                        {room.area?.[locale] || ""}
                      </span>
                    </div>
                    <div className="flex flex-row gap-1">
                      {index !== 1 && (
                        <div className="flex items-center gap-1">
                          <Tree width={24} height={24} />
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Sea width={24} height={24} />
                        <span>{room.view?.[locale] || ""}</span>
                      </div>
                    </div>
                  </div>

                  {/* Buton - 4 dil */}
                  <Link
                    href={room.link}
                    className="hidden lg:flex min-w-1/3 ml-6 lg:ml-16 border border-white px-6 py-2 text-[14px] lg:text-[16px] uppercase text-sm font-medium tracking-wider hover:bg-black hover:text-white hover:underline hover:underline-offset-2 transition"
                  >
                    {room.buttonText?.[locale] || ""}
                  </Link>
                  <Link
                    href={room.link}
                    className="text-white font-marcellus underline underline-offset-[6px] text-[14px] ml-6 font-normal md:leading-[19.88px] flex uppercase lg:hidden"
                  >
                    {room.buttonText?.[locale] || ""}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
