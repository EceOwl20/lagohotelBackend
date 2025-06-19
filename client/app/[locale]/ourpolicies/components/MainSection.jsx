import React from "react";

const MainSection = () => {
  return (
    <div className="flex w-screen h-auto items-center justify-center ">
      <div className="flex flex-col items-center justify-center text-center w-[87.79%] md:w-[91.4%] xl:w-[76.8%]">
        <div className="flex flex-col w-full items-center justify-center lg:w-[65%] text-center font-jost text-black gap-[15px] md:gap-[25px] lg:gap-[35px]">
          <span className="text-[12px] font-medium leading-[14px] uppercase tracking-[0.48px]">Harmony with Nature</span>
          <h2 className="text-[28px] md:text-[32px] lg:text-[48px] font-marcellus text-black leading-[120%] lg:leading-[57.6px] font-normal">
            Lago Hotel Sustainability
          </h2>
          <p className="text-[14px] lg:text-[16px] font-normal leading-[24px]">
          For us, sustainability is not just a goal—it is the cornerstone of our commitment to our guests, employees, and future generations. Our hotel continuously strives to provide an eco-friendly hospitality experience by embracing environmentally responsible practices, energy efficiency, waste management, and partnerships with local communities. With every step we take, we innovate to protect nature and optimize resource usage. While enhancing our guests’ comfort and experience, we are dedicated to building a promising, sustainable future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
