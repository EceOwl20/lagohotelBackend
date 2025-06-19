import { useTransition, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";

export default function LocaleSwitcherSelect({ children, defaultValue, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  // Sayfa yüklendiğinde scroll konumunu sessionStorage’dan oku
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("scrollPosition");
    if (savedScroll) {
      window.scrollTo(0, Number(savedScroll));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [pathname]);

  function handleLangChange(lang) {
    // Mevcut scroll pozisyonunu sessionStorage’da sakla
    sessionStorage.setItem("scrollPosition", window.scrollY);
    
    setIsOpen(false);
    startTransition(() => {
      const currentLocale = pathname.split('/')[1];
      const newPathname = pathname.replace(`/${currentLocale}`, `/${lang}`);
      router.replace(newPathname);
    });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center justify-center gap-2 rounded-md px-[10px] py-[10px] lg:py-4 font-medium mix-blend-difference bg-darkB uppercase w-full text-[16px]">
        {defaultValue}
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-0 rounded bg-darkB shadow-lg left-2 w-full ">
          <ul className="py-0">
            {React.Children.map(children, (child) => {
              if (child.props.value === defaultValue) return null;
              return (
                <li
                  key={child.props.value}
                  className="cursor-pointer px-[6px] py-[8px] mt-0 hover:bg-white hover:text-lagoBlack text-center items-center justify-center"
                  onClick={() => handleLangChange(child.props.value)}
                >
                  {child.props.value}
                  
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
