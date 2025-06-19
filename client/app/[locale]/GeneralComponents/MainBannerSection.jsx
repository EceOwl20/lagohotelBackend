import React from 'react'

const MainBannerSection = ({img, span, header, text}) => {
  return (
    <div className='flex w-screen items-center justify-center min-h-[calc(100vh+12vh)] bg-center bg-cover'  style={{ backgroundImage: `url(${img.src})` }} >
      <div className='flex flex-col items-center justify-center w-[65%] text-center gap-[50px] text-white font-jost'>
        <span className='text-[15px] font-medium uppercase tracking-[0.6px] leading-[14px]'>{span}</span>
        <header className='text-[24px] md:text-[56px] lg:text-[80px] leading-[28.8px] -tracking-[0.48px] md:tracking-0 font-medium md:leading-[61.6px] lg:leading-[106px] capsizedText'>{header}</header>
        <p className='text-[18px] leading-[30px] font-normal w-[65%]'>{text}</p>
      </div>
    </div>
  )
}

export default MainBannerSection
