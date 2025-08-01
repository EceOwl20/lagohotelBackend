import { useEffect, useState } from "react";
import React from 'react'
import Reservation from './Reservation'

export default function HomePage() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/pages/homepage`);
        const data = await res.json();
        setHero(data.hero);
      } catch (err) {
        console.error("Hero verisi alınamadı:", err);
      }
    };

    fetchHero();
  }, []);

  if (!hero) return <p>Yükleniyor...</p>; // isteğe bağlı

  return (
    <div className="relative w-screen min-h-screen overflow-hidden">
      {/* Desktop video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover hidden lg:flex"
      >
        <source
          src={`${apiUrl}${hero.videoDesktop}`}
          type="video/mp4"
        />
        Tarayıcınız bu videoyu desteklemiyor.
      </video>

      {/* Mobile video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover flex lg:hidden"
      >
        <source
          src={`${apiUrl}${hero.videoMobile}`}
          type="video/mp4"
        />
        Tarayıcınız bu videoyu desteklemiyor.
      </video>

      <Reservation />
    </div>
  );
}
