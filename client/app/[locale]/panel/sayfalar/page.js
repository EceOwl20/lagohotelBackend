"use client";
import React from "react";
import Link from "next/link";

const links = [
  { href: "/panel/sayfalar/anasayfa", label: "🏠 Anasayfa" },
  { href: "/panel/sayfalar/header", label: "⛩️ Header" },
  { href: "/panel/sayfalar/footer", label: "🌵 Footer" },
  { href: "/panel/sayfalar/odalar", label: "🏘️ Odalar" },
  { href: "/panel/sayfalar/restoranlar", label: "🍔 Restoranlar" },
  { href: "/panel/sayfalar/barkafeler", label: "🍻 Bar ve ☕️ kafeler" },
  { href: "/panel/sayfalar/sahilhavuz", label: "🌊 Sahil ve Havuzlar" },
  { href: "/panel/sayfalar/kidsclub", label: "🎡 Kids" },
  { href: "/panel/sayfalar/spa", label: "🧖🏼‍♀️ Spa" },
  { href: "/panel/sayfalar/entertainment", label: "🎆 Entertainment" },
  { href: "/panel/sayfalar/iletisim", label: "☎️ İletisim" },
  { href: "/panel/sayfalar/fitness", label: "🚴🏼‍♂️ Fitness" },
  { href: "/panel/sayfalar/hakkimizda", label: "📜 Hakkımızda" },
  { href: "/panel/sayfalar/odalar/subroom", label: "🛏️ Yeni subroom page" },
  { href: "/panel/sayfalar/contactSection", label: "📠 Contact section 2" },
  { href: "/panel/sayfalar/otheroptions", label: "⚙️ Other options" },
  { href: "/panel/sayfalar/roomfeatures", label: "🛏️ 🛌 Room features" },
  { href: "/panel/sayfalar/restoranlar/subrestaurants", label: "🍝 SubRestaurants" },
  { href: "/panel/sayfalar/barkafeler/subbarcafes", label: "☕️🍰 Sub BarCafes" },
  { href: "/panel/sayfalar/special", label: "🌠 Özel günler Special" },
  { href: "/panel/sayfalar/galeri", label: "🏞️ Galeri" },
  { href: "/panel/sayfalar/sertifikalar", label: "📑 Sertifikalar" },
  { href: "/panel/sayfalar/blog", label: "🐚 Blog" },
  { href: "/panel/sayfalar/surdurulebilirlik", label: "🌿 Sürdürülebilirlik" },
  { href: "/panel/sayfalar/politikalarimiz", label: "📔 Politikalarımız" },
  { href: "/panel/sayfalar/cerezler", label: "🍪 Çerezler" },
];

export default function PagesPanel() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">📄 Sayfalar Yönetimi</h1>
      <p className="text-gray-600 mb-8">
        Buradan sitenizin sayfa içeriklerini düzenleyebilirsiniz.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 p-4 rounded-xl border-[2px] bg-white shadow-sm 
                       hover:shadow-md hover:border-lagoBlack2 transition-all duration-200"
          >
            <span className="text-xl">{item.label.split(" ")[0]}</span>
            <span className="text-gray-800 font-medium">
              {item.label.replace(/^[^\s]+/, "").trim()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
