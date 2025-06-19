import React from "react";
import RoomsBanner from "./components/RoomsBanner";
import RoomsInfoSection from "./components/RoomsInfoSection";
import RoomsSection from "./components/RoomsSection";
import RoomsSectionReverse from "./components/RoomsSectionReverse";
import RoomsParallaxSection from "./components/RoomsParallaxSection";

import imgFamily from "./images/odalar2-1.webp";
import imgFamily2 from "./images/oda2-2.webp";
import imgSuperior from "./images/superiorRooms.png";
import imgSuperior2 from "./images/oda1-2.webp";

import imgSwim from "./images/oda3-1.webp";
import imgSwim2 from "./images/oda3-2.webp";

import imgFamilySwim from "./images/oda4-1.webp";
import imgFamilySwim2 from "./images/oda4-2.webp";

import imgTinyvilla from "./images/oda5-1.webp";
import imgTinyvilla2 from "./images/oda5-2.webp";

import imgDisable from "./disableroom/images/lago-engl1.webp"
import imgDisable2 from "./disableroom/images/lago-engl2.webp"

import imgDuplex from "./images/oda6-1.webp";
import imgDuplex2 from "./images/odalar6-2.webp";
import ContactSection2 from "../GeneralComponents/Contact/ContactSection2";
import {useTranslations} from 'next-intl';

const page = () => {
  const room1 = useTranslations('Accommodation.RoomSection1');
  const room2 = useTranslations('Accommodation.RoomSection2');
  const room3 = useTranslations('Accommodation.RoomSection3');
  const room4 = useTranslations('Accommodation.RoomSection4');
  const room5 = useTranslations('Accommodation.RoomSection5');
  const room6 = useTranslations('Accommodation.RoomSection6');
  const room7 = useTranslations('Accommodation.RoomSection7');

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center gap-[50px] lg:gap-[100px] bg-[#fbfbfb]">
      <RoomsBanner />
      <RoomsInfoSection />
      <RoomsSection
      id="superiorroom"
        img={imgSuperior}
        img2={imgSuperior2}
        header={room1('title')}
        text={room1('subtitle')}
         span={room1('m')}
        span2={room1('view')}
        buttonText={room1('buttonText')}
        link="/rooms/superiorroom" 
      />
      <RoomsSectionReverse
      id="familyroom"
        img={imgFamily}
        img2={imgFamily2}
        header={room2('title')}
        text={room2('subtitle')}
         span={room2('m')}
        span2={room2('view')}
        buttonText={room2('buttonText')}
        link="/rooms/familyroom" 
      />

      <RoomsSection
      id="swimuproom"
        img={imgSwim}
        img2={imgSwim2}
        header={room3('title')}
        text={room3('subtitle')}
         span={room3('m')}
        span2={room3('view')}
        buttonText={room3('buttonText')}
        link="/rooms/swimuproom" 
      />
      <RoomsSectionReverse
       id="familyswimup"
        img={imgFamilySwim}
        img2={imgFamilySwim2}
        header={room4('title')}
        text={room4('subtitle')}
         span={room4('m')}
        span2={room4('view')}
        buttonText={room4('buttonText')}
        link="/rooms/familyswimup" 
      />

      <RoomsSection
      id="duplexfamilyroom"
        img={imgDuplex}
        img2={imgDuplex2}
        header={room5('title')}
        text={room5('subtitle')}
         span={room5('m')}
        span2={room5('view')}
        buttonText={room5('buttonText')}
        link="/rooms/duplexfamilyroom" 
      />

<RoomsSectionReverse
      id="tinyvilla"
        img={imgTinyvilla}
        img2={imgTinyvilla2}
        header={room6('title')}
        text={room6('subtitle')}
         span={room6('m')}
        span2={room6('view')}
        buttonText={room6('buttonText')}
        link="/rooms/tinyvilla" 
      />

      <RoomsSection
      id="disableroom"
        img={imgDisable}
        img2={imgDisable2}
        header={room7('title')}
        text={room7('subtitle')}
         span={room7('m')}
        span2={room7('view')}
        buttonText={room7('buttonText')}
        link="/rooms/disableroom" 
      /> 

     

      <RoomsParallaxSection />
      <ContactSection2/>
    </div>
  );
};

export default page;
