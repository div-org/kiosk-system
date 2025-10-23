import React, { useState } from 'react'
import DataCalendar from '../../common/datacalendar/DataCalendar'
import useFetchOnMount from '../../../hooks/useFetchOnMount'
import { api } from '../../../api/api'
import CreateBookingModal from './CreateBookingModal'

const BookingCalendar = ({
  showModal = false,
  setShowModal = () => {}
}) => {

  
  const [eventsList, setEventsList] = useState([])


  const { isFetching } = useFetchOnMount({
    url: `${api.bookings}`,
    getData: setEventsList,
    withAuth: true,
  })
  

  
  // const eventsListDummy = [
  //   { 
  //     title: "event 1", 
  //     date: "2025-10-10" 
  //   },
  //   { 
  //     title: "event 2", 
  //     start  : '2025-10-05',
  //     end    : '2025-10-07'
  //   },
  //   { 
  //     title: "", 
  //     start : '2025-10-19 09:00:00',
  //     end : '2025-10-19 10:30:00'
  //   }
  // ]
  
  
  return (
    <>
      <div className='booking-calendar-container'>
        
        <DataCalendar
          eventsList={eventsList}
        />
        
      </div>

    </>
  )
}

export default BookingCalendar