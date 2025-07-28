"use client";
import { useEffect, useState } from "react";
import imgBanner from "./images/SRF_3314.jpg"
import img1 from "./images/SRF_3275.jpg"
import img2 from "./images/SRF_3279.jpg"
import img3 from "./images/SRF_3289.jpg"
import img4 from "./images/SRF_3294.jpg"
import img5 from "./images/SRF_3299.jpg"
import img6 from "./images/SRF_3309.jpg"
import img7 from "./images/SRF_3314.jpg"
import img8 from "./images/SRF_3319.jpg"
import img9 from "./images/SRF_3324.jpg"
import img10 from "./images/SRF_3334.jpg"
import img11 from "./images/SRF_3349.jpg"
import img12 from "./images/SRF_3358.jpg"
import img13 from "./images/SRF_3364.jpg"
import img14 from "./images/SRF_3366.jpg"
import img15 from "./images/SRF_3371.jpg"
import img16 from "./images/SRF_3384.jpg"
import img17 from "./images/SRF_3391.jpg"
import img18 from "./images/SRF_3401.jpg"
import img19 from "./images/SRF_3426.jpg"
import img20 from "./images/SRF_3441.jpg"
import img21 from "./images/SRF_3456.jpg"
import img22 from "./images/SRF_3469.jpg"
import { useLocale, useTranslations } from "next-intl";

import ClinaryReverseInfo from '../components/ClinaryReverseInfo'
import CuisinesCarousel from '../components/CuisinesCarousel'
import wasabi from "../gustorestaurant/images/wasabi2.webp"
import despina from "../images/despina.webp"
import anatolia from "../images/anatolia.webp"
import RoomTour from '@/app/[locale]/rooms/familyswimup/components/RoomTour'
import DiscoverBackground from '../components/DiscoverBackground'
import ContactSection2 from '@/app/[locale]/GeneralComponents/Contact/ContactSection2'
import backgroundImg from "../images/Background.webp"
import BannerDark from '@/app/[locale]/GeneralComponents/BannerDark'
import KidsMomentCarousel from '@/app/[locale]/kidsclub/components/KidsMomentCarousel'

const images=[img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,img21,img22]
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const page = () => {
  const t = useTranslations('MainRestaurants');
  const t2 = useTranslations('MainRestaurants.ClinaryInfoSection');
  const t3 = useTranslations('MainRestaurants.RoomTour');
  const t4 = useTranslations('MainRestaurants.CuisinesCarousel');
  const t5 = useTranslations('MainRestaurants.DiscoverBackground');

  const locale = useLocale(); // "tr", "en", "de", "ru"
      const [data, setData] = useState(null);
       
         useEffect(() => {
           const fetchData = async () => {
             try {
               const res = await fetch(
                 `${apiUrl}/api/pages/restaurants/subrestaurants/mainrestaurant?lang=${locale}`
               );
               const json = await res.json();
               setData(json);
             } catch (e) {
               setData({ error: "Restaurant verisi alınamadı!" });
             }
           };
           fetchData();
         }, [locale]);
       
         if (!data) return <p className="p-10">Yükleniyor...</p>;
         if (data.error) return <div className="text-red-500">{data.error}</div>;
         if (!data.mainBanner) return <div>restaurant verisi eksik!</div>;

    const restaurants = data.otheroptions?.restaurants || [];
 
      const otherOptions = restaurants.map((restaurant, idx) => ({
    id: idx + 1,
    // Resim yolunu tam URL’e dönüştür
    img: restaurant.image
      ? restaurant.image.startsWith("/")
        ? `${apiUrl}${restaurant.image}`
        : restaurant.image
      : "",
    // Çok dilli alanlardan locale’e göre al
    title: restaurant.title?.[locale] || "",
    description: restaurant.description?.[locale] || "",
    text: restaurant.text?.[locale] || "",
    link: restaurant.link || "",
    buttonText: restaurant.buttonText?.[locale] || "",
  }));


const carouselImages = (data.carousel || []).map(path =>
  path.startsWith("/")
    ? `${apiUrl}${path}`
    : path
);

    const bannerImg = data.mainBanner?.image
    ? data.mainBanner.image.startsWith("/")
      ? `${apiUrl}${data.mainBanner.image}`
      : data.mainBanner.image
    : "";

        const backgroundImg = data.background?.image
    ? data.background.image.startsWith("/")
      ? `${apiUrl}${data.background.image}`
      : data.background.image
    : "";


  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb]'>
      <BannerDark img={bannerImg} span={data.mainBanner.subtitle?.[locale]} header={data.mainBanner.title?.[locale]} text={data.mainBanner.text?.[locale]}/>
      <ClinaryReverseInfo img1={img2} img2={img1} span={data.infoSection?.subtitle?.[locale]} header={data.infoSection?.title?.[locale]} text1={data.infoSection?.text1?.[locale]} text2={data.infoSection?.text2?.[locale]}/>
      <KidsMomentCarousel images={carouselImages} header="" showheader={false}/>
      <CuisinesCarousel span={data.otheroptions?.restaurants?.[0]?.description?.[locale]} header={data.otheroptions?.restaurants?.[0]?.title?.[locale]} text={data.otheroptions?.restaurants?.[0]?.text?.[locale]} cuisines={otherOptions}/>
      <DiscoverBackground  span={data.background?.subtitle?.[locale]} header={data.background?.title?.[locale]} text={data.background?.text?.[locale]} link="/barcafes" img={backgroundImg}/>
      <ContactSection2/>
    </div>
  )
}

export default page
