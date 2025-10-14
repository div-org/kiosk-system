import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const initialState = {
  domain: '',
  status: 'idle', // idle | done,
}


export const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {
    addDomain: (state, { payload }) => {
      state.domain = payload
      state.status = 'done'
    }
  }
})


export const { addDomain } = domainSlice.actions
export default domainSlice.reducer


export const selectDomain = (state) => state.domain.domain

export const useDomain = () => useSelector(selectDomain)