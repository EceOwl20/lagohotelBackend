import React from "react";
import img from "../images/sustainabilitypolicy.png"
import Image from "next/image";

const SustainabilityPolicyText = () => {
  return (
    <div className="flex w-screen h-auto items-center justify-center ">
      <div className="flex flex-col items-center justify-center text-center w-[87.79%] md:w-[91.4%] xl:w-[76.8%]">
        <div className="flex flex-col w-full items-center justify-center lg:w-[65%] text-center font-jost text-black gap-[15px] md:gap-[25px] lg:gap-[35px]">
          <span className="text-[12px] font-medium leading-[14px] uppercase tracking-[0.48px]">Lago Hotel Sustainability</span>
          <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-marcellus text-black leading-[120%] lg:leading-[57.6px] font-normal">
          SÜRDÜRÜLEBİLİRLİK POLİTİKAMIZ
          </h2>
      
         <p className="text-[14px] lg:text-[16px] font-normal leading-[24px]">
         Çevreyi korumak ve sürdürülebilir turizmin gerekliliğini sağlamak amacıyla çevreye olan etkilerinizi tespit eder, olumsuz etkilerini, olası tehlikeleri ve atıklarımızı kontrol altına alırız. Doğal kaynakların kullanımını, enerji tüketimini, hava, su ve toprak kirlenmesini en aza indirgemek için gayret ederiz.
           Ülkemizde yürürlükte olan çevre, iş sağlığı ve güvenliği ve insan hakları ile ilgili yayımlanmış olan mevzuat ve düzenlemelere uyar, tüm gereklilikleri eksiksiz yerine getiririz. Faaliyetlerimizi yürütürken misafir ve çalışanlarımızı meydana gelebilecek yaralanmalardan, hastalıklardan korumak ve iyi çalışma koşulları sağlamak için gerekli önlemleri alır ve uygularız.
          </p>
        
          <div className="flex w-full items-center justify-between gap-[25px]">
          <ul className="mt-2 list-disc pl-0 marker:text-xs marker:text-black text-start">
          Biyoçeşitliliğin korunmasını sağlamak için;

            <li>Tesis sahiline yumurtlayan ve nesli tükenme tehlikesi ile karşı karşıya olan Caretta Caretta’lar için yuvalar yapmakta, bilgilendirmeler yaparak yumurtaların korumasını sağlamaktayız.</li>
            <li>Tesisimizdeki endemik bir bitki olan kum zambaklarının korunmasını ve bakımını sağlarız.</li>
            <li>Tesisimizdeki kedi ve kuşlar için barınmalarını ve beslenmelerini sağlarız. </li>

          </ul>
          <Image
          src={img}
          alt="sustainability"
          width={img.width}
          height={img.height}
          className="w-[40%] shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
          />
          </div>

          <div className="flex flex-col items-center justify-center text-center gap-[10px]">
          <p className="text-[14px] lg:text-[16px] font-normal leading-[24px]">Çevre bilinci ve sosyal sorumluluklarımızın sadece çalışanlarımızca değil, konuklarımız, tedarikçiler, taşeronlar ve yetkili mercilerce de benimsenmesini sağlamaya çalışırız. Yerel yönetimler, tedarikçi firmalar ve sivil toplum kuruluşlarıyla iş birliği yaparak çevre koruma ve sosyal sorumluluk projeleri üretilmesine katkıda bulunuruz.
Bulunduğumuz yerlerde, yerel istihdamı arttırmak, doğal yaşamı korumak ve zenginleştirmek için gerekli her türlü önlemi alır, çevremize sahip çıkmak adına yaptığımız tüm faaliyetleri kamuoyu ile paylaşırız.
</p>
          
          </div>

        </div>
      </div>
    </div>
  );
};

export default SustainabilityPolicyText;
