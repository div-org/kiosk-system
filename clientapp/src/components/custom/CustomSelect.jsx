import Image from './Image'
import { FaChevronDown } from 'react-icons/fa'
import Loader from '../loader/Loader'
// import { useTranslation } from 'react-i18next'
import useOnClickOutsideWithRef from '../../hooks/useOnClickOutsideWithRef'



const CustomSelect = ({
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
}) => {

   // const { t } = useTranslation()

   const { showBody, setShowBody, containerRef } = useOnClickOutsideWithRef()


   const selectedValue = value?.value
   const selectedLabel = withT ? t(value?.label) : value?.label




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
      <div
         ref={containerRef}
         className={`custom-select ${disabled ? 'disabled' : ''}`}>

         <div
            className={`selected-value ${showBody ? 'expanded' : ''}`}
            onClick={handleClick}
         >
            <Loader
               isLoading={isLoading}
               variant='width-22'
            />

            {(imageUrl && selectedValue) &&
               <Image
                  src={`${imageUrl}/${selectedValue}.png`}
                  loading="lazy"
               />
            }
            <p className="cs-label">{selectedLabel || <span className="placeholder">{placeholder}</span>}</p>
            <FaChevronDown className='chevron' />
         </div>

         {
            showBody &&
            <ul className={`select-dropdown`}>

               {dropdownTitle && <p className="dropdown-title">{dropdownTitle}</p>}

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
                              imageUrl &&
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
         }
      </div>
   )
}

export default CustomSelect