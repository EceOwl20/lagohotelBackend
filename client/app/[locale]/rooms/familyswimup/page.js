"use client";

import { useEffect, useState } from "react";
import { useLocale } from 'next-intl';
import SubRoomBanner from "./components/SubRoomBanner";
import SubroomCarousel from "./components/SubroomCarousel";
import RoomFeatures from "./components/RoomFeatures";
import BackgroundSection from "./components/BackgroundSection";
import RoomTour from "./components/RoomTour";
import OtherOptions from "./components/OtherOptions";
import ContactSection2 from "@/app/[locale]/GeneralComponents/Contact/ContactSection2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function FamilySwimupRoomPage() {
  const locale = useLocale(); // "tr", "en", "de", "ru"
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/pages/rooms/subroom/FamilySwimupRoom?lang=${locale}`
        );
        const json = await res.json();
        setData(json);
      } catch (e) {
        setData({ error: "Oda verisi alınamadı!" });
      }
    };
    fetchData();
  }, [locale]);

  if (!data) return <p className="p-10">Yükleniyor...</p>;
  if (data.error) return <div className="text-red-500">{data.error}</div>;
  if (!data.banner) return <div>Oda verisi eksik!</div>;

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]">
      <div className="flex flex-col">
        <SubRoomBanner
          img={apiUrl + data.banner.image}
          span={data.banner.subtitle?.[locale] || ""}
          header={data.banner.title?.[locale] || ""}
          texts={(data.banner.texts || []).map(t => t?.[locale] || "")}
          baby={data.banner.baby}
        />
        <SubroomCarousel
          images={(data.carousel || []).map(url => apiUrl + url)}
        />
      </div>
      <RoomFeatures
        span={data.features.subtitle?.[locale] || ""}
        header={data.features.title?.[locale] || ""}
        text={data.features.text?.[locale] || ""}
        header2={data.features.header2?.[locale] || ""}
        header3={data.features.header3?.[locale] || ""}
        text2={data.features.text2?.[locale] || ""}
        iconsTexts={(data.features.iconsTexts || []).map(icon => icon?.[locale] || "")}
        roomName="FamilySwimupRoom"
        pool={data.features.pool}
      />
      <BackgroundSection
        span={data.background.subtitle?.[locale] || ""}
        header={data.background.title?.[locale] || ""}
        texts={(data.background.texts || []).map(t => t?.[locale] || "")}
        link={data.background.link}
        img={apiUrl + data.background.image}
      />
      {(data.tours || []).map((tour, i) => (
        <RoomTour
          key={i}
          span={tour.subtitle?.[locale] || ""}
          header={tour.title?.[locale] || ""}
          text={tour.text?.[locale] || ""}
          link={tour.link}
        />
      ))}
      <OtherOptions />
      <ContactSection2 />
    </div>
  );
}
