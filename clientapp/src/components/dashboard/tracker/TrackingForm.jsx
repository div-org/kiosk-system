import React, { useEffect, useRef, useState } from 'react'
import useFetchOnMount from '../../../hooks/useFetchOnMount'
import { api } from '../../../api/api'
import Button from '../../custom/Button'
import handleApiRequest from '../../../api/handleApiRequest'
import { useDomain } from '../../../redux/features/domain/domainSlice'

const initialState = {
  time_in: '',
  time_out: '',
  break_in: '',
  break_out: '',
  total_hours: '',
  total_break: '',
}

const TrackingForm = () => {

  const domain = useDomain()

  const [values, setValues] = useState(initialState)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const intervalRef = useRef(null)
  
  
  const fetchTrackingStatus = (data) => {
    const { time_in } = data
    setStartTime(time_in ? new Date(time_in) : null)
  }

  const { isFetching } = useFetchOnMount({
    url: api.clockStatus,
    getData: fetchTrackingStatus,
    withAuth: true,
  })

  useEffect(() => {
    if (!startTime) return;

    intervalRef.current = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - startTime) / 1000);
      setElapsedTime(diff);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [startTime]);


  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  const handleClockIn = async () => {

    try {

      const url = `${domain}/${api.clockTrack}`
      
      const payload = {
        action: 'time'
      }

      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
      
      const res = await handleApiRequest({
        method: 'POST',
        url,
        payload,
        headers
      })

      const { data, error } = res

      if (error === 0) {
        fetchTrackingStatus(data)
      }
      
    } catch (error) {
      
    }

  }
  
  return (
    <div className='tracking-form-container'>
      
      <h2>Tracking Form</h2>

      <p>{formatTime(elapsedTime)}</p>

      <Button
        onClick={handleClockIn}
      >
        {intervalRef.current ? 'Stop' : 'Start'}
      </Button>

    </div>
  )
}

export default TrackingForm