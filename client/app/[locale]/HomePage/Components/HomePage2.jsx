import React from 'react'
import Image from 'next/image'
import img1 from "./Images/sag1.webp"
import img2 from "./Images/sol2.webp"
import Link from 'next/link';

// Örnek resim importları (kendi resimlerinizi import edin)
// import beachImage from '/public/beach.jpg'
// import poolImage from '/public/pool.jpg'

export default function HomePage2() {
    return (
        <div className="flex w-screen h-[785px] mt-[150px] items-center justify-center max-w-[1444px]">
          <div className="flex flex-row-reverse w-[76.8%] items-center justify-center gap-[52px] h-full">
    
            <div className="flex flex-col w-[48.5%] items-start justify-center text-start gap-[35px] text-black font-jost">
              <span className="text-[12.002px] font-medium leading-[14.026px] tracking-[0.481px] uppercase">
              Perfect Fine Dine Experiences
              </span>
              <h2 className="text-[48.089px] font-normal font-marcellus leading-[57.707px]">
              Where green and blue meets
              </h2>
              <p className="text-[16.03px] font-normal leading-[24.045px] leading-trim-both text-edge-cap">
              With its 350 m long golden yellow beach located on the sands of the most breathtaking blue hues, LAGO will provide you with an unforgettable holiday.
              </p>
              <p className="text-[16.03px] font-normal leading-[24.045px] leading-trim-both text-edge-cap">
              Enjoy cooling off in pools of different sizes in the deep blue world of LAGO. The facility has a heated indoor pool, and there is also a heated relax pool in the area where the outdoor swimming pool is located.
              </p>
              <Link href="/gallery" className='flex py-[20px] px-[40px] items-center justify-center text-center text-[16px] h-[41px] text-lagoBrown uppercase leading-[30px] font-medium'>See our gallery</Link>
            </div>
    
            <div className="flex w-[48.8%] items-end justify-end relative h-full">
                <Image src={img2} alt="art" width={298} height={438} className="absolute -top-[25px] -left-[20px] z-10"/>
                <Image src={img1} alt="art" width={310} height={449} className="z-50"/>
            </div>
    
          </div>
        </div>
      );
}
