"use client";

import { useEffect, useState } from "react";
import HomePage1 from "./Components/HomePage";
import HomePage2 from "./Components/HomePage1";
import HomePage3 from "./Components/HomePage2";
import HomePage4 from "./Components/HomePage3";
import HomePage5 from "./Components/HomePage4";
import HomePage6 from "./Components/HomePage5";
import ContactSection from "../GeneralComponents/Contact/ContactSection";
import EmblaCarousel from "./Components/Slider/Slider1";
import TwoAnimationImage from "./Components/TwoAnimationImage";

const HomePage = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/pages/homepage");
        const json = await res.json();
        setPageData(json);
      } catch (err) {
        console.error("Anasayfa verisi alınamadı:", err.message);
      }
    };

    fetchPageData();
  }, []);

  if (!pageData) return <p className="p-10">Yükleniyor...</p>;

  return (
    <div>
      <HomePage1 />
      <HomePage2 section1={pageData.section1} />
      <EmblaCarousel slides={pageData.slider} options={{loop:true}} /> 
      <div className="flex flex-col items-center justify-center w-screen gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]">
        <TwoAnimationImage animationData={pageData.animationSection} />
       <HomePage4 accommodation={pageData.accommodation} />
        <HomePage5 essentials={pageData.essentials}/>
        <ContactSection contact={pageData.contact}/>
        <HomePage6 banner={pageData.banner}/>
      </div>
    </div>
  );
};

export default HomePage;