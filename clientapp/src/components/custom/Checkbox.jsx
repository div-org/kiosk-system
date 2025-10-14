import React from 'react'

const Checkbox = ({
  id = '',
  label = '',
  name = '',
}) => {
  return (
    <div className='checkbox-wrapper'>
      <input type="checkbox" className='checkbox' id={id} name={name} />
      {label && <label htmlFor={name} className='checkbox-label'>{label}</label>}
    </div>
  )
}

export default Checkbox