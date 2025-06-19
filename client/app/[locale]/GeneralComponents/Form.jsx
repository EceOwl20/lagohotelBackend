"use client";
import { useState, useEffect } from "react";
import logosvg from "./Header/Icons/Asset2.svg";
import Image from "next/image";

export default function Form({ isOpen, onClose, color, colorText }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    policyAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  // ESC tuşuna basılınca kapansın
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null; // Eğer form açık değilse hiçbir şey render etme!

  return (
<div className={`flex flex-col fixed inset-0 justify-center items-center w-screen lg:w-[420px] z-50 backdrop-blur-[12px]`} style={{ backgroundColor: color }}>
<button
        onClick={onClose}
          className={`absolute lg:flex hidden text-[40px] top-1 right-4 text-stoneLight text-[${colorText}]`} >
          &times;
        </button>
      <div className="flex w-[96%] px-[34px] items-center justify-between ">
        <Image
          src={logosvg}
          alt="Logo"
          className="object-contain w-[62px] h-[46px] items-center justify-center"
        />
        <button
        onClick={onClose}
          className={`flex lg:hidden text-[40px] text-stoneLight text-[${colorText}]`}
          
        >
          &times;
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`w-[96%] md:w-[400px] p-[34px]  text-[${colorText}] font-jost flex flex-col items-center justify-center gap-[25px]`}
      >
        <div className="flex flex-col gap-[10px] w-full">
          <label className="block mb-2 text-[16px] font-medium leading-[26.667px]">
            Name Surname
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-[10px] bg-transparent border border-gray-400 outline-none placeholder:text-[16px] placeholder:text-[#A6A6A6]"
          />
        </div>

        <div className="flex flex-col gap-[10px] w-full">
          <label className="block mb-2 text-[16px] font-medium leading-[26.667px]">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+ 90 123 456 78 90"
            className="w-full p-[10px] bg-transparent border border-gray-400 outline-none"
          />
        </div>

        <div className="flex flex-col gap-[10px] w-full">
          <label className="block mb-2 text-[16px] font-medium leading-[26.667px]">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full p-[10px] bg-transparent border border-gray-400 outline-none placeholder:text-[16px] placeholder:text-[#A6A6A6]"
          />
        </div>

        <div className="flex flex-col gap-[10px] w-full">
          <label className="block mb-2 text-[16px] font-medium leading-[26.667px]">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message goes here"
            className="w-full p-[10px] min-h-[136px] bg-transparent border border-gray-400 outline-none placeholder:text-[16px] placeholder:text-[#A6A6A6]"
            rows="3"
          ></textarea>
        </div>

        <div className="flex items-center gap-[17px]">
          <input
            type="checkbox"
            name="policyAccepted"
            checked={formData.policyAccepted}
            onChange={handleChange}
            className={`w-[20px] h-[20px] items-center justify-center text-center appearance-none border border-[#A6A6A6] bg-transparent focus:outline-none
               checked:after:content-['✓']  checked:after:text-[${colorText}] checked:after:text-[16px]
               checked:after:flex checked:after:items-center checked:after:justify-center`}
          />
          <label className="text-[16px] font-normal leading-[26.667px] text-[#A6A6A6] cursor-pointer underline">
            Contact Form Policy
          </label>
        </div>

        <button
          type="submit"
          className={`flex text-[15px] py-[15px] px-[58.5px] w-[226px] h-[42px] items-center justify-center border border-[${colorText}] text-[${colorText}] text-center hover:bg-gray-700 transition whitespace-nowrap`}
        >
          SEND REQUEST
        </button>
      </form>
    </div>
  );
}
