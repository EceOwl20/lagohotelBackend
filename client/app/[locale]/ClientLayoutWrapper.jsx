"use client";

import { usePathname } from "next/navigation";
import Header from "./GeneralComponents/Header/Header";
import HeaderWhite from "./GeneralComponents/Header/HeaderWhite";
import Footer from "./GeneralComponents/Footer/Footer";
import BookNow from "./GeneralComponents/BookNow";
import CookiePopup from "./GeneralComponents/CookiePopup";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const isPanelRoute =
    pathname.includes("/panel") || pathname.includes("/kullanici");

  return (
    <>
      {!isPanelRoute && <Header />}
      {!isPanelRoute && <HeaderWhite />}
      {children}
      {!isPanelRoute && <BookNow />}
      {!isPanelRoute && <CookiePopup />}
      {!isPanelRoute && <Footer />}
    </>
  );
}