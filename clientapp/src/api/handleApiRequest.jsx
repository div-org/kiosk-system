// import { alertType, showGlobalAlertModal } from '../redux/features/global-alert/globalAlertSlice'
import { setLoginData } from '../redux/features/login/loginSlice'
import axiosInstance from '../utils/axiosInstance'




const handleApiRequest = async ({
  method = 'GET',
  url = '',
  payload = {},
  dispatch,
  headers = {},
  params = {},
  responseType,
}) => {

  try {

    const res = await axiosInstance({
      method,
      url,
      data: payload,
      headers: { ...headers },
      params: { ...params },
      ...(responseType ? { responseType } : {}),
    })

    return res.data

  } catch (error) {
    let message = error.message
    let showAlert = true

    if (error.response) {
      message = error.response.data.message

      if (error.response.data.error === -1) {
        showAlert = false
        dispatch(setLoginData({}))
      }
    }

    if(showAlert){
      // dispatch(showGlobalAlertModal({ message, type: alertType.error }))
    }
    throw error
  }
}



export default handleApiRequest