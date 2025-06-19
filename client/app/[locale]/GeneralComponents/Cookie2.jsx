"use client";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import DropdownCookieArrow from "./Contact/icons/DropdownCookieArrow";
import logosvg from "./Header/Icons/Asset2.svg";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

const Cookie2 = ({ isOpen, onClose }) => {
    
    const [selectedContent, setSelectedContent] = useState(0);

    const [cookies, setCookies] = useState({
        necessary: false, // Zorunlu çerezler her zaman aktiftir.
        performance: false,
        functional: false,
        targeting: false,
      });
    
      const handleToggle = (type) => {
        setCookies((prevCookies) => ({
          ...prevCookies,
          [type]: !prevCookies[type],
        }));
      };

    const [isDropdown1Open, setIsDropdown1Open] = useState(false);
    const [isDropdown2Open, setIsDropdown2Open] = useState(false);
    const [isDropdown3Open, setIsDropdown3Open] = useState(false);
    const [isDropdown4Open, setIsDropdown4Open] = useState(false);

    useEffect(() => {
        const handleEsc = (event) => {
          if (event.key === "Escape") {
            onClose();
          }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
      }, [onClose]);


      const contents = [
        // third button
        <div className="flex flex-col h-full w-[96%] text-start items-start justify-start overflow-y-scroll thin-scrollbar gap-[15px]">
        <div className="flex w-full py-[10] items-center justify-start gap-[14px] border-b border-[#a6a6a6] ">
          <div onClick={() => setIsDropdown1Open(!isDropdown1Open)} className="flex items-center justify-start gap-[14px] w-[82%] sm:w-[90%] md:w-[76vw] lg:w-[530px]">
          <div
            className="flex items-center cursor-pointer transition-transform duration-300"
            
          >
            <DropdownCookieArrow
              className={`w-[25px] h-[26px] transform transition-transform duration-300 ${
                isDropdown1Open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
  
          <h4 className="text-[16px] font-medium leading-[26.667px] ">
            Strictly Necessary
          </h4>
          </div>
          <div
            className={`w-[32px] h-[20px] flex items-center cursor-pointer rounded-full transition-colors duration-300  ${
              cookies.analytics ? "bg-[#439150]" : "bg-[#676766]"
            }`}
            onClick={() => handleToggle("analytics")}
          >
            <div
              className={`w-[14px] h-[14px] bg-white rounded-full transition-transform duration-300 ${
                cookies.analytics ? "translate-x-[14px]" : "translate-x-1"
              }`}
            />
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isDropdown1Open
              ? "max-h-[200px] opacity-100 py-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-[#FFF] text-[13px] font-jost leading-[150%] w-[92%] h-auto">
            Bu çerezler, web sitesinin işlev görebilmesi için gereklidir ve
            sistemlerimizde kapatılamazlar. Genellikle yalnızca gizlilik
            tercihlerinizi belirleme, oturum açma veya formları doldurma gibi
            sizin tarafınızdan yapılan hizmet talebi niteliğindeki eylemlere yanıt
            olarak ayarlanırlar. Bu çerezler kişisel olarak tanımlanabilir
            bilgileri saklamaz.
          </p>
        </div>
  
        {/* 2.toggle */}
        <div className="flex w-full py-[10] items-center justify-start gap-[14px] border-b border-[#a6a6a6]">
          <div  onClick={() => setIsDropdown2Open(!isDropdown2Open)} className="flex items-center justify-start gap-[14px] w-[82%] sm:w-[90%] md:w-[76vw] lg:w-[530px]">
          <div
            className="flex items-center cursor-pointer transition-transform duration-300"
           
          >
            <DropdownCookieArrow
              className={`w-[25px] h-[26px] transform transition-transform duration-300 ${
                isDropdown2Open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
  
          <h4 className="text-[16px] font-medium leading-[26.667px] w-[73%] sm:w-[84%] md:w-[71vw] lg:w-[498px]">
            Performance
          </h4>
          </div>
          <div
            className={`w-[32px] h-[20px] flex items-center cursor-pointer rounded-full transition-colors duration-300 ${
              cookies.performance ? "bg-[#439150]" : "bg-[#676766]"
            }`}
            onClick={() => handleToggle("performance")}
          >
            <div
              className={`w-[14px] h-[14px] bg-white rounded-full transition-transform duration-300 ${
                cookies.performance ? "translate-x-[14px]" : "translate-x-1"
              }`}
            />
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isDropdown2Open
              ? "max-h-[200px] opacity-100 py-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-[#FFF] text-[13px] font-jost leading-[150%]">
            Bu çerezler, web sitesinin işlev görebilmesi için gereklidir ve
            sistemlerimizde kapatılamazlar. Genellikle yalnızca gizlilik
            tercihlerinizi belirleme, oturum açma veya formları doldurma gibi
            sizin tarafınızdan yapılan hizmet talebi niteliğindeki eylemlere yanıt
            olarak ayarlanırlar. Bu çerezler kişisel olarak tanımlanabilir
            bilgileri saklamaz.
          </p>
        </div>
  
        {/* 3.toggle */}
        <div className="flex w-full py-[10] items-center justify-start gap-[14px] border-b border-[#a6a6a6]">
          <div
            className="flex items-center cursor-pointer transition-transform duration-300"
            onClick={() => setIsDropdown3Open(!isDropdown3Open)}
          >
            <DropdownCookieArrow
              className={`w-[25px] h-[26px] transform transition-transform duration-300 ${
                isDropdown3Open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
  
          <h4 className="text-[16px] font-medium leading-[26.667px] w-[73%] sm:w-[84%] md:w-[71vw] lg:w-[498px]">
            Functional
          </h4>
          <div
            className={`w-[32px] h-[20px] flex items-center cursor-pointer rounded-full transition-colors duration-300 ${
              cookies.functional ? "bg-[#439150]" : "bg-[#676766]"
            }`}
            onClick={() => handleToggle("functional")}
          >
            <div
              className={`w-[14px] h-[14px] bg-white rounded-full transition-transform duration-300 ${
                cookies.functional ? "translate-x-[14px]" : "translate-x-1"
              }`}
            />
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isDropdown3Open
              ? "max-h-[200px] opacity-100 py-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-[#FFF] text-[13px] font-jost leading-[150%]">
            Bu çerezler, web sitesinin işlev görebilmesi için gereklidir ve
            sistemlerimizde kapatılamazlar. Genellikle yalnızca gizlilik
            tercihlerinizi belirleme, oturum açma veya formları doldurma gibi
            sizin tarafınızdan yapılan hizmet talebi niteliğindeki eylemlere yanıt
            olarak ayarlanırlar. Bu çerezler kişisel olarak tanımlanabilir
            bilgileri saklamaz.
          </p>
        </div>
  
        {/* 4.toggle */}
        <div className="flex w-full py-[10] items-center justify-start gap-[14px] border-b border-[#a6a6a6]">
          <div
            className="flex items-center cursor-pointer transition-transform duration-300"
            onClick={() => setIsDropdown4Open(!isDropdown4Open)}
          >
            <DropdownCookieArrow
              className={`w-[25px] h-[26px] transform transition-transform duration-300 ${
                isDropdown4Open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
  
          <h4 className="text-[16px] font-medium leading-[26.667px] w-[73%] sm:w-[84%] md:w-[71vw] lg:w-[498px]">
            Targeting
          </h4>
          <div
            className={`w-[32px] h-[20px] flex items-center cursor-pointer rounded-full transition-colors duration-300 ${
              cookies.targeting ? "bg-[#439150]" : "bg-[#676766]"
            }`}
            onClick={() => handleToggle("targeting")}
          >
            <div
              className={`w-[14px] h-[14px] bg-white rounded-full transition-transform duration-300 ${
                cookies.targeting ? "translate-x-[14px]" : "translate-x-1"
              }`}
            />
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isDropdown4Open
              ? "max-h-[200px] opacity-100 py-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-[#FFF] text-[13px] font-jost leading-[150%]">
            Bu çerezler, web sitesinin işlev görebilmesi için gereklidir ve
            sistemlerimizde kapatılamazlar. Genellikle yalnızca gizlilik
            tercihlerinizi belirleme, oturum açma veya formları doldurma gibi
            sizin tarafınızdan yapılan hizmet talebi niteliğindeki eylemlere yanıt
            olarak ayarlanırlar. Bu çerezler kişisel olarak tanımlanabilir
            bilgileri saklamaz.
          </p>
        </div>
      </div>,

    <div className="flex flex-col h-full w-[91%] sm:w-[95%] lg:w-[99%] text-start text-[#FBFBFB] overflow-y-scroll overflow-x-hidden z-[9999] font-jost thin-scrollbar">
      <p className="text-[13px] font-normal leading-[19.5px] pr-[4%] lg:pr-[7.5%]">
        Veri Sorumlusunun Kimliği: Cebeci Global Turizm Ticaret Anonim Şirketi –
        Adres: (Sorgun mah. Titreyengöl mevkii No:26 Manavgat Antalya) ve
        bünyesinde bulunan Lago Hotel olarak, ulusal veri koruma kanunumuz 6698
        Sayılı Kişisel Verilerin Korunması Kanunu madde 10 gereğince, doğan
        aydınlatma yükümlülüğümüzü yerine getirmek için kişisel verileriniz
        hakkında yerinde bilgilendirme yapmak isteriz. İnternet sitemizin
        kullanımını daha basit bir hale getirmek, internet sitemizde sizin ve
        kurumumuzun hukuki ve ticari güvenliğinin sağlamak, internet sitemiz
        üzerinden yeni özellikler sunmak ve içeriğimizle etkileşim yolunuzu daha
        iyi tanımlamak ve internet sitemizin kullanımını kişiselleştirmek
        amacıyla çerezler kullanmaktayız. İnternet sitemizde neden çerez
        kullanıldığı, çerezleri kontrol etmeniz isteğinizin olması durumunda
        size yardımcı olmak istiyoruz. Birçok internet tarayıcısı çerezleri
        desteklemektedir; kullanıcılar tarayıcılarını çerez türlerine ya da özel
        çerezleri reddedecek ayarlamaları yapmakta özgürdürler. Çerezlerin
        kullanımına ilişkin tercihlerinizi değiştirmek, çerezleri engellemek ya
        da silmek için tarayıcınızın ayarlarını değiştirmek yeterli olacaktır.
        Önemle belirtmek gerekir ki, çerezlerin kullanımı red edildiği takdirde
        internet sitesinin bazı işlevleri tam olarak etkilerini göstermeyebilir.
        Çerezler hakkında daha fazla bilgi için, “www.allaboutcookies.org”
        adresini ziyaret edebilirsiniz. Veri Sorumlusu: Cebeci Global Turizm
        Ticaret Anonim Şirketi bünyesinde bulunan Lago Hotel veri sorumlusudur.
        Siz değerli kullanıcılarımız dilediğiniz zaman cihazlarınızdaki program
        ve/veya işletim sistemi ve/veya internet tarayıcısının ayarlarından
        çerezleri düzenleyip kaldırabilirsiniz buna ek olarak anlık bildirimleri
        durdurabilirsiniz. ( Bu durumda web sitemizden istediğiniz verimi
        alamayabilir ve anlık bildirimlerden haberdar olamayacağınızı
        hatırlatırız. ) Cebeci Global Turizm Ticaret Anonim Şirketi olarak,
        internet sitemizde kullandığımız çerezlerin tür ve fonksiyonları
        değiştirebilir, farklı çerez türleri ekleyebilir ya da çerezleri
        kullanmaktan vazgeçebiliriz. İş bu “ Çerez Aydınlatma Metni” üzerinde
        dilediğimiz zaman değişiklik yapma hakkını saklı tutmaktayız. Güncel
        aydınlatma metnimiz üzerinde gerçekleştirilen her türlü değişiklik
        internet sitemizde ya da herhangi bir kamuya açık mecrada yayınlanmasını
        takriben yürürlük kazanacaktır. Güncel çerez aydınlatma metnimiz için,
        belirli periyotlarla bu sayfayı kontrol etmenizi öneririz. Çerezler, web
        sitemizi ziyaretinizin ve buradaki deneyiminizin stabil bir şekilde
        gerçekleştirilmesinin ve bir sonraki kullanımınızda bilgilerinizin
        hatırlanmasının sağlanması, sitenin işleyişinin ve içeriğinin
        geliştirilmesi, site kullanımlarının istatistiksel olarak
        değerlendirilmesi, sitede yer alan içeriğin sizin ve cihazınız için en
        etkili şekilde sunulması ile kullanıcılara tercih ve kullanım
        alışkanlıkları doğrultusunda özelleştirilmiş hizmetler ve reklamlar
        sunulması amaçlarıyla kullanılmaktadır. Çerezler kullanım amaçları ve
        fonksiyonlarına göre çeşitli kategorilere ayrılmaktadır Cebeci Global
        Turizm Ticaret Anonim Şirketi olarak, tarafından kullanılan çerezler;
        Aşağıda kategorilerine göre web sitemizde kullanılan çerezler ile ilgili
        çerezleri sağlayanlar, çerezler ile kullanım amaçlarına ve hukuki
        sebeplerine yer verilmiştir: Zorunlu Çerezler: Web sitesinin kullanımı
        ve işlevselliği için elzem olan çerezlerdir. Bu çerezler devre dışı
        bırakıldığında, web sitesinin tamamına veya bir kısmına erişim mümkün
        olmayabilir. Zorunlu çerezler aracılığıyla işlenen kişisel veriler, ürün
        ve hizmetlerin sunulabilmesi ve mevzuata uygun şekilde faaliyetlerin
        yürütülmesi için gereklidir. Bu nedenle, KVKK Madde 5/2e hükümleri
        gereğince bir hakkın tesis edilmesi, kullanılması veya korunması
        amacıyla zorunlu veri işleme gerekliliği olduğunda bu çerezler
        kullanılmaktadır. Pazarlama Çerezleri Pazarlama amaçlı çerezler ile
        internet ortamında kullanıcıların çevrim içi hareketleri takip edilerek
        kişisel ilgi alanlarının saptanıp bu ilgi alanlarına yönelik internet
        ortamında kullanıcılara reklam gösterilmesi hedeflenen çerezlerdir.
        Kullanıcıların ilgi alanlarına göre reklam ve kampanyaların sunulması,
        pazarlama çalışmalarının etkinliğinin ölçülmesi amacıyla kullanılan
        çerezlerdir. Pazarlama çerezleri aracılığıyla işlenen kişisel veriler,
        ürün ve hizmetlerin pazarlama süreçlerinin yönetilmesi, pazarlama analiz
        çalışmalarının yürütülmesi, reklam, kampanya ve promosyon süreçlerinin
        yönetilmesi amacıyla KVKK Madde 5/1 ve Madde 9/1 hükümleri gereğince
        açık rızanız alınarak işlenmektedir. Bu veriler, uluslararası çerez
        sağlayıcılarıyla paylaşılmaktadır, ancak açık bir şekilde belirtmek
        gerekirse, bu bilgilerin korunması ve gizliliği önemlidir. Analitik
        Çerezler İnternet sitelerinde, kullanıcı davranışlarını analiz etmek
        amacıyla kullanılan çerezlerdir. Bu çerezler, genellikle web sitesinin
        iyileştirilmesine yardımcı olmak için kullanılır ve bu kapsamda
        reklamların kullanıcılar üzerindeki etkisinin ölçülmesi de dahil
        edilebilir. Analitik çerezler, kullanıcıların web sitesini nasıl
        kullandıkları hakkında bilgi toplamak amacıyla kullanılır. Bu tür
        çerezler, kullanıcı deneyimini geliştirmeyi amaçlar ve kullanıcıların
        hangi sayfaları ziyaret ettikleri, hangi sayfalara tıkladıkları,
        sayfaları nasıl kaydırdıkları ve hangi saatlerde siteyi ziyaret
        ettikleri gibi bilgileri toplar. Analitik çerezler aracılığıyla işlenen
        kişisel veriler, pazarlama analiz çalışmalarının yürütülmesi, ziyaretçi
        kayıtlarının oluşturulması ve takip edilmesi gibi amaçlarla KVKK Madde
        5/1 ve Madde 9/1 hükümleri gereğince açık rızanız alınarak işlenir ve bu
        veriler yurt dışındaki çerez sağlayıcılarıyla paylaşılabilir. Zorunlu
        ÇerezlerWeb sitesinin kullanımı ve işlevselliği için elzem olan
        çerezlerdir. Bu çerezler devre dışı bırakıldığında, web sitesinin
        tamamına veya bir kısmına erişim mümkün olmayabilir. Zorunlu çerezler
        aracılığıyla işlenen kişisel veriler, ürün ve hizmetlerin sunulabilmesi
        ve mevzuata uygun şekilde faaliyetlerin yürütülmesi için gereklidir. Bu
        nedenle, KVKK Madde 5/2e hükümleri gereğince bir hakkın tesis edilmesi,
        kullanılması veya korunması amacıyla zorunlu veri işleme gerekliliği
        olduğunda bu çerezler kullanılmaktadır. Web sitemizde kullanılan zorunlu
        çerezlerin sağlayıcıları ve kullanım amaçları aşağıda belirtilmiştir: 2.
        Pazarlama Çerezleri   Pazarlama amaçlı çerezler ile internet ortamında
        kullanıcıların çevrim içi hareketleri takip edilerek kişisel ilgi
        alanlarının saptanıp bu ilgi alanlarına yönelik internet ortamında
        kullanıcılara reklam gösterilmesi hedeflenen çerezlerdir. Kullanıcıların
        ilgi alanlarına göre reklam ve kampanyaların sunulması, pazarlama
        çalışmalarının etkinliğinin ölçülmesi amacıyla kullanılan çerezlerdir.
        Pazarlama çerezleri aracılığıyla işlenen kişisel veriler, ürün ve
        hizmetlerin pazarlama süreçlerinin yönetilmesi, pazarlama analiz
        çalışmalarının yürütülmesi, reklam, kampanya ve promosyon süreçlerinin
        yönetilmesi amacıyla KVKK Madde 5/1 ve Madde 9/1 hükümleri gereğince
        açık rızanız alınarak işlenmektedir. Bu veriler, uluslararası çerez
        sağlayıcılarıyla paylaşılmaktadır, ancak açık bir şekilde belirtmek
        gerekirse, bu bilgilerin korunması ve gizliliği önemlidir. Web sitemizde
        kullanılan pazarlama çerezlerinin sağlayıcıları ve kullanım amaçları
        aşağıda belirtilmiştir: Analitik Çerezler İnternet sitelerinde,
        kullanıcı davranışlarını analiz etmek amacıyla kullanılan çerezlerdir.
        Bu çerezler, genellikle web sitesinin iyileştirilmesine yardımcı olmak
        için kullanılır ve bu kapsamda reklamların kullanıcılar üzerindeki
        etkisinin ölçülmesi de dahil edilebilir. Analitik çerezler,
        kullanıcıların web sitesini nasıl kullandıkları hakkında bilgi toplamak
        amacıyla kullanılır. Bu tür çerezler, kullanıcı deneyimini geliştirmeyi
        amaçlar ve kullanıcıların hangi sayfaları ziyaret ettikleri, hangi
        sayfalara tıkladıkları, sayfaları nasıl kaydırdıkları ve hangi saatlerde
        siteyi ziyaret ettikleri gibi bilgileri toplar. Analitik çerezler
        aracılığıyla işlenen kişisel veriler, pazarlama analiz çalışmalarının
        yürütülmesi, ziyaretçi kayıtlarının oluşturulması ve takip edilmesi gibi
        amaçlarla KVKK Madde 5/1 ve Madde 9/1 hükümleri gereğince açık rızanız
        alınarak işlenir ve bu veriler yurt dışındaki çerez sağlayıcılarıyla
        paylaşılabilir. Web sitemizde kullanılan analitik çerezler,
        sağlayıcıları ve kullanım amaçları aşağıda belirtilmiştir: Fonksiyonel
        Çerezler İnternet sitemizdeki sistemlerin düzgün işleyişine yardımcı
        olmak adına kullanılan çerezlerdir. Web sitemizden yapılan üçüncü taraf
        yönlendirmeler aşağıda belirtilmiştir: Lago Hotel rezarvasyon linkimiz” 
        lagohotel.hotelagent.com Lago Hotel için TripAdvisor yorum sayfası 
        https://www.tripadvisor.com.tr/Hotel_Review-g1192102-d545626-Reviews-Lago_Hotel-Sorgun_Manavgat_Turkish_Mediterranean_Coast.html
        Lago Hotel için Holidaycheck yorum sayfası 
        https://www.holidaycheck.de/hi/lago-hotel/2e44d958-7e5e-4423-92b2-84bb298826b0
        Lago Hotel için TopHotels yorum sayfası 
        https://tophotels.ru/hotel/al24898 Lago Hotel Facebook sayfası 
        https://www.facebook.com/lagohotels Lago Hotel İnstagram sayfası 
        https://www.instagram.com/lagohotels/ Lago Hotel Youtube
        sayfası https://www.youtube.com/channel/UCjbL19l36uYQEdy2EEw1nLQ  Diğer
        internet sitelerine bağlantılar İnternet sitemizdeki içerikler üçüncü
        taraflara ait internet sitelerine bağlantılar içerebilir ve bu internet
        siteleri için, ilgili internet sitelerinin ve tüzel kişiliklerin veri
        koruma düzenlemeleri geçerli olup, şirketimizin düzenlemeleri geçerli
        değildir. Bu internet sitelerine ilişkin hiçbir sorumluluk kabul
        etmiyoruz. Üçüncü kişilere ait internet siteleriyle verilerinizi
        paylaşmadan önce onların veri koruma düzenlemelerine ilişkin yasal
        dökümanları okumalısınız. İşlem Güvenliği Kişisel verilerin korunması ve
        yetkisiz erişimin önlenmesi Cebeci Global Turizm Ticaret Anonim
        Şirketi bünyesinde bulunan Lago Hotel tarafından son derece ciddi bir
        şekilde ele alınmaktadır. Misafirlerimizin ve potansiyel misafir 
        mağduriyet yaşamaması için gerekli teknik ve idari tedbirler titizlikle
        uygulanmaktadır. Bu tedbirler, yazılımların endüstri standartlarına
        uygunluğunu sağlamak, üçüncü tarafları dikkatle seçmek ve şirket içinde
        veri koruma politikasına sıkı bir şekilde uymak gibi unsurları içerir.
        Güvenlik önlemleri sürekli olarak gözden geçirilmekte ve
        iyileştirilmektedir. Sitemizi ziyaretinizle birlikte birtakım kişisel
        verileriniz çerezler dışında başka tanımlayıcılar aracılığıyla da
        işlenmektedir. Aşağıda sitemizde gezinme sürecinde işlenen kişisel
        verileriniz, verilerin işleme amaçları ve kanuni gerekçeleri hakkında
        detaylı bilgilendirileceksiniz. Sitemizde tüm gezinme süreçleri başlık
        halinde belirtilmiş olup, belirtilen süreçler içerisinde yer almanız
        durumunda ilgili başlığın alt kısmını okuyup doğrudan süreçler hakkında
        bilgi sahibi olabilirsiniz. Çerezler aracılığıyla elde edilen kişisel
        verilerinize; Kişisel verilerinizin işlenip işlenmediğini öğrenme, (b)
        Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme, (c)
        Kişisel verilerinizin işlenme amacını ve bunların amacına uygun
        kullanılıp kullanılmadığını öğrenme, (ç) Yurt içinde veya yurt dışında
        kişisel verilerin aktarıldığı üçüncü kişileri bilme, (d) Kişisel
        verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların
        düzeltilmesini isteme, (e) Kişisel verilerinizin işlenmesini gerektiren
        sebeplerin ortadan kalkması halinde kişisel verilerinizin silinmesini
        veya yok edilmesini isteme, (f) (d) ve (e) bentleri uyarınca yapılan
        işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini
        isteme, (g) İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla
        analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya
        çıkmasına itiraz etme, (ğ) Kişisel verilerin kanuna aykırı olarak
        işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep
        etme. Kişisel verilerinize ilişkin işbu haklarınızı VERİ SORUMLUSUNA
        BAŞVURU FORMUMUZU doldurmak suretiyle yazılı olarak ya da kayıtlı
        elektronik posta  adresi, güvenli elektronik imza, mobil imzanızı
        kullanmak suretiyle tarafımıza iletebilirsiniz. Çerezlerin Kullanımını
        Nasıl Engellersiniz? Çerezlerin kullanılması, web sitesinin daha iyi
        hizmet vermesine yardımcı olur, ancak isterseniz çerezlerin kullanımını
        engelleyebilirsiniz. Çerezleri engellemek için internet tarayıcınızın
        ayarlarını değiştirmeniz gerekmektedir. Bu ayarlar, kullandığınız cihaza
        ve tarayıcıya göre değişiklik gösterebilir. Aşağıda, çerezlerin
        kullanımını engellemek için farklı internet tarayıcıları üzerinden
        izlenmesi gereken adımlar hakkında bilgiler bulunmaktadır: Microsoft
        EdgeMicrosoft Edge tarayıcınızın sağ üst köşesinde bulunan üç nokta
        simgesine tıklayın ve Ayarlar’a gidin.2.    Temizlenecek Öğeleri Seç
        seçeneğine tıklayın ve temizlemek istediğiniz bölümleri seçin.3.  
         Seçiminizi yaparak temizleme işlemine başlayabilirsiniz. Google
        ChromeBilgisayarınızda Chrome’u açın.2.    Sağ üst köşede bulunan Diğer
        Ayarlar’ı tıklayın.3.    Gelişmiş’i tıklayın.4.    “Gizlilik ve
        Güvenlik” altında İçerik Ayarları’nı seçin.5.    Çerezler’e
        tıklayın.6.    “Tüm çerezler ve site verileri” altında istediğiniz web
        sitesini bulun.7.    Sitenin yanındaki Kaldır simgesine tıklayın.
        Mozilla Firefox Firefox Menü düğmesine tıklayın ve Seçenekler’i
        seçin.2.    Gizlilik ve Güvenlik bölümünü seçin, ardından Geçmiş
        bölümüne gidin.3.    “Firefox, geçmiş için özel ayarları kullan”
        seçeneğini işaretleyin.4.    Çerezleri göster… düğmesine tıklayın.5.  
         Arama: alanına, silmek istediğiniz web sitesinin adını yazın.6.  
         Silmek istediğiniz çerezleri seçin ve Seçilenleri Sil’e tıklayın.7.  
         Çerezler penceresini kapatın ve ardından about:preferences sayfasını
        kapatın. SafariSafari Tercihler’i seçin.2.    Gizlilik öğesini
        tıklayın.3.    Web Sitesi Verilerini tıklayın.4.    Bir veya daha fazla
        web sitesi seçin ve sonra Sil veya Tümünü Sil’e tıklayın. Internet
        ExplorerBilgisayarınızın masaüstünde Internet Explorer simgesine
        tıklayın.2.    Araçlar düğmesine ve ardından İnternet Seçenekleri’ne
        tıklayın.3.    Gizlilik sekmesine tıklayın, sonra tüm tanımlama
        bilgilerini engellemek için Ayarlar altında bulunan kaydırıcıyı yukarıya
        çekin ve Tamam düğmesine tıklayın.
      </p>
    </div>,

    // second text
    <div className="flex flex-col h-full w-full text-start items-start justify-start">
      <p className="text-[13px] font-normal leading-[150%]">
        Web sitemizi ziyaret ettiğinizde, çoğunlukla çerezler şeklinde
        tarayıcınızda bilgi depolanabilir veya alınabilir. Bu bilgiler sizin,
        tercihleriniz veya cihazınız hakkında olabilir ve genellikle siteyi
        beklediğiniz gibi çalıştırmak için kullanılır. Bilgiler genellikle sizi
        doğrudan tanımlamaz, ancak size daha kişiselleştirilmiş bir web deneyimi
        sunabilir. Gizlilik hakkınıza saygı duyduğumuz için, bazı çerez
        türlerini kabul etmemeyi tercih edebilirsiniz. Tercihlerinizi yönetmek
        ve daha fazla bilgi edinmek için farklı kategori başlıklarına tıklayın.
        Lütfen unutmayın, bazı çerez türlerini engellemek sitenin ve
        sunabileceğimiz hizmetlerin deneyiminizi etkileyebilir.
      </p>
    </div>,


  ];


    if (!isOpen) return null; 

      // ESC tuşuna basılınca kapansın

  return (
    <div className='w-screen h-screen flex bg-gray-400 relative'>
    
              <div
                className="flex fixed h-screen w-screen z-[9999]"
                onClick={onClose}
              >
                <div
                  className="flex flex-col w-full h-screen bg-[rgba(29,29,27,0.60)] backdrop-blur-[10px] items-center justify-start z-[9999] lg:w-[715px] lg:h-[621px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex w-[80%] lg:w-[90%] items-start justify-between lg:mt-[27px] lg:gap-[23px] mt-[24%] md:mt-[83px] lg:h-[39px] h-[52px]">
                    <Image
                      src={logosvg}
                      alt="Logo"
                      className="object-contain w-[62px] h-[46px] lg:h-[39px] lg:w-[52px] items-center justify-center"
                    />
                    <div className="hidden lg:flex flex-row w-[98%] md:w-[90%] lg:w-auto text-center items-center text-[16px] font-bold ml-[11%] lg:ml-0 gap-[23px] h-[29px]">
                        {[
                           "Cookie Policy",
                          "Cookie Clarification Text",
                          "What Are Cookies?"
                        ].map((buttonLabel, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedContent(index)}
                            className={
                              selectedContent === index
                                ? "text-white text-[16px] font-jost leading-normal font-medium w-[60%] max-w-[191px] cursor-pointer p-[10px] border-b  whitespace-nowrap  items-start justify-start text-start underline] h-[48px] lg:h-[37px]"
                                : " text-[16px] font-jost leading-normal font-medium text-[#A6A6A6] whitespace-nowrap cursor-pointer p-[10px] border-none items-start justify-start text-start h-[48px] lg:h-[37px]"
                            }
                          >
                            {buttonLabel}
                          </button>
                        ))}
                      </div>
                    <button
                      className="flex text-[40px] text-stoneLight text-white items-center justify-center h-full"
                      onClick={onClose}
                    >
                     <RxCross2 size={24} color="#fff"/>
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 items-center justify-center pb-2 lg:pb-0 md:h-[90%] text-[#FBFBFB] max-w-screen lg:mt-[36px] h-auto">
                    <div className="flex flex-col w-[90%] lg:w-[100%] justify-center items-center lg:items-start lg:justify-start gap-[14.5px] lg:gap-[15px] ">
                      <div className="flex flex-row lg:hidden text-start text-[16px] font-bold gap-[10px] w-[85%] lg:mb-[36px] items-center justify-start overflow-x-auto scrollbar-thin ">
                        {[
                           "Cookie Policy",
                          "Cookie Clarification Text",
                          "What Are Cookies?",
                         
                        ].map((buttonLabel, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedContent(index)}
                            className={
                              selectedContent === index
                                ? "text-white text-[16px] font-jost leading-normal font-medium w-fit cursor-pointer p-[10px] border-b  whitespace-nowrap  items-start justify-start text-start h-[48px] lg:h-[37px] underline]"
                                : " text-[16px] font-jost leading-normal font-medium text-[#A6A6A6] whitespace-nowrap cursor-pointer p-[10px] border-none items-start justify-start text-start h-[48px] lg:h-[37px] w-fit "
                            }
                          >
                            {buttonLabel}
                          </button>
                        ))}
                      </div>

                       {/* Dinamik Başlık */}
                       <button className="hidden lg:flex text-[16px] font-medium text-[#FBFBFB] font-jost leading-normal border-b border-[#FBFBFB] ml-[8%] lg:ml-[7%]">
                          {
                            ["Cookie Policy",
                              "Cookie Clarification Text",
                              "What Are Cookies?",
                              
                            ][selectedContent]
                          }
                        </button>
                        
                      <div className="flex flex-col w-[92vw] h-[58vh] md:h-[55vh] lg:h-[376px] lg:w-[85%] ml-[4%] lg:ml-[7%] mt-[2vw] lg:mt-0 items-start justify-start text-start ">
                        {/* Dinamik Başlık */}
                        {/* İçerik */}
                        {contents[selectedContent]}
                      </div>
                      <div className="hidden lg:flex items-center justify-center w-[100%] gap-[13px] lg:gap-[37px] mb-[20px] lg:mt-[21.5px] lg:mb-6">
                        <button className="text-[14px] uppercase font-medium leading-normal text-[#FBFBFB] px-[20px] py-[10px] border border-[#FBFBFB] whitespace-nowrap max-w-[170px]">
                          Deny All Cookies
                        </button>
                        <button className="text-[14px] uppercase font-medium leading-normal text-[#FBFBFB] px-[20px] py-[10px] border border-[#FBFBFB] whitespace-nowrap max-w-[184px]">
                          Accept All Cookies
                        </button>
                      </div>

                      <div className="absolute bottom-[4%] sm:bottom-[8%] flex lg:hidden items-center justify-center w-[100%] gap-[13px] ">
                        <button className="text-[14px] uppercase font-medium leading-normal text-[#FBFBFB] px-[20px] py-[10px] border border-[#FBFBFB] whitespace-nowrap max-w-[170px]">
                          Deny All Cookies
                        </button>
                        <button className="text-[14px] uppercase font-medium leading-normal text-[#FBFBFB] px-[20px] py-[10px] border border-[#FBFBFB] whitespace-nowrap max-w-[184px]">
                          Accept All Cookies
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
         
    </div>
  )
}

export default Cookie2
