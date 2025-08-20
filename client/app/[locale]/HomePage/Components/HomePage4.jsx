import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

// İkon eşleştirici
import Beach from "./Icons/Beach";
import Pool from "./Icons/Pool";
import Dining from "./Icons/Dining";
import Panda from "./Icons/Panda";
import Fireworks from "./Icons/Fireworks";
import Spa from "./Icons/Spa";

// String -> component map
const iconMap = {
  Beach,
  Pool,
  Dining,
  Panda,
  Fireworks,
  Spa,
};

export default function HomePage4({ essentials }) {
  // essentials prop'u MongoDB'den geliyor (API veya parent'tan)
  // Yapı: { subtitle: {...}, title: {...}, items: [{title, description, link, icon}], buttonText: {...}, buttonLink: {...} }
  const locale = useLocale();

  if (!essentials) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 w-screen items-center justify-center my-[25px]">
      <div className="flex flex-col 2xl:w-[1106px] w-[87.79%] md:w-[91.4%] xl:w-[76.8%] items-start ml-[6.1%] md:ml-[4.3%] xl:ml-[11.6%] justify-center gap-[15px] md:gap-[25px] lg:gap-[35px] text-lagoBlack">
        <p className="text-[12px] leading-[14px] tracking-[0.48px] uppercase font-medium font-jost">
          {essentials.subtitle?.[locale] || ""}
        </p>
        <h2 className="text-[28px] md:text-[32px] lg:text-[48px] font-marcellus font-normal lg:leading-[57.6px] lg:capsizedText2 lg:w-[60%]">
          {essentials.title?.[locale] || ""}
        </h2>

        {/* Grid ile dinamik servisler */}
        <div className="flex flex-col items-start md:grid gap-[15px] md:gap-[20px] lg:gap-[29px] md:grid-cols-2 lg:grid-cols-3 w-full md:mt-[15px] lg:mt-[10px]">
          {(essentials.items || []).map((item, index) => {
            // String'den ilgili React ikonunu bul
            const Icon = iconMap[item.icon] || null;
            return (
              <div
                key={index}
                className="flex gap-[15px] md:gap-[10px] lg:gap-[17px] items-center justify-center md:w-[92%] lg:w-[100%] xl:w-[98%]"
              >
                <Link href={item.link || "#"} className="shrink-0 items-center justify-center">
                  {Icon && <Icon width={50} height={50} />}
                </Link>
                <div className="flex flex-col gap-[4px] md:gap-[10px] lg:gap-[17px]">
                  <h3 className="font-jost text-[16px] leading-normal lg:text-[18px] font-normal md:leading-[30px]">
                    {item.title?.[locale] || ""}
                  </h3>
                  <p className="font-jost text-[12px] lg:text-[14px] font-normal leading-normal">
                    {item.description?.[locale] || ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alt kısım: Discover More butonu */}
        {essentials.buttonText && (
          <div className="hidden lg:flex">
            <Link
              href={typeof essentials.buttonLink === "object" ? essentials.buttonLink?.[locale] || "#" : essentials.buttonLink || "#"}
              className="flex border-b font-marcellus border-lagoBlack text-lagoBlack uppercase text-[16px] font-normal leading-[30px] transition cursor-pointer"
            >
              {typeof essentials.buttonText === "object"
                ? essentials.buttonText?.[locale] || ""
                : essentials.buttonText || ""}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
