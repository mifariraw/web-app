import { defineRouting } from 'next-intl/routing';
import { pathnames } from './pathnames';
 
export const routing = defineRouting({
  locales: ['ro', 'en'],
 
  defaultLocale: 'ro',
  pathnames
});