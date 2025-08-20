import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage1({ section1 }) {
  const t = useTranslations('HomePage');
  const locale = useLocale(); // "tr", "en", "de", "ru"

  const subtitle = section1?.subtitle?.[locale] || t('subtitle');
  const title = section1?.title?.[locale] || t('title');
  const text = section1?.text?.[locale] || t('text');
  const discoverMoreLink = section1?.discoverMoreLink || "/entertainment";

  return (
    <div className='flex flex-col w-full items-center justify-center my-[50px]'>
      <div className="flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[15px] md:gap-[25px] lg:gap-[35px] items-center justify-center text-center text-[#000] font-jost">
        <span className='text-[12px] font-medium leading-[14px] tracking-[0.48px] uppercase'>
          {subtitle}
        </span>
        <h2 className='text-[28px] md:text-[38px] lg:text-[48px] font-marcellus font-normal leading-normal lg:leading-[57.6px] lg:capsizedText2'>
          {title}
        </h2>
        <p className='text-center text-[14px] md:text-[16px] font-normal leading-[20.8px] lg:leading-[24px] md:max-w-[490px] lg:max-w-[736px]'>
          {text}
        </p>
        <Link
          href={discoverMoreLink}
          className='hidden lg:flex underline underline-offset-[6px] text-lagoBrown text-[16px] font-normal uppercase leading-[30px] font-marcellus'
        >
          {t('discovermore')}
        </Link>
      </div>
    </div>
  );
}