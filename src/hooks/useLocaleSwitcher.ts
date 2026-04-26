"use client";

import {useRouter, usePathname} from "@src/i18n/navigation";
import {useParams} from "next/navigation";
import {useLocale} from "next-intl";

type RawParams = Record<string, string | string[] | undefined>;
type SafeParams = Record<string, string>;

function normalizeParams(params: RawParams): SafeParams {
  const result: SafeParams = {};

  for (const key in params) {
    const value = params[key];

    if (typeof value === "string") {
      result[key] = value;
    } else if (Array.isArray(value)) {
      result[key] = value[0];
    }
  }

  return result;
}

export function useLocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams() as RawParams;
  const locale = useLocale();

  const switchLocale = (nextLocale?: "en" | "ro") => {
    const targetLocale =
      nextLocale ?? (locale === "ro" ? "en" : "ro");

    const safeParams = normalizeParams(params);

    // router.replace(
    //   {
    //     pathname,
    //     params: safeParams
    //   },
    //   {locale: targetLocale}
    // );
  };

  return {switchLocale, locale};
}