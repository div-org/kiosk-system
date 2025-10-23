import { useRef, useState } from 'react'
import useOnClickOutside from './useOnClickOutside'



const useOnClickOutsideWithRef = () => {
   const [showBody, setShowBody] = useState(false)
   const containerRef = useRef()

   useOnClickOutside(containerRef, () => setShowBody(false))


   return {
      showBody,
      setShowBody,
      containerRef
   }
}

export default useOnClickOutsideWithRef