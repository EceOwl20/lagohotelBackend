"use client";
import React from "react";
import Banner from "../ourpolicies/components/Banner";
import mainImg from "../HomePage/Components/Images/GreenAndBlueFull2.webp";
import mainImg2 from "../gallery/images/genel/img-01.jpg";
import Link from "next/link";
import Image from "next/image";
import ExploreManavgat from "./components/ExploreManavgat";

const page = () => {
  const handleClick = (e) => {
    e.preventDefault();
    if (window.confirm("Sunumu indirmek istediğinize emin misiniz?")) {
      // Yeni sekmede download başlat
      window.open(href, "_blank");
      // Veya aynı pencerede başlatmak için:
      // window.location.href = href
    }
  };

  return (
    <div className="flex flex-col w-screen min-h-screen items-center justify-start">
      <Banner img={mainImg2} span="" header="Sustainability" />
      <a
        href="/documents/SürdürülebilirlikRaporu2024-2025.pptx"
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-[10px] px-[20px] mt-10 text-[20px] cursor-pointer border-b hover:text-lagoBlack2 hover:border-lagoBlack2 hover:font-medium whitespace-nowrap font-jost"
      >
        Sürdürülebilirlik Raporu 2024-2025
      </a>
      <ExploreManavgat/>
    </div>
  );
};

export default page;
