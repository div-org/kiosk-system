import React from 'react'
import Input from './Input'

const InputGroup = ({
  label = '',
  infoMsgs = [],
  errorMsgs = [],
  wrapperClassname = '',
  ...props
}) => {

  const hasError = errorMsgs.length > 0
  
  
  return (
    <div className={`form-input-group ${wrapperClassname}`}>
      {label && <label className='label'>{label}</label>}

      <div className="ig-input-w">

        <Input
          {...props}
        />
        
      </div>

      {hasError &&
        <ul className='input-messages error-messages'>
          {
            errorMsgs.map(item => (
              <li key={item} className='message'>{item}</li>
            ))
          }
        </ul>
      }
            
    </div>
  )
}

export default InputGroup