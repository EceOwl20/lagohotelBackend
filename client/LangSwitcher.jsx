import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LangSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale(); // Mevcut dil bilgisi
  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("locale", { locale })}>
      {routing.locales.map((cur) => {
        return (
          <div key={cur} value={cur}> {/* value prop'u ile dili geçiyoruz */}
            {t("locale", { locale: cur })} {/* Dilleri yazdırıyoruz */}
          </div>
        );
      })}
    </LocaleSwitcherSelect>
  );
}
