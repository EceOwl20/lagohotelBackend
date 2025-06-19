"use client"
import React, { useState, useEffect } from "react"
import {useTranslations} from 'next-intl';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import Image from "next/image"
import img1 from "../images/genel/img-01.jpg"
import img2 from "../images/genel/img-02.jpg"
import img3 from "../images/genel/img-03.jpg"
import img4 from "../images/genel/img-04.jpg"
import img5 from "../images/genel/img-05.jpg"
import img6 from "../images/genel/img-06.jpg"
import img7 from "../images/genel/img-07.jpg"
import img8 from "../images/genel/img-08.jpg"
import img9 from "../images/genel/img-09.jpg"
import img10 from "../images/genel/img-10.jpg"
import img11 from "../images/genel/img-11.jpg"
import img12 from "../images/genel/img-12.jpg"
import img13 from "../images/genel/img-13.jpg"
import img14 from "../images/genel/img-14.jpg"
import img15 from "../images/genel/img-15.jpg"
import img16 from "../images/genel/img-16.jpg"
import img17 from "../images/genel/img-17.jpg"
import img18 from "../images/genel/img-18.jpg"
import img19 from "../images/genel/img-19.jpg"
import img20 from "../images/genel/img-20.jpg"
import img21 from "../images/genel/img-21.jpg"
import img22 from "../images/genel/img-22.jpg"
import img23 from "../images/genel/img-23.jpg"
import img24 from "../images/genel/img-24.jpg"
import img25 from "../images/genel/img-25.jpg"
import img26 from "../images/genel/img-26.jpg"
import img27 from "../images/genel/img-27.jpg"
import img28 from "../images/genel/img-28.jpg"
import img29 from "../images/genel/img-29.jpg"
import img30 from "../images/genel/img-30.jpg"
import img32 from "../images/genel/img-32.jpg"
import img33 from "../images/genel/img-33.jpg"
import img34 from "../images/genel/img-34.jpg"
import img35 from "../images/genel/img-35.jpg"
import img36 from "../images/genel/img-36.jpg"
import img39 from "../images/genel/img-39.jpg"
import img42 from "../images/genel/img-42.jpg"
import img43 from "../images/genel/img-43.jpg"
import img44 from "../images/genel/img-44.jpg"
import img45 from "../images/genel/img-45.jpg"
import img46 from "../images/genel/img-46.jpg"
import img47 from "../images/genel/img-47.jpg"
import img48 from "../images/genel/img-48.jpg"
import img49 from "../images/genel/img-49.jpg"
import img50 from "../images/genel/img-50.jpg"
import img51 from "../images/genel/img-51.jpg"
import img52 from "../images/genel/img-52.jpg"
import img53 from "../images/genel/img-53.jpg"
import img54 from "../images/genel/img-54.jpg"
import img55 from "../images/genel/img-55.jpg"
import img56 from "../images/genel/img-56.jpg"
import img57 from "../images/genel/img-57.jpg"
import img58 from "../images/genel/img-58.jpg"
import img59 from "../images/genel/img-59.jpg"
import img60 from "../images/genel/img-60.jpg"
import img61 from "../images/genel/img-61.jpg"
import img62 from "../images/genel/img-62.jpg"
import img63 from "../images/genel/img-63.jpg"
import img64 from "../images/genel/img-64.jpg"
import img65 from "../images/genel/img-65.jpg"
import img66 from "../images/genel/img-66.jpg"
import img67 from "../images/genel/img-67.jpg"
import img68 from "../images/genel/img-68.jpg"
import img69 from "../images/genel/img-69.jpg"
import img70 from "../images/genel/img-70.jpg"
import img71 from "../images/genel/img-71.jpg"
import img72 from "../images/genel/img-72.jpg"
import img73 from "../images/genel/img-73.jpg"
import img74 from "../images/genel/img-74.jpg"
import img75 from "../images/genel/img-75.jpg"
import img76 from "../images/genel/img-76.jpg"
import img77 from "../images/genel/img-77.jpg"
import img78 from "../images/genel/img-78.jpg"
import img79 from "../images/genel/img-79.jpg"
import img80 from "../images/genel/img-80.jpg"
import img81 from "../images/genel/img-81.jpg"
import img82 from "../images/genel/img-82.jpg"
import img83 from "../images/genel/img-83.jpg"
import img84 from "../images/genel/img-84.jpg"
import img85 from "../images/genel/img-85.jpg"
import img86 from "../images/genel/img-86.jpg"
import img87 from "../images/genel/img-87.jpg"
import img88 from "../images/genel/img-88.jpg"
import img89 from "../images/genel/img-89.jpg"
import img90 from "../images/genel/img-90.jpg"
import img91 from "../images/genel/img91.jpg"
import img92 from "../images/genel/img92.jpg"
import img93 from "../images/genel/img93.jpg"
import img94 from "../images/genel/img94.jpg"
import img95 from "../images/genel/img95.jpg"
import img96 from "../images/genel/img96.jpg"

