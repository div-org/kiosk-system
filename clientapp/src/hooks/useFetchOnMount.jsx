import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDomain } from '../redux/features/domain/domainSlice'
import { alertType, showGlobalAlertModal } from '../redux/features/global-alert/globalAlertSlice'
import handleApiRequest from '../api/handleApiRequest'




const useFetchOnMount = ({
   method = 'GET',
   url = '',
   payload = {},
   getData = () => { },
   isFetch = true,
   withAuth = false,
}) => {

   const dispatch = useDispatch()
   const domain = useDomain()

   const [isFetching, setIsFetching] = useState(false)
   const [isSucceeded, setIsSucceeded] = useState(false)



   useEffect(() => {
      const fetchData = async () => {
         try {
            setIsFetching(true)
            
            const headers = {
               Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }

            const res = await handleApiRequest({
               method,
               url: `${domain}/${url}`,
               payload,
               dispatch,
               headers: withAuth ? { ...headers } : { },
            })
            const { error, message, data } = res

            if (error === 0) {
               getData(data)
               setIsSucceeded(true)
            } else {
               dispatch(showGlobalAlertModal({ message, type: alertType.error }))
            }

         } catch (error) {
            // error
         }
         finally {
            setIsFetching(false)
         }
      }

      if (isFetch) {
         fetchData()
      }
   }, [isFetch])



   return {
      isFetching,
      isSucceeded
   }
}

export default useFetchOnMount