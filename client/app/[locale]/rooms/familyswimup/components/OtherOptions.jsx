"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import options1 from "../images/option1.webp";
import options2 from "../images/option2.webp";
import options3 from "../images/option3.webp";
import Image from "next/image";
import Link from "next/link";
import { BiArea, BiGroup } from "react-icons/bi";
import { useLocale, useTranslations } from 'next-intl';

const OtherOptions = () => {
  const t = useTranslations('SuperiorRoom.OtherOptions');
    const locale = useLocale(); // "tr", "en", "de", "ru"
    const [pageData, setPageData] = useState(null);
     const apiUrl = process.env.NEXT_PUBLIC_API_URL; // e.g. "http://localhost:5001"

      useEffect(() => {
                const fetchPageData = async () => {
                  try {
                    const res = await fetch(`${apiUrl}/api/otherOptions`);
                    const json = await res.json();
                    setPageData(json);
                  } catch (err) {
                    console.error("Contact section 2 verisi alınamadı:", err.message);
                  }
                };
            
                fetchPageData();
              }, []);
            
          

  const rooms = [
    {
      id: 1,
      img: options1,
      title: t("title1"),
      description: t("subtitle1"),
      size: t("m1"),
      capacity: t("capacity1"),
      text: t("text1"),
      link: "/rooms/familyroom",
    },
    {
      id: 2,
      img: options2,
      title: t("title2"),
      description: t("subtitle2"),
      size: t("m2"),
      capacity: t("capacity2"),
      text: t("text2"),
      link: "/rooms/swimuproom",
    },
    {
      id: 3,
      img: options3,
      title: t("title3"),
      description: t("subtitle3"),
      size: t("m3"),
      capacity: t("capacity3"),
      text: t("text3"),
      link: "/rooms/superiorroom",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({  loop: true,
    align: "start",
    startIndex: 0, });

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


      if (!pageData) return <p className="p-10">Yükleniyor...</p>;
     
     
        const imgGallery  = pageData.image
          const backgroundImgSrc = imgGallery
         ? imgGallery.startsWith("/uploads")
           ? `${apiUrl}${imgGallery}`
           : imgGallery
         : "";

  return (
    <div className="flex w-screen h-auto items-center justify-center max-w-[1440px]">
      <div className="flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] items-start justify-center gap-[30px] lg:gap-[50px] lg:min-w-[960px]">
        <div className="flex flex-col items-start justify-center w-full text-black gap-[15px] md:gap-[25px] lg:gap-[35px]">
          <span className="text-[12px] font-medium uppercase tracking-[0.48px] leading-[14px] font-jost">
          {t("span")}
          </span>
          <h2 className="text-[28px] md:text-[36px] lg:text-[48px] font-marcellus font-normal leading-[120%] lg:leading-[57.6px] lg:capsizedText2">
          {t("title")}
          </h2>
        </div>

        {/* embla carousel */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex items-start justify-start w-full">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="flex-[0_0_85%] sm:flex-[0_0_75%] md:max-h-auto md:flex-[0_0_50%] lg:flex-[0_0_31%] xl:flex-[0_0_31.5%] min-w-0 mr-[2.5%]"
              >
                <div className="flex flex-col w-full items-start text-start justify-center gap-[15px] lg:gap-[20px] font-jost text-black ">
                  <Image
                    src={room.img}
                    alt={room.title}
                    width={room.img.width}
                    height={room.img.height}
                  />
                  <span className="text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase">
                    {room.description}
                  </span>
                  <h3 className="text-[24px] lg:text-[30px] leading-[120%] lg:leading-[46.0059px] font-normal font-marcellus lg:capsizedText3">
                    {room.title}
                  </h3>
                  <div className="flex items-center justify-start text-center gap-[20px]">
                    <div className="flex items-center justify-center gap-[10px]">
                      <BiArea size={18}/>
                      <p className="text-lagoBrown text-[14px] lg:text-[16px] font-normal leading-normal">
                      {room.size}
                    </p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-[10px]">
                     <BiGroup size={19} />
                     <p className="text-lagoBrown text-[14px] lg:text-[16px] font-normal leading-normal">
                     {room.capacity}
                    </p>
                    </div>
                    
                  </div>
                  <p className="text-[12px] lg:text-[14px] leading-[21px] font-normal capsizedText4 w-[96%] md:w-full line-clamp-4">
                    {room.text}
                  </p>
                  <Link
                    href={room.link}
                    className="flex text-lagoBrown leading-[30px] uppercase font-medium text-[12px] lg:text-[14px] px-[40px] py-[20px] border border-lagoBrown text-center justify-center items-center h-[41px]"
                  >
                  {t("buttonText")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex lg:hidden items-end justify-end w-full mt-[0px] md:mt-[20px] xl:mt-[50px] relative">
  {rooms.map((_, i) => (
    <div
      key={i}
      className={`transition-all w-[33.3%] h-[1px] bg-[#24292C] rounded-full ${
        selectedIndex === i ? "p-[1px]" : "bg-[#848383] "
      }`}
      onClick={() => handleJump(i)}
    />
  ))}
</div>


      </div>
    </div>
  );
};

export default OtherOptions;
