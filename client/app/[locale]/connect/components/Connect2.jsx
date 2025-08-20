"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import image from "../Image/SRF_7996-min.webp";
import { useLocale, useTranslations } from "next-intl";

const Connect2 = () => {
  const t = useTranslations("Contact.Form");
  const locale = useLocale(); // "tr", "en", "de", "ru"
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    policyAccepted: false, // Eklenmiş
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Input alanları için genel değişim handler'ı
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Policy kontrolü
      if (!formData.policyAccepted) {
        throw new Error("Lütfen gizlilik politikasını kabul edin");
      }

      const messageContent = `
      Hello! My name is ${formData.name}
      For communication: ${formData.email}
      Message: ${formData.message}
      We thank you.
    `;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: messageContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Gönderim başarısız oldu");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        policyAccepted: false,
      });
    } catch (err) {
      setError(err.message || "Bir hata oluştu, lütfen tekrar deneyin");
    } finally {
      setLoading(false);
    }
  };


    const [pageData, setPageData] = useState(null);
    useEffect(() => {
      fetch(`${apiUrl}/api/pages/contact`)
        .then((r) => r.json())
        .then((json) => setPageData(json))
        .catch(console.error);
    }, [apiUrl]);
  
    if (!pageData) return <p className="p-10">Yükleniyor…</p>;

     const imageBackground = pageData.connect2?.image
    ? pageData.connect2.image.startsWith("/")
      ? `${apiUrl}${pageData.connect2.image}`
      : pageData.connect2.image
    : "";

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Arka plan resmi container'ı */}
      <div className="relative w-full lg:w-[978px] lg:h-[744px] lg:-ml-[15%]">
        <Image
          src={imageBackground}
          alt="Resim"
          width={978}
          height={744}
          className="object-cover w-full min-h-[650px]"
           loading="lazy"
        />
      </div>

      {/* Form overlay */}
      <div className="absolute min-w-[350px] w-[78vw] max-w-[480px] min-h-[30vh] md:min-h-[40vh] lg:w-[480px] lg:min-h-[684px] top-1/2 -translate-y-1/2 lg:-translate-y-0 lg:translate-x-0 lg:top-[4%] xl:left-[55%] bg-white shadow-lg p-[18px] lg:p-[30px] z-10 text-center">
        <h2 className="lg:text-[40px] md:text-[32px] text-[26px] font-normal text-center font-marcellus text-lagoBlack leading-normal lg:leading-[56px] lg:mt-2 capsizedText2 mb-[15px] lg:mb-[25px] w-[100%]">
          {pageData.connect2?.formTitle?.[locale]}
        </h2>
        <p className="text-lagoGray text-[14px] lg:text-[16px] font-normal font-jost leading-[14px] lg:leading-[26px] w-[100%] lg:w-[95%] capsizedText4 mb-[15px] md:mb-[25px]">
          {pageData.connect2?.formText?.[locale]}
        </p>
        {/* Yatay çizgi */}
        <hr className="border-black w-1/2 mx-auto mb-[20px] md:mb-[25px]" />

        <form onSubmit={handleFormSubmit} className="flex flex-col w-full h-auto">
          {/* Full Name */}
          <div className="mb-[10px] lg:mb-[17px]">
            <input
              id="fullName"
              name="name"
              type="text"
              placeholder={pageData.connect2?.nameLabel?.[locale]}
              value={formData.name}
              onChange={handleChange}
              className="block w-full border border-gray-300 px-3 py-2 lg:px-[24px] lg:py-[18px] placeholder:text-[14px] placeholder:lg:text-[16px]"
            />
          </div>
          {/* Email Address */}
          <div className="mb-[10px] lg:mb-[17px]">
            <input
              id="email"
              name="email"
              type="email"
              placeholder={pageData.connect2?.emailLabel?.[locale]}
              value={formData.email}
              onChange={handleChange}
              className="block w-full border border-gray-300 px-3 py-2 lg:px-[24px] lg:py-[18px] placeholder:text-[14px] placeholder:lg:text-[16px]"
            />
          </div>
          {/* Your Message */}
          <div className="">
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder={pageData.connect2?.message?.[locale]}
              value={formData.message}
              onChange={handleChange}
              className="block w-full border border-gray-300 px-3 py-2 lg:px-[24px] lg:py-[18px] placeholder:text-[14px] placeholder:lg:text-[16px] max-h-[137px]"
            ></textarea>
          </div>
          {/* Checkbox */}
          <div className="flex w-[90%] items-center justify-center">
            <input
              type="checkbox"
              name="policyAccepted"
              checked={formData.policyAccepted}
              onChange={handleChange}
              className="h-4 w-4 border border-gray-300 rounded mr-2 mt-4"
            />
            <label
              htmlFor="policyAccepted"
              className="text-[12px] lg:text-[14px] text-gray-600 mt-[18px] lg:mt-[24px]"
            >
              {pageData.connect2?.policyText?.[locale]}
            </label>
          </div>
          {/* Success/Error mesajları */}
          {success && (
            <div className="text-green-600 text-lg">
              Mesajınız başarıyla gönderildi!
            </div>
          )}
          {error && (
            <div className="text-red-600 text-lg">
              {error}
            </div>
          )}
          {/* Send Message Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              md:min-w-1/2
              mx-auto
              border
              border-[#472C10]
              bg-transparent
              px-6
              py-3
              lg:mt-[25px]
              hover:bg-black
              hover:text-white
              transition-colors
              text-[14px] lg:text-[16px]
              uppercase
              leading-[18px] lg:leading-[26px]
              font-jost text-lagoBlack whitespace-nowrap
              w-auto items-center justify-center mt-2
            "
          >
            {pageData.connect2?.buttonText?.[locale]}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Connect2;
