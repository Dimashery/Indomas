// components/user/login_component/fetch.tsx

import { 
  LoginCredentials, 
  LoginResponse, 
  LoginPenggunaResponse, 
  LoginAdminResponse,
  API_ENDPOINTS,
  ROUTES 
} from '@/types/auth';

// Base URL dari environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Function untuk menyimpan data ke cookies
const setCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Function untuk mendapatkan role number dari string
const getRoleNumber = (roleString: string): number => {
  switch (roleString.toLowerCase()) {
    case 'super_admin':
    case 'superadmin':
      return 1; // SuperAdmin
    case 'admin':
      return 2; // Admin
    case 'pengguna':
      return 3; // Pengguna
    default:
      return 3; // Default ke pengguna
  }
};

// Function untuk mendapatkan redirect URL berdasarkan role
const getRedirectUrl = (role: number): string => {
  // Role 1 (SuperAdmin) dan Role 2 (Admin) ke dashboard admin
  if (role === 1 || role === 2) {
    return ROUTES.ADMIN;
  }
  // Role 3 (Pengguna) ke home
  return ROUTES.PENGGUNA;
};

// Function untuk login sebagai pengguna
const loginPengguna = async (credentials: LoginCredentials): Promise<LoginPenggunaResponse> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN_PENGGUNA}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email_pengguna: credentials.email_pengguna,
      password_pengguna: credentials.password_pengguna,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Function untuk login sebagai admin
const loginAdmin = async (credentials: LoginCredentials): Promise<LoginAdminResponse> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN_ADMIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email_admin: credentials.email_pengguna, // Gunakan email_admin untuk endpoint admin
      password_admin: credentials.password_pengguna, // Gunakan password_admin untuk endpoint admin
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Main login function yang mencoba kedua endpoint
export const performLogin = async (credentials: LoginCredentials): Promise<{
  success: boolean;
  message: string;
  redirectUrl: string;
}> => {
  try {
    // Coba login sebagai admin terlebih dahulu
    try {
      const adminResponse = await loginAdmin(credentials);
      
      if (adminResponse.success) {
        const roleNumber = getRoleNumber(adminResponse.data.role);
        const redirectUrl = getRedirectUrl(roleNumber);
        
        // Simpan data ke cookies
        setCookie('token', adminResponse.data.access_token);
        setCookie('userRole', roleNumber.toString());
        setCookie('userData', JSON.stringify({
          id: adminResponse.data.admin.id,
          name: adminResponse.data.admin.nama_admin,
          email: adminResponse.data.admin.email_admin,
          role: adminResponse.data.role,
          roleNumber: roleNumber,
          level_admin: adminResponse.data.admin.level_admin
        }));
        
        // Simpan juga ke localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', adminResponse.data.access_token);
          localStorage.setItem('userRole', roleNumber.toString());
          localStorage.setItem('userData', JSON.stringify({
            id: adminResponse.data.admin.id,
            name: adminResponse.data.admin.nama_admin,
            email: adminResponse.data.admin.email_admin,
            role: adminResponse.data.role,
            roleNumber: roleNumber,
            level_admin: adminResponse.data.admin.level_admin
          }));
        }
        
        return {
          success: true,
          message: adminResponse.message,
          redirectUrl: redirectUrl
        };
      }
    } catch (adminError) {
      // Jika gagal login sebagai admin, coba sebagai pengguna
      console.log('Login admin gagal, mencoba login pengguna...');
    }

    // Coba login sebagai pengguna
    try {
      const penggunaResponse = await loginPengguna(credentials);
      
      if (penggunaResponse.success) {
        const roleNumber = getRoleNumber(penggunaResponse.data.role);
        const redirectUrl = getRedirectUrl(roleNumber);
        
        // Simpan data ke cookies
        setCookie('token', penggunaResponse.data.access_token);
        setCookie('userRole', roleNumber.toString());
        setCookie('userData', JSON.stringify({
          id: penggunaResponse.data.pengguna.id,
          name: penggunaResponse.data.pengguna.nama_pengguna,
          email: penggunaResponse.data.pengguna.email_pengguna,
          role: penggunaResponse.data.role,
          roleNumber: roleNumber
        }));
        
        // Simpan juga ke localStorage untuk akses yang lebih mudah
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', penggunaResponse.data.access_token);
          localStorage.setItem('userRole', roleNumber.toString());
          localStorage.setItem('userData', JSON.stringify({
            id: penggunaResponse.data.pengguna.id,
            name: penggunaResponse.data.pengguna.nama_pengguna,
            email: penggunaResponse.data.pengguna.email_pengguna,
            role: penggunaResponse.data.role,
            roleNumber: roleNumber
          }));
        }
        
        return {
          success: true,
          message: penggunaResponse.message,
          redirectUrl: redirectUrl
        };
      }
    } catch (penggunaError) {
      console.log('Login pengguna juga gagal');
    }
    
    // Jika kedua login gagal
    throw new Error('Email atau password salah');
    
  } catch (error) {
    console.error('Login error:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login gagal',
      redirectUrl: ''
    };
  }
};

// Function untuk logout
export const performLogout = (): void => {
  // Hapus cookies
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  // Hapus localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
  }
  
  // Redirect ke login
  window.location.href = '/auth/login';
};

// Function untuk mengecek apakah user sudah login
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  return !!token;
};

// Function untuk mendapatkan user data
export const getUserData = () => {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};