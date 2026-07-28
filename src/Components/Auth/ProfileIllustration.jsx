import React from "react";

export default function ProfileIllustration() {
  return (
    <svg
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="User profile illustration"
      className="auth-illustration"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="80" cy="90" r="48" fill="#007bff" opacity="0.12" />
      <circle cx="400" cy="380" r="56" fill="#ffc908" opacity="0.25" />
      <circle cx="420" cy="110" r="22" fill="#007bff" opacity="0.18" />

      <rect
        x="110"
        y="70"
        width="260"
        height="340"
        rx="28"
        fill="#ffffff"
        stroke="#007bff"
        strokeWidth="3"
      />

      <circle cx="240" cy="155" r="58" fill="#007bff" opacity="0.12" />
      <circle cx="240" cy="142" r="28" fill="#007bff" />
      <path
        d="M195 205c0-24 20-44 45-44s45 20 45 44v14H195v-14z"
        fill="#007bff"
      />

      <rect x="150" y="250" width="180" height="14" rx="7" fill="#cfe2ff" />
      <rect x="170" y="278" width="140" height="12" rx="6" fill="#e9ecef" />

      <rect x="150" y="318" width="80" height="36" rx="18" fill="#007bff" />
      <rect x="250" y="318" width="80" height="36" rx="18" fill="#ffc908" />

      <g transform="translate(55 250)">
        <rect x="0" y="20" width="70" height="58" rx="12" fill="#fff" stroke="#007bff" strokeWidth="3" />
        <circle cx="35" cy="42" r="14" fill="#007bff" opacity="0.2" />
        <path
          d="M22 58c0-8 6-14 13-14s13 6 13 14"
          fill="#007bff"
        />
      </g>

      <g transform="translate(355 200)">
        <path
          d="M35 8c-12 0-22 8-22 20 0 18 22 36 22 36s22-18 22-36c0-12-10-20-22-20z"
          fill="#ffc908"
        />
        <circle cx="35" cy="26" r="8" fill="#007bff" />
      </g>
    </svg>
  );
}
