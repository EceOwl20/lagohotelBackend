import React from "react";
import AreaSvg from "./svg/AreaSvg";
import TreeSvg from "./svg/TreeSvg";
import ViewSvg from "./svg/ViewSvg";
import Image from "next/image";
import Link from "next/link";

const RoomsSectionReverse = ({img,img2, header,text,span,span2,link, id, buttonText}) => {
  return (
    <div id={id} className="flex w-screen h-auto items-center justify-center">
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[28px] lg:gap-[42px] max-w-[1208px] px-4 lg:px-0">
        <div className="flex flex-row items-center w-full lg:w-[72.5%] gap-[10px]">
          <Image
            src={img}
            width={img.width || 430}
            height={img.height || 620}
            alt="Superior Rooms"
            className="w-[50%] flex"
          />

          <Image
            src={img2}
            width={img2.width || 430}
            height={img2.height || 620}
            alt="Superior Rooms"
            className="w-[50%] flex"
          />
        </div>

        {/* text section */}
        <div className="flex flex-col w-full lg:w-[26.5%] items-start justify-center h-full text-start font-jost gap-[15px] lg:gap-[25px] ">
          <h3 className="text-lagoBlack font-marcellus text-[25px] lg:text-[30px] font-normal leading-[125%] -tracking-[0.66px] capitalize">
         {header}
          </h3>
          <p className="text-lagoBrown font-normal leading-normal text-[14px] lg:text-[16px] w-[93%] line-clamp-5">
          {text}
          </p>
          <div className="flex w-full items-center justify-start gap-[27px]">
            <div className="flex items-start justify-start gap-[7px]">
              <AreaSvg className="flex" width={17} height={18} />
              <p className="text-lagoBrown text-[12px] lg:text-[14px] font-normal leading-[125%]">
               {span}
              </p>
            </div>
            <div className="flex items-center justify-start gap-[7px]">
              <TreeSvg className="flex" width={15} height={16} />
              <ViewSvg className="flex" width={15} height={16} />
              <p className="text-lagoBrown text-[12px] lg:text-[14px] font-normal leading-[125%]">
              {span2}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
          <Link href={link} className="flex bg-[#fbfbfb] border border-lagoBrown items-center justify-center py-[12px] px-[32px] h-[41px] shadow-buttonCustom bg-transparent text-[14px] text-lagoBrown uppercase leading-[30px] font-medium hover:bg-black hover:text-white hover:underline">
          {buttonText}
          </Link>
      

          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsSectionReverse;
