// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin1\Indomas\components\user\signup_components\fetch.tsx

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Interface untuk data yang akan dikirim ke API
export interface SignupRequestData {
  nama_pengguna: string;
  email_pengguna: string;
  password_pengguna: string;
  password_pengguna_confirmation: string;
  alamat_pengguna: string;
  no_telpon_pengguna: string;
}

// Interface untuk response dari API
export interface SignupResponseData {
  success: boolean;
  message: string;
  data: {
    pengguna: {
      id: number;
      nama_pengguna: string;
      email_pengguna: string;
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

// Interface untuk error response
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

// Custom error class untuk API errors
export class ApiError extends Error {
  public status: number;
  public errors?: { [key: string]: string[] };

  constructor(message: string, status: number, errors?: { [key: string]: string[] }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

// Fungsi untuk melakukan signup
export const signupUser = async (data: SignupRequestData): Promise<SignupResponseData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register-pengguna`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Jika response tidak OK, throw error dengan detail
      throw new ApiError(
        responseData.message || 'Terjadi kesalahan saat mendaftar',
        response.status,
        responseData.errors
      );
    }

    // Jika sukses, return data
    if (responseData.success) {
      return responseData as SignupResponseData;
    } else {
      throw new ApiError(
        responseData.message || 'Pendaftaran gagal',
        response.status,
        responseData.errors
      );
    }
  } catch (error) {
    // Handle network errors atau errors lainnya
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network error atau error lainnya
    throw new ApiError(
      'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
      0
    );
  }
};

// Fungsi helper untuk mapping data dari form ke format API
export const mapFormDataToApiData = (formData: {
  namaOrganisasi: string;
  email: string;
  password: string;
  confirmPassword: string;
  alamatOrganisasi: string;
  noHandphone: string;
}): SignupRequestData => {
  return {
    nama_pengguna: formData.namaOrganisasi,
    email_pengguna: formData.email,
    password_pengguna: formData.password,
    password_pengguna_confirmation: formData.confirmPassword,
    alamat_pengguna: formData.alamatOrganisasi,
    no_telpon_pengguna: formData.noHandphone,
  };
};

// Fungsi helper untuk menangani error messages
export const getErrorMessage = (error: ApiError): string => {
  if (error.errors) {
    // Jika ada validation errors, ambil error pertama
    const firstError = Object.values(error.errors)[0];
    if (firstError && firstError.length > 0) {
      return firstError[0];
    }
  }
  
  return error.message;
};

// Fungsi helper untuk menyimpan token ke localStorage (opsional)
export const saveAuthData = (authData: SignupResponseData['data']) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', authData.access_token);
    localStorage.setItem('token_type', authData.token_type);
    localStorage.setItem('role', authData.role);
    localStorage.setItem('expires_at', authData.expires_at);
    localStorage.setItem('user_data', JSON.stringify(authData.pengguna));
  }
};