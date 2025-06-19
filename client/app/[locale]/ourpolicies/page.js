"use client"
import React, { useState } from 'react';
import mainImg from "../HomePage/Components/Images/GreenAndBlueFull2.webp";
import Banner from "./components/Banner";
import cevreImg from "./images/cevre.png";
import enerjiImg from "./images/enerji.png";
import peopleImg from "./images/people.png";
import workImg from "./images/work.png";
import childImg from "./images/child.png";
import people2Img from "./images/people2.png";
import people3Img from "./images/people3.png";
import qualityImg from "./images/quality.png";
import uyumImg from "./images/uyum.png";
import InfoSection from "./components/InfoSection";
import PolicySection from "./components/PolicySection";
import SustainabilityPolicyText from "./components/SustainabilityPolicyText";
import EgitimSection from "./components/EgitimSection";
import {useTranslations} from 'next-intl';

const page = () => {
  const t = useTranslations('Footer');
  const [activeTab, setActiveTab] = useState("politikalar");

  return (
    <div className="flex flex-col gap-[15px] md:gap-[22px] lg:gap-[30px] overflow-hidden bg-[#ffffff] items-center justify-center mb-16">
      <Banner
        img={mainImg}
        span="Harmony with Nature"
        header={t('ourpolicies')}
      />
      <div className="flex w-[87.79%] md:w-[91.4%] lg:w-[76.8%] items-center justify-center gap-[20px] md:gap-[30px] lg:gap-[50px] mb-8 font-jost">
        <button onClick={() => setActiveTab("politikalar")} className={`flex items-center justify-center py-[10px] px-[20px] text-[20px] cursor-pointer ${
            activeTab === "politikalar" ? "border-b border-[#676766]" : ""
          }`}>
          Politikalarımız
        </button>
        <button onClick={() => setActiveTab("egitimler")} className={`flex items-center justify-center py-[10px] px-[20px] text-[20px] cursor-pointer ${
            activeTab === "egitimler" ? "border-b border-[#676766]" : ""
          }`}>
          Eğitimlerimiz
        </button>
      </div>
      {activeTab === "egitimler" ? (
        <EgitimSection />
      ) : (
        <>

      <SustainabilityPolicyText />
      <PolicySection />
      <InfoSection
        isImageLeft={false}
        showLink={false}
        span=""
        header=" ÇEVRE POLİTİKAMIZ"
        text="Tesisimiz, kurulduğu günden bu yana çevreye duyarlı bir tesis olmuştur. Bu duyarlılığı devam ettirebilmek için yürürlükte bulunan çevre yasal yükümlülükler mevzuat ve idari düzenlemelere uymayı taahhüt ederiz.
Çevreyi korumak ve sürdürülebilir turizmin gerekliliğini sağlamak amacıyla çevreye olan etkilerimizi tespit eder, olumsuz etkileri, olası tehlikeleri ve atıklarımızı kontrol altında tutarak, geri kazanımı olmayan atıklarımızı çevreye zarar vermeyecek şekilde bertaraf eder ve/veya ettiririz. 
Ayrıca, çevre kirliliğini önlemeye yardımcı olmak ve bu konuda daima iyileştirmeler yapmaya çalışmak ve doğal kaynakların kullanımını, enerji tüketimini, hava, su ve toprak kirlenmesini en aza indirmek için gayret ederiz.
"
        text2="Bulunduğumuz yerlerde yerel istihdamı artırmak, doğal yaşamı korumak ve zenginleştirmek için gerekli her türlü önlemi alır, çevremize sahip çıkmak adına yaptığımız tüm faaliyetleri kamuoyuyla paylaşırız.
Çevre bilinci ve sürdürülebilirlik çalışmalarımızın; sadece personelimize değil, konuklarımız, tedarikçiler, alt taşeronlar ve yetkili mercilerce de benimsenmesini sağlamak amacı ile yerel yönetimlerle işbirliği yaparak çevre koruma projeleri üretilmesine katkıda bulunuruz.
Yakın çevremizi bilinçlendirmek ve korumak, birlikte çalıştığımız firmaların da aynı duyarlılıkla yaklaşmasını sağlamak bizler için büyük önem taşımaktadır.
Yerel yönetimlerle, tedarikçi firmalar ve sivil toplum kuruluşlarıyla işbirliği içinde olarak, çevre halkının turizmle ilgili bilinçlenmesini sağlamak. Misafirlere yerel kültürlerin sunularak ve yöredeki tarihi ve kültürel faaliyetlere yönlendirerek bölgede turizmin sürdürülebilirliğini sağlamak faaliyetlerimiz arasındadır."
        img={cevreImg}
      />

      <InfoSection
        isImageLeft={true}
        showLink={false}
        span=""
        header=" ENERJİ POLİTİKAMIZ"
        text="Tesis genelinde enerji verimliliğini artırmak için gerekli önlemleri almayı taahhüt ediyoruz. Bunun için enerji tüketimimizi sürekli olarak izleyecek ve analiz edecek teknolojileri kullanacağız.
Isıtma, soğutma, havalandırma ve aydınlatma sistemlerimizi optimize ederek enerji tasarrufu sağlayacağız.
Personelimizi enerji bilincine teşvik etmek ve eğitimler sağlamak suretiyle enerji tasarrufu kültürünü yaygınlaştıracağız.
Tesisimizin enerji ihtiyacını karşılamak için yenilenebilir enerji kaynaklarını kullanmayı hedefliyoruz.
Tesisimizde kullanılan ekipmanların enerji verimliliği yüksek olmasına özen göstereceğiz. Enerji tasarruflu beyaz eşyalar, aydınlatma armatürleri ve iklimlendirme sistemleri gibi ekipmanları tercih edeceğiz.
Ekipmanların düzenli bakımını yaparak enerji verimliliğini koruyacak ve performanslarını optimize edeceğiz."
        text2="Yeni yatırımlarımızda enerji verimliliği standartlarını göz önünde bulunduracak ve çevresel etkileri minimize edecek altyapılar oluşturacağız.
Atık yönetimi konusunda sıfır atık hedefine yönelik çalışmalar yapacağız. Atık azaltma, geri dönüşüm ve geri kazanım faaliyetlerine öncelik vereceğiz.
Geri dönüştürülebilir malzemelerin kullanımını teşvik edeceğiz ve atık miktarını en aza indireceğiz.
Atık yönetimi süreçlerimizi sürekli olarak gözden geçirecek ve iyileştirmeler yaparak çevresel etkimizi minimize edeceğiz.
Misafirlerimizi enerji tasarrufu ve çevre koruma konularında bilgilendireceğiz. Enerji tasarrufu için basit uygulamaları paylaşacak ve farkındalık oluşturacağız.
Misafirlerimize yenilenebilir enerji kullanımı ve çevre dostu uygulamalar hakkında bilgi sağlayarak onları desteklemeye teşvik edeceğiz.
"
        img={enerjiImg}
      />
      <InfoSection
        isImageLeft={false}
        showLink={false}
        span=""
        header=" İNSAN HAKLARI POLİTİKAMIZ"
        text="Lago Hotel olarak ekonomik, çevresel ve sosyal sürdürülebilirliğe katkıda bulunma vizyonuyla çalışıyoruz.
Tüm iş süreçlerinde temel insan haklarının gözetilmesini hedefliyoruz.
Çalışanların, kendilerini geliştirebilecekleri, fikirlerini özgürce dile getirebilecekler ve ayrımcılığa maruz kalmayacakları uluslararası standartlara uygun, insan haklarına saygılı bir iş ortamı sunmayı amaçlıyoruz.
BM İnsan Hakları Evrensel Beyannamesi kapsamında temel insan haklarına saygı duyar, bu ilkelere uygun olarak faaliyetlerimizi gerçekleştiririz.
Uluslararası Çalışma Örgütünün Temel İş İlkeleri ve Hakları Beyannamesinde ortaya konan ayrımcılık yapmama, çocuk işçi çalıştırmama, zorla işçi çalıştırmama, toplu sözleşme hakkı ve örgütlenme özgürlüğü ilkelerine ve Türkiye’nin insan hakları ve sosyal adalet konularında taraf olduğu Uluslararası sözleşmelerin gereklerini yerine getirme konusuna özen gösterir ve uygularız."
        text2="İşe alım, eğitim, kariyer, ücret yönetimi gibi süreçlerde ve iş ortamında cinsiyet, etnik köken, din, ırk, milliyet, yaş, fiziksel kapasite, hamilelik, medeni hal, cinsel yönelim, sendika üyeliği, siyasal görüş ve benzeri konulara bağlı olarak ayrım yapmadan eşit bir tutum sergiler, ayrımcılığa müsamaha göstermeyiz.
Çalışanların vasıf, deneyim ve performansına bağlı olarak bu süreçleri şeffaf bir şekilde yönetiriz.
Tüm çalışanlarımızın yasal düzenlemeler çerçevesinde dernek kurma, toplantı düzenleme, örgütlenme, toplu pazarlık hakkını destekler ve ifade özgürlüğüne saygı duyarız. Bu haklarını kullanan çalışanlarımızı hiçbir şekilde ayrımcılığa maruz bırakmaz ve üzerlerinde baskı kurmayız.
İş sağlığı ve güvenliği yaklaşımımızın temelini “sıfır kaza” hedefimiz oluşturur. İş ortaklarımıza ve çalışanlarımıza güvenli bir çalışma ortamı sunmaya önem veririz. "
        img={peopleImg}
      />

      <InfoSection
        isImageLeft={true}
        showLink={false}
        span=""
        header="İŞ SAĞLIĞI VE GÜVENLİĞİ POLİTİKAMIZ"
        text="Lago Hotel tüm çalışanlar, taşeronlar ve misafirler dahil olmak üzere işyerinde bulunan herkesin sağlık, güvenlik ve refahını sağlamayı amaçlar.
Tesis içerisinde çalışanlar, yükleniciler ve ziyaretçilerin dikkat etmeleri gereken görevleri vardır; güvenli çalışma sorumluluğunu taşımak, kendi sağlık ve güvenlikleri için tüm makul önlemleri almak ve davranışları sonucu etkilenebilecek diğer tüm insanların sağlık ve güvenliğini göz önünde bulundurmak.
İlgili tüm faaliyetlerde ihtiyaç olduğu zaman işletmede çalışanlar ve/veya dışarıdan hizmet alımıyla uygun uzmanlardan yararlanarak iş güvenliği koşullarını iyileştirmek için tüm makul ve uygulanabilir adımları atacaktır.
Tüm çalışanların, yüklenicilerin ve ziyaretçilerin iş güvenliğini iyileştirmek için alınacak önlemlerin geliştirilmesi ve desteklenmesi kapsamında etkin katılımını teşvik ederek bir iş güvenliği kültürü oluşturmak."
        text2="Yürürlükteki tüm İSG ile ilgili mevzuat, düzenlemeler ve standartlarıyla uyumlu olmak Organizasyon kapsamındaki risklerle ilgili ve bunlara uygun risk ve tehlike yönetim sistemleri uygulamak.
Kontrollü çalışma için güvenli çalışma alanı ve donanım sağlamak.
Tüm ilgili personel için uygun İSG eğitimi sağlamak.
İşyerindeki sağlık ve güvenliği geliştirmek için yıllık bir İSG programı oluşturmak.
İSG performansını sürekli olarak iyileştirmek için yeterli kaynak ayırmak.
Çalışanlar için düzenli olarak sağlık gözetimi sağlamak.
Tüm olaylara aktif olarak müdahale etmek, bunları soruşturmak ve yaralanan çalışanların uygun işlere, hak taleplerinin adil yönetimi ve rehabilitasyon uygulamaları yoluyla ilk fırsatta geri dönmesini sağlamak.
Bu standartlar işletmede sürekli iyileşmenin sağlanabilmesini kolaylaştırmak amacıyla bütünlük ve etkinliğin korunduğundan emin olmak için düzenli olarak izlenecektir."
        img={workImg}
      />

      <InfoSection
        isImageLeft={false}
        showLink={false}
        span=""
        header="ÇOCUK KORUMA POLİTİKAMIZ"
        text="Lago Hotel çocukların refahını desteklemesi taahhüt eder, çocuk haklarına saygı duyma ve çocukları her türlü sömürü türlerine karşı korumak için gerekli tedbirleri alırız.
Çocukların korunmaya ve bakıma muhtaç hale gelmesini önleyici programları destekleriz.
Suça karışmış ya da kendilerine karşı suç işlenmiş çocukların topluma kazandırılmasını sağlayacak kurum ve kuruluşlara destek oluruz.
Çocuğa hizmet veren tüm paydaşlarla iş birliği içerisinde oluruz.
Çocuğa karşı şiddetin önlenmesine yönelik toplumsal bilinç ve duyarlılığı arttırıcı
Aktiviteler de bulunuruz."
        text2="Personelimize çocuk koruma ile ilgili eğitimler düzenleriz.
Bulunduğumuz ortanda çocuk korumaya yönelik her türlü organizasyon ve etkinliklere destek oluruz.
Olası bir istismar durumunda, personelimize çocuğu istismar ortamından uzaklaştırmak ve departman yöneticisine ve yetkililere bilgi vermek konusunda personelimize eğitimler veriyoruz.
Ziyaretiniz sırasında herhangi bir çocuğun refahı konusunda endişeniz varsa lütfen 112 numaralı telefondan polis veya jandarma ile iletişime geçin. Ayrıca personelimizin herhangi bir üyesine endişenizi bildirebilirsiniz, böylece bunu yetkililere bildirmenize yardımcı olacaklardır.
"
        img={childImg}
      />

      <InfoSection
        isImageLeft={true}
        showLink={false}
        span=""
        header="DEZAVANTAJLI SAĞLIĞI VE GÜVENLİĞİ POLİTİKAMIZ"
        text="Her insanın tatil yapmaya hakkı vardır ve tatil bir ihtiyaçtır. Bu nedenle hizmet verdiğiniz konaklama tesislerinin engelli ve engelsiz tüm misafirlerimize, uygun fiziki altyapısının gerek odalar gerek iç ve dış genel mekanlarda planlama aşamasından itibaren titizlikle sağlanması birinci önceliğimizdir.
Dezavantajlı misafir memnuniyetinin sürdürülebilirliği için uygun personel tedariği ve eğitiminin kesintisiz devam etmesi ve değişen teknolojik gelişmelerin takibi de tesisimiz için önceliklidir.
"
        text2="Herkese eşit şartlarda hizmet anlayışı ve konusunda eğitimini almış personelimiz ile dezavantajlı misafirlerimize sadece odalarında değil, tüm hizmet alanlarımızda kendilerine evlerindeki konforu sağlamak için tüm özverimizle ile hizmet vermekteyiz.
Kurumsal bilincimiz dezavantajın kişide değil fiziksel alanda olduğu felsefesini ilke eden bir yönetim anlayışını benimseyerek, fiziksel alanlardaki dezavantajı misafirlerimizin rahat ve konforu adına ulaşılabilir kılmak önceliğimizdir.
Dezavantajlı olsun ya da olmasın tüm vatandaşların çalışma hakkına sahip olması gerektiği inancında olduğumuzdan tesisimizde dezavantajlı personellerimiz de istihdam edilmektedir. Bu çerçevede dezavantajlı farkındalık politikamız herkes için eşit şartlarda tatilin önündeki engelin kaldırılmasıdır."
        img={people2Img}
      />

      <InfoSection
        isImageLeft={false}
        showLink={false}
        span=""
        header="SAVUNMASIZ GRUPLAR İSTİSMAR VE TACİZ POLİTİKAMIZ"
        text="Lago Hotel olarak, savunmasız grupların haklarını koruma ve istismar veya taciz olaylarının önlenmesine yönelik güçlü bir taahhütte bulunmaktayız. Çalışanlarımızın, misafirlerimizin ve tüm paydaşlarımızın güvende olmasını sağlamak için gereken adımları atmayı hedefliyoruz.
Savunmasız gruplar, yaş, cinsiyet, etnik köken, cinsel yönelim, cinsiyet kimliği, fiziksel veya zihinsel engeller, sosyal veya ekonomik durum, göçmenlik durumu veya diğer özelliklere dayanarak maruz kaldıkları riskler nedeniyle korunmaya ihtiyaç duyan bireyleri ifade eder. Bu politika, çocuklar, gençler, yaşlılar, engelliler, göçmenler veya diğer savunmasız grupları kapsamaktadır.
İlgili yerel yasalara, insan haklarına ve uluslararası standartlara uygun olarak savunmasız grupların istismarını ve tacizini önlemeyi taahhüt ederiz.
"
        text2="Tüm çalışanlarımıza savunmasız grupların hakları, istismarın ve tacizin tanımı, belirtileri ve raporlama süreçleri konusunda düzenli eğitimler sağlarız. Bu eğitimler, tüm personelin bilinçlenmesini ve istismar veya taciz olaylarına duyarlılık göstermelerini amaçlar.
Tüm istismar veya taciz iddialarını ciddiye alır ve şikayetlerin hızlı, adil ve gizli bir şekilde incelenmesini sağlar. Bu süreçte, tüm paydaşlarımızın güvenliğini ve mahremiyetini korumak önceliğimizdir. İlgili yasal yaptırımlara uygun olarak, kanıtlara dayalı disiplin önlemleri ve gerektiğinde yasal süreçler başlatılabilir.
Savunmasız gruplara yönelik istismar ve taciz vakalarının önlenmesi ve azaltılması için sürekli iyileştirme çalışmaları yapmayı taahhüt ederiz.
"
        img={people3Img}
      />

      <InfoSection
        isImageLeft={true}
        showLink={false}
        span=""
        header=" TOPLAM KALİTE YÖNETİM POLİTİKAMIZ"
        text="Misafirlere, devletimizin öngördüğü değerlere, tedarikçilik yapan çözüm ortaklarımıza, çalışanlarımıza, işverenimize karşı hakkaniyet ve güzel beşeriyet dışında hiçbir öznel tasarrufumuz olmayacaktır.
Yenilikçi ve uluslararası standartları takip eden toplam kalite yönetimi anlayışımız ile her zaman daha iyisini yapacağımıza inanacağız. Bu inançla, kendimizi sürekli iyileştirerek ve geliştirerek daha iyi hizmet vereceğiz.
Gelişerek ilerlemenin yolu eğitimden geçmektedir. Görevimiz, teorik ve pratik eğitim faaliyetlerini astlarımıza sağlamak; sektöre işini seven ve sorumluluk almaya hazır başarılı bireyler kazandırmaktır.
Birbirimize karşı duyduğumuz saygı, güven ve anlayış ekip ruhumuzun iskeletini; iletişim kanallarımızın açık, sağlıklı ve ahlaklı olması ise ekip ruhumuzun devamlılığını sağlayacaktır.
"
        text2="Pazarlama politikamız tesis içinde başlar ve global dünya şartlarına buradan ulaşır. Yurtiçi ve yurtdışı reklam ve tanıtımların yanı sıra tesislerimizin bünyesinde yapılan tanıtım faaliyetlerinin etkisine ve gücüne çok inanmaktayız. Araştırarak, geliştirerek elde edeceğimiz başarılı sonuçları misafirlerimizle paylaşacağımız en doğru adres kendi tesisimizdir.
Turizm mevzuatları, uluslararası yönetmelikler, anlaşmalar ve hatta temayüller bize ışık tutacaktır. Ama esas olanın, değişebilecek misafir istekleri ve ihtiyaçları olduğunu hiçbir koşulda unutmayacağız. Konuma, sezona, profile ve duruma göre; temel standartlardan ödün vermeden, misafir isteklerinin çözüm yollarını bulabilmek, sektörün altın anahtarıdır.
Konuklarımıza karşı göstereceğimiz üstün hizmet anlayışı, bizi sadık misafirleriyle her gün büyüyen saygı ve sevgi dolu büyük bir aile yapacaktır.
Hizmetlerimizi; Sürdürülebilirlik, Gıda Yönetim Sistemlerine, Çevre, İş Sağlığı ve Güvenliği Yönetim Sistemleri ile birlikte bütünleşik bir şekilde yönetip, öncülüğümüzle örnek bir kuruluş olmak için tüm gücümüzle çalışırız.
Herkese eşit şartlarda hizmet anlayışı ve konusunda eğitimini almış personelimiz ile dezavantajlı misafirlerimize sadece odalarında değil, tüm hizmet alanlarımızda kendilerine evlerindeki konforu sağlamak için tüm alt ile hizmet vermekteyiz."
        img={qualityImg}
      />

      <InfoSection
        isImageLeft={false}
        showLink={false}
        span=""
        header=" TOPLUMA UYUM POLİTİKAMIZ"
        text="Lago Hotel olarak, içinde bulunduğumuz yerel topluluğu desteklemeye ve onlarla birlikte çalışmaya kendisini adamıştır. İşimizi, destinasyonun kültürünü ve mirasını ve yerel ekonomiyi korumaya ve tanıtmaya yardımcı olacak şekilde yürütmeyi taahhüt ediyoruz.
Yerel halkın refahına ve yaşam alanlarına katkıda bulunduğumuzdan emin olmak için, yerel topluluğumuzla sürekli bir diyalog sürdürmenin çok önemli olduğuna inanıyoruz. Bu doğrultuda,
Topluluğu geliştiren girişimleri desteklemek.
Yerel ekonomiyi desteklemek.
Yerel kültüre, geleneklere ve yaşam biçimine saygı duymak ve korumak.
Temel kaynaklara ve hizmetlere erişimi desteklemek ve korumak.
Hedeflerimize ulaşmak için ne yapıyoruz:
Misafirlerimizi, destinasyonun tarihini, kültürünü, gelenekleri ve yerel topluluğumuz ile birlikte, sunulan yerel ürün ve hizmetleri de keşfetmeye teşvik ediyoruz.
"
        text2="Kültürel ve manevi açıdan önemli mekanların bakımına her yıl bağış yaparak ve misafirleri ziyaret etmeye teşvik ederek katkıda bulunuyoruz.
Mümkün olduğunda, satın alma politikamızda belirtildiği gibi yerel ve bölgesel ürün ve hizmetleri tercih ederiz.
İşe alım politikamızda belirtildiği gibi işe alım sürecinde yerelde yaşayan personeli tercih ederiz.
İşbaşı eğitim programları ile öncelikli olarak yerel halka iş imkanı sağlarız.
Yerel ve yerli halkla, yerel dernek ve ticaret odasının düzenli toplantıları aracılığıyla, sürekli diyalog halinde olarak onlara adil ve eşit davranılmasını sağlıyoruz.
Misafirler ve çalışanlarımızla düzenli plaj temizliği yaparak, plajlarımızı ve kumullarımızı korumayı amaçlıyoruz.
Çeşitli yerel hayır kurumlarına yıllık mali katkılarda bulunuyoruz.
"
        img={uyumImg}
      />
       </>
      )}
    </div>
  );
};

export default page;
