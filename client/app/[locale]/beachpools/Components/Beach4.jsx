import React from 'react'
import {useTranslations} from 'next-intl';

const Beach4 = () => {
    const t = useTranslations('BeachPools.PoolSection');

  return (
    <div className='flex flex-col justify-center items-center w-full gap-[30px] lg:gap-[50px]'>
        <div className='flex flex-col justify-center items-center gap-[15px] md:gap-[25px] lg:gap-[35px] text-center w-[87.79%] md:w-[91.4%] lg:w-[76.8%]'>
            <p className='font-jost text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase'>{t("subtitle")}</p>
            <h2 className='font-marcellus text-[28px] md:text-[32px] lg:text-[48px] leading-[120%] lg:leading-[57.6px] lg:capsizedText2'>{t("title")}</h2>
            <p className='font-jost text-[14px] lg:text-[16px] leading-normal w-[90%] md:w-[70%] xl:w-[60%]'>{t("text")}</p>
        </div>
        <div className="relative w-screen min-h-[calc(50vh+73px)] overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover object-center"
            >
                <source 
                src="/audio/beachGif.mp4"
                type="video/mp4"
                />
                Tarayıcınız bu videoyu desteklemiyor.
            </video>
        </div>   
    </div>
  )
}

export default Beach4