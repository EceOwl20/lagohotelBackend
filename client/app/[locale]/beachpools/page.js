"use client";
import React, { useEffect, useState } from "react";
import Beach1 from './Components/Beach1'
import Beach2 from './Components/Beach2'
import Beach3 from './Components/Beach3'
import Beach4 from './Components/Beach4'
import Beach5 from './Components/Beach5'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'

import Form from '../GeneralComponents/Form'
import BeachMobile from './Components/BeachMobile'
import img1 from "./Images/beach1.webp";
import img2 from "./Images/beach2.webp";
import ClinaryInfoSection from '../restaurants/components/ClinaryInfoSection'
import { useLocale, useTranslations } from 'next-intl';

const page = () => {
  const t = useTranslations('BeachPools.ClinaryInfoSection');
  const t2 = useTranslations('BeachPools.PoolList');

    const locale = useLocale(); // "tr", "en", "de", "ru"
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const texts = [
    t("text1"),
    t("text2"),
    t("text3"),
    t("text4"),
    t("text5")
  ];

 const [pageData, setPageData] = useState(null);
    useEffect(() => {
      fetch(`${apiUrl}/api/pages/beachpools`)
        .then(r => r.json())
        .then(json => setPageData(json))
        .catch(console.error);
    }, [apiUrl]);
  
    if (!pageData) return <p className="p-10">Yükleniyor…</p>;

      //const spaSection = pageData?.infoSection;

      const ClinaryImg1 = pageData.clinaryInfo?.image1
      ? pageData.clinaryInfo.image1.startsWith("/")
        ? `${apiUrl}${pageData.clinaryInfo.image1}`
        : pageData.clinaryInfo.image1
      : "";

      const ClinaryImg2 = pageData.clinaryInfo?.image2
      ? pageData.clinaryInfo.image2.startsWith("/")
        ? `${apiUrl}${pageData.clinaryInfo.image2}`
        : pageData.clinaryInfo.image2
      : "";

      const clinaryTexts=[pageData.clinaryInfo?.texts?.[0]?.[locale], pageData.clinaryInfo?.texts?.[1]?.[locale], pageData.clinaryInfo?.texts?.[2]?.[locale], pageData.clinaryInfo?.texts?.[3]?.[locale], pageData.clinaryInfo?.texts?.[4]?.[locale]]

 const poolImages = (pageData.poolList || []).map(item => {
  if (!item.image) return "";                  
  return item.image.startsWith("/")
    ? `${apiUrl}${item.image}`                 
    : item.image;                          
});

const pool1 = poolImages[0];
const pool2 = poolImages[1];
const pool3 = poolImages[2];
const pool4 = poolImages[3];
const pool5 = poolImages[4];
const pool6 = poolImages[5];
const pool7 = poolImages[6];
const pool8 = poolImages[7];
const pool9 = poolImages[8];


 const poolhoverImages = (pageData.poolList || []).map(item => {
  if (!item.hoverImage) return "";                  
  return item.hoverImage.startsWith("/")
    ? `${apiUrl}${item.hoverImage}`                 
    : item.hoverImage;                          
});

const hover1 = poolhoverImages[0];
const hover2 = poolhoverImages[1];
const hover3 = poolhoverImages[2];
const hover4 = poolhoverImages[3];
const hover5 = poolhoverImages[4];
const hover6 = poolhoverImages[5];
const hover7 = poolhoverImages[6];
const hover8 = poolhoverImages[7];
const hover9 = poolhoverImages[8];

const poolItems = [
  {
    src: pool1,
    hoverSrc: hover1,
    subtitle: pageData.poolList?.[0]?.subtitle?.[locale],
    title: pageData.poolList?.[0]?.title?.[locale],
    description: pageData.poolList?.[0]?.description?.[locale],
  },
  {
    src: pool2,
    hoverSrc: hover2,
    subtitle: pageData.poolList?.[1]?.subtitle?.[locale],
    title: pageData.poolList?.[1]?.title?.[locale],
    description: pageData.poolList?.[1]?.description?.[locale],
  },
  {
    src: pool3,
    hoverSrc: hover3,
    subtitle: pageData.poolList?.[2]?.subtitle?.[locale],
    title: pageData.poolList?.[2]?.title?.[locale],
    description: pageData.poolList?.[2]?.description?.[locale],
  },
  {
    src: pool4,
    hoverSrc: hover4,
     subtitle: pageData.poolList?.[3]?.subtitle?.[locale],
    title: pageData.poolList?.[3]?.title?.[locale],
    description: pageData.poolList?.[3]?.description?.[locale],
  },
  {
    src: pool5,
    hoverSrc: hover5,
      subtitle: pageData.poolList?.[4]?.subtitle?.[locale],
    title: pageData.poolList?.[4]?.title?.[locale],
    description: pageData.poolList?.[4]?.description?.[locale],
  },
  {
    src: pool6,
    hoverSrc: hover6,
    subtitle: pageData.poolList?.[5]?.subtitle?.[locale],
    title: pageData.poolList?.[5]?.title?.[locale],
    description: pageData.poolList?.[5]?.description?.[locale],
  },
  {
    src: pool7,
    hoverSrc: hover7,
    subtitle: pageData.poolList?.[6]?.subtitle?.[locale],
    title: pageData.poolList?.[6]?.title?.[locale],
    description: pageData.poolList?.[6]?.description?.[locale],
  },
  {
    src: pool8,
    hoverSrc: hover8,
      subtitle: pageData.poolList?.[7]?.subtitle?.[locale],
    title: pageData.poolList?.[7]?.title?.[locale],
    description: pageData.poolList?.[7]?.description?.[locale],
  },
  {
    src: pool9,
    hoverSrc: hover9,
      subtitle: pageData.poolList?.[8]?.subtitle?.[locale],
    title: pageData.poolList?.[8]?.title?.[locale],
    description: pageData.poolList?.[8]?.description?.[locale],
  },
]


  return (
    <div className='overflow-hidden overflow-y-hidden bg-[#fbfbfb]'>
      <Beach1 subtitle={pageData.mainBanner?.desktop?.subtitle?.[locale]}  title={pageData.mainBanner?.desktop?.title?.[locale]} text={pageData.mainBanner?.desktop?.text?.[locale]} buttonText={pageData.mainBanner?.desktop?.buttonText?.[locale]} img1={ClinaryImg1} img2={ClinaryImg2} clinarySpan={pageData.clinaryInfo?.subtitle?.[locale]} clinaryHeader={pageData.clinaryInfo?.title?.[locale]} clinaryTexts={clinaryTexts}/> 
     <div className='flex w-screen flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] lg:mt-[100px] bg-[#fbfbfb]'>
     <BeachMobile/>
    <div className='flex lg:hidden'>
    <ClinaryInfoSection
            img1={ClinaryImg1}
            img2={ClinaryImg2}
            span={pageData.clinaryInfo?.subtitle?.[locale]}
            header={pageData.clinaryInfo?.title?.[locale]}
            texts={clinaryTexts}
          />
    </div>
     <Beach2 />
      <Beach3 />
      <Beach4 />
      <Beach5 id="pools" showLink={false} span={pageData.poolListSection?.subtitle?.[locale]} header={pageData.poolListSection?.title?.[locale]} text={pageData.poolListSection?.text?.[locale]} poolItems={poolItems}/>
      <ContactSection2 />
      <Form/>
     </div>
    </div>
  )
}

export default page