import React, { useRef } from 'react'



const LoaderVideo = () => {
   const videoRef = useRef(null)



   const second = () => {
      if (videoRef.current.currentTime > 2) {
         videoRef.current.currentTime = 0
         videoRef.current.play()
      }
   }



   return (
      <video
         ref={videoRef}
         onTimeUpdate={second}
         width="100"
         autoPlay
         muted
         loop
      >
         <source
            src={`${import.meta.env.VITE_ASSET_DOMAIN}/videos/loading-video.webm`}
            type="video/mp4"
         />
      </video>
   )
}

export default LoaderVideo