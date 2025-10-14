import React from 'react'
import Portal from '../common/portal/Portal'

const Loader = ({
   isLoading = false,
   variant = '', // width-22 | green || fixed
   className = '',
   withPortal = false
}) => {


   if (!isLoading) {
      return
   }


   let loaderHtml = <div className={`loader-c ${variant} ${className}`}></div>


   if (withPortal) {
      return (
         <Portal
            isOpen={true}
            elementId='root'
         >
            {loaderHtml}
         </Portal>
      )
   }

   return loaderHtml
}

export default Loader