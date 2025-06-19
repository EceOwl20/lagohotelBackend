import React from "react";
import img from "../images/sustainability.png"
import Image from "next/image";

const PolicySection = () => {
  return (
    <div className="flex w-screen h-auto items-center justify-center mt-16">
      <div className="flex flex-col items-center justify-center text-center w-[87.79%] md:w-[91.4%] xl:w-[76.8%]">
        <div className="flex flex-col w-full items-center justify-center lg:w-[65%] text-center font-jost text-black gap-[15px] md:gap-[25px] lg:gap-[35px]">
          <span className="text-[12px] font-medium leading-[14px] uppercase tracking-[0.48px]">Lago Hotel Sustainability</span>
          <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-marcellus text-black leading-[120%] lg:leading-[57.6px] font-normal">
          SÜRDÜRÜLEBİLİR TEDARİK POLİTİKASI
          </h2>
         <div className="flex flex-col items-center justify-center text-center gap-[5px]">
         <p className="text-[14px] lg:text-[16px] font-normal leading-[24px]">
          Lago Hotel, insanlar ve çevre üzerindeki etkimizi iyileştirmeye kararlıdır. Bu taahhüdü yerine getirmenin bir parçası olarak, mümkün, uygun ve pratik olan her durumda en sürdürülebilir ürün ve hizmetleri tedarik ettiğimizden emin olacağız.Satın alma ile ilgili prosedürlerimiz çerçevesinde yapılan satın alımlarda tercih etmeleri beklenmektedir:
          </p>
         </div>
          <div className="flex w-full items-center justify-between">
          <ul className="mt-2 list-disc pl-0 marker:text-xs marker:text-black text-start">
            <li>Yeterli kalitede</li>
            <li>Yerel/bölgesel</li>
            <li>Uygun fiyatlı</li>
            <li>Enerji verimliliği yüksek</li>
            <li>Su tasarrufu sağlayan</li>
            <li>Onaylı/sertifikalı (FSC, MSC, GMP, ISO 14001 vb.)</li>
            <li>Geri dönüştürülmüş içeriğe sahip</li>
            <li>Onarılabilen</li>
            <li>Yeniden kullanılabilir/doldurulabilir</li>
            <li>Geri dönüştürülmüş veya yenilenmiş</li>
            <li>Çevresel açıdan sürdürülebilir ürün veya hizmet sağlayan tedarikçilere öncelik veririz.</li>
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
          <p className="text-[14px] lg:text-[16px] font-normal leading-[24px]">Nesli tükenmekte ve/veya koruma altında olan yasaklı türlerin avlanmaması, satılmaması veya tüketilmemesi için gerekli tüm çalışmaları destekler, yürürlükteki tüm yasal mevzuatlara uyarız. Sürdürülebilir satın alma uygulamaları konusunda hem çalışanlarımızın hem de tedarikçilerimizin eğitim ve gelişimi için gayret gösterir, birlikte gelişmek üzere düzenli olarak tedarikçi denetimleri gerçekleştiririz. Sürdürülebilirlik uygulamalarını ve bunların sonuçlarını sürekli iyileştirir, tedarikçilerimizi teşvik eder; ekonomik, çevresel ve sosyal sürdürülebilirlik alanlarında yenilikçi tedarik uygulamalarını da destekleriz.</p>
          <p className="text-[14px] lg:text-[16px] font-normal leading-[24px]">Sıfır Atık bilinciyle, atıkları en aza indirmek için gıda dahil sarf ve tek kullanımlık ürünlerin satın alınmasını dikkatle yönetiriz. Çalışanları için taciz ve ayrımcılık olmayan adil bir çalışma ortamı oluşturan; çalışanları arasında dil, din, mezhep, ırk, cinsiyet, siyasi düşünce, felsefi inanç, ve benzeri sebeplerle ayırım gözetmeyen; kadın-erkek fırsat eşitliğine önem veren, zorla veya zorunlu tutarak çalışmayı engelleyen, çocuk işçi çalıştırmayan, istihdam ve çalışma hayatıyla ilgili yürürlükteki tüm yasa ve düzenlemelere uyumlu tedarikçilerle çalışırız.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PolicySection;
