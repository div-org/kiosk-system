import React from 'react'
import Button from '../../custom/Button'
import Image from '../../custom/Image'
import { Link } from 'react-router-dom'

const DataTableEmpty = ({
  emptyTableMessage = {}
}) => {
  const { icon, text, coloredText, buttonText, link = '' } = emptyTableMessage ?? {}
  
  return (
    <div className='data-table-empty-container'>

      <div className="data-table-empty-wrapper">

        {icon &&
          <Image src={icon} className="icon" />}

        <div className='text-container'>
          <p>{text}</p>
          {coloredText && <p className='color-primary'>{coloredText}</p>}
        </div>
          
        {link && <Link to={link} className='my-btn primary md'>{buttonText}</Link>}
          
      </div>

    </div>
  )
}

export default DataTableEmpty