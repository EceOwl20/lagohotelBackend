
import mainImg from "./images/mainSpa.webp"
import SpaInfoSection from './components/SpaInfoSection'
import SpaHeaderSection from './components/SpaHeaderSection'
import gallery1 from "./images/img-1.jpg"
import gallery2 from "./images/img-2.jpg"
import gallery3 from "./images/img-3.jpg"
import gallery4 from "./images/img-4.jpg"
import gallery5 from "./images/img-5.jpg"
import gallery6 from "./images/img-6.jpg"
import gallery7 from "./images/img-7.jpg"
import gallery8 from "./images/img-08.jpg"
import gallery9 from "./images/img-09.jpg"
import gallery10 from "./images/img-10.jpg"
import gallery11 from "./images/img-11.jpg"
import gallery12 from "./images/img-12.jpg"
import gallery13 from "./images/img-13.jpg"
import MassageCarousel from './components/MassageCarousel'
import SpaTypesInfoSection from './components/SpaTypesInfoSection'
import SpaReverse from './components/SpaReverse'
import indoorImg from "./images/indoor.webp"
import turkishImg from "./images/turkish.webp"
import img1 from "./images/Spa.webp";
import img2 from "./images/Sauna and hamam.webp";
import aromatic from "./images/aromatic.webp"
import oriental from "./images/oriental.webp"
import clasmassage from "./images/clasmassage.webp"
import facial from "./images/masagefaci.webp"
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import RestaurantMainBanner from '../restaurants/components/RestaurantMainBanner'
import {useTranslations} from 'next-intl';

const sliderMassage = [
  {
    src: aromatic,
    title: "Aromatherapy Massage",
    link: "/",
  },
  {
    src: oriental,
    title: "Oriental Massage",
    link: "/",
  },
  {
    src: clasmassage,
    title: "Classic Massage",
    link: "/",
  },
  {
    src: facial,
    title: "FacialSpecai Massage",
    link: "/",
  }
];

const galleryImages=[gallery12,gallery3,gallery1,gallery4,gallery5,gallery6,gallery7,gallery8,gallery9,gallery10,gallery10,gallery11,gallery13,gallery2]

const massageImages=[aromatic, oriental, clasmassage, facial,]

const page = () => {
  const t = useTranslations('Spa');
  const t2 = useTranslations('Spa.InfoSection');
  const t3 = useTranslations('Spa.SpaGallery');
  const t4 = useTranslations('Spa.Carousel');
  const t5 = useTranslations('Spa.SpaType');

  const spaTextsInfo1=[t2("subtitle"),t2("title"),t2("text")]
  const  spaTextsInfo2=[t2("subtitle2"),t2("title2"),t2("text2")]
  const spaTextsInfo3=[t2("subtitle3"),t2("title3"),t2("text3"),t2("list1"),t2("list2"),t2("list3"),t2("list4"),t2("list5")]

  const massageHeaders=[t4("massage1"),t4("massage2"),t4("massage3"),t4("massage4")]

  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <RestaurantMainBanner span={t("subtitle")} header={t("title")} text={t("text")} img={mainImg}  />
      <SpaInfoSection img1={img1} img2={img2} texts={spaTextsInfo1} texts2={spaTextsInfo2} texts3={spaTextsInfo3}/> 
      <SpaHeaderSection span={t3("subtitle")} header={t3("title")} text={t3("text")}  images={galleryImages}/>
      <MassageCarousel span={t4("subtitle")} header={t4("title")} text={t4("text")} headers={massageHeaders} images={massageImages}/>
      <div className='flex flex-col gap-[40px] lg:gap-[50px]'>
      <SpaTypesInfoSection span={t5("subtitle")} header={t5("title")} text={t5("text")} isImageLeft={true} showLink={false}  img={indoorImg} buttonText={t5("buttonText")}/>
      <SpaReverse isImageLeft={false} showLink={false} span={t5("subtitle2")} header={t5("title2")} text={t5("text2")} img={turkishImg}/>
      </div>
      <ContactSection2/>
    </div>
  )
}

export default page
