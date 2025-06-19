import React from 'react'

const MainBannerSection = ({img}) => {
  return (
    <div className='flex w-screen h-[68vh] bg-center bg-cover'  style={{ backgroundImage: `url(${img.src})` }} >
      
    </div>
  )
}

export default MainBannerSection
