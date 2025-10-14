
import { createPortal } from 'react-dom'

const Portal = ({
   isOpen = false,
   elementId = null,
   children
}) => {

      

   if (!elementId || !document.getElementById(elementId)) {
      return
   }



   if (!isOpen) {
      return
   }



   return createPortal(children, document.getElementById(elementId))
}

export default Portal