import { useEffect, useState } from 'react'
import Modal from '../../../components/common/modal/Modal'
import { useDispatch } from 'react-redux'
import { alertType, closeGlobalAlertModal } from './globalAlertSlice'
import { VscError } from 'react-icons/vsc'
import { IoWarningOutline } from 'react-icons/io5'
import Button from '../../../components/custom/Button'
import { FaCheckCircle } from 'react-icons/fa'



const GlobalAlert = ({
   item,
   index = 0,
}) => {


   const dispatch = useDispatch()

   const { id, message, type, autoClose, i18nObj } = item

   const [isClosing, setIsClosing] = useState(false)


   useEffect(() => {
      if (autoClose) {

         const timeoutId = setTimeout(() => {
            handleCloseModal()
         }, autoClose)

         return () => clearTimeout(timeoutId)
      }
   }, [])





   const handleCloseModal = () => {
      setIsClosing(true)

      setTimeout(() => {
         dispatch(closeGlobalAlertModal(id))
      }, 400)
   }



   const getIcon = () => {

      let msgType = null

      if (typeof type === 'string') {
         msgType = type
      }

      else if (typeof type === 'object') {
         msgType = type.name
      }


      switch (msgType) {
         case alertType.success.name: //for 'success'
            return <FaCheckCircle />

         case alertType.warning.name: // for 'warning'
            return <IoWarningOutline className='warning' />

         case alertType.error.name: // for 'error'
            return <VscError className='error' />

         default:
            return null
      }
   }




   return (
      <Modal
         show={true}
         wrapperClassName={index > 0 ? 'hide-layof' : ''}
         className={`global-alert-c`}
         closingAnimation={isClosing}
      >


         <div className="icons-w">
            {
               getIcon()
            }
         </div>


         <div className="message">
            {
               message
            }
         </div>

         <div className="btns-w">
            <Button
               onClick={handleCloseModal}
            >
               Close
            </Button>
         </div>
      </Modal>
   )
}

export default GlobalAlert