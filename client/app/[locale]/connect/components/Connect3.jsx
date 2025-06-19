
import React from 'react'
import {useTranslations} from 'next-intl';

const Connect3 = () => {
  const t = useTranslations('Contact.Form');

  return (
    <div className="flex flex-col items-center w-full px-4 py-8">
      {/* Üst Çizgi kaldırıldı veya başka yerde kullanılabilir */}

      {/* Başlık */}
      <h2 className="text-[32px] lg:text-[40px] font-marcellus font-normal text-center mt-5 mb-5">
        {t("address")}
      </h2>

      {/* Yatay çizgi: Başlığın hemen altında */}
      <hr className="w-full max-w-4xl border-gray-300 mb-6 mx-auto" />

      {/* Adres Metni */}
      <p className="text-center text-lagoBlack font-normal font-jost text-[14px] lg:text-[16px] leading-[24px] mb-12 underline">
        Sorgun, Titreyengöl Mevkii, 07600 Manavgat/Antalya
      </p>

      {/* Harita Alanı */}
      <div className="w-full max-w-4xl h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12859.987375908045!2d31.45037963141668!3d36.75130499248053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c350ad5d61c917%3A0x532259cb1682b4c2!2sLago%20Hotel!5e0!3m2!1str!2str!4v1692023311945!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
    </div>
  )
}

export default Connect3
