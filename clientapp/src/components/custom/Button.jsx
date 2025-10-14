import React from 'react'

const Button = ({
  variant = 'primary', // primary | secondary | danger | success
  size = 'md',  // sm | md | lg
  className = '',
  children,
  ...props
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`} 
      {...props}
    >
      {children}
    </button>
  )
}

export default Button