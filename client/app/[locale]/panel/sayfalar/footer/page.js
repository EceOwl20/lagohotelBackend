"use client";
import { useEffect, useState } from "react";

const langs = ["tr", "en", "de", "ru"];
const emptyLangs = { tr: "", en: "", de: "", ru: "" };

const emptyQuickMenuItem = {
  title: { ...emptyLangs },
  links: [
    {
      text: { ...emptyLangs },
      url: ""
    }
  ]
};
const emptyBottomLink = { text: { ...emptyLangs }, url: "" };

const defaultFooter = {
  social: { tripadvisor: "", google: "", facebook: "", youtube: "", instagram: "" },
  quickMenu: [],
  bottomLinks: [],
  contact: {
    phoneLabel: { ...emptyLangs },
    phone: "",
    callCenterLabel: { ...emptyLangs },
    callCenter: "",
    emailLabel: { ...emptyLangs },
    email: "",
    addressLabel: { ...emptyLangs },
    address: { ...emptyLangs }
  }
};

export default function Page() {
  const [footer, setFooter] = useState(defaultFooter);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/footer");
        if (!res.ok) throw new Error("Footer getirilemedi");
        const json = await res.json();
        setFooter(json || defaultFooter);
      } catch {
        setFooter(defaultFooter);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  const handleChange = (field, value) => setFooter(prev => ({ ...prev, [field]: value }));
  const handleContactChange = (key, lang, value) => {
    setFooter(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: lang ? { ...prev.contact[key], [lang]: value } : value
      }
    }));
  };

  // Quick Menu
 // Quick Menu
const addQuickMenu = () =>
  setFooter(prev => ({
    ...prev,
    quickMenu: [
      ...(prev.quickMenu || []),
      JSON.parse(JSON.stringify(emptyQuickMenuItem))
    ]
  }));

const addQuickMenuLink = idx => {
  const updated = footer.quickMenu.map((item, i) =>
    i === idx
      ? { ...item, links: [...item.links, { text: { ...emptyLangs }, url: "" }] }
      : item
  );
  setFooter(prev => ({ ...prev, quickMenu: updated }));
};
const removeQuickMenuLink = (idx, lidx) => {
  const updated = footer.quickMenu.map((item, i) =>
    i === idx
      ? { ...item, links: item.links.filter((_, j) => j !== lidx) }
      : item
  );
  setFooter(prev => ({ ...prev, quickMenu: updated }));
};
const handleQuickMenuTitle = (idx, lang, value) => {
  const updated = footer.quickMenu.map((item, i) =>
    i === idx
      ? { ...item, title: { ...item.title, [lang]: value } }
      : item
  );
  setFooter(prev => ({ ...prev, quickMenu: updated }));
};
const handleQuickMenuLink = (idx, lidx, lang, value) => {
  const updated = footer.quickMenu.map((item, i) =>
    i === idx
      ? {
          ...item,
          links: item.links.map((link, j) =>
            j === lidx
              ? { ...link, text: { ...link.text, [lang]: value } }
              : link
          )
        }
      : item
  );
  setFooter(prev => ({ ...prev, quickMenu: updated }));
};
const handleQuickMenuLinkUrl = (idx, lidx, value) => {
  const updated = footer.quickMenu.map((item, i) =>
    i === idx
      ? {
          ...item,
          links: item.links.map((link, j) =>
            j === lidx
              ? { ...link, url: value }
              : link
          )
        }
      : item
  );
  setFooter(prev => ({ ...prev, quickMenu: updated }));
};

  // Bottom Links
 const addBottomLink = () =>
  setFooter(prev => ({
    ...prev,
    bottomLinks: [
      ...(prev.bottomLinks || []),
      JSON.parse(JSON.stringify(emptyBottomLink))
    ]
  }));

const handleBottomLink = (idx, lang, value) => {
  const updated = footer.bottomLinks.map((item, i) =>
    i === idx
      ? { ...item, text: { ...item.text, [lang]: value } }
      : item
  );
  setFooter(prev => ({ ...prev, bottomLinks: updated }));
};

