import React, { useState } from 'react'
import Modal from '../../common/modal/Modal'
import InputGroup from '../../custom/input/InputGroup'
import Button from '../../custom/Button'
import handleApiRequest from '../../../api/handleApiRequest'
import { useDomain } from '../../../redux/features/domain/domainSlice'
import { api } from '../../../api/api'


const initialValues = {
  start: new Date(),
  end: new Date()
}


const CreateBookingModal = ({
  onHide = () => {}
}) => {

  const domain = useDomain()

  const [values, setValues] = useState(initialValues)
  
  const { start, end } = values
  

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  

  const handleSubmit = async () => {
    try {

      const payload = {
        title: '',
        start_date: start,
        end_date: end
      }
      
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
      
      const res = await handleApiRequest({
        url: `${domain}/${api.bookings}`,
        method: 'POST',
        headers,
        payload
      })

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
      className='create-booking-form-modal'
      onHide={onHide}
      isCloseOutsideClick
    >

      <InputGroup
        type='date'
        label='Start Date'
        name='start'
        onChange={handleOnChange}
        value={start}
      />

      <InputGroup
        type='date'
        label='End Date'
        name='end'
        onChange={handleOnChange}
        value={end}
      />

      <Button
        onClick={handleSubmit}
      >
        Create Booking
      </Button>
      
    </Modal>
  )
}

export default CreateBookingModal