import rooms1 from "../images/rooms/img-01.jpg"
import rooms2 from "../images/rooms/img-02.jpg"
import rooms3 from "../images/rooms/img-03.jpg"
import rooms4 from "../images/rooms/img-04.jpg"
import rooms5 from "../images/rooms/img-05.jpg"
import rooms6 from "../images/rooms/img-06.jpg"
import rooms7 from "../images/rooms/img-07.jpg"
import rooms8 from "../images/rooms/img-08.jpg"
import rooms9 from "../images/rooms/img-09.jpg"
import rooms10 from "../images/rooms/img-10.jpg"
import rooms11 from "../images/rooms/img-11.jpg"
import rooms12 from "../images/rooms/img-12.jpg"
import rooms13 from "../images/rooms/img-13.jpg"
import rooms14 from "../images/rooms/img-14.jpg"
import rooms15 from "../images/rooms/img-15.jpg"
import rooms16 from "../images/rooms/img-16.jpg"
import rooms17 from "../images/rooms/img-17.jpg"
import rooms18 from "../images/rooms/img-18.jpg"
import rooms19 from "../images/rooms/img-19.jpg"
import rooms20 from "../images/rooms/img-20.jpg"
import rooms21 from "../images/rooms/img-21.jpg"
import rooms22 from "../images/rooms/img-22.jpg"
import rooms23 from "../images/rooms/img-23.jpg"
import rooms24 from "../images/rooms/img-24.jpg"
import rooms25 from "../images/rooms/img-25.jpg"

import entertainment1 from "../images/entertainment/SRF_2547.jpg"
import entertainment2 from "../images/entertainment/SRF_2575.jpg"
import entertainment3 from "../images/entertainment/SRF_2584.jpg"
import entertainment4 from "../images/entertainment/SRF_2685.jpg"
import entertainment5 from "../images/entertainment/SRF_3683.jpg"
import entertainment6 from "../images/entertainment/SRF_3702.jpg"
import entertainment7 from "../images/entertainment/SRF_3706.jpg"

import flavours1 from "../images/flavours/img-01.jpg"
import flavours2 from "../images/flavours/img-02.jpg"
import flavours3 from "../images/flavours/img-03.jpg"
import flavours4 from "../images/flavours/img-04.jpg"
import flavours5 from "../images/flavours/img-05.jpg"
import flavours6 from "../images/flavours/img-06.jpg"
import flavours7 from "../images/flavours/img-07.jpg"
import flavours8 from "../images/flavours/img-08.jpg"
import flavours9 from "../images/flavours/img-09.jpg"
import flavours10 from "../images/flavours/img-10.jpg"
import flavours11 from "../images/flavours/img-11.jpg"
import flavours12 from "../images/flavours/img-12.jpg"
import flavours13 from "../images/flavours/img-13.jpg"
import flavours14 from "../images/flavours/img-14.jpg"
import flavours15 from "../images/flavours/img-15.jpg"
import flavours16 from "../images/flavours/img-16.jpg"
import flavours17 from "../images/flavours/img-17.jpg"
import flavours18 from "../images/flavours/img-18.jpg"
import flavours19 from "../images/flavours/img-19.jpg"
import flavours20 from "../images/flavours/img-20.jpg"
import flavours21 from "../images/flavours/img-21.jpg"
import flavours22 from "../images/flavours/img-22.jpg"
import flavours23 from "../images/flavours/img-23.jpg"
import flavours24 from "../images/flavours/img-24.jpg"
import flavours25 from "../images/flavours/img-25.jpg"
import flavours26 from "../images/flavours/img-26.jpg"
import flavours27 from "../images/flavours/img-27.jpg"
import flavours28 from "../images/flavours/img-28.jpg"
import flavours29 from "../images/flavours/img-29.jpg"
import flavours30 from "../images/flavours/img-30.jpg"
import flavours31 from "../images/flavours/img-31.jpg"
import flavours32 from "../images/flavours/img-32.jpg"
import flavours33 from "../images/flavours/img-33.jpg"
import flavours34 from "../images/flavours/img-34.jpg"

