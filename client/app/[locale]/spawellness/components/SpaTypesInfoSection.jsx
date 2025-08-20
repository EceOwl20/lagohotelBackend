import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SpaTypesInfoSection = ({ 
  isImageLeft = true, 
  span, 
  header, 
  text, 
  img, 
  link, 
  showLink ,
  buttonText
}) => {
  const containerDirection = isImageLeft ? "flex-row" : "flex-row-reverse"

  return (
    <div className="flex w-screen items-center justify-center  max-w-[1440px]">
      <div className={`flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] items-center justify-center gap-[30px] md:gap-[3.5%] md:${containerDirection}`}>
        <div className='flex flex-col md:hidden w-full text-black gap-[10px]'>
        <span className="text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase">
            {span}
          </span>
          <h3 className="text-[28px] md:text-[32px] lg:text-[48px] font-normal leading-[120%] lg:leading-[57.6px] font-marcellus lg:capsizedtext2">
            {header}
          </h3>
        </div>
        <Image 
          src={img} 
          alt="indoor" 
          width={533} 
          height={434} 
          className="w-[100%] md:w-[49.5%]" 
           loading="lazy"
        />
        <div className="flex flex-col items-start justify-center w-full md:w-[47%] text-black font-jost gap-[10px] md:gap-[25px] lg:gap-[35px] text-start">
          <span className="hidden md:flex text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase">
            {span}
          </span>
          <h3 className="hidden md:flex  text-[28px] md:text-[32px] lg:text-[48px] font-normal leading-[120%] lg:leading-[57.6px] font-marcellus lg:capsizedtext2">
            {header}
          </h3>
          <p className="text-[12px] lg:text-[14px] font-normal leading-[21px]">
            {text}
          </p>
          {showLink && (
            <Link 
              href={link} 
              className="flex min-w-[170.585px] whitespace-nowrap py-[16px] px-[32px] font-jost text-[14px] lg:text-[16px] text-lagoBrown font-medium leading-[30px] max-h-[41px] items-center justify-center border border-lagoBrown shadow-buttonCustom uppercase"
            >
            {buttonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SpaTypesInfoSection
