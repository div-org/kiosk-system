import React from 'react'

const Input = ({
  size = 'md',  // sm | md | lg
  className = '',
  ...props
}) => {
  return (
    <input
      className={`input`}
      {...props}
    />
  )
}

export default Input