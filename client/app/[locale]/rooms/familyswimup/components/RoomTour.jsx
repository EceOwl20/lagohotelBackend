import React from 'react'

const RoomTour = ({span,header,text, link}) => {
  return (
    <div className='flex w-screen h-auto items-center justify-center max-w-[1440px]'>
      <div className='flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] items-center justify-center gap-[30px] lg:gap-[50px] max-w-[1106px] font-jost'>

       <div className='flex flex-col items-start justify-center gap-[15px] md:gap-[25px] lg:gap-[35px] text-black text-start '>
       <span className='text-[12px]  font-medium leading-[14px] uppercase tracking-[0.48px]'>{span}</span>
       <h2 className='text-[28px] md:text-[32px] lg:text-[48px] font-marcellus font-normal leading-[120%] lg:leading-[57.6px] lg:capsizedText2'>{header}</h2>
       <p className='text-[14px] lg:text-[16px] leading-[130%] lg:leading-[24px] font-normal w-full lg:w-[70%] capsizedText4'>{text}</p>
       </div>

       <div className='flex w-full items-center justify-center py-[20px] px-[20px]'>
       <iframe width="100%" height="640" allow="xr-spatial-tracking; gyroscope; accelerometer" allowFullScreen scrolling="no" src={link}></iframe>
       </div>

      </div>
    </div>
  )
}

export default RoomTour
