"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {useTranslations} from 'next-intl';
import { MdArrowBackIosNew,MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { useLocale } from "next-intl";

// Varsayılan slaytlar
const DEFAULT_SLIDES = [
  {
    src: require("./Images/Accommodation.webp"),
    title: "Accommodation",
    link: "/rooms",
  },
  {
    src: require("./Images/BeachAndPool2.webp"),
    title: "Beach & Pools",
    link: "/beachpools",
  },
  {
    src: require("./Images/Entertainment.webp"),
    title: "Experiences",
    link: "/entertainment",
  },
  {
    src: require("./Images/Flavours2.webp"),
    title: "Flavours",
    link: "/restaurants",
  },
  {
    src: require("./Images/Kids.webp"),
    title: "Kids",
    link: "/kidsclub",
  },
];

// Tekil slayt bileşeni
function Slide({ slide, marginClass, lang = "tr" }) {
  const imageSrc = slide.image || slide.src;

  return (
    <div className={`relative shrink-0 flex justify-center items-center ${marginClass} flex-[0_0_auto]`}>
      {imageSrc ? (
        <Image
          src={imageSrc.startsWith("/") ? `${apiUrl}${imageSrc}` : imageSrc}
          alt={slide.title?.[lang] || "Slider Görseli"}
          width={360}
          height={540}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="w-[360px] h-[540px] bg-gray-200 flex items-center justify-center text-sm text-gray-500">
          Görsel yok
        </div>
      )}

<Link
  href={`/${lang}${slide.link?.[lang] || ""}`}
  className="absolute inset-0 flex items-center justify-center text-white text-[20px] md:text-[30px] lg:text-[40px] font-marcellus"
>
  {typeof slide.title === "object" ? slide.title?.[lang] : slide.title}
</Link>
    </div>
  );
}

export default function Slider1({ slides }) {
  const locale = useLocale(); // ✅ aktif dil: "tr", "en", "de", "ru"
  const t = useTranslations('HomePage.EmblaCarousel');

  const DEFAULT_SLIDES = [
    {
      src: require("./Images/Accommodation.webp"),
      title: t("accommodation"),
      link: "/rooms",
    },
    {
      src: require("./Images/BeachAndPool2.webp"),
      title: t("beachPools"),
      link: "/beachpools",
    },
    {
      src: require("./Images/Entertainment.webp"),
      title: t("experiences"),
      link: "/entertainment",
    },
    {
      src: require("./Images/Flavours2.webp"),
      title: t("restaurants"),
      link: "/restaurants",
    },
    {
      src: require("./Images/Kids.webp"),
      title: t("kids"),
      link: "/kidsclub",
    },
    {
      src: require("./Images/img-12K.webp"),
      title: t("spa"),
      link: "/spawellness",
    },
    {
      src: require("./Images/fresh1K.webp"),
      title: t("bars"),
      link: "/barcafes",
    },
  ];
  const slidesOriginal = slides || DEFAULT_SLIDES;
  const slidesCombined = [...slidesOriginal, ...slidesOriginal];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      containScroll: false,
      slidesToScroll: 1,
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        playDirection: "forward",
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap() % slidesOriginal.length); 
      });
    }
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden w-full lg:w-[87.4%] lg:ml-[5.8%]">
        <div className="flex md:h-[405px] lg:h-[540px] w-auto ">
          {slidesCombined.map((slide, index) => (
            <Slide key={index} slide={slide} marginClass="mr-[8.37px] md:mr-[12.75px] lg:mr-[17px]" lang={locale} />
          ))}
        </div>
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
      <button
        className="p-1 bg-[#848383]/40 hidden lg:flex pointer-events-auto"
        onClick={scrollPrev}
        type="button"
      >
        <MdArrowBackIosNew size={32} color="white" />
      </button>
    </div>
    <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
      <button
        className="p-1 bg-[#848383]/40 hidden lg:flex pointer-events-auto"
        onClick={scrollNext}
        type="button"
      >
        <MdArrowForwardIos size={32} color="white" />
      </button>
    </div>
      </div>

      {/* Scroll Indicator (5 parça olacak) */}
      <div className="flex items-center justify-center w-[87.79%] md:w-[91.4%] mx-[6.10%] md:mx-[4.3%] lg:w-[87.4%] lg:mx-auto mt-[62px] relative">
        {slidesOriginal.map((_, i) => (
          <div
            key={i}
            className={`transition-all ${slidesOriginal.length==4 ? "w-[25%]" : "w-[20%]"}  h-[1px] bg-[#24292C] ${
              selectedIndex === i ? "p-[1px]" : "bg-[#848383]"
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
          />
        ))}
      </div>
    </section>
  );
}



