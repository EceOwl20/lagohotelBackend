import imgBanner from "./images/mainbar.webp"
import ClinaryInfoSection from '../restaurants/components/ClinaryInfoSection'
import cafebar1 from "./images/cafebar1.webp"
import cafebar2 from "./images/cafebars2.webp"
import DiscoverBackground from '../restaurants/components/DiscoverBackground'
import backgroundImg from "./images/BackgroundCafes.webp"
import BackgroundSection from '../rooms/familyswimup/components/BackgroundSection'
import backgroundImg2 from "./images/fullphoto.webp"
import backgroundImg3 from "./images/fullphoto2.webp"
import BarCarouselSection from './components/BarCarouselSection'
import OtherOptions4 from './components/OtherOptions4'
import mignon from "./images/mignon.webp"
import joie from "./images/joie.webp"
import maldiva from "./images/maldiva.webp"
import vagobar from "./images/vagobar.webp"
import piano from "./images/piano.webp"
import abella from "./images/abella.webp"
import lago from "./images/lago.webp"
import house from "./images/house.webp"
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2'
import RestaurantMainBanner from '../restaurants/components/RestaurantMainBanner'
import { useTranslations } from "next-intl";

const page = () => {
  const t = useTranslations('BarAndCafes');
  const t2 = useTranslations('BarAndCafes.ClinaryInfoSection');
  const t3 = useTranslations('BarAndCafes.BarImageSection');
  const t4 = useTranslations('BarAndCafes.CuisinesCarousel');
  const t5 = useTranslations('BarAndCafes.BarImageSection2');
  const t6 = useTranslations('BarAndCafes.CuisinesCarousel2');
  const t7 = useTranslations('BarAndCafes.DiscoverBackground');

  const otherOptions = [
    {
        id: 1,
        img: mignon,
        title: t4("cuisines1title"),
        description: t4("cuisines1subtitle"),
        text:t4("cuisines1text"),
        link:"/barcafes/mignonbar",
        buttonText:t4("buttonText")
      },
    {
        id: 2,
        img: joie,
        title: t4("cuisines2title"),
        description: t4("cuisines2subtitle"),
        text:t4("cuisines2text"),
        link:"/barcafes/joiebar",
        buttonText:t4("buttonText")
      },
      {
        id: 3,
        img: maldiva,
        title: t4("cuisines3title"),
        description: t4("cuisines3subtitle"),
        text:t4("cuisines3text"),
         link:"/barcafes/maldivabar",
         buttonText:t4("buttonText")
      },
      {
        id: 4,
        img: vagobar,
        title: t4("cuisines4title"),
        description: t4("cuisines4subtitle"),
        text:t4("cuisines4text"),
         link:"/barcafes/vagobar",
         buttonText:t4("buttonText")
      }
  ];

  const otherOptions2 = [
    {
        id: 1,
        img: piano,
        title: t6("cuisines1title"),
        description: t6("cuisines1subtitle"),
        text:t6("cuisines1text"),
        link:"/barcafes/pianobar",
        buttonText:t6("buttonText")
      },
    {
        id: 2,
        img: abella,
        title: t6("cuisines2title"),
        description: t6("cuisines2subtitle"),
        text:t6("cuisines2text"),
        link:"/barcafes/abellapatisserie",
        buttonText:t6("buttonText")
      },
      {
        id: 3,
        img: lago,
        title: t6("cuisines3title"),
        description: t6("cuisines3subtitle"),
        text:t6("cuisines3text"),
         link:"/barcafes/cafedelago",
         buttonText:t6("buttonText")
      },
      {
        id: 4,
        img: house,
        title: t6("cuisines4title"),
        description: t6("cuisines4subtitle"),
        text:t6("cuisines4text"),
         link:"/barcafes/cafedehouse",
         buttonText:t6("buttonText")
      }
  ];

  const clinaryTexts=[t2("text1")]
const backgroundTexts=[t3("text")]
const backgroundTexts2=[t5("text1") ]

  return (
    <div className='flex flex-col items-center justify-center gap-[60px] md:gap-[80px] lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <RestaurantMainBanner  img={imgBanner} span={t("subtitle")} header={t("title")} text={t("text")}/>
      <ClinaryInfoSection img1={cafebar1} img2={cafebar2} span={t2("subtitle")} header={t("title")} texts={clinaryTexts}/>
      <BackgroundSection span={t3("subtitle")} header={t3("title")} texts={backgroundTexts} link="/barcafes/mignonbar" img={backgroundImg2} buttonText={t3("title")}/>
      <OtherOptions4 span={t4("subtitle")} header={t4("title")} text={t4("text")} images={otherOptions} />
      <BackgroundSection span={t5("subtitle")}  header={t5("title")}  texts={backgroundTexts2} link="/" img={backgroundImg3}/>
      <OtherOptions4 span={t6("subtitle")} header={t6("title")} text={t6("text")} images={otherOptions2} />
      <BarCarouselSection/>
      <DiscoverBackground span={t7("subtitle")} header={t7("title")} text={t7("text")} link="/barcafes" img={backgroundImg} buttonText={t7("buttonText")}/>
      <ContactSection2/>
    </div>
  )
}

export default page
