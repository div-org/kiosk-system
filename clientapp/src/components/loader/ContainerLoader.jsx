import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'

const ContainerLoader = ({
  isLoading = false,
}) => {

  
  if (!isLoading) {
    return null
  }
  
  
  return (
    <div className='container-loader'>
      <div className="lottie-holder">
        <DotLottieReact
          // src={`${import.meta.env.VITE_ASSET_DOMAIN}/lottie/container-loading.lottie`}
          src={`/lottie/container-loading.lottie`}
          loop
          autoplay
        />
      </div>
    </div>
  )
}

export default ContainerLoader