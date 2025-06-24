import React from 'react'

function Logo({ width = '150px' }) {
  return (
    <svg
      width="150px"
      height="auto"
      viewBox="0 0 500 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-200 hover:scale-105 text-m"
    >
      {/* Main Text - Large and Clear */}
      <text
        x="130"
        y="95"
        fontFamily="Inter, Segoe UI, system-ui, sans-serif"
        fontSize="70"
        fontWeight="700"
        fill="#f1f5f9"
      >
        Mega{' '}
        <tspan 
          fill="#06b6d4" 
          fontWeight="600"
        >
          Blog
        </tspan>
      </text>

      {/* Simple Logo Icon */}
      <path
        d="M40 40 L60 80 L80 40 L100 80"
        stroke="#06b6d4"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export default Logo