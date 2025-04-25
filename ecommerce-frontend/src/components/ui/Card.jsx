// components/ui/Card.jsx
import React from "react"

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div 
      className={`rounded-lg border bg-white shadow-sm p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}