import React from 'react'
import { useSelector } from 'react-redux'
import GlobalAlert from './GlobalAlert'

const GlobalAlertContainer = () => {
   const { list = [] } = useSelector(state => state.globalAlert)


   return (
      <>
         {
            list.map((item, index) => {
               return (
                  <GlobalAlert
                     key={item.id}
                     item={item}
                     index={index}
                  />
               )
            })
         }
      </>
   )
}

export default GlobalAlertContainer