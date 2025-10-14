import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { loadingStatus } from "../../../utils/helper";
import axiosInstance from "../../../utils/axiosInstance";
import { api } from "../../../api/api";
// import { alertType, showGlobalAlertModal } from "../global-alert/globalAlertSlice";
import { useSelector } from "react-redux";
import { alertType } from "../global-alert/globalAlertSlice";
import { formatLoginData } from "./loginUtils";




const initialState = {
  status: loadingStatus.idle, // idle | loading | done
  data: {},
}



export const getLogin = createAsyncThunk('/login/getLogin', async (_, { getState }) => {
  const authToken = localStorage.getItem('authToken');
  
  const domain = getState().domain.domain
  const res = await axiosInstance(`${domain}/${api.login}/${authToken}`)
  return res.data
})



export const logout = createAsyncThunk('/login/logout', async (_, { getState, dispatch }) => {
  try {
    const { domain } = getState().domain
    const res = await axiosInstance(`${domain}/${api.logout}`)
    const data = res.data
    return data

  } catch (error) {

    let message = error.message
    let showAlert = true

    if (error.response) {
      message = error.response.data.message

      if (error.response.data.error === -1) {
        showAlert = false
      }
    }

    if (showAlert) {
      dispatch(showGlobalAlertModal({ message, type: alertType.error }))
    }
  }
})



export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginData: (state, { payload }) => {
      state.data = payload
    },
    updateLoginData: (state, { payload }) => {
      state.data = {
        ...state.data,
        ...payload
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getLogin.pending, (state) => {
        state.status = loadingStatus.loading
      })
      .addCase(getLogin.fulfilled, (state, { payload }) => {
        state.status = loadingStatus.done
        const { error, data } = payload

        if (error === 0 && data.id) {
          const obj = formatLoginData(data)
          state.data = obj
        }

      })
      .addCase(getLogin.rejected, (state) => {
        state.status = loadingStatus.done
      })

      .addCase(logout.fulfilled, (state) => {
        state.data = {}
      })
      .addCase(logout.rejected, (state) => {
        state.data = {}
      })
  },


})


export const {
  setLoginData,
  updateLoginData,
} = loginSlice.actions


export default loginSlice.reducer


export const selectLoginData = (state) => state.login.data


export const selectLoginCurrencyId = (state) => state.login.data.currency
export const selectBasicCurrencies = (state) => state.basic.data.currencies?.obj || {}

export const selectCurrency = createSelector(
  [selectLoginCurrencyId, selectBasicCurrencies],
  (currencyId, currencies) => currencies[currencyId]?.label || ''
)

export const useCurrency = () => useSelector(selectCurrency)
export const useLoginData = () => useSelector(selectLoginData)