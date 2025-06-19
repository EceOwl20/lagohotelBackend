import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lago Hotel",
  description: "Lago Hotel Antalya",
  icons: {
    icon: "/favicon.ico",
  },
};

// ✅ async function tanımlanıyor
export default async function RootLayout({ children, params }) {
  const locale = params.locale;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  await setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}