import kidsclub1 from "../images/kidsclub/img-02.jpg"
import kidsclub2 from "../images/kidsclub/img-03.jpg"
import kidsclub3 from "../images/kidsclub/img-04.jpg"
import kidsclub4 from "../images/kidsclub/img-05.jpg"
import kidsclub5 from "../images/kidsclub/img-06.jpg"
import kidsclub6 from "../images/kidsclub/img-07.jpg"
import kidsclub7 from "../images/kidsclub/img-08.jpg"
import kidsclub8 from "../images/kidsclub/img-09.jpg"
import kidsclub9 from "../images/kidsclub/img-10.jpg"
import kidsclub10 from "../images/kidsclub/img-11.jpg"
import kidsclub11 from "../images/kidsclub/img-12.jpg"
import kidsclub12 from "../images/kidsclub/img-13.jpg"
import kidsclub13 from "../images/kidsclub/img-14.jpg"
import kidsclub14 from "../images/kidsclub/img-15.jpg"
import kidsclub15 from "../images/kidsclub/img-16.jpg"
import kidsclub16 from "../images/kidsclub/img-17.jpg"
import kidsclub17 from "../images/kidsclub/img-18.jpg"
import kidsclub18 from "../images/kidsclub/img-19.jpg"
import kidsclub19 from "../images/kidsclub/img-20.jpg"
import kidsclub20 from "../images/kidsclub/img-21.jpg"

import pool1 from "../images/pool/img-01.jpg"
import pool2 from "../images/pool/img-02.jpg"
import pool3 from "../images/pool/img-03.jpg"
import pool4 from "../images/pool/img-04.jpg"
import pool5 from "../images/pool/img-05.jpg"
import pool6 from "../images/pool/img-06.jpg"
import pool7 from "../images/pool/img-07.jpg"
import pool8 from "../images/pool/img-08.jpg"
import pool9 from "../images/pool/img-09.jpg"
import pool10 from "../images/pool/img-10.jpg"
import pool11 from "../images/pool/img-11.jpg"
import pool12 from "../images/pool/img-12.jpg"
import pool13 from "../images/pool/img-13.jpg"
import pool14 from "../images/pool/img-14.jpg"
import pool15 from "../images/pool/img-15.jpg"
import pool16 from "../images/pool/img-16.jpg"
import pool17 from "../images/pool/img-17.jpg"
import pool18 from "../images/pool/img-18.jpg"
import pool19 from "../images/pool/img-19.jpg"
import pool20 from "../images/pool/img-20.jpg"
import pool21 from "../images/pool/img-21.jpg"
import pool22 from "../images/pool/img-22.jpg"
import pool23 from "../images/pool/img-23.jpg"
import pool24 from "../images/pool/img-24.jpg"
import pool25 from "../images/pool/img-25.jpg"
import pool26 from "../images/pool/img-26.jpg"
import pool27 from "../images/pool/img-27.jpg"
import pool28 from "../images/pool/img-28.jpg"
import pool29 from "../images/pool/img-29.jpg"

import spa1 from "../images/spa/img-01.jpg"
import spa2 from "../images/spa/img-02.jpg"
import spa3 from "../images/spa/img-03.jpg"
import spa4 from "../images/spa/img-04.jpg"
import spa5 from "../images/spa/img-05.jpg"
import spa6 from "../images/spa/img-06.jpg"
import spa7 from "../images/spa/img-07.jpg"
import spa8 from "../images/spa/img-08.jpg"
import spa9 from "../images/spa/img-09.jpg"
import spa10 from "../images/spa/img-10.jpg"
import spa11 from "../images/spa/img-11.jpg"
import spa12 from "../images/spa/img-12.jpg"
import spa13 from "../images/spa/img-13.jpg"
import spa14 from "../images/spa/img-14.jpg"
import spa15 from "../images/spa/img-15.jpg"

