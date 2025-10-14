
import Portal from '../portal/Portal'



const Modal = ({
   show = false,
   wrapperClassName = '',
   className = '',
   closingAnimation = false,
   onHide = () => { },
   isCloseOutsideClick = false,
   parentId = 'modal-root',
   children
}) => {



   if (!show) {
      return
   }



   const handleOverlayClick = (e) => {
      if (isCloseOutsideClick && e.target.classList.contains('modal-c')) {
         e.stopPropagation()
         onHide()
      }
   }



   return (
      <Portal
         isOpen={show}
         elementId={parentId}
      >
         <div
            className={`modal-c ${closingAnimation ? 'closing' : ''} ${wrapperClassName}`}
            onClick={handleOverlayClick}
         >
            <div
               className={`modal-body-c ${closingAnimation ? 'closing' : ''} ${className}`}
            // onClick={e => e.stopPropagation()}
            >
               {
                  children
               }
            </div>
         </div>
      </Portal>
   )
}

export default Modal