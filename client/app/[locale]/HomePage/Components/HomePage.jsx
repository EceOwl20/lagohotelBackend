"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reservation from "./Reservation";
import img from "./Images/videoImage.png"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage() {
  const [hero, setHero] = useState(null);
  const [showPoster, setShowPoster] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/pages/homepage`, { cache: "no-store" });
        const data = await res.json();
        setHero(data.hero);
      } catch (err) {
        console.error("Hero verisi alınamadı:", err);
      }
    };
    fetchHero();
  }, []);

  useEffect(() => {
    if (!hero || !videoRef.current) return;

    // Autoplay denemesi (iOS / Chrome politikaları)
    const tryPlay = async () => {
      try {
        await videoRef.current.play();
      } catch (e) {
        // Autoplay engellenirse yine de ilk frame’i gösterelim
        // (poster zaten altta; canplay gelince posteri kaldıracağız)
        // İstersen buraya bir "Tap to play" overlayi ekleyebilirsin.
      }
    };
    tryPlay();
  }, [hero]);

  if (!hero) return <p>Yükleniyor…</p>;

  const posterSrc = hero.poster || hero.posterDesktop || ""; // backend’den gelen poster alanın
  const desktopSrc = `${apiUrl}${hero.videoDesktop}`;
  const mobileSrc = `${apiUrl}${hero.videoMobile}`;

  return (
    <div className="relative w-screen min-h-screen overflow-hidden">
      {/* Poster (altta) */}
      {posterSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={img}
            alt="Hero"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={`object-cover transition-opacity duration-300 ${showPoster ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      )}

      {/* Video (üstte) */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-10 w-full h-full object-cover"
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        poster={posterSrc ? `${apiUrl}${posterSrc}` : undefined}
        // Video kullanılabilir olunca posteri kaldır
        onCanPlay={() => setShowPoster(false)}
        onPlay={() => setShowPoster(false)}
      >
        {/* Tek <video>, iki <source> ile çözünürlük ayrımı */}
        <source src={desktopSrc} type="video/mp4" media="(min-width:1024px)" />
        <source src={mobileSrc} type="video/mp4" media="(max-width:1023px)" />
        Tarayıcınız bu videoyu desteklemiyor.
      </video>

      <Reservation />
    </div>
  );
}