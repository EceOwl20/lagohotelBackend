"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from 'next-intl';

const EntertainmentTypesSection = () => {
  const t = useTranslations('Entertainment.CarouselSection');
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    startIndex: 0,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // sayfa verisini çek
  const [pageData, setPageData] = useState(null);
  useEffect(() => {
    fetch(`${apiUrl}/api/pages/barcafes`)
      .then(r => r.json())
      .then(json => setPageData(json))
      .catch(console.error);
  }, [apiUrl]);

  if (!pageData) return <p className="p-10">Yükleniyor…</p>;

  // veritabanından gelen aktiviteleri düzene sok
  const activities =
    pageData.entertainmentTypes?.activities?.map(act => ({
      title: act.title?.[locale]        || "",
      category: act.category?.[locale]  || "",
      description: act.description?.[locale] || "",
      // eğer yol /uploads/... ile başlıyorsa prefixle
      image:
        act.image?.startsWith("/")
          ? `${apiUrl}${act.image}`
          : act.image || "",
      link: act.link || "#"
    })) || [];

  return (
    <div className="flex w-screen items-center justify-center max-w-[1440px]">
      <div className="flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] items-start justify-center gap-[30px] md:gap-[50px] max-w-[1106px]">
        
        {/* Başlık Bölümü */}
        <div className="flex flex-col items-start justify-center text-start gap-[15px] md:gap-[25px] lg:gap-[35px] text-black font-jost">
          <span className="text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase">
            {pageData.entertainmentTypes?.subtitle?.[locale]}
          </span>
          <h3 className="text-[28px] md:text-[32px] lg:text-[48px] font-normal font-marcellus leading-[120%] lg:leading-[57.6px]">
            {pageData.entertainmentTypes?.title?.[locale]}
          </h3>
          <p className="text-[16px] font-normal leading-[24px] lg:w-[65%] lg:capsizedText4 w-[98%] md:w-[80%]">
            {pageData.entertainmentTypes?.text?.[locale]}
          </p>
        </div>

        {/* Desktop Kartlar */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 w-full items-center justify-center gap-[31px]">
          {activities.map((activity, i) => (
            <div key={i} className="flex flex-col items-center justify-center relative mb-[180px]">
              <div className="w-full flex flex-col items-center justify-end cursor-pointer">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  width={400}         // dilediğiniz ölçüyü koyun
                  height={300}        // dilediğiniz ölçüyü koyun
                  unoptimized         // remote resimler için
                  className="flex w-full object-cover"
                />
                <div className="absolute flex flex-col items-start justify-center bg-white gap-[25px] font-jost text-black w-[90%] p-[20px] -bottom-44">
                  <span className="text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase">
                    {activity.category}
                  </span>
                  <h4 className="text-[28px] lg:text-[30px] font-normal leading-[120%] capitalize font-marcellus">
                    {activity.title}
                  </h4>
                  <p className="text-[14px] font-normal leading-[21px] capsizedText4">
                    {activity.description}
                  </p>
                </div>
              </div>
              <Link className="absolute inset-0" href={activity.link} />
            </div>
          ))}
        </div>

        {/* Mobil Carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex items-start justify-start w-full">
              {activities.map((activity, i) => (
                <div key={i} className="flex-[0_0_auto] h-[390px] min-w-0 mr-[1.5%]">
                  <div className="flex flex-col relative w-full items-center text-start justify-center gap-[15px] lg:gap-[20px] font-jost text-black">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      width={400}
                      height={300}
                      unoptimized
                      className="flex h-[300px] md:h-[400px] w-auto md:w-full object-cover"
                    />
                    <div className="absolute flex flex-col items-start justify-center bg-white gap-[25px] font-jost text-black w-[90%] p-[20px] -bottom-32">
                      <span className="text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase">
                        {activity.category}
                      </span>
                      <h4 className="text-[28px] lg:text-[30px] font-normal leading-[120%] capitalize font-marcellus">
                        {activity.title}
                      </h4>
                      <p className="text-[14px] font-normal leading-[21px] capsizedText4">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel Noktaları */}
          <div className="flex items-end justify-end w-full mt-4">
            {activities.map((_, i) => (
              <span
                key={i}
                className={`block w-[33.3%] h-[2px] ${selectedIndex === i ? 'bg-black p-[1px]' : 'bg-gray-400'}`}
                onClick={() => emblaApi && emblaApi.scrollTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentTypesSection;
