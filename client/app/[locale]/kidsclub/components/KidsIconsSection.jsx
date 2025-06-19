import React from 'react'
import EnvironmentSvg from './EnvironmentSvg'
import ActiviteSvg from './ActiviteSvg'
import SocialSvg from './SocialSvg'
import StaffSvg from './StaffSvg'
import {useTranslations} from 'next-intl';

const KidsIconsSection = () => {
    const t = useTranslations('KidsClub.IconSection');

  return (
    <div className='flex w-screen items-center justify-center max-w-[1444px]'>
      <div className='w-[87.79%] md:w-[91.4%] lg:w-[76.8%] grid grid-cols-2 lg:flex lg:flex-row lg:justify-between items-center gap-[20px] md:gap-[35px]'>
        <div className='flex flex-col gap-[18px] items-center justify-center'>
            <div className='flex bg-[#84C9EA] rounded-full p-[28px] md:p-[32px]'>
                <EnvironmentSvg className="flex" width={57} height={56}/>
            </div>
            <div className='flex flex-col items-center justify-center gap-[8px]'>
                <span className='text-[#121212] font-marcellus font-normal leading-[26px] text-[16px] md:text-[18px]'>{t("icon1")}</span>
                <div className='bg-[#84C9EA] h-[6px] w-[50px]'></div>
            </div>
        </div>

        <div className='flex flex-col gap-[18px] items-center justify-center'>
            <div className='flex bg-[#84C9EA] rounded-full p-[28px] md:p-[32px]'>
                <ActiviteSvg className="flex" width={57} height={56}/>
            </div>
            <div className='flex flex-col items-center justify-center gap-[8px]'>
                <span className='text-[#121212] font-marcellus font-normal leading-[26px] text-[16px] md:text-[18px]'>{t("icon2")}</span>
                <div className='bg-[#84C9EA] h-[6px] w-[50px]'></div>
            </div>
        </div>

        <div className='flex flex-col gap-[18px] items-center justify-center'>
            <div className='flex bg-[#84C9EA] rounded-full p-[28px] md:p-[32px]'>
                <SocialSvg className="flex" width={57} height={56}/>
            </div>
            <div className='flex flex-col items-center justify-center gap-[8px]'>
                <span className='text-[#121212] font-marcellus font-normal leading-[26px] text-[16px] md:text-[18px]'>{t("icon3")}</span>
                <div className='bg-[#84C9EA] h-[6px] w-[50px]'></div>
            </div>
        </div>

        <div className='flex flex-col gap-[18px] items-center justify-center'>
            <div className='flex bg-[#84C9EA] rounded-full p-[28px] md:p-[32px]'>
                <StaffSvg className="flex" width={57} height={56}/>
            </div>
            <div className='flex flex-col items-center justify-center gap-[8px]'>
                <span className='text-[#121212] font-marcellus font-normal leading-[26px] text-[16px] md:text-[18px]'>{t("icon4")}</span>
                <div className='bg-[#84C9EA] h-[6px] w-[50px]'></div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default KidsIconsSection
