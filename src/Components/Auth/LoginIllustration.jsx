import React from "react";

export default function LoginIllustration() {
  return (
    <svg
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Login illustration"
      className="auth-illustration"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="390" cy="90" r="50" fill="#007bff" opacity="0.12" />
      <circle cx="80" cy="390" r="45" fill="#ffc908" opacity="0.28" />

      <rect
        x="120"
        y="70"
        width="240"
        height="320"
        rx="24"
        fill="#ffffff"
        stroke="#007bff"
        strokeWidth="3"
      />
      <circle cx="240" cy="160" r="48" fill="#007bff" opacity="0.14" />
      <circle cx="240" cy="148" r="24" fill="#007bff" />
      <path
        d="M205 212c0-19 15.7-35 35-35s35 16 35 35v10H205v-10z"
        fill="#007bff"
      />

      <rect x="155" y="250" width="170" height="16" rx="8" fill="#cfe2ff" />
      <rect x="155" y="282" width="170" height="16" rx="8" fill="#cfe2ff" />
      <rect x="175" y="325" width="130" height="32" rx="16" fill="#007bff" />

      <g transform="translate(350 300)">
        <rect x="0" y="18" width="78" height="66" rx="12" fill="#ffc908" />
        <path
          d="M20 18c0-14 9-24 19-24s19 10 19 24"
          fill="none"
          stroke="#007bff"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="52" r="6" fill="#007bff" />
        <circle cx="54" cy="52" r="6" fill="#007bff" />
      </g>
    </svg>
  );
}
