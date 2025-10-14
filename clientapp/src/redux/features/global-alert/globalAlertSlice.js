import { createSlice, nanoid } from "@reduxjs/toolkit"



export const alertType = {
   success: {
      value: 0,
      name: 'success'
   },

   warning: {
      value: 1,
      name: 'warning',
   },

   error: {
      value: 2,
      name: 'error'
   }
}



const initialState = {
   list: [],
}



export const globalAlertSlice = createSlice({
   name: 'globalAlert',
   initialState,

   reducers: {
      showGlobalAlertModal: {
         reducer: (state, { payload }) => {
            state.list.push(payload)
         },

         prepare: ({ id, message, type = alertType.success, autoClose = null, i18nObj = null }) => {
            const newId = id || nanoid()
            const newMessage = message ?? 'something_went_wrong'

            const payload = {
               id: newId,
               message: newMessage,
               type,
               autoClose,
               i18nObj
            }

            return { payload }
         }
      },

      closeGlobalAlertModal: (state, { payload }) => {
         state.list = state.list.filter(f => f.id !== payload)
      }
   }
})

export const {
   showGlobalAlertModal,
   closeGlobalAlertModal
} = globalAlertSlice.actions

export default globalAlertSlice.reducer