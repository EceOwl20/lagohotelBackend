"use client";
import React from "react";

const Field = ({ label, children }) => (
  <section className="p-4 border rounded bg-white mb-6">
    <h3 className="font-semibold text-lg mb-3">{label}</h3>
    {children}
  </section>
);

// {tr,en,de,ru} objelerini güvenle doldurur
const ensureLangObj = (langs, obj = {}) =>
  langs.reduce((acc, l) => ({ ...acc, [l]: obj?.[l] || "" }), {});

export default function CookiesPageEdit({ data, setData, langs = ["tr","en","de","ru"] }) {
  const cp = data.cookiePage || {};

  // ---- küçük setter’lar
  const setCP = (patch) =>
    setData(prev => ({ ...prev, cookiePage: { ...(prev.cookiePage || {}), ...patch } }));

  const setBar = (patch) =>
    setCP({ barTexts: { ...(cp.barTexts || {}), ...patch } });

  const setTabs = (arr) => setCP({ tabs: arr });
  const setToggles = (arr) => setCP({ toggles: arr });

  return (
    <div className="space-y-6 max-w-[1000px] mx-auto">
      {/* BAR TEXTS */}
      <Field label="Alt Çubuk (Bar) Metinleri">
        {[
          ["cookie", "Cookie (kısa başlık)"],
          ["cookieText", "CookieText (kısa açıklama)"],
          ["read", "Read (link yazısı)"],
          ["about", "About (link devamı)"],
          ["deny", "Deny"],
          ["accept", "Accept"],
          ["manage", "Manage"],
        ].map(([key, label]) => (
          <div key={key} className="mb-4">
            <h4 className="font-medium mb-2">{label}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {langs.map(l => (
                <input
                  key={`${key}-${l}`}
                  className="border rounded p-2 w-full"
                  placeholder={`${label} (${l.toUpperCase()})`}
                  value={ensureLangObj(langs, cp.barTexts?.[key])[l]}
                  onChange={(e) =>
                    setBar({
                      [key]: {
                        ...ensureLangObj(langs, cp.barTexts?.[key]),
                        [l]: e.target.value
                      }
                    })
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </Field>

      {/* TABS */}
      <Field label="Modal Sekmeleri (Tabs)">
        <div className="flex justify-between mb-3">
          <span />
          <button
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={() => setTabs([...(cp.tabs || []), { key: "custom", title: {}, content: {} }])}
          >
            + Sekme Ekle
          </button>
        </div>

        {(cp.tabs || []).map((tab, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="flex justify-between mb-2">
              <strong>Sekme #{idx + 1} ({tab.key || "-"})</strong>
              <button
                className="text-red-600"
                onClick={() => setTabs((cp.tabs || []).filter((_, i) => i !== idx))}
              >
                Sil
              </button>
            </div>

            <input
              className="border rounded p-2 mb-3 w-full"
              placeholder="key (ör: policy/clarification/what)"
              value={tab.key || ""}
              onChange={(e) =>
                setTabs((cp.tabs || []).map((t, i) => i === idx ? ({ ...t, key: e.target.value }) : t))
              }
            />

            <div className="mb-3">
              <h4 className="font-medium mb-2">Sekme Başlığı</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {langs.map(l => (
                  <input
                    key={`tab-title-${idx}-${l}`}
                    className="border rounded p-2 w-full"
                    placeholder={`Title (${l.toUpperCase()})`}
                    value={ensureLangObj(langs, tab.title)[l]}
                    onChange={(e) =>
                      setTabs((cp.tabs || []).map((t, i) => i === idx
                        ? ({ ...t, title: { ...ensureLangObj(langs, t.title), [l]: e.target.value } })
                        : t
                      ))
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Sekme İçeriği</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {langs.map(l => (
                  <textarea
                    key={`tab-content-${idx}-${l}`}
                    rows={6}
                    className="border rounded p-2 w-full"
                    placeholder={`Content (${l.toUpperCase()})`}
                    value={ensureLangObj(langs, tab.content)[l]}
                    onChange={(e) =>
                      setTabs((cp.tabs || []).map((t, i) => i === idx
                        ? ({ ...t, content: { ...ensureLangObj(langs, t.content), [l]: e.target.value } })
                        : t
                      ))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Field>

      {/* TOGGLES */}
      <Field label="Kategoriler (Toggle/Dropdown)">
        <div className="flex justify-between mb-3">
          <span />
          <button
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={() => setToggles([...(cp.toggles || []), { key: "new", title: {}, description: {} }])}
          >
            + Kategori Ekle
          </button>
        </div>

        {(cp.toggles || []).map((item, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="flex justify-between mb-2">
              <strong>Kategori #{idx + 1} ({item.key || "-"})</strong>
              <button
                className="text-red-600"
                onClick={() => setToggles((cp.toggles || []).filter((_, i) => i !== idx))}
              >
                Sil
              </button>
            </div>

            <input
              className="border rounded p-2 mb-3 w-full"
              placeholder="key (necessary/performance/functional/targeting)"
              value={item.key || ""}
              onChange={(e) =>
                setToggles((cp.toggles || []).map((t, i) => i === idx ? ({ ...t, key: e.target.value }) : t))
              }
            />

            <div className="mb-3">
              <h4 className="font-medium mb-2">Başlık</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {langs.map(l => (
                  <input
                    key={`toggle-title-${idx}-${l}`}
                    className="border rounded p-2 w-full"
                    placeholder={`Title (${l.toUpperCase()})`}
                    value={ensureLangObj(langs, item.title)[l]}
                    onChange={(e) =>
                      setToggles((cp.toggles || []).map((t, i) => i === idx
                        ? ({ ...t, title: { ...ensureLangObj(langs, t.title), [l]: e.target.value } })
                        : t
                      ))
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Açıklama</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {langs.map(l => (
                  <textarea
                    key={`toggle-desc-${idx}-${l}`}
                    rows={4}
                    className="border rounded p-2 w-full"
                    placeholder={`Description (${l.toUpperCase()})`}
                    value={ensureLangObj(langs, item.description)[l]}
                    onChange={(e) =>
                      setToggles((cp.toggles || []).map((t, i) => i === idx
                        ? ({ ...t, description: { ...ensureLangObj(langs, t.description), [l]: e.target.value } })
                        : t
                      ))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Field>
    </div>
  );
}