import villa1 from "../images/villa/img-01.jpg"
import villa2 from "../images/villa/img-02.jpg"
import villa3 from "../images/villa/img-03.jpg"
import villa4 from "../images/villa/img-04.jpg"
import villa5 from "../images/villa/img-05.jpg"
import villa6 from "../images/villa/img-06.jpg"
import villa7 from "../images/villa/img-07.jpg"
import villa8 from "../images/villa/img-08.jpg"
import villa9 from "../images/villa/img-09.jpg"
import villa10 from "../images/villa/img-10.jpg"
import villa11 from "../images/villa/img-11.jpg"
import villa12 from "../images/villa/img-12.jpg"
import villa13 from "../images/villa/img-13.jpg"

import bar1 from "../images/bar/bar1.jpg"
import bar2 from "../images/bar/bar2.jpg"
import bar3 from "../images/bar/bar3.jpg"
import bar4 from "../images/bar/bar4.jpg"
import bar5 from "../images/bar/bar5.jpg"
import bar6 from "../images/bar/bar6.jpg"
import bar7 from "../images/bar/bar7.jpg"
import bar8 from "../images/bar/bar8.jpg"
import bar9 from "../images/bar/bar9.jpg"
import bar10 from "../images/bar/bar10.jpg"
import bar11 from "../images/bar/bar11.jpg"
import bar12 from "../images/bar/bar12.jpg"
import bar13 from "../images/bar/bar13.jpg"
import bar14 from "../images/bar/bar14.jpg"
import bar15 from "../images/bar/bar15.jpg"
import bar16 from "../images/bar/bar16.jpg"
import bar17 from "../images/bar/bar17.jpg"
import bar18 from "../images/bar/bar18.jpg"

import lobby1 from "../images/lobby/Lobby1.jpg"
import lobby2 from "../images/lobby/Lobby2.jpg"
import lobby3 from "../images/lobby/Lobby3.jpg"
import lobby4 from "../images/lobby/Lobby4.jpg"
import lobby5 from "../images/lobby/Lobby5.jpg"
import lobby6 from "../images/lobby/Lobby6.jpg"
import lobby7 from "../images/lobby/Lobby7.jpg"
import lobby8 from "../images/lobby/Lobby8.jpg"
import lobby9 from "../images/lobby/Lobby9.jpg"
import lobby10 from "../images/lobby/Lobby10.jpg"

