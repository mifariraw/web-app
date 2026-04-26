import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@src/i18n/routing';
import MobileNavbar from '@components/MobileNavbar';
import Navbar from '@components/Navbar';
 
type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};
 
export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <NextIntlClientProvider>
      <MobileNavbar />
      <Navbar />
      {children}
    </NextIntlClientProvider>
  )
}

