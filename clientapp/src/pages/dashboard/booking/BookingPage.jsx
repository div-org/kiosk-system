import React, { useState } from 'react'
import BookingCalendar from '../../../components/dashboard/booking/BookingCalendar'
import PageTitleContainer from '../../../components/common/PageTitleContainer'
import Button from '../../../components/custom/Button'
import CreateBookingModal from '../../../components/dashboard/booking/CreateBookingModal'

const BookingPage = () => {

  
  const [showModal, setShowModal] = useState(false)
  
  
  return (
    <div className='booking-page'>
      
      <div className="page-content">

        
        <PageTitleContainer
          title="Bookings"
          description="Manage your bookings"
          rightSide={
            <>
              <Button
                onClick={() => setShowModal(true)}
              >
                Create Booking
              </Button>
            </>
          }
        />
        

        <BookingCalendar
          showModal={showModal}
          setShowModal={setShowModal}
        />

      </div>


      
      {
        showModal &&
        <CreateBookingModal
          onHide={() => setShowModal(false)}
        />
      }

    </div>
  )
}

export default BookingPage