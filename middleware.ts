import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['es', 'en']
const defaultLocale = 'es'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return NextResponse.next()

    // Redirect if there is no locale
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next), files with extensions (e.g. .svg, .png), and api routes
        '/((?!_next|api|.*\\..*).*)',
    ],
}
