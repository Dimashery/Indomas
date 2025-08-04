// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Role constants sesuai dengan backend Laravel
const ROLES = {
  SUPERADMIN: '1',
  ADMIN: '2',
  PENGGUNA: '3'
} as const;

// Route constants
const ROUTES = {
  ADMIN: '/dashboard-admin',
  PENGGUNA: '/home'
} as const;

// Daftar rute yang bisa diakses tanpa login (including /home as public)
const publicRoutes = ['/', '/auth/login', '/auth/signup', '/home'];

// Daftar ekstensi file yang diizinkan tanpa login
const publicFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.webp'];

// Rute khusus untuk admin/superadmin (role 1 dan 2)
const adminRoutes = [
  '/berita-admin',
  '/bidang-admin',
  '/bidang-kajian-admin',
  '/dashboard-admin',
  '/data-organisasi-admin',
  '/detail-data-organisasi',
  '/faq-admin',
  '/profile-admin',
  '/tentang-kami-admin'
];

// Rute khusus untuk pengguna (role 3)
const penggunaRoutes = [
  '/berita',
  '/buat-berita',
  '/daftar-ormas',
  '/detail-list-ormas',
  '/faq',
  '/list-ormas',
  '/profile'
];

// Function untuk redirect dengan cleanup localStorage
const redirectWithCleanup = (url: string, request: NextRequest) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script>
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userData');
        </script>
      </head>
      <body>
        <script>
          window.location.href = '${url}';
        </script>
      </body>
    </html>
  `;
  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
};

// Function untuk mengecek apakah path cocok dengan route
const isRouteMatch = (pathname: string, routes: string[]): boolean => {
  return routes.some(route => pathname.startsWith(route));
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userRole = request.cookies.get('userRole')?.value;
  const pathname = request.nextUrl.pathname;

  // Default redirect untuk root path "/"
  if (pathname === "/") {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Cek apakah path adalah file publik
  const isPublicFile = publicFileExtensions.some(ext => pathname.toLowerCase().endsWith(ext));
  if (isPublicFile) {
    return NextResponse.next();
  }

  // Jika mencoba akses rute public, izinkan akses
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Jika tidak ada token dan mencoba akses rute protected
  if (!token) {
    return redirectWithCleanup('/auth/login', request);
  }

  // Jika ada token, cek role untuk akses rute
  if (token && userRole) {
    // Redirect default berdasarkan role
    if (pathname === '/dashboard') {
      return userRole === ROLES.PENGGUNA
        ? NextResponse.redirect(new URL(ROUTES.PENGGUNA, request.url))
        : NextResponse.redirect(new URL(ROUTES.ADMIN, request.url));
    }

    // Untuk Admin/SuperAdmin (Role 1 dan 2)
    if (userRole === ROLES.SUPERADMIN || userRole === ROLES.ADMIN) {
      if (isRouteMatch(pathname, adminRoutes)) {
        return NextResponse.next();
      }
      if (isRouteMatch(pathname, penggunaRoutes)) {
        return NextResponse.redirect(new URL(ROUTES.ADMIN, request.url));
      }
      if (['/faq', '/profile'].some(route => pathname.startsWith(route))) {
        return NextResponse.next();
      }
    }

    // Untuk Pengguna (Role 3)
    if (userRole === ROLES.PENGGUNA) {
      if (isRouteMatch(pathname, penggunaRoutes)) {
        return NextResponse.next();
      }
      if (isRouteMatch(pathname, adminRoutes)) {
        return NextResponse.redirect(new URL(ROUTES.PENGGUNA, request.url));
      }
      if (['/faq', '/profile'].some(route => pathname.startsWith(route))) {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

// Konfigurasi path yang akan dijalankan middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};