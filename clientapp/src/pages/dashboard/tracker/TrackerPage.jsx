import React from 'react'
import PageTitleContainer from '../../../components/common/PageTitleContainer'
import TrackingForm from '../../../components/dashboard/tracker/TrackingForm'

const TrackerPage = () => {
  return (
    <div className='tracker-page'>
      
      <div className="page-content">

        <PageTitleContainer
          title='Tracker'
          description='Track your time and activities.'
        />

        <TrackingForm />

      </div>

    </div>
  )
}

export default TrackerPage