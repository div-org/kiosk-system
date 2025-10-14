import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "../features/login/loginSlice";
import domainReducer from "../features/domain/domainSlice";
import globalAlertReducer from "../features/global-alert/globalAlertSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    domain: domainReducer,
    globalAlert: globalAlertReducer

  },
  devTools: process.env.NODE_ENV !== "production",
})