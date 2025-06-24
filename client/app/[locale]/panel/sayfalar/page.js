"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function PagesPanel() {

    const [roomSlugs, setRoomSlugs] = useState([]);

  useEffect(() => {
    fetch("/api/pages/rooms/subrooms")
     .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch room slugs");
        return res.json();
      })
      .then((slugs) => setRoomSlugs(slugs))
      .catch((err) => console.error(err));
  }, []);
  
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
              <Link href="/panel/sayfalar/odalar/superiorroom" className="text-blue-600 hover:underline">
            🏠 Superior Oda 
          </Link>
          </li>
           {roomSlugs.map(slug => (
          <li key={slug}>
            <Link
              href={`/panel/sayfalar/odalar/${slug}`}
              className="text-blue-600 hover:underline capitalize"
            >
              {slug.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </Link>
          </li>
        ))}
       
      </ul>
    </div>
  );
}