import { useState } from 'react'
import Image from './Image'
import { FaChevronDown } from 'react-icons/fa'
import Loader from '../loader/Loader'
import { Popover } from 'react-tiny-popover'
// import { useTranslation } from 'react-i18next'



const CustomSelectWithPopover = ({
   value = {},
   options = [],
   onChange = () => { },
   imageUrl = false,
   placeholder = '',
   dropdownTitle = null,
   onClick = () => { }, // for managing on focus api call
   isLoading = false,
   withT = false,
   disabled = false,

   variant = '', // dark-black | light-black | white | md
   containerClassName = '',
   positions = ['bottom', 'top', 'right', 'left'],
   align='center',
   className = '',
}) => {

   // const { t } = useTranslation()

   const [showBody, setShowBody] = useState(false)


   const selectedValue = value?.value
   const selectedLabel = value.label




   const handleItemClick = (item) => {
      onChange(item)
      setShowBody(false)
   }


   const handleClick = () => {
      if (disabled) {
         return
      }
      setShowBody(p => !p)
      onClick()
   }

   



   return (
      <Popover
         isOpen={showBody}
         positions={positions}
         align={align}
         containerClassName={`my-pop-over-container ${containerClassName} ${variant}`}
         onClickOutside={() => setShowBody(false)}
         content={({ position, childRect, popoverRect }) => {
            return (
               <ul className={`my-pop-over-content select-dropdown-popover`} style={{ width: childRect.width + 'px'}}>

                  {dropdownTitle && <div className="dropdown-title">{dropdownTitle}</div>}

                  {
                     options.map(item => {
                        const { value, label } = item

                        const isSelected = value === selectedValue

                        return (
                           <li
                              key={value}
                              className={`option-li ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleItemClick(item)}
                           >
                              {
                                 (imageUrl && value) &&
                                 <Image
                                    className='option-img'
                                    src={`${imageUrl}/${value}.png`}
                                    loading="lazy"
                                 />}
                              <span className="op-label">{label}</span>
                           </li>
                        )
                     })
                  }
               </ul>
            )
         }}
      >
         <div
            className={`custom-select ${className} ${disabled ? 'disabled' : ''}`}>

            <div
               className={`selected-value ${showBody ? 'expanded' : ''}`}
               onClick={handleClick}
            >
               <Loader
                  isLoading={isLoading}
                  variant='width-22'
               />

               {imageUrl &&
                  <Image
                     src={`${imageUrl}/${selectedValue}.png`}
                     loading="lazy"
                  />
               }
               <div className="cs-label">{selectedLabel || <span className="placeholder">{placeholder}</span>}</div>
               <FaChevronDown className='chevron' />
            </div>


         </div>
      </Popover>
   )
}

export default CustomSelectWithPopover