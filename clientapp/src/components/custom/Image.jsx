import React from 'react'



const Image = ({
   domain = import.meta.env.VITE_ASSET_DOMAIN,
   src = '',
   ...props
}) => {


   return (
      <img
         src={`${domain}${src}`}
         {...props}
      />
   )
}

export default Image