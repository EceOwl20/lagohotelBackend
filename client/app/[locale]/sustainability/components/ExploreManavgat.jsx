'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import side from "../images/side.jpg"
import aspendos from "../images/aspendos.jpg"
import oymapinar from "../images/oymapinar.jpg"
import waterfall from "../images/manavgatwaterfall.webp"
import seleukeia from "../images/Seleukeia.jpg"
import koprulukanyon from "../images/koprulukanyon.jpg"

export default function GeziRehberiPage() {
    const t = useTranslations('Explore');

    const geziVerileri = [
        {
          baslik: t("title1"),
          aciklama: t("text1"),
          resim: waterfall,
          mesafe: '5 km',
        },
        {
          baslik: t("title2"),
          aciklama: t("text2"),
          resim: side,
          mesafe: '7 km',
        },
        {
          baslik: t("title3"),
          aciklama: t("text3"),
          resim: aspendos,
          mesafe: '35 km',
        },
        {
          baslik: t("title4"),
          aciklama: t("text4"),
          resim: koprulukanyon,
          mesafe: '50 km',
        },
        {
          baslik: t("title5"),
          aciklama: t("text5"),
          resim: oymapinar,
          mesafe: '20 km',
        },
        {
          baslik: t("title6"),
          aciklama: t("text6"),
          resim: seleukeia,
          mesafe: '15 km',
        }
      ];
      
  return (
    <main className="w-[87.79%] md:w-[90%] lg:w-[76.8%] max-w-[1440px] mx-auto py-8 space-y-10 lg:py-12 lg:space-y-20">
      <h2 className="text-[28px] md:text-[32px] lg:text-[44px] font-marcellus text-lagoBlack">{t("header")}</h2>

      {geziVerileri.map((yer, i) => (
        <section
          key={i}
          className={`flex h-full flex-col-reverse lg:flex-row ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''} items-center gap-6 md:gap-10 lg:gap-[8%] justify-center`}
        >
          <div className="w-full lg:w-[46%]">
            <Image
              src={yer.resim}
              alt={yer.baslik}
              width={600}
              height={400}
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-[46%] text-lagoGray items-center justify-center h-full">
            <h3 className="text-[28px] md:text-[32px] lg:text-[36px] font-marcellus text-lagoBlack2 mb-2">{yer.baslik}</h3>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] font-jost">{yer.aciklama}</p>
            <span className="block mt-2 text-sm md:text-base font-jost text-lagoGray font-medium capitalize">{t("distance")} {yer.mesafe}</span>
          </div>
        </section>
      ))}
    </main>
  );
}
