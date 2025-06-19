"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DropdownCookieArrow from "./Contact/icons/DropdownCookieArrow";
import logosvg from "./Header/Icons/Asset2.svg";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import {useTranslations} from 'next-intl';

// ModalPortal Componenti: Modal içeriği body içerisine taşır.
const ModalPortal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 h-screen w-screen z-[9999] flex items-center justify-center "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full h-screen lg:w-[715px] lg:h-[651px] bg-[rgba(29,29,27,0.70)] backdrop-blur-[10px]"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const CookiePopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
    // hasMounted state'i ekliyoruz
    const [hasMounted, setHasMounted] = useState(false);

    const t = useTranslations('CookiePopup');

  const buttonsData = [
    { id: 0, label: t("policy") },
    { id: 1, label: t("clarification") },
    { id: 2, label: t("what") },
  ];

  const [selectedContent, setSelectedContent] = React.useState(0);

  // Aktif butonu listenin başına alacak şekilde yeniden sıralama
  const orderedButtons = [
    buttonsData.find((btn) => btn.id === selectedContent),
    ...buttonsData.filter((btn) => btn.id !== selectedContent),
  ];

  const [cookies, setCookies] = useState({
    necessary: true, // Zorunlu çerezler her zaman aktiftir.
    performance: false,
    functional: false,
    targeting: false,
  });


    // Sayfa yüklendiğinde tercihleri yükle
    useEffect(() => {
      setHasMounted(true);
      const savedPreferences = loadPreferences();
      if (savedPreferences) {
        // Tercihler kaydedilmişse popup'ı gösterme
        setIsVisible(false);
      } else {
        // Tercihler kaydedilmemişse popup'ı göster
        setIsVisible(true);
      }
    }, []);
  
    // Tercihleri kaydet ve popup'ı kapat
    const handleConfirm = () => {
      savePreferences(cookies);
      console.log("Kullanıcı Tercihleri Onaylandı:", cookies);
      setIsVisible(false);
    };

        // Tüm çerezleri kabul et ve popup'ı kapat
        const handleAcceptAll = () => {
          const allAccepted = {
            necessary: true,
            performance: true,
            functional: true,
            targeting: true,
          };
          setCookies(allAccepted);
          savePreferences(allAccepted);
          console.log("Tüm Çerezler Kabul Edildi:", allAccepted);
          setIsVisible(false);
        };
      
        // Tüm çerezleri reddet ve popup'ı kapat
        const handleDenyAll = () => {
          const allDenied = {
            necessary: true, // Zorunlu çerezler her zaman aktiftir
            performance: false,
            functional: false,
            targeting: false,
          };
          setCookies(allDenied);
          savePreferences(allDenied);
          console.log("Tüm Çerezler Reddedildi:", allDenied);
          setIsVisible(false);
        }

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

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };
  
  // Çerez silme fonksiyonu
  const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  
  // Çerez yükleme fonksiyonu
  const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };

  const savePreferences = (preferences) => {
    // Tercihleri çerez olarak kaydet
    setCookie("cookiePreferences", JSON.stringify(preferences), 365);
  
    // Konsola kaydedilen tercihleri yazdır
    console.log("Çerez Tercihleri Kaydedildi:", preferences);
  
    // Tercihlere göre çerezleri ayarla
    if (preferences.performance) {
      setCookie("performanceCookie", "active", 365);
      console.log("Performance Çerezi Aktif Edildi.");
    } else {
      deleteCookie("performanceCookie");
      console.log("Performance Çerezi Silindi.");
    }
  
    if (preferences.functional) {
      setCookie("functionalCookie", "active", 365);
      console.log("Functional Çerezi Aktif Edildi.");
    } else {
      deleteCookie("functionalCookie");
      console.log("Functional Çerezi Silindi.");
    }
  
    if (preferences.targeting) {
      setCookie("targetingCookie", "active", 365);
      console.log("Targeting Çerezi Aktif Edildi.");
    } else {
      deleteCookie("targetingCookie");
      console.log("Targeting Çerezi Silindi.");
    }
  };

  // -----------
  const loadPreferences = () => {
    const preferences = getCookie("cookiePreferences");
    if (preferences) {
      console.log("Kaydedilmiş Çerez Tercihleri Yüklendi:", JSON.parse(preferences));
      return JSON.parse(preferences);
    }
    console.log("Kaydedilmiş Çerez Tercihi Bulunamadı. Varsayılan Tercihler Kullanılıyor.");
    return null
  };
  
  

  const contents = [
    // third button
    <div className="flex flex-col h-full w-[96%] text-start font-jost items-start justify-start  gap-[7.5px] overflow-y-scroll thin-scrollbar max-h-[500px]">
      <div className="flex w-full p-[10px] items-center justify-start gap-[14px] border-b border-[#a6a6a6] pr-[2%]">
        <div
          onClick={() => setIsDropdown1Open(!isDropdown1Open)}
          className="flex items-center justify-start gap-[14px] w-[82%] sm:w-[90%] md:w-[76vw] lg:w-[530px]"
        >
          <div className="flex items-center cursor-pointer transition-transform duration-300">
            <DropdownCookieArrow
              className={`w-[25px] h-[26px] transform transition-transform duration-300 ${
                isDropdown1Open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>

          <h4 className="text-[16px] font-medium leading-[26.667px]">
           {t("dropdown1")}
          </h4>
        </div>
        <div
          className={`w-[32px] h-[20px] flex items-center cursor-pointer rounded-full transition-colors duration-300 bg-[#439150] `}
          onClick={() => handleToggle("necessary")}
        >
          <div
            className={`w-[14px] h-[14px] bg-white rounded-full transition-transform duration-300 ${
              cookies.necessary ? "translate-x-[14px]" : "translate-x-[14px]"
            }`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isDropdown1Open
            ? "max-h-[200px] min-h-[100px] opacity-100 py-[10px] ml-[5%]"
            : "max-h-0 opacity-0 ml-[5%]"
        }`}
      >
        <p className="text-[#FFF] text-[13px] font-jost leading-[150%] w-[92%] h-auto ">
          Bu çerezler, web sitesinin işlev görebilmesi için gereklidir ve
          sistemlerimizde kapatılamazlar. Genellikle yalnızca gizlilik
          tercihlerinizi belirleme, oturum açma veya formları doldurma gibi
          sizin tarafınızdan yapılan hizmet talebi niteliğindeki eylemlere yanıt
          olarak ayarlanırlar. Bu çerezler kişisel olarak tanımlanabilir
          bilgileri saklamaz.
        </p>
      </div>

      {/* 2.toggle */}
      <div className="flex w-full p-[10px] items-center justify-start gap-[14px] border-b border-[#a6a6a6] pr-[2%]">
        <div
          onClick={() => setIsDropdown2Open(!isDropdown2Open)}
          className="flex items-center justify-start gap-[14px] w-[82%] sm:w-[90%] md:w-[76vw] lg:w-[530px]"
        >
          <div className="flex items-center cursor-pointer transition-transform duration-300">
            <DropdownCookieArrow
              className={`w-[25px] h-[26px] transform transition-transform duration-300 ${
                isDropdown2Open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>

          <h4 className="text-[16px] font-medium leading-[26.667px] ">
          {t("dropdown2")}
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
            ? "max-h-[200px] min-h-[100px] opacity-100 py-[10px] ml-[5%]"
            : "max-h-0 opacity-0  ml-[5%]"
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
      <div className="flex w-full p-[10px] items-center justify-start gap-[14px] border-b border-[#a6a6a6]">
        <div
          onClick={() => setIsDropdown3Open(!isDropdown3Open)}
          className="flex items-center justify-start gap-[14px] w-[82%] sm:w-[90%] md:w-[76vw] lg:w-[530px]"
        >
          <div className="flex items-center cursor-pointer transition-transform duration-300">
            <DropdownCookieArrow
              className={`w-[25px] h-[26px] transform transition-transform duration-300 ${
                isDropdown3Open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>

          <h4 className="text-[16px] font-medium leading-[26.667px] ">
          {t("dropdown3")}
          </h4>
        </div>
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
            ? "max-h-[200px] min-h-[100px] opacity-100 py-[10px] ml-[5%]"
            : "max-h-0 opacity-0  ml-[5%]"
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
      <div className="flex w-full p-[10px] items-center justify-start gap-[14px] border-b border-[#a6a6a6]">
        <div
          onClick={() => setIsDropdown4Open(!isDropdown4Open)}
          className="flex items-center justify-start gap-[14px] w-[82%] sm:w-[90%] md:w-[76vw] lg:w-[530px]"
        >
          <div className="flex items-center cursor-pointer transition-transform duration-300">
            <DropdownCookieArrow
              className={`w-[25px] h-[26px] transform transition-transform duration-300 ${
                isDropdown4Open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>

          <h4 className="text-[16px] font-medium leading-[26.667px] ">
          {t("dropdown4")}
          </h4>
        </div>
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
            ? "max-h-[200px] min-h-[100px] opacity-100 py-[10px] ml-[5%]"
            : "max-h-0 opacity-0  ml-[5%]"
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

    <div className="flex flex-col h-full w-[96%] ml-[2%] sm:w-[95%] lg:w-[99%] text-start text-[#FBFBFB] overflow-y-scroll overflow-x-hidden z-[9999] font-jost thin-scrollbar">
      <p className="text-[13px] font-normal leading-[19.5px] pr-[3.5%] lg:pr-[7.5%]">
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
        sebeplerine yer verilmiştir: 1.Zorunlu Çerezler: Web sitesinin kullanımı
        ve işlevselliği için elzem olan çerezlerdir. Bu çerezler devre dışı
        bırakıldığında, web sitesinin tamamına veya bir kısmına erişim mümkün
        olmayabilir. Zorunlu çerezler aracılığıyla işlenen kişisel veriler, ürün
        ve hizmetlerin sunulabilmesi ve mevzuata uygun şekilde faaliyetlerin
        yürütülmesi için gereklidir. Bu nedenle, KVKK Madde 5/2e hükümleri
        gereğince bir hakkın tesis edilmesi, kullanılması veya korunması
        amacıyla zorunlu veri işleme gerekliliği olduğunda bu çerezler
        kullanılmaktadır. Web sitemizde kullanılan zorunlu çerezlerin
        sağlayıcıları ve kullanım amaçları aşağıda belirtilmiştir: 2.Pazarlama
        Çerezleri Pazarlama amaçlı çerezler ile internet ortamında
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
        gerekirse, bu bilgilerin korunması ve gizliliği önemlidir. Web sitemizde
        kullanılan pazarlama çerezlerinin sağlayıcıları ve kullanım amaçları
        aşağıda belirtilmiştir: 3. Analitik Çerezler  İnternet sitelerinde,
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
        paylaşılabilir. Zorunlu Çerezler: Web sitesinin kullanımı ve
        işlevselliği için elzem olan çerezlerdir. Bu çerezler devre dışı
        bırakıldığında, web sitesinin tamamına veya bir kısmına erişim mümkün
        olmayabilir. Zorunlu çerezler aracılığıyla işlenen kişisel veriler, ürün
        ve hizmetlerin sunulabilmesi ve mevzuata uygun şekilde faaliyetlerin
        yürütülmesi için gereklidir. Bu nedenle, KVKK Madde 5/2e hükümleri
        gereğince bir hakkın tesis edilmesi, kullanılması veya korunması
        amacıyla zorunlu veri işleme gerekliliği olduğunda bu çerezler
        kullanılmaktadır. Web sitemizde kullanılan zorunlu çerezlerin
        sağlayıcıları ve kullanım amaçları aşağıda belirtilmiştir:
        <table class="w-[90%] border-collapse my-[15px] text-[12px] overflow-x-scroll">
          <thead>
            <tr className="color-[#233038] border-[#fff]">
              <th className="border p-[2px] text-left leading-normal">
                Çerez Servis Sağlayıcısı
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez İsmi
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Açıklaması
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Tipi
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Süresi
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Kategorisi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .lagohotel.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                _gcl_au
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Google Analytics işlevselliğini desteklemek amacıyla
                kullanılmaktadır.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                3 Ay
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Zorunlu
              </th>
            </tr>
            <tr className=" color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                www.lagohotel.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                wp-wpml_current_language
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Geçerli dili saklar. Bu çerez, AJAX işlemleri için Dil
                filtreleme özelliğini kullanan sitelerde varsayılan olarak
                etkindir.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Oturum
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Zorunlu
              </th>
            </tr>
            <tr className=" color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .google.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                AEC
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                İnternette gezinme oturumundaki isteklerin başka siteler değil,
                kullanıcı tarafından yapılmasını sağlar. Bu çerezler, kötü
                amaçlı sitelerin kullanıcının bilgisi olmadan kullanıcı adına
                hareket etmesini önler.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                6 ay
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Zorunlu
              </th>
            </tr>

            <tr className=" color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .google.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                NID
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Kullanıcının son aramaları ve önceki etkileşimlerine dayalı
                olarak Google'ın kişiselleştirilmiş reklamlar sunması için
                kullanılır.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                6 ay
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Zorunlu
              </th>
            </tr>

            <tr className="color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .lagohotel.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                _ga
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Google Analytics işlevselliğini desteklemek amacıyla
                kullanılmaktadır.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                2 yıl
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Zorunlu
              </th>
            </tr>

            <tr className=" color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .lagohotel.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                _ga_*
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Google Analytics bu çerezi sayfa görüntülemelerini saklamak ve
                saymak için ayarlar.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                1 yıl
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Zorunlu
              </th>
            </tr>

            <tr className=" color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .doubleclick.net
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                test_cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Bu çerez, web sitesi ziyaretçisinin tarayıcısının çerezleri
                destekleyip desteklemediğini belirlemek için DoubleClick
                (Google'a aittir) tarafından ayarlanır.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                15 Dakika
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Zorunlu
              </th>
            </tr>

            <tr className=" color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .lagohotel.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                _ga_KXPQT1BLP9
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Google Analytics işlevselliğini desteklemek amacıyla
                kullanılmaktadır.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                24 Ay
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Zorunlu
              </th>
            </tr>

            <tr className=" color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .lagohotel.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                _ga_R5Y8HBEP1H
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Google Analytics işlevselliğini desteklemek amacıyla
                kullanılmaktadır.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                24 Ay
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Zorunlu
              </th>
            </tr>
          </tbody>
        </table>
        2.Pazarlama Çerezleri :  Pazarlama amaçlı çerezler ile internet
        ortamında kullanıcıların çevrim içi hareketleri takip edilerek kişisel
        ilgi alanlarının saptanıp bu ilgi alanlarına yönelik internet ortamında
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
        aşağıda belirtilmiştir:
        <table class="w-[90%] border-collapse my-[15px] text-[12px] overflow-x-scroll">
          <thead>
            <tr className="color-[#233038] border-[#fff]">
              <th className="border p-[2px] text-left leading-normal">
                Çerez Servis Sağlayıcısı
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez İsmi
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Açıklaması
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Tipi
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Süresi
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Kategorisi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .lagohotel.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                _fbp
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Facebook, bu çerezi, web sitesini ziyaret ettikten sonra
                Facebook’ta veya Facebook reklamcılığı tarafından desteklenen
                bir dijital platformda reklam görüntülemek üzere ayarlar.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                3 Ay
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Pazarlama
              </th>
            </tr>
          </tbody>
        </table>
        3.Analitik Çerezler İnternet sitelerinde, kullanıcı davranışlarını
        analiz etmek amacıyla kullanılan çerezlerdir. Bu çerezler, genellikle
        web sitesinin iyileştirilmesine yardımcı olmak için kullanılır ve bu
        kapsamda reklamların kullanıcılar üzerindeki etkisinin ölçülmesi de
        dahil edilebilir. Analitik çerezler, kullanıcıların web sitesini nasıl
        kullandıkları hakkında bilgi toplamak amacıyla kullanılır. Bu tür
        çerezler, kullanıcı deneyimini geliştirmeyi amaçlar ve kullanıcıların
        hangi sayfaları ziyaret ettikleri, hangi sayfalara tıkladıkları,
        sayfaları nasıl kaydırdıkları ve hangi saatlerde siteyi ziyaret
        ettikleri gibi bilgileri toplar. Analitik çerezler aracılığıyla işlenen
        kişisel veriler, pazarlama analiz çalışmalarının yürütülmesi, ziyaretçi
        kayıtlarının oluşturulması ve takip edilmesi gibi amaçlarla KVKK Madde
        5/1 ve Madde 9/1 hükümleri gereğince açık rızanız alınarak işlenir ve bu
        veriler yurt dışındaki çerez sağlayıcılarıyla paylaşılabilir. Web
        sitemizde kullanılan analitik çerezler, sağlayıcıları ve kullanım
        amaçları aşağıda belirtilmiştir:
        <table class="w-[90%] border-collapse my-[15px] text-[12px] overflow-x-scroll">
          <thead>
            <tr className="color-[#233038] border-[#fff]">
              <th className="border p-[2px] text-left leading-normal">
                Çerez Servis Sağlayıcısı
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez İsmi
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Açıklaması
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Tipi
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Süresi
              </th>
              <th className="border p-[2px] text-left leading-normal">
                Çerez Kategorisi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="color-[#233038] font-medium">
              <th className="border p-[2px] text-left leading-normal  font-medium">
                .lagohotel.com
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                _gid
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Ziyaretçinin web sitesini nasıl kullandığına ilişkin
                istatistiksel veriler oluşturmak için kullanılan benzersiz bir
                kimlik kaydeder.
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Persistent Cookie
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                1 Gün
              </th>
              <th className="border p-[2px] text-left leading-normal  font-medium">
                Analitik
              </th>
            </tr>
          </tbody>
        </table>
        4.Fonksiyonel Çerezler İnternet sitemizdeki sistemlerin düzgün
        işleyişine yardımcı olmak adına kullanılan çerezlerdir.
        <ul className="text-[12px] font-normal leading-[21px] my-2 list-disc capsizedText4 pl-5 marker:text-xs marker:text-white ">
          Web sitemizden yapılan üçüncü taraf yönlendirmeler aşağıda
          belirtilmiştir:
          <li> Lago Hotel rezarvasyon linkimiz”  lagohotel.hotelagent.com</li>
          <li>
            Lago Hotel için TripAdvisor yorum sayfası
            https://www.tripadvisor.com.tr/Hotel_Review-g1192102-d545626-Reviews-Lago_Hotel-Sorgun_Manavgat_Turkish_Mediterranean_Coast.html
          </li>
          <li>
            Lago Hotel için Holidaycheck yorum sayfası
            https://www.holidaycheck.de/hi/lago-hotel/2e44d958-7e5e-4423-92b2-84bb298826b0
          </li>
          <li>
            Lago Hotel için TopHotels yorum sayfası
            https://tophotels.ru/hotel/al24898
          </li>
          <li>
            Lago Hotel Facebook sayfası https://www.facebook.com/lagohotels
          </li>
          <li>
            Lago Hotel İnstagram sayfası https://www.instagram.com/lagohotels/
          </li>
          <li>
            Lago Hotel Youtube sayfası
            https://www.youtube.com/channel/UCjbL19l36uYQEdy2EEw1nLQ{" "}
          </li>
        </ul>
        Diğer internet sitelerine bağlantılar <br />
        İnternet sitemizdeki içerikler üçüncü taraflara ait internet sitelerine
        bağlantılar içerebilir ve bu internet siteleri için, ilgili internet
        sitelerinin ve tüzel kişiliklerin veri koruma düzenlemeleri geçerli
        olup, şirketimizin düzenlemeleri geçerli değildir. Bu internet
        sitelerine ilişkin hiçbir sorumluluk kabul etmiyoruz. Üçüncü kişilere
        ait internet siteleriyle verilerinizi paylaşmadan önce onların veri
        koruma düzenlemelerine ilişkin yasal dökümanları okumalısınız. <br />
        İşlem Güvenliği
        <br />
        Kişisel verilerin korunması ve yetkisiz erişimin önlenmesi Cebeci Global
        Turizm Ticaret Anonim Şirketi bünyesinde bulunan Lago Hotel tarafından
        son derece ciddi bir şekilde ele alınmaktadır. Misafirlerimizin ve
        potansiyel misafir  mağduriyet yaşamaması için gerekli teknik ve idari
        tedbirler titizlikle uygulanmaktadır. Bu tedbirler, yazılımların
        endüstri standartlarına uygunluğunu sağlamak, üçüncü tarafları dikkatle
        seçmek ve şirket içinde veri koruma politikasına sıkı bir şekilde uymak
        gibi unsurları içerir. Güvenlik önlemleri sürekli olarak gözden
        geçirilmekte ve iyileştirilmektedir.
        <br /> Sitemizi ziyaretinizle birlikte birtakım kişisel verileriniz
        çerezler dışında başka tanımlayıcılar aracılığıyla da işlenmektedir.
        Aşağıda sitemizde gezinme sürecinde işlenen kişisel verileriniz,
        verilerin işleme amaçları ve kanuni gerekçeleri hakkında detaylı
        bilgilendirileceksiniz. Sitemizde tüm gezinme süreçleri başlık halinde
        belirtilmiş olup, belirtilen süreçler içerisinde yer almanız durumunda
        ilgili başlığın alt kısmını okuyup doğrudan süreçler hakkında bilgi
        sahibi olabilirsiniz.
        <br /> Çerezler aracılığıyla elde edilen kişisel verilerinize;
        <br />
        Kişisel verilerinizin işlenip işlenmediğini öğrenme, (b) Kişisel
        verileriniz işlenmişse buna ilişkin bilgi talep etme, (c) Kişisel
        verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp
        kullanılmadığını öğrenme, (ç) Yurt içinde veya yurt dışında kişisel
        verilerin aktarıldığı üçüncü kişileri bilme, (d) Kişisel verilerinizin
        eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini
        isteme, (e) Kişisel verilerinizin işlenmesini gerektiren sebeplerin
        ortadan kalkması halinde kişisel verilerinizin silinmesini veya yok
        edilmesini isteme, (f) (d) ve (e) bentleri uyarınca yapılan işlemlerin,
        kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme, (g)
        İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz
        edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına
        itiraz etme, (ğ) Kişisel verilerin kanuna aykırı olarak işlenmesi
        sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.{" "}
        <br />
        Kişisel verilerinize ilişkin işbu haklarınızı VERİ SORUMLUSUNA BAŞVURU
        FORMUMUZU doldurmak suretiyle yazılı olarak ya da kayıtlı elektronik
        posta  adresi, güvenli elektronik imza, mobil imzanızı kullanmak
        suretiyle tarafımıza iletebilirsiniz. <br />
        Çerezlerin Kullanımını Nasıl Engellersiniz? <br />
        Çerezlerin kullanılması, web sitesinin daha iyi hizmet vermesine
        yardımcı olur, ancak isterseniz çerezlerin kullanımını
        engelleyebilirsiniz. Çerezleri engellemek için internet tarayıcınızın
        ayarlarını değiştirmeniz gerekmektedir. Bu ayarlar, kullandığınız cihaza
        ve tarayıcıya göre değişiklik gösterebilir. Aşağıda, çerezlerin
        kullanımını engellemek için farklı internet tarayıcıları üzerinden
        izlenmesi gereken adımlar hakkında bilgiler bulunmaktadır: <br />
        <ul className="text-[12px] mt-2 font-normal leading-normal list-disc capsizedText4 pl-5 marker:text-xs marker:text-white">
          <li>
            {" "}
            Microsoft Edge
            <ol className=" list-decimal list-inside">
              <li>
                Microsoft Edge tarayıcınızın sağ üst köşesinde bulunan üç nokta
                simgesine tıklayın ve Ayarlar’a gidin.
              </li>
              <li>
                {" "}
                Temizlenecek Öğeleri Seç seçeneğine tıklayın ve temizlemek
                istediğiniz bölümleri seçin.
              </li>
              <li>Seçiminizi yaparak temizleme işlemine başlayabilirsiniz.</li>
            </ol>
          </li>
          <li className="my-2">
            Google Chrome
            <ol className=" list-decimal list-inside">
              <li>Bilgisayarınızda Chrome’u açın.</li>
              <li> Sağ üst köşede bulunan Diğer Ayarlar’ı tıklayın.</li>
              <li>Gelişmiş’i tıklayın.</li>
              <li> “Gizlilik ve Güvenlik” altında İçerik Ayarları’nı seçin.</li>
              <li> Çerezler’e tıklayın.</li>
              <li>
                “Tüm çerezler ve site verileri” altında istediğiniz web sitesini
                bulun.
              </li>
              <li>Sitenin yanındaki Kaldır simgesine tıklayın.</li>
            </ol>
          </li>
          <li className="my-2">
            Mozilla Firefox
            <ol className=" list-decimal list-inside">
              <li>Firefox Menü düğmesine tıklayın ve Seçenekler’i seçin.</li>
              <li>
                Gizlilik ve Güvenlik bölümünü seçin, ardından Geçmiş bölümüne
                gidin.
              </li>
              <li>
                {" "}
                “Firefox, geçmiş için özel ayarları kullan” seçeneğini
                işaretleyin.
              </li>
              <li> Çerezleri göster… düğmesine tıklayın.</li>
              <li>
                {" "}
                Arama: alanına, silmek istediğiniz web sitesinin adını yazın.
              </li>
              <li>
                {" "}
                Silmek istediğiniz çerezleri seçin ve Seçilenleri Sil’e
                tıklayın.
              </li>
              <li>
                {" "}
                Çerezler penceresini kapatın ve ardından about:preferences
                sayfasını kapatın.
              </li>
            </ol>
          </li>
          <li className="my-2">
            Safari
            <ol className=" list-decimal list-inside">
              <li>Safari Tercihler’i seçin.</li>
              <li>Gizlilik öğesini tıklayın.</li>
              <li> Web Sitesi Verilerini tıklayın.</li>
              <li>
                Bir veya daha fazla web sitesi seçin ve sonra Sil veya Tümünü
                Sil’e tıklayın.
              </li>
            </ol>
          </li>
          <li className="my-2">
            Internet Explorer
            <ol className=" list-decimal list-inside">
              <li>
                Bilgisayarınızın masaüstünde Internet Explorer simgesine
                tıklayın.
              </li>
              <li>
                {" "}
                Araçlar düğmesine ve ardından İnternet Seçenekleri’ne tıklayın.
              </li>
              <li>
                {" "}
                Gizlilik sekmesine tıklayın, sonra tüm tanımlama bilgilerini
                engellemek için Ayarlar altında bulunan kaydırıcıyı yukarıya
                çekin ve Tamam düğmesine tıklayın.
              </li>
            </ol>
          </li>
        </ul>
      </p>
    </div>,

    // second text
    <div className="flex flex-col h-full text-start items-start justify-start w-[96%]">
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

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

    // Eğer component henüz mount olmadıysa, hiçbir şey render etmeyelim.
    if (!hasMounted) {
      return null;
    }

  return (
    isVisible && (
      <div className="fixed flex z-[9999] bottom-0 bg-[rgba(29,29,27,0.70)] backdrop-blur-[10px] right-0 left-0 w-screen items-center justify-center">
        <div className="flex flex-col md:flex-row w-[94%] md:w-[99%] lg:w-[94%] xl:w-[80%] xl:max-w-[1270px] py-[25px] gap-[20px] font-montserrat text-center items-center justify-center text-[#FBFBFB] font-jost">
          <p className="md:hidden text-[13px] lg:text-[14px] leading-[130%] text-[#FBFBFB] font-normal font-jost text-center md:min-w-[39%] lg:w-[]">
            <span className="font-medium underline">{t("cookie")}</span>  {t("cookieText")}
            <br />
            <Link href="/" className="font-medium underline">
            {t("read")} {" "}
            </Link>
            {t("about")}
          </p>

          <div className="md:flex hidden text-[14px] leading-[130%] text-[#FBFBFB] font-normal font-jost text-center xl:text-start sm:w-[45%] md:min-w-[38%] ml-[2%] ">
            <p>
              <span className="font-medium underline">{t("cookie")}</span> {t("cookieText")}
              <Link href="/" className="font-medium underline">
              {t("read")}{" "}
              </Link>
              {t("about")}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:flex lg:flex-row md:gap-[20px] xl:gap-[30px] w-full items-center justify-center gap-[13px] lg:gap-[1vw] mr-[2%]  ">
            <button
              className="text-[13px] lg:text-[14px] leading-normal font-medium uppercase items-center justify-center text-center border-[#FBFBFB] border-[0.867px] whitespace-nowrap py-[10px] px-[20px] cursor-pointer  "
              onClick={handleDenyAll}
            >
             {t("deny")}
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex lg:hidden text-[13px] lg:text-[14px] leading-normal font-medium uppercase items-center justify-center text-center border-[#FBFBFB] border-[0.867px] whitespace-nowrap py-[10px] md:px-[20px] cursor-pointer  "
            >
             {t("accept")}
            </button>

            <button
              onClick={handleModalToggle}
              className="text-[13px] lg:text-[14px] leading-normal font-medium uppercase items-center justify-center text-center border-[#FBFBFB] border-[0.867px] whitespace-nowrap py-[10px] px-[20px] cursor-pointer col-span-2 "
            >
              {t("manage")}
            </button>

            <button
              onClick={handleAcceptAll}
              className="hidden lg:flex text-[13px] lg:text-[14px] leading-normal font-medium uppercase items-center justify-center text-center border-[#FBFBFB] border-[0.867px] whitespace-nowrap py-[10px] md:px-[20px] cursor-pointer  "
            >
              {t("accept")}
            </button>

            {isModalOpen && (
              <ModalPortal onClose={handleModalToggle}>
                <div className="flex flex-col items-center justify-center gap-[15px] lg:gap-[39px]">
                  <div className="flex w-[90%] items-start justify-between lg:mt-[27px] lg:gap-[23px] mt-[10%] md:mt-[83px] lg:h-[39px] h-[52px]">
                    <Image
                      src={logosvg}
                      alt="Logo"
                      className="object-contain w-[62px] h-[46px] lg:h-[39px] lg:w-[52px] items-center justify-center"
                    />
                    <div className="hidden lg:flex flex-row w-[98%] md:w-[90%] lg:w-auto text-center items-center text-[16px] font-bold ml-[11%] lg:ml-0 gap-[23px] h-[29px]">
                      {[
                        t("policy"),
                        t("clarification"),
                        t("what"),
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
                      onClick={handleModalToggle}
                    >
                      <RxCross2 size={24} color="#fff" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 items-center justify-center pb-2 lg:pb-0 md:h-[100%] text-[#FBFBFB] max-w-screen  h-auto">
                    <div className="flex flex-col w-[75%] sm:w-[90%] lg:w-[100%] justify-center items-center lg:items-start lg:justify-start gap-[14.5px] lg:gap-[15px] ">
                      <div className="flex flex-row lg:hidden text-start text-[16px] lg:-ml-[4%] font-bold gap-[10px] w-[90%] lg:w-[100%] lg:mb-[36px] items-center justify-start overflow-x-auto scrollbar-thin">
                        {orderedButtons.map((button) => (
                          <button
                            key={button.id}
                            onClick={() => setSelectedContent(button.id)}
                            className={
                              selectedContent === button.id
                                ? "text-white text-[16px] font-jost leading-normal font-medium w-fit cursor-pointer pt-[10px] px-[10px] border-b whitespace-nowrap items-start justify-start text-start h-[48px] lg:h-[37px]"
                                : "text-[16px] font-jost leading-normal font-medium text-[#A6A6A6] whitespace-nowrap cursor-pointer pt-[10px] px-[10px] border-none items-start justify-start text-start h-[48px] lg:h-[37px] w-fit"
                            }
                          >
                            {button.label}
                          </button>
                        ))}
                      </div>

                      {/* Dinamik Başlık */}
                      <button className="hidden lg:flex text-[16px] font-medium text-[#FBFBFB] font-jost leading-normal border-b border-[#FBFBFB] lg:ml-[7%]">
                        {
                          [
                            t("policy"),
                            t("clarification"),
                            t("what"),
                          ][selectedContent]
                        }
                      </button>

                      <div className="flex flex-col w-[88%] h-[54vh] md:h-[55vh] lg:h-[376px] lg:w-[85%] ml-[2%] lg:ml-[7%] mt-[2vw] lg:mt-0 items-start justify-start text-start ">
                        {/* Dinamik Başlık */}
                        {/* İçerik */}
                        {contents[selectedContent]}
                      </div>
                      <div className="hidden lg:flex items-center justify-center w-[100%] gap-[13px] lg:gap-[37px] mb-[20px] lg:mt-[21.5px] lg:mb-6 font-jost">
                        <button onClick={handleDenyAll} className="text-[14px] uppercase font-medium leading-normal text-[#FBFBFB] px-[20px] py-[10px] border border-[#FBFBFB] whitespace-nowrap min-w-[170px]">
                        {t("deny")}
                        </button>
                        <button onClick={handleAcceptAll} className="text-[14px] uppercase font-medium leading-normal text-[#FBFBFB] px-[20px] py-[10px] border border-[#FBFBFB] whitespace-nowrap min-w-[184px]">
                        {t("accept")}
                        </button>
                      </div>

                      <div className="absolute bottom-[14vh] sm:bottom-[12%] flex lg:hidden items-center justify-center w-[100%] gap-[13px] font-jost">
                        <button onClick={handleDenyAll} className="text-[12px] uppercase font-medium leading-normal text-[#FBFBFB] px-[20px] py-[10px] border border-[#FBFBFB] whitespace-nowrap min-w-[170px] w-[44vw]">
                        {t("deny")}
                        </button>
                        <button onClick={handleAcceptAll} className="text-[12px] uppercase font-medium leading-normal text-[#FBFBFB] px-[20px] py-[10px] border border-[#FBFBFB] whitespace-nowrap min-w-[184px] w-[44vw]">
                        {t("accept")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalPortal>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CookiePopup;