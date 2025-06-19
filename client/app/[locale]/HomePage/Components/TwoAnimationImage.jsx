"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function TwoAnimationImage({ animationData }) {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);
  const locale = useLocale(); // tr, en, de, ru

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex w-screen h-auto md:h-[400px] lg:h-[555px] items-center justify-center max-w-[1440px] mt-[50px] md:mt-[100px] lg:mt-[150px] mb-[0px]"
    >
      <div className="flex flex-col md:flex-row-reverse w-[87.79%] md:w-[91.4%] lg:w-[76.8%] items-center justify-center gap-[30px] md:gap-[42px] lg:gap-[52px] h-full">
        
        {/* Metin Alanı */}
        <div className="flex flex-col w-[96%] md:w-[55%] lg:w-[56.5%] items-center md:items-start justify-center text-center md:text-start gap-[15px] md:gap-[25px] text-black font-jost">
          <span className="text-[12px] font-medium leading-[14.026px] tracking-[0.481px] uppercase">
            {animationData?.subtitle?.[locale] || ""}
          </span>

          <h2 className="hidden lg:flex lg:text-[48.089px] font-normal font-marcellus md:leading-normal lg:leading-[57.707px] capsizedText2">
            {animationData?.title?.[locale] || ""}
          </h2>
          <h2 className="text-[28px] md:text-[32px] lg:text-[48.089px] font-normal font-marcellus md:leading-normal lg:hidden capsizedText2">
            {animationData?.title?.[locale] || ""}
          </h2>

          <p className="text-[14px] md:text-[13.943px] lg:text-[16.03px] font-normal leading-[130%] lg:leading-[24.045px]">
            {animationData?.text?.[locale] || ""}
          </p>
          <p className="text-[14px] md:text-[13.943px] lg:text-[16.03px] font-normal leading-[130%] lg:leading-[24.045px]">
            {animationData?.text2?.[locale] || ""}
          </p>

          <Link
              href={
                typeof animationData?.buttonLink === "object"
                  ? animationData.buttonLink?.[locale] || "/"
                  : animationData?.buttonLink || "/"
              }
              className="flex py-[16px] px-[32px] items-center justify-center text-center text-[14px] lg:text-[16px] h-[38px] md:h-[37.88px] lg:h-[41px] text-lagoBrown uppercase font-medium border border-lagoBrown shadow-buttonCustom hover:bg-lagoBrown hover:underline hover:text-white"
            >
              {typeof animationData?.buttonText === "object"
                ? animationData.buttonText?.[locale] || ""
                : animationData?.buttonText || ""}
            </Link>
        </div>

        {/* Görsel Alanı */}
        <div className="flex w-[65%] min-w-[310px] md:w-[50%] lg:w-[43.8%] h-[327px] md:h-full items-end justify-end relative mt-[67px] md:mt-0">
          {animationData?.imageRight && (
            <Image
              src={`http://localhost:5001${animationData.imageRight}`}
              alt="Sağ görsel"
              width={300}
              height={450}
              className={`absolute bottom-[100px] right-[140px] md:bottom-[110px] md:right-[104px] lg:bottom-[105px] lg:right-[215px] z-10 w-[175px] h-[260px] md:w-[186.60px] md:h-[279.91px] lg:w-[300px] lg:h-[450px] transition-all duration-1000 ease-in-out ${
                animate ? "-translate-y-3 opacity-100" : "-translate-y-8 opacity-0"
              }`}
            />
          )}

          {animationData?.imageLeft && (
            <Image
              src={`http://localhost:5001${animationData.imageLeft}`}
              alt="Sol görsel"
              width={300}
              height={450}
              className={`z-50 w-[175px] h-[260px] md:w-[186.60px] md:h-[279.91px] lg:w-[300px] lg:h-[450px] transition-all duration-1000 ease-in-out ${
                animate ? "-translate-y-4 opacity-100" : "translate-y-4 opacity-0"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}