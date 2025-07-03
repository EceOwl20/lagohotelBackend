"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function PagesPanel() {
 const [roomSlugs, setRoomSlugs] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5001/api/pages/rooms/subrooms")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch subroom slugs");
  //       return res.json();
  //     })
  //     .then((slugs) => setRoomSlugs(slugs))
  //     .catch((err) => console.error(err));
  // }, []);



  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">📄 Sayfalar Yönetimi</h1>
      <p>Buradan sitenizin sayfa içeriklerini düzenleyebilirsiniz.</p>

      <ul className="flex flex-col list-disc pl-6 space-y-4">
        <li>
          <Link href="/panel/sayfalar/anasayfa" className="text-blue-600 hover:underline">
            🏠 Anasayfa
          </Link>
        </li>
          <li>
              <Link href="/panel/sayfalar/header" className="text-blue-600 hover:underline">
            ⛩️ Header 
          </Link>
          </li> 

          <li>
              <Link href="/panel/sayfalar/footer" className="text-blue-600 hover:underline">
            🌵 Footer 
          </Link>
          </li>

          <li>
              <Link href="/panel/sayfalar/odalar" className="text-blue-600 hover:underline">
            🏘️ Odalar 
          </Link>
          </li>

          <li>
              <Link href="/panel/sayfalar/restoranlar" className="text-blue-600 hover:underline">
            🍔 Restoranlar 
          </Link>
          </li>

           <li>
              <Link href="/panel/sayfalar/barkafeler" className="text-blue-600 hover:underline">
            🍻 Bar ve ☕️ kafeler 
          </Link>
          </li>

          <li>
              <Link href="/panel/sayfalar/sahilhavuz" className="text-blue-600 hover:underline">
              🌊 Sahil ve Havuzlar
          </Link>
          </li>

            <li>
              <Link href="/panel/sayfalar/kidsclub" className="text-blue-600 hover:underline">
              🎡 Kids
          </Link>
          </li>

            <li>
              <Link href="/panel/sayfalar/spa" className="text-blue-600 hover:underline">
              🧖🏼‍♀️ Spa
          </Link>
          </li>

             <li>
              <Link href="/panel/sayfalar/entertainment" className="text-blue-600 hover:underline">
              🎆 Entertainment
          </Link>
          </li>

             <li>
              <Link href="/panel/sayfalar/iletisim" className="text-blue-600 hover:underline">
              ☎️ İletisim
          </Link>
          </li>

          <li>
              <Link href="/panel/sayfalar/fitness" className="text-blue-600 hover:underline">
              🚴🏼‍♂️ Fitness
          </Link>
          </li>

          <li>
              <Link href="/panel/sayfalar/hakkimizda" className="text-blue-600 hover:underline">
              📜 Hakkımızda
          </Link>
          </li>

               <li>
              <Link href="/panel/sayfalar/odalar/subroom" className="text-blue-600 hover:underline">
              🛏️ Yeni subroom page
          </Link>
          </li>

            <li>
              <Link href="/panel/sayfalar/contactSection" className="text-blue-600 hover:underline">
              📠 Contact section 2
          </Link>
          </li>


            <li>
              <Link href="/panel/sayfalar/otheroptions" className="text-blue-600 hover:underline">
              ⚙️ Other options
          </Link>
          </li>

             <li>
              <Link href="/panel/sayfalar/roomfeatures" className="text-blue-600 hover:underline">
              🛏️ 🛌 Room features
          </Link>
          </li>

           <li>
              <Link href="/panel/sayfalar/restoranlar/subrestaurants" className="text-blue-600 hover:underline">
              🍝 SubRestaurants
          </Link>
          </li>


          <li>
              <Link href="/panel/sayfalar/superioroda" className="text-blue-600 hover:underline">
            🏠 Superior Oda 
          </Link>
          </li>


      </ul>
    </div>
  );
}