const GalleryScrollSection = () => {
  const [modalIndex, setModalIndex] = useState(null);
  const t = useTranslations('Gallery');

  // Kategorilere göre resimler
const imageCategories = {
  [t("general")]: [img1,img2, img3, img7, img11, img12, img19, img25, img26, img27, img28, img29, img30, img32, img35, img39, img42, img44, img45,img46,img47,img65,img66,img72,img91, img92, img93,img94,img95,img96,img77,img78,img79,img89,img90],
  [t("rooms")]: [rooms1, rooms2, rooms3, rooms4, rooms5,rooms6,rooms7,rooms8,rooms9,rooms10,rooms11,rooms12,rooms13,rooms14,rooms15,rooms16,rooms17,rooms18,rooms19,rooms20,rooms21,rooms22,rooms23,rooms24,rooms25],
  [t("villa")]: [villa1, villa2, villa3, villa4, villa5,villa6,villa7,villa8,villa9,villa10,villa11,villa12,villa13],
  [t("pool")]: [pool1, pool2, pool3, pool4, pool5,pool6,pool7,pool8,pool9,pool10,pool11,pool12,pool13,pool14,pool15,pool16,pool17,pool18,pool19,pool20,pool21,pool22,pool23,pool24,pool25,pool26,pool27,pool28,pool29],
  [t("flavours")]: [flavours1, flavours2, flavours3, flavours4, flavours5,flavours6,flavours7,flavours8,flavours9,flavours10,flavours11,flavours12,flavours13,flavours14,flavours15,flavours16,flavours17,flavours18,flavours19,flavours20,flavours21,flavours22,flavours23,flavours24,flavours25,flavours26,flavours27,flavours28,flavours29,flavours30,flavours31,flavours32,flavours33,flavours34],
  [t("spa")]: [spa1, spa2, spa3, spa4, spa5,spa6,spa7,spa8,spa9,spa10,spa11,spa12,spa13,spa14,spa15],
  [t("kidsclub")]: [kidsclub1, kidsclub2, kidsclub3, kidsclub4, kidsclub5,kidsclub6,kidsclub7,kidsclub8,kidsclub9,kidsclub10,kidsclub11,kidsclub12,kidsclub13,kidsclub14,kidsclub15,kidsclub16,kidsclub17,kidsclub18,kidsclub19,kidsclub20],
  [t("entertainment")]: [entertainment1, entertainment2, entertainment3, entertainment4, entertainment5,entertainment6,entertainment7],
  [t("bar")]: [bar1, bar2, bar3, bar4, bar5, bar6, bar7, bar8, bar9, bar10, bar11, bar12, bar13, bar14, bar15, bar16, bar17, bar18],
  [t("lobby")]: [lobby1, lobby2, lobby3, lobby4, lobby5, lobby6, lobby7, lobby8, lobby9, lobby10]
}

const categories = Object.keys(imageCategories)
  // Seçili kategori (başlangıçta "GENERAL VIEW")
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [modalImage, setModalImage] = useState(null) 

  const openModal = (img, index) => {
    setModalImage(img);
    setModalIndex(index);
  };

  const scrollPrev = () => {
    const images = imageCategories[selectedCategory];
    const newIndex = modalIndex === 0 ? images.length - 1 : modalIndex - 1;
    setModalIndex(newIndex);
    setModalImage(images[newIndex]);
  };

  // Sağ ok: index'i artır, wrap-around uygulayarak ilk elemana geçsin
  const scrollNext = () => {
    const images = imageCategories[selectedCategory];
    const newIndex = modalIndex === images.length - 1 ? 0 : modalIndex + 1;
    setModalIndex(newIndex);
    setModalImage(images[newIndex]);
  };

  useEffect(() => {
    if (!modalImage) return; // Modal kapalıysa listener ekleme
    
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        scrollNext();
      } else if (e.key === "Escape") {
        setModalImage(null);
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalImage, scrollPrev, scrollNext]);

  return (
    <div className="flex w-screen items-center justify-center mt-[50px] max-w-[1440px]">
      <div className="flex flex-col items-center justify-between w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[40px]">
        {/* Butonlar */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:flex items-center justify-center xl:justify-between gap-[10px] w-full max-w-[1008px]">
          {Object.keys(imageCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex border border-lagoGray items-center justify-center whitespace-nowrap py-[12px] px-[16px] lg:py-[16px] lg:px-[20px] lg:w-[140px] text-[12px] lg:text-[14px] font-medium uppercase leading-[125%] -tracking-[0.33px] font-jost ${
                selectedCategory === category ? "bg-lagoGray text-white" : "text-lagoGray"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resimler */}
        <div className="flex lg:w-[1006px] h-[500px] md:h-[1000px] lg:h-[1700px]">
          <div className="flex flex-col w-full overflow-auto hover:overflow-scroll custom-scroll h-auto">
            <div className="columns-2 lg:columns-3 gap-[16px] lg:gap-[0px] transition-all duration-[350ms] ease-in-out cursor-pointer">
              {imageCategories[selectedCategory].map((imgSrc, index) => (
                <div
                  className="mb-[19.16px] transition-all duration-[350ms] ease-in-out cursor-pointer"
                  key={index}
                  onClick={() => openModal(imgSrc,index)} // Resme tıklandığında modal açılır
                >
                  <Image src={imgSrc} alt="gallery" className="lg:w-[322px] h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal (Lightbox) */}
        {modalImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={() => setModalImage(null)} // Modal dışına tıklandığında kapanır
          >
            <div className="relative w-[80%] " onClick={(e) => e.stopPropagation()}>
              <Image src={modalImage} alt="Enlarged gallery" className="w-full h-auto object-cover max-h-[890px]" />
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white"
                onClick={scrollPrev}
                aria-label="Previous"
              >
                <MdArrowBackIosNew size={32} />
              </button>
              {/* Sağ Ok */}
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white"
                onClick={scrollNext}
                aria-label="Next"
              >
                <MdArrowForwardIos size={32} />
              </button>
            </div>
            <button
                className="absolute top-6 right-4 text-white text-4xl"
                onClick={() => setModalImage(null)}
              >
                &times;
              </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default GalleryScrollSection
