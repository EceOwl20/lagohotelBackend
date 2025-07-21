"use client";
import React, { useCallback, useEffect, useState } from "react";
import useCarousel from "embla-carousel-react";
// import img from "../images/SRF_3469.webp"
// import img2 from "../images/SRF_3456.webp"
import Image from "next/image";
import PlateSvg from "./PlateSvg";
import { useLocale, useTranslations } from 'next-intl';

const KidsRestaurantCarousel = () => {
  const t = useTranslations('KidsClub.KidsRestaurant');

    const locale = useLocale(); // "tr", "en", "de", "ru"
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [emblaRef, emblaApi] = useCarousel({
        loop: true,
        align: "end",
        startIndex: 1,
      });
    
      const [selectedIndex, setSelectedIndex] = useState(0);
    
      const scrollPrev = useCallback(() => {
        if (emblaApi && emblaApi.scrollPrev) emblaApi.scrollPrev();
      }, [emblaApi]);
    
      const scrollNext = useCallback(() => {
        if (emblaApi && emblaApi.scrollNext) emblaApi.scrollNext();
      }, [emblaApi]);
    
      useEffect(() => {
        if (emblaApi) {
          emblaApi.on("select", () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
          });
          setSelectedIndex(emblaApi.selectedScrollSnap());
        }
      }, [emblaApi]);


       const [pageData, setPageData] = useState(null);
            useEffect(() => {
              fetch(`${apiUrl}/api/pages/kidsclub`)
                .then(r => r.json())
                .then(json => setPageData(json))
                .catch(console.error);
            }, [apiUrl]);
          
        if (!pageData) return <p className="p-10">Yükleniyor…</p>;

         const img1 = pageData.kidsRestaurantCarousel?.images?.[0]
      ? pageData.kidsRestaurantCarousel?.images?.[0].startsWith("/")
        ? `${apiUrl}${pageData.kidsRestaurantCarousel?.images?.[0]}`
        : pageData.kidsRestaurantCarousel?.images?.[0]
      : "";

       const img2 =pageData.kidsRestaurantCarousel?.images?.[1]
      ? pageData.kidsRestaurantCarousel?.images?.[1].startsWith("/")
        ? `${apiUrl}${pageData.kidsRestaurantCarousel?.images?.[1]}`
        : pageData.kidsRestaurantCarousel?.images?.[1]
      : "";

      const images =[img1,img2]

  return (
    <div className='flex flex-col md:flex-row-reverse w-screen justify-between items-center h-auto gap-[30px] lg:gap-[2%]'>
      <div className='flex w-[87.79%] md:w-[45%] md:mr-[4.3%] font-jost items-start justify-start relative'>
       <div className="flex flex-col  font-jost text-lagoBlack gap-[35px] max-w-[469px] items-start justify-center">
       <span className='text-[12px] font-medium uppercase tracking-[0.48px] leading-[14px]'>{pageData.kidsRestaurantCarousel?.subtitle?.[locale]}</span>
        <h2 className='text-[28px] md:text-[32px] lg:text-[48px] leading-normal lg:leading-[57.6px] font-marcellus font-normal capsizedText2'>{pageData.kidsRestaurantCarousel?.title?.[locale]}</h2>
        <p className='text-[12px] lg:text-[14px] leading-[21px] font-normal text-[#24292C] '>{pageData.kidsRestaurantCarousel?.text?.[locale]}</p>
        <ul className="text-[12px] lg:text-[14px] font-normal leading-[21px] list-disc capsizedText4 pl-5 marker:text-xs marker:text-lagoBlack w-[92%]">
           <li> {pageData.kidsRestaurantCarousel?.list?.[locale]?.[0]} </li>
          <li>  {pageData.kidsRestaurantCarousel?.list?.[locale]?.[1]} </li>
           <li>  {pageData.kidsRestaurantCarousel?.list?.[locale]?.[2]}  </li>
          </ul>
       </div>
       <PlateSvg className="absolute -top-[18%] -right-[6%] md:top-[65%] md:right-[20%]" width={221} height={212}/>
      </div>

      <div className="flex flex-col w-[93.89%] mr-[6.1%] md:w-[50%] md:mr-0 justify-start items-start h-auto md:h-auto lg:h-[40vh] overflow-y-auto lg:min-h-[434px]">
           {/* carousel */}
           <div className="flex overflow-hidden relative w-full h-full flex-col justify-start items-start" ref={emblaRef}>
        <div className="flex grid-flow-col h-full md:w-[50vw] lg:min-w-[533px]">
          {images.map((image, index) => (
           <div className="flex-[0_0_90%] lg:flex-[0_0_74%] xl:flex-[0_0_auto] min-w-0 ml-[1.8%]" key={index}>
              <Image
                src={image}
                layout="cover"
                width={image.width || 533}
                height={image.height || 434}
                alt={`Slide ${index + 1}`}
                objectPosition="center"
                className="flex h-full md:h-auto lg:h-full w-full"
              />
            
            </div>
          ))}
        </div>
       
      </div>
        </div>

    </div>
  )
}

export default KidsRestaurantCarousel
