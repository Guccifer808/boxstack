// import { NextRequest, NextResponse } from 'next/server'
// import { match } from '@formatjs/intl-localematcher'
// import Negotiator from 'negotiator'

// let locales = ['uk', 'en']
// export let defaultLocale = 'uk'

// function getLocale(request) {
//   const headers = new Headers(request.headers)
//   const acceptLanguage = headers.get('accept-language')
//   if (acceptLanguage) {
//     headers.set('accept-language', acceptLanguage.replaceAll('_', '-'))
//   }

//   const headersObject = Object.fromEntries(headers.entries())
//   const languages = new Negotiator({ headers: headersObject }).languages()
//   return match(languages, locales, defaultLocale)
// }

// export function middleware(request) {
//   // Get the detected locale or use the default locale
//   let locale = getLocale(request) ?? defaultLocale

//   // Extract the pathname from the request URL
//   const pathname = request.nextUrl.pathname

//   // If the pathname is empty (root URL), redirect to the default locale directory
//   if (pathname === '/') {
//     const defaultLocaleUrl = new URL(`/${defaultLocale}`, request.nextUrl)
//     return NextResponse.redirect(defaultLocaleUrl)
//   }

//   // Construct the new URL with the language prefix
//   const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl)

//   // Rewrite the URL with the language prefix
//   return NextResponse.rewrite(newUrl)
// }

// export const config = {
//   // Define the matcher to include all paths except API and static assets
//   // matcher: ['/((?!api|_next|.*\\..*).*)'],
//   matcher: ['/((?!api|_next|.*\\..*\\.jpg|.*\\..*\\.png).*)'],
// }

// src/middleware.js
import { NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['uk', 'en']
export let defaultLocale = 'uk'

function getLocale(request) {
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get('accept-language')
  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll('_', '-'))
  }

  const headersObject = Object.fromEntries(headers.entries())
  const languages = new Negotiator({ headers: headersObject }).languages()
  return match(languages, locales, defaultLocale)
}

export function middleware(request) {
  // Get the detected locale or use the default locale
  let locale = getLocale(request) ?? defaultLocale

  // Extract the pathname from the request URL
  const pathname = request.nextUrl.pathname

  // If the pathname is empty (root URL), redirect to the default locale directory
  if (pathname === '/') {
    const defaultLocaleUrl = new URL(`/${defaultLocale}`, request.nextUrl)
    return NextResponse.redirect(defaultLocaleUrl)
  }

  // Do not rewrite API routes, static files, or paths that end in an extension
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.match(/\.\w+$/)
  ) {
    return NextResponse.next()
  }

  // Rewrite the URL with the language prefix if it doesn't already have one
  if (!locales.some((loc) => pathname.startsWith(`/${loc}`))) {
    const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl)
    return NextResponse.rewrite(newUrl)
  }

  // If the pathname includes a locale, proceed as normal
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
