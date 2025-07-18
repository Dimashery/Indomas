"use client";

import React, { useState } from "react";

interface AlertChangeProps {
  title?: string;
  message?: string;
  type?: "success" | "error" | "warning" | "info";
}

const AlertChange: React.FC<AlertChangeProps> = ({
  title = "Perubahan disimpan",
  message = "Perubahan Anda berhasil disimpan.",
  type = "success",
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const iconByType = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 text-green-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"
        />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 text-yellow-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 4h.01M5.4 20h13.2a2 2 0 001.73-2.97L13.73 4.97a2 2 0 00-3.46 0L3.67 17.03A2 2 0 005.4 20z"
        />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 text-blue-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8h.01M12 12v4m0 6a9 9 0 110-18 9 9 0 010 18z"
        />
      </svg>
    ),
  };

  return (
    <div
      role="alert"
      className="rounded-md border border-gray-300 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start gap-4">
        {iconByType[type]}

        <div className="flex-1">
          <strong className="font-medium text-gray-900">{title}</strong>
          <p className="mt-0.5 text-sm text-gray-700">{message}</p>
        </div>

        <button
          className="-m-3 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
          type="button"
          aria-label="Dismiss alert"
          onClick={() => setVisible(false)}
        >
          <span className="sr-only">Dismiss popup</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AlertChange;
