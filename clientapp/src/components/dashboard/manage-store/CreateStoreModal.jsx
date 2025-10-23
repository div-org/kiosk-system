import React, { useState } from 'react'
import InputGroup from '../../custom/input/InputGroup'
import Modal from '../../common/modal/Modal'
import Button from '../../custom/Button'
import handleApiRequest from '../../../api/handleApiRequest'
import { useDomain } from '../../../redux/features/domain/domainSlice'
import { api } from '../../../api/api'


const initialValues = {
  store_name: ''
}


const CreateStoreModal = ({
  onHide = () => {}
}) => {

  const domain = useDomain()

  const [values, setValues] = useState(initialValues)

  const { store_name } = values
  

  const handleSubmit = async () => {

    if (!store_name) {
      return
    }

    try {
      const url = `${domain}/${api.stores}`

      const payload = {
        store_name
      }
      
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }

      const res = await handleApiRequest({ url, method: 'POST', headers, payload })

      const { data, message, error } = res

      if (error === 0) {
        onHide()
      }

    } catch (error) {
      
    }
    
  }
  
  
  return (
    <Modal
      show
      className='create-store-form-modal'
      onHide={onHide}
      isCloseOutsideClick
    >
      <InputGroup
        label="Store Name"
        value={store_name}
        onChange={(e) => setValues({ ...values, store_name: e.target.value })}
      />

      <Button
        onClick={handleSubmit}
      >Save</Button>
    </Modal>
  )
}

export default CreateStoreModal