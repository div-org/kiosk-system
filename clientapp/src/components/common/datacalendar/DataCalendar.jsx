import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const DataCalendar = ({
  eventsList = []
}) => {


  const handleDateClick = (selected) => {
    console.log(selected)
  }

  const handleSelect = (selected) => {
    console.log(selected)
  }
  
  
  return (
    <div className="data-calendar-container">

      <FullCalendar 
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView='dayGridMonth'
        selectable={true}
        select={handleSelect}
        // dateClick={handleDateClick}
        events={eventsList}
        eventContent={renderEventContent}
      />
      
    </div>
  )
}

export default DataCalendar


const renderEventContent = (eventInfo) => {
  return (
    <div className="fc-render-event" onClick={() => console.log(eventInfo)}>
      <b>{eventInfo.timeText}</b>
      <i>[{eventInfo.event.id}]</i>
      <i className='i-title'>{eventInfo.event.title}</i>
    </div>
  )
}