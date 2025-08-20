"use client";
import React, { useState, useEffect, useCallback } from "react";
import useCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';

// Import images
import hungry from "../images/hungry1.webp";
import hungry2 from "../images/hungry2.webp";
import hungry3 from "../images/hungry3.webp";
import hungry4 from "../images/hungry4.webp";
import hungry5 from "../images/hungry5.webp";
import hungry6 from "../images/hungry6.webp";
import hungry7 from "../images/hungry7.webp";
import hungry8 from "../images/hungry8.webp";

// Single slide component
const Slide = ({ src, index }) => (
  <div className="flex-[0_0_90%] md:flex-[0_0_79%] lg:flex-[0_0_85%] xl:flex-[0_0_auto] min-w-0 mr-[1.8%]">
    <Image
     src={src}
      alt={`Slide ${index + 1}`}
      width={533}
      height={434}
      unoptimized={true}  
      style={{ objectPosition: "center" }}
      className="flex h-full w-full object-cover"
       loading="lazy"
    />
  </div>
);

const BarCarouselSection = () => {
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const t = useTranslations("BarAndCafes.BarCarousel");

  const [emblaRef, emblaApi] = useCarousel({
    loop: true,
    align: "start",
    startIndex: 0,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    setSelectedIndex(emblaApi.selectedScrollSnap());
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

    const [pageData, setPageData] = useState(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
        
          useEffect(() => {
            const fetchPageData = async () => {
              try {
              const res = await fetch(`${apiUrl}/api/pages/barcafes`);
                const json = await res.json();
                setPageData(json);
              } catch (err) {
                console.error("Anasayfa verisi alınamadı:", err.message);
              }
            };
        
            fetchPageData();
          }, []);
        
          if (!pageData) return <p className="p-10">Yükleniyor...</p>;


  const images = (pageData.barCarousel?.images || []).map(path =>
    path.startsWith("/") ? `${apiUrl}${path}` : path
  );

  return (
    <div className="flex flex-col md:flex-row w-screen h-auto items-center justify-center md:justify-between gap-[30px] lg:gap-0">
      {/* Text Column */}
      <div className="flex items-end justify-end w-[87.79%] md:ml-[4.3%] lg:ml-0  md:w-[46%] lg:w-[49%]">
        <div className="flex flex-col items-start justify-center max-w-[520px] gap-[15px] md:gap-[25px] lg:gap-[35px] text-black font-jost">
          <span className="text-[12px] font-medium leading-normal uppercase tracking-[0.48px]">
            {pageData.barCarousel?.subtitle?.[locale]}
          </span>
          <h2 className="text-[28px] md:text-[32px] lg:text-[48px] font-marcellus font-normal leading-[120%] lg:leading-[57.6px] lg:capsizedText2">
            {pageData.barCarousel?.title?.[locale]}
          </h2>
          <div className="text-[14px] font-normal leading-[130%] lg:leading-normal md:w-[92%] lg:capsizedText4">
            {pageData.barCarousel?.text?.[locale]} <br/>
            <ul className="mt-2 list-disc pl-4 marker:text-xs marker:text-black">
            <li>{pageData.barCarousel?.lists?.[0]?.[locale]}</li>
            <li>{pageData.barCarousel?.lists?.[1]?.[locale]}</li>
          </ul>
          </div>
         
          <Link
            href={pageData.barCarousel?.link}
            className="flex border border-lagoBrown py-[14px] lg:px-[28px] lg:h-[41px] h-[39px] px-[18px] min-w-[124px] lg:min-w-[144px] whitespace-nowrap shadow-buttonCustom justify-center items-center text-center text-[14px] text-lagoBrown font-medium uppercase leading-[30px] bg-[#fbfbfb]"
          >
            {pageData.barCarousel?.buttonText?.[locale]}
          </Link>
        </div>
      </div>

      {/* Carousel Column */}
      <div className="flex flex-col w-[87.79%] md:w-[50%] md:justify-end md:items-end h-auto md:h-[35vh] lg:h-[45vh] xl:h-[40vh] overflow-y-auto xl:min-h-[434px]">
        <div
          className="flex overflow-hidden relative w-full h-full flex-col justify-end items-end"
          ref={emblaRef}
        >
          <div className="flex grid-flow-col  h-full md:w-[50vw] ">
            {images.map((src, i) => (
              <Slide key={i} src={src} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarCarouselSection;
