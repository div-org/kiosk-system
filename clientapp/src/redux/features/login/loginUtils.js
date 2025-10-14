export const formatLoginData = (data) => {
  const obj = {
    ...data,
    loginStatus: true,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone 
  }

  return obj
}