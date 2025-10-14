import React from 'react'

const PageTitleContainer = ({
  title = '',
  description = '',
  rightSide = null
}) => {
  return (
    <div className='page-title-container'>
      
      <div className="left-side">
        
        <h1>{title}</h1>
        <p>{description}</p>

      </div>

      {
        rightSide &&
        <div className="right-side">
          {rightSide}
        </div>
      }

    </div>
  )
}

export default PageTitleContainer