"use client";
import React, { useEffect, useState } from "react";
import MainBanner2 from "../GeneralComponents/MainBanner2";
import mainImg from "./images/mainAbout.webp";
import exactImg from "./images/exactplace.webp";
import SpaTypesInfoSection from "../spawellness/components/SpaTypesInfoSection";
import MissionVisionSection from "./components/MissionVisionSection";
import EmblaCarousel from "../HomePage/Components/Slider/Slider1";
import KidsMomentCarousel from "../kidsclub/components/KidsMomentCarousel";
import img1 from "./images/SRF_4978 1.webp";
import img2 from "./images/SRF_4118.webp";
import img3 from "./images/SRF_8456.webp";
import img4 from "./images/SRF_8394-min.webp";
import ContactSection2 from "../GeneralComponents/Contact/ContactSection2";
import { useLocale, useTranslations } from "next-intl";

const page = () => {
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const t = useTranslations("About");
  const t2 = useTranslations("About.InfoSection");
  const t3 = useTranslations("About.MissinonVision");

  const [pageData, setPageData] = useState(null);
  useEffect(() => {
    fetch(`${apiUrl}/api/pages/about`)
      .then((r) => r.json())
      .then((json) => setPageData(json))
      .catch(console.error);
  }, [apiUrl]);

  if (!pageData) return <p className="p-10">Yükleniyor…</p>;

  const imgBanner = pageData.mainBanner?.image
    ? pageData.mainBanner.image.startsWith("/")
      ? `${apiUrl}${pageData.mainBanner.image}`
      : pageData.mainBanner.image
    : "";

      const leftImg = pageData.missionVisionSection?.leftImg
    ? pageData.missionVisionSection.leftImg.startsWith("/")
      ? `${apiUrl}${pageData.missionVisionSection.leftImg}`
      : pageData.missionVisionSection.leftImg
    : "";

      const rightImg = pageData.missionVisionSection?.rightImg
    ? pageData.missionVisionSection.rightImg.startsWith("/")
      ? `${apiUrl}${pageData.missionVisionSection.rightImg}`
      : pageData.missionVisionSection.rightImg
    : "";

  const momentImages = (pageData.kidsMomentCarousel?.images || []).map(
    (path) => {
      if (!path) return null;
      return path.startsWith("/") ? `${apiUrl}${path}` : path;
    }
  );

  const images = [img1, img2, img3, img4];

    const texts = [pageData.missionVisionSection?.span?.[locale], pageData.missionVisionSection?.header?.[locale], pageData.missionVisionSection?.text?.[locale]];
  const texts2 = [pageData.missionVisionSection?.span2?.[locale], pageData.missionVisionSection?.header2?.[locale], pageData.missionVisionSection?.text2?.[locale]];
  const texts3 = [pageData.missionVisionSection?.span3?.[locale], pageData.missionVisionSection?.header3?.[locale], pageData.missionVisionSection?.text3?.[locale]];

  return (
    <div className="flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]">
      <MainBanner2
        span={pageData.mainBanner?.span?.[locale]}
        header={pageData.mainBanner?.header?.[locale]}
        img={imgBanner}
        opacity={pageData.mainBanner?.opacity}
      />
      <SpaTypesInfoSection
        isImageLeft={pageData.infoSection?.isImageLeft}
        span={pageData.infoSection?.span?.[locale]}
        header={pageData.infoSection?.header?.[locale]}
        text={pageData.infoSection?.text?.[locale]}
        link={pageData.infoSection?.link}
        showLink={true}
        img={exactImg}
        buttonText={pageData.infoSection?.buttonText?.[locale]}
      />
      <KidsMomentCarousel showheader={false} header="" images={momentImages} />
      <MissionVisionSection
        texts={texts}
        texts2={texts2}
        texts3={texts3}
        leftImg={leftImg}
        rightImg={rightImg}
        showLink={false}
        buttonText={t3("buttonText")}
      />
      {/* <EmblaCarousel options={{ loop: true }}/> */}
      <ContactSection2 />
    </div>
  );
};

export default page;
