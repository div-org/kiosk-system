import React from 'react'

const Button = ({
  variant = 'primary', // primary | secondary | danger | success | white
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
      <div className="btn-content">
        {children}
      </div>
    </button>
  )
}

export default Button