"use client";
import { useState, useRef } from "react";
import Image from "next/image";

interface AdminEmail {
  id: string;
  name: string;
  email: string;
  timeAdded: string;
}

const Section1ProfileAdmin = () => {
  const [profileData, setProfileData] = useState({
    name: "Admin",
    email: "kesbangpol.kotabatu@gmail.com",
    password: "defaultpassword123", // Pre-filled password
    confirmPassword: "",
  });

  const [adminEmails, setAdminEmails] = useState<AdminEmail[]>([
    {
      id: "1",
      name: "Admin Utama",
      email: "kesbangpol.kotabatu@gmail.com",
      timeAdded: "1 month ago",
    },
    {
      id: "2",
      name: "Alexa Rawles",
      email: "alexarawles@gmail.com",
      timeAdded: "1 month ago",
    },
  ]);

  const [newAdminData, setNewAdminData] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === "confirmPassword" || field === "password") {
      const password = field === "password" ? value : profileData.password;
      const confirmPassword = field === "confirmPassword" ? value : profileData.confirmPassword;
      
      if (confirmPassword !== "") {
        setPasswordMatch(password === confirmPassword);
      } else {
        setPasswordMatch(true);
      }
    }
  };

  const handleNewAdminChange = (field: string, value: string) => {
    setNewAdminData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddEmail = () => {
    if (newAdminData.name.trim() && newAdminData.email.trim() && newAdminData.password.trim() && 
        !adminEmails.some(admin => admin.email === newAdminData.email)) {
      const newAdmin: AdminEmail = {
        id: Date.now().toString(),
        name: newAdminData.name.trim(),
        email: newAdminData.email.trim(),
        timeAdded: "Just now",
      };
      setAdminEmails(prev => [...prev, newAdmin]);
      setNewAdminData({
        name: "",
        email: "",
        password: ""
      });
      // Here you would typically save the password to your backend
      console.log("New admin data:", newAdminData);
    } else {
      alert("Nama, email, dan password harus diisi dan email belum terdaftar!");
    }
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      // Reset confirm password when entering edit mode
      setProfileData(prev => ({
        ...prev,
        confirmPassword: ""
      }));
      setShowPassword(false); // Reset password visibility when entering edit mode
    }
  };

  const handleDeleteEmail = (id: string) => {
    setAdminEmails(prev => prev.filter(email => email.id !== id));
  };

  const handlePhotoClick = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("Selected file:", file);
    }
  };

  const handleSave = () => {
    if (isEditMode && profileData.password && !passwordMatch) {
      alert("Password dan Confirm Password tidak cocok!");
      return;
    }
    
    // Handle save logic here
    console.log("Profile data:", profileData);
    console.log("Admin emails:", adminEmails);
    alert("Profile berhasil disimpan!");
    setIsEditMode(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-20 bg-gray-100 min-h-screen">
      {/*
        PENJELASAN RESPONSIVE PADDING:
        - p-4: Padding 1rem (16px) untuk mobile
        - sm:p-6: Padding 1.5rem (24px) untuk small screens
        - md:p-8: Padding 2rem (32px) untuk medium screens  
        - lg:p-20: Padding 5rem (80px) untuk large screens (original)
      */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          Profile Admin
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            {/*
              PENJELASAN HEADER RESPONSIVE:
              - flex-col: Stack vertical pada mobile
              - sm:flex-row: Horizontal layout pada screen >= sm
              - sm:items-center: Center alignment untuk screen >= sm
              - space-y-4 sm:space-y-0: Vertical spacing pada mobile, hilang pada desktop
            */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-yellow-500 rounded-full flex items-center justify-center transition-colors ${
                  isEditMode ? 'cursor-pointer hover:bg-yellow-600' : 'cursor-default'
                }`}>
                  <Image
                    src="/api/placeholder/80/80"
                    alt="Admin Profile"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                    onClick={handlePhotoClick}
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Admin</h2>
                <p className="text-sm sm:text-base text-gray-600 break-all sm:break-normal">
                  {profileData.email}
                </p>
                {/*
                  PENJELASAN EMAIL RESPONSIVE:
                  - break-all: Potong email pada mobile jika terlalu panjang
                  - sm:break-normal: Kembali ke normal pada screen >= sm
                */}
              </div>
            </div>
            <button
              onClick={handleEditToggle}
              className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 rounded-md font-medium transition-colors w-full sm:w-auto text-sm sm:text-base"
            >
              {isEditMode ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditMode}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 text-sm sm:text-base ${
                  !isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Admin"
              />
            </div>

            {/* Email Field - Always disabled */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                disabled={true}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-gray-800 text-sm sm:text-base"
                placeholder="kesbangpol.kotabatu@gmail.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={isEditMode && showPassword ? "text" : "password"}
                  value={isEditMode ? profileData.password : "••••••••••••••••"}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  onFocus={() => setShowPasswordFields(true)}
                  disabled={!isEditMode}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 text-sm sm:text-base ${
                    !isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="••••••••••••••••"
                />
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M18.364 5.636L16.95 7.05m0 0l-2.829 2.829m-4.242 4.242L7.05 16.95m11.314-9.9a10.05 10.05 0 01-1.563 3.029M4.929 4.929l15.142 15.142" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Confirm Password Field - Only show in edit mode */}
            {isEditMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-gray-800 text-sm sm:text-base ${
                      !passwordMatch ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="••••••••••••••••"
                  />
                  
                </div>
                {!passwordMatch && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">Password tidak cocok</p>
                )}
              </div>
            )}
          </div>

          {/* Admin Email Address Section */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Admin Email Address
            </h3>
            
            {/* Email List */}
            <div className="space-y-2 sm:space-y-3 mb-4">
              {adminEmails.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    {/*
                      PENJELASAN EMAIL ITEM RESPONSIVE:
                      - min-w-0: Mencegah flex item melebar berlebihan
                      - flex-1: Mengambil ruang yang tersedia
                      - space-x-2 sm:space-x-3: Responsive spacing
                    */}
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-800 font-medium text-sm sm:text-base truncate">{admin.name}</p>
                      <p className="text-gray-600 text-xs sm:text-sm truncate">{admin.email}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">{admin.timeAdded}</p>
                      {/*
                        PENJELASAN TEXT RESPONSIVE:
                        - truncate: Potong text yang terlalu panjang
                        - text-xs sm:text-sm: Responsive font size
                      */}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEmail(admin.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-lg sm:text-xl flex-shrink-0 ml-2"
                  >
                    −
                  </button>
                </div>
              ))}
            </div>

            {/* Add Email Section - Only show in edit mode */}
            {isEditMode && (
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {/*
                    PENJELASAN ADD ADMIN RESPONSIVE:
                    - grid-cols-1: Single column pada mobile
                    - sm:grid-cols-2: Two columns pada small screens
                    - lg:grid-cols-3: Three columns pada large screens (original)
                  */}
                  <input
                    type="text"
                    value={newAdminData.name}
                    onChange={(e) => handleNewAdminChange("name", e.target.value)}
                    placeholder="Nama admin"
                    className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    value={newAdminData.email}
                    onChange={(e) => handleNewAdminChange("email", e.target.value)}
                    placeholder="Email admin"
                    className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 text-sm sm:text-base"
                  />
                  <input
                    type="password"
                    value={newAdminData.password}
                    onChange={(e) => handleNewAdminChange("password", e.target.value)}
                    placeholder="Password"
                    className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 text-sm sm:text-base"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleAddEmail}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors w-full sm:w-auto text-sm sm:text-base"
                  >
                    + Add Admin
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Save Button - Only show when in edit mode */}
          {isEditMode && (
            <div className="mt-6 sm:mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium transition-colors w-full sm:w-auto text-sm sm:text-base"
              >
                Simpan Perubahan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section1ProfileAdmin;