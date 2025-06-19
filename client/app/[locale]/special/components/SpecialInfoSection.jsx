"use client";
import React, { useEffect, useState, useRef } from "react";
import img1 from "../images/ikili1.webp"
import img2 from "../images/ikili2.webp"
import katman1 from "../images/Katman1.png"
import katman2 from "../images/Katman2.png"
import Image from "next/image";
import {useTranslations} from 'next-intl';

const SpecialInfoSection = () => {
  const t = useTranslations('Special.TwoImageSection');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
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
     className="flex w-screen h-auto md:h-[400px] lg:h-[555px] items-center justify-center relative max-w-[1440px]">
      <div className="flex flex-col md:flex-row w-[89.79%] md:w-[91.4%] lg:w-[76.8%] items-center justify-between h-full gap-[125px] lg:gap-[70px] md:gap-[4%]">
        <div className="flex flex-col w-[100%] md:w-[46%] items-start justify-center text-start gap-[35px] text-black font-jost ">
          <span className="text-[12.002px] font-medium leading-[14.026px] tracking-[0.481px] uppercase">
        {t("subtitle")}
          </span>
          <h2 className="text-[28px] md:text-[32px] lg:text-[48.089px] font-normal font-marcellus leading-[120%] lg:leading-[57.707px]">
          {t("title")}
          </h2>
          <p className="text-[14px] lg:text-[16.03px] font-normal leading-[24.045px] leading-trim-both text-edge-cap">
          {t("text")}
          </p>
            
        </div>

        <div className="flex min-w-[310px] w-[89%] sm:w-[50%] lg:w-[49%] md:w-[49%] items-end justify-end relative h-full">
            <Image src={img1} alt="art" width={300} height={450} className={`z-[40] w-[175px] h-[260px] md:w-[186.60px] md:h-[279.91px] lg:w-[300px] lg:h-[450px] transition-all duration-1000 ease-in-out ${
              visible ? "-translate-y-4 opacity-100" : "translate-y-4 opacity-0"
            }`}/>
            <Image src={img2} alt="art" width={300} height={450} className={`absolute lg:bottom-[105px] lg:right-[215px] z-[20] bottom-[100px] right-[130px] w-[175px] h-[260px] md:w-[186.60px] md:h-[279.91px] lg:w-[300px] lg:h-[450px] transition-all duration-1000 ease-in-out ${
              visible ? "-translate-y-3 opacity-100" : "-translate-y-8 opacity-0"
            }`}/>
        </div>

      </div>
      <Image src={katman1} width={katman1.width} height={katman1.height} className="hidden lg:flex absolute left-0 bottom-0" alt="sutun"/>
      <Image src={katman2} width={katman2.width} height={katman2.height} className="hidden lg:flex absolute left-28 -bottom-8" alt="sutun2"/>
    </div>
  );
};

export default SpecialInfoSection;
