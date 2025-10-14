import { useState } from 'react'
import Modal from './Modal'
import { MdDeleteForever } from 'react-icons/md'
import { IoWarningOutline } from 'react-icons/io5'
import Button from '../../custom/Button'
import Loader from '../../loader/Loader'
import { useTranslation } from 'react-i18next'



const ConfirmationModal = ({
   msgList = [],
   showIcon = true,
   type = 'warning',
   onCancel = () => { },
   onConfirm = () => { },
   onConfirmLabel = 'confirm',
   confirmDisabled = false,
   className = '',
}) => {

   const { t } = useTranslation()

   const [isLoading, setIsLoading] = useState(false)
   const [isClosing, setIsClosing] = useState(false)


   const handleDeleteConfirmClick = async () => {
      setIsLoading(true)
      await onConfirm()
      setIsLoading(false)

   }



   const handleCancelClick = () => {
      setIsClosing(true)

      setTimeout(() => {
         onCancel()
      }, 400)
   }



   const getIcon = () => {
      switch (type) {
         case 'delete':
            return <MdDeleteForever className='delete-icon' />

         case 'warning':
            return <IoWarningOutline className='warning-icon' />

         default:
            return null
      }
   }


   const isDelete = type === 'delete'



   return (
      <Modal
         show={true}
         className={`confirmation-modal-c ${className}`}
         closingAnimation={isClosing}
      >

         <Loader
            isLoading={isLoading}
         />


         <div className="msg-w">
            {
               showIcon &&
               <div className="icon-w">
                  {
                     getIcon()
                  }
               </div>
            }

            <div className="msg">
               {
                  msgList.map((item, index) => {
                     return (
                        <div key={index}>
                           {item}
                        </div>
                     )
                  })
               }
            </div>
         </div>


         <div className="btns-w">
            <Button
               variant='outline-primary'
               onClick={handleCancelClick}
               disabled={isLoading}
            >
               {t('cancel')}
            </Button>

            <Button
               variant={isDelete ? 'danger' : 'primary'}
               onClick={handleDeleteConfirmClick}
               disabled={isLoading || confirmDisabled}
            >
               {t(onConfirmLabel)}
            </Button>
         </div>
      </Modal>
   )
}

export default ConfirmationModal