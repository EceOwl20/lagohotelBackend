// app/[locale]/panel/sayfalar/certificate/CertificatePageEdit.jsx
"use client";
import React from "react";
import ImageUploadInput from "@/app/[locale]/panel/components/ImageUploadInput";

const FieldGroup = ({ label, children }) => (
  <section className="border rounded-md bg-gray-50 p-4 mb-6">
    <h3 className="font-semibold text-lg mb-3">{label}</h3>
    {children}
  </section>
);

export default function CertificatePageEdit({ data, setData, langs = ["tr","en","de","ru"] }) {
  const cert = data.certificate || {};

  // ---- helpers ----
  const setCert = (next) =>
    setData((prev) => ({ ...prev, certificate: { ...(prev.certificate || {}), ...next } }));

  const setBanner = (patch) => setCert({ banner: { ...(cert.banner || {}), ...patch } });
  const setSection1 = (patch) => setCert({ section1: { ...(cert.section1 || {}), ...patch } });
  const setCertificates = (patch) =>
    setCert({ certificates: { ...(cert.certificates || {}), ...patch } });

  const ensureLangObj = (obj = {}) =>
    langs.reduce((acc, l) => ({ ...acc, [l]: obj[l] || "" }), {});

  // ---- add/remove image in certificates ----
  const addCertImage = () => {
    const arr = Array.isArray(cert.certificates?.images) ? [...cert.certificates.images] : [];
    arr.push("");
    setCertificates({ images: arr });
  };

  const removeCertImage = (idx) => {
    const arr = Array.isArray(cert.certificates?.images) ? [...cert.certificates.images] : [];
    arr.splice(idx, 1);
    setCertificates({ images: arr });
  };

  const updateCertImage = (idx, val) => {
    const arr = Array.isArray(cert.certificates?.images) ? [...cert.certificates.images] : [];
    arr[idx] = val;
    setCertificates({ images: arr });
  };

  return (
    <div className="space-y-6">
      {/* ============= Banner ============= */}
      <FieldGroup label="Certificate — Banner">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <ImageUploadInput
              label="Banner Görseli"
              value={cert.banner?.image || ""}
              onChange={(v) => setBanner({ image: v })}
            />
          </div>

          {/* span (subtitle) */}
          <div className="md:col-span-1">
            <p className="font-medium mb-2">Span (Alt başlık)</p>
            {langs.map((l) => (
              <input
                key={`banner-span-${l}`}
                className="border p-2 rounded w-full mb-2"
                placeholder={`Span (${l})`}
                value={ensureLangObj(cert.banner?.span)[l]}
                onChange={(e) =>
                  setBanner({ span: { ...ensureLangObj(cert.banner?.span), [l]: e.target.value } })
                }
              />
            ))}
          </div>

          {/* header (title) */}
          <div className="md:col-span-1">
            <p className="font-medium mb-2">Header (Başlık)</p>
            {langs.map((l) => (
              <input
                key={`banner-header-${l}`}
                className="border p-2 rounded w-full mb-2"
                placeholder={`Header (${l})`}
                value={ensureLangObj(cert.banner?.header)[l]}
                onChange={(e) =>
                  setBanner({
                    header: { ...ensureLangObj(cert.banner?.header), [l]: e.target.value },
                  })
                }
              />
            ))}
          </div>

          {/* opacity toggle */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              id="banner-opacity"
              type="checkbox"
              checked={!!cert.banner?.opacity}
              onChange={(e) => setBanner({ opacity: e.target.checked })}
            />
            <label htmlFor="banner-opacity">Koyu katman/opacity aktif olsun</label>
          </div>
        </div>
      </FieldGroup>

      {/* ============= Section 1 ============= */}
      <FieldGroup label="Certificate — Section 1">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <ImageUploadInput
              label="Section1 Görseli"
              value={cert.section1?.image || ""}
              onChange={(v) => setSection1({ image: v })}
            />
          </div>

          <div>
            <p className="font-medium mb-2">Subtitle</p>
            {langs.map((l) => (
              <input
                key={`s1-subtitle-${l}`}
                className="border p-2 rounded w-full mb-2"
                placeholder={`Subtitle (${l})`}
                value={ensureLangObj(cert.section1?.subtitle)[l]}
                onChange={(e) =>
                  setSection1({
                    subtitle: { ...ensureLangObj(cert.section1?.subtitle), [l]: e.target.value },
                  })
                }
              />
            ))}
          </div>

          <div>
            <p className="font-medium mb-2">Title</p>
            {langs.map((l) => (
              <input
                key={`s1-title-${l}`}
                className="border p-2 rounded w-full mb-2"
                placeholder={`Title (${l})`}
                value={ensureLangObj(cert.section1?.title)[l]}
                onChange={(e) =>
                  setSection1({
                    title: { ...ensureLangObj(cert.section1?.title), [l]: e.target.value },
                  })
                }
              />
            ))}
          </div>

          <div className="md:col-span-2">
            <p className="font-medium mb-2">Text</p>
            <div className="grid md:grid-cols-2 gap-3">
              {langs.map((l) => (
                <textarea
                  key={`s1-text-${l}`}
                  rows={3}
                  className="border p-2 rounded w-full"
                  placeholder={`Text (${l})`}
                  value={ensureLangObj(cert.section1?.text)[l]}
                  onChange={(e) =>
                    setSection1({
                      text: { ...ensureLangObj(cert.section1?.text), [l]: e.target.value },
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </FieldGroup>

      {/* ============= Certificates Carousel Images ============= */}
      <FieldGroup label="Certificates — Görseller">
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={addCertImage}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Görsel Ekle
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {(cert.certificates?.images || []).map((img, idx) => (
            <div key={idx} className="border rounded p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Görsel #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeCertImage(idx)}
                  className="text-red-600 hover:underline"
                >
                  Sil
                </button>
              </div>

              <ImageUploadInput
                label="Görsel"
                value={img || ""}
                onChange={(v) => updateCertImage(idx, v)}
              />
            </div>
          ))}
        </div>
      </FieldGroup>
    </div>
  );
}
