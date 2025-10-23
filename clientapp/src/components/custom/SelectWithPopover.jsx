import CustomSelectWithPopover from './CustomSelectWithPopover'



const SelectWithPopover = ({
   label = '',
   value = '',
   options = [],
   imageUrl = '',
   onChange = () => { },
   infoMsgs = [],
   errorMsgs = [],
   rightExtra = null,
   wrapperClassName = '',
   onClick = () => { }, // for managing on focus api call
   isLoading = false,
   withT = false,
   disabled  =false,
   containerClassName = '',
   ...props
}) => {

   return (
      <div className={`form-input-group my-select ${wrapperClassName} ${errorMsgs.length > 0 ? 'has-error' : ''}`}>
         {label && <label className='label'>{label}</label>}

         <div className="ig-input-w">
            <CustomSelectWithPopover
               value={value}
               options={options}
               onChange={onChange}
               imageUrl={imageUrl}
               onClick={onClick}
               isLoading={isLoading}
               withT={withT}
               disabled={disabled}
               containerClassName={containerClassName}
               {...props}
            />

            {rightExtra && rightExtra}
         </div>

         {infoMsgs.length > 0 &&
            <ul className="input-messages">
               {
                  infoMsgs.map(item => {
                     const { msg } = item
                     return (
                        <li
                           key={msg}
                           className={`message info`}
                        >
                           {msg}
                        </li>
                     )
                  })
               }
            </ul>
         }

         {errorMsgs.length > 0 &&
            <ul className="input-messages">
               {
                  errorMsgs.map(item => {
                     const { type = 'error', msg } = item
                     return (
                        <li
                           key={msg}
                           className={`message ${type}`}
                        >
                           {msg}
                        </li>
                     )
                  })
               }
            </ul>
         }
      </div>
   )
}

export default SelectWithPopover