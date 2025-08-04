// types/auth.ts

export interface LoginCredentials {
    email_pengguna: string;
    password_pengguna: string;
    rememberMe?: boolean;
  }
  
  // Response untuk login pengguna
  export interface LoginPenggunaResponse {
    success: boolean;
    message: string;
    data: {
      pengguna: {
        id: number;
        nama_pengguna: string;
        email_pengguna: string;
        email_verified_at: string | null;
        alamat_pengguna: string;
        no_telpon_pengguna: string;
        created_at: string;
        updated_at: string;
      };
      access_token: string;
      token_type: string;
      role: string;
      expires_at: string;
    };
  }
  
  // Response untuk login admin
  export interface LoginAdminResponse {
    success: boolean;
    message: string;
    data: {
      admin: {
        id: number;
        nama_admin: string;
        email_admin: string;
        email_verified_at: string | null;
        level_admin: string;
        is_active: number;
        created_at: string;
        updated_at: string;
      };
      access_token: string;
      token_type: string;
      role: string;
      expires_at: string;
      redirect_url: string;
    };
  }
  
  // Union type untuk response
  export type LoginResponse = LoginPenggunaResponse | LoginAdminResponse;
  
  // Role mapping sesuai dengan backend Laravel
  export const ROLES = {
    SUPERADMIN: 1,
    ADMIN: 2,
    PENGGUNA: 3
  } as const;
  
  // Route mapping berdasarkan role
  export const ROUTES = {
    ADMIN: '/dashboard-admin', // untuk Role 1 (SuperAdmin) dan Role 2 (Admin)
    PENGGUNA: '/home' // untuk Role 3 (Pengguna)
  } as const;
  
  // API endpoints
  export const API_ENDPOINTS = {
    LOGIN_PENGGUNA: '/api/auth/login-pengguna',
    LOGIN_ADMIN: '/api/auth/login-admin'
  } as const;