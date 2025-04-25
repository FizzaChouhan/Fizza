// components/ui/Button.jsx
import React from "react"

export const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  ...props 
}) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
  }
  
  const sizes = {
    default: "py-2 px-4",
    sm: "py-1 px-3 text-sm",
    lg: "py-3 px-6 text-lg",
  }
  
  return (
    <button 
      className={`rounded-md font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}