const handleBottomLinkUrl = (idx, value) => {
  const updated = footer.bottomLinks.map((item, i) =>
    i === idx
      ? { ...item, url: value }
      : item
  );
  setFooter(prev => ({ ...prev, bottomLinks: updated }));
};

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/footer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(footer),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Güncelleme başarısız");
      setSuccess("✅ Footer başarıyla güncellendi!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="p-6">Yükleniyor...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4">Footer Düzenle</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Sosyal Medya */}
        <div>
          <h2 className="font-semibold mb-2">Sosyal Medya Linkleri</h2>
          {Object.keys(footer.social).map(soc => (
            <div key={soc} className="mb-2">
              <label className="capitalize">{soc}</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={footer.social[soc] || ""}
                onChange={e => setFooter(prev => ({
                  ...prev,
                  social: { ...prev.social, [soc]: e.target.value }
                }))}
              />
            </div>
          ))}
        </div>

        {/* Quick Menu */}
        <div>
          <h2 className="font-semibold mb-2">Quick Menu</h2>
          {(footer.quickMenu || []).map((item, idx) => (
            <div key={idx} className="border rounded p-3 mb-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Başlık</span>
                <button type="button" className="text-red-500" onClick={() => removeQuickMenu(idx)}>Sil</button>
              </div>
              <div className="flex gap-2 mt-2">
                {langs.map(lang => (
                  <input
                    key={lang}
                    placeholder={`Başlık (${lang})`}
                    className="border p-2 rounded w-1/4"
                    value={item.title?.[lang] || ""}
                    onChange={e => handleQuickMenuTitle(idx, lang, e.target.value)}
                  />
                ))}
              </div>
              <div className="mt-3 space-y-2">
                {(item.links || []).map((link, lidx) => (
                  <div key={lidx} className="flex gap-2 items-center">
                    {langs.map(lang => (
                      <input
                        key={lang}
                        placeholder={`Link metni (${lang})`}
                        className="border p-2 rounded w-1/4"
                        value={link.text?.[lang] || ""}
                        onChange={e => handleQuickMenuLink(idx, lidx, lang, e.target.value)}
                      />
                    ))}
                    <input
                      type="text"
                      placeholder="URL"
                      className="border p-2 rounded w-2/5"
                      value={link.url || ""}
                      onChange={e => handleQuickMenuLinkUrl(idx, lidx, e.target.value)}
                    />
                    <button type="button" className="text-red-500" onClick={() => removeQuickMenuLink(idx, lidx)}>Sil</button>
                  </div>
                ))}
                <button type="button" className="mt-2 text-green-600" onClick={() => addQuickMenuLink(idx)}>+ Link Ekle</button>
              </div>
            </div>
          ))}
          <button type="button" className="bg-green-600 text-white px-3 py-1 rounded" onClick={addQuickMenu}>+ Menü Ekle</button>
        </div>

        {/* Bottom Links */}
        <div>
          <h2 className="font-semibold mb-2">Alt Linkler</h2>
          {(footer.bottomLinks || []).map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2 items-center">
              {langs.map(lang => (
                <input
                  key={lang}
                  placeholder={`Link metni (${lang})`}
                  className="border p-2 rounded w-1/5"
                  value={item.text?.[lang] || ""}
                  onChange={e => handleBottomLink(idx, lang, e.target.value)}
                />
              ))}
              <input
                type="text"
                placeholder="URL"
                className="border p-2 rounded w-2/5"
                value={item.url || ""}
                onChange={e => handleBottomLinkUrl(idx, e.target.value)}
              />
              <button type="button" className="text-red-500" onClick={() => removeBottomLink(idx)}>Sil</button>
            </div>
          ))}
          <button type="button" className="bg-green-600 text-white px-3 py-1 rounded" onClick={addBottomLink}>+ Alt Link Ekle</button>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold mb-2">İletişim Alanları</h2>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label>Telefon Label</label>
              {langs.map(lang => (
                <input
                  key={lang}
                  placeholder={`Telefon Label (${lang})`}
                  className="border p-2 rounded w-full mb-1"
                  value={footer.contact.phoneLabel?.[lang] || ""}
                  onChange={e => handleContactChange("phoneLabel", lang, e.target.value)}
                />
              ))}
              <input
                type="text"
                placeholder="Telefon Numarası"
                className="border p-2 rounded w-full"
                value={footer.contact.phone || ""}
                onChange={e => handleContactChange("phone", null, e.target.value)}
              />
            </div>
            <div>
              <label>Çağrı Merkezi Label</label>
              {langs.map(lang => (
                <input
                  key={lang}
                  placeholder={`Call Center Label (${lang})`}
                  className="border p-2 rounded w-full mb-1"
                  value={footer.contact.callCenterLabel?.[lang] || ""}
                  onChange={e => handleContactChange("callCenterLabel", lang, e.target.value)}
                />
              ))}
              <input
                type="text"
                placeholder="Çağrı Merkezi Numarası"
                className="border p-2 rounded w-full"
                value={footer.contact.callCenter || ""}
                onChange={e => handleContactChange("callCenter", null, e.target.value)}
              />
            </div>
            <div>
              <label>E-posta Label</label>
              {langs.map(lang => (
                <input
                  key={lang}
                  placeholder={`E-posta Label (${lang})`}
                  className="border p-2 rounded w-full mb-1"
                  value={footer.contact.emailLabel?.[lang] || ""}
                  onChange={e => handleContactChange("emailLabel", lang, e.target.value)}
                />
              ))}
              <input
                type="text"
                placeholder="E-posta"
                className="border p-2 rounded w-full"
                value={footer.contact.email || ""}
                onChange={e => handleContactChange("email", null, e.target.value)}
              />
            </div>
            <div>
              <label>Adres Label</label>
              {langs.map(lang => (
                <input
                  key={lang}
                  placeholder={`Adres Label (${lang})`}
                  className="border p-2 rounded w-full mb-1"
                  value={footer.contact.addressLabel?.[lang] || ""}
                  onChange={e => handleContactChange("addressLabel", lang, e.target.value)}
                />
              ))}
              {langs.map(lang => (
                <input
                  key={lang}
                  placeholder={`Adres (${lang})`}
                  className="border p-2 rounded w-full mb-1"
                  value={footer.contact.address?.[lang] || ""}
                  onChange={e => handleContactChange("address", lang, e.target.value)}
                />
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Kaydet
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}