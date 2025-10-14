import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import packageJson from '../../../../package.json'
import { addDomain } from './domainSlice'


const { version } = packageJson

const domainInSessionKey = 'gh-api-domain'


const DomainChecker = ({
  children
}) => {
  const dispatch = useDispatch()
  const { status, domain } = useSelector(state => state.domain)


  useEffect(() => {
    let domain = ''

    domain = import.meta.env.PROD ? 'https://kiosk-api.div.ae' : 'http://127.0.0.1:8000'

    let isSavedInSession = sessionStorage.getItem(domainInSessionKey) // this is for testing server localhost

    if (isSavedInSession) {
      domain = isSavedInSession
    }

    dispatch(addDomain(domain))
    
    window.addApi = handleAddDomainToSession // this is for testing server localhost
    
    console.log(`%c v${version}`, "background: black; color: white; font-size: x-large");
      

  }, [])






  const handleAddDomainToSession = (domainP = 'http://localhost:8080/registrar') => {
    const domain = domainP
    sessionStorage.setItem(domainInSessionKey, domainP)
    dispatch(addDomain(domain))
  }



  if (/* isDevelopment && */ (status === 'idle' || domain.length <= 12)) {
    return
  }



  return (
    <>
      {
        children
      }
    </>
  )
}

export default DomainChecker