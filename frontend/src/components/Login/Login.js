import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import styled from 'styled-components'
import config from '../../config'

export default function Login({setUserProfile}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function onSignIn(googleUser) {
    if (googleUser && googleUser.error !== undefined) {
      // TODO notify failure to sign on
      console.log(googleUser)
      return
    }
    const profile = {
      authID: googleUser.getAuthResponse().id_token,
      userDetails: googleUser.getBasicProfile(),
      id: null
    }
    setUserProfile(profile)
    setIsLoggedIn(true)
  }

  function onLogOut() {
    setUserProfile({})
    setIsLoggedIn(false)
  }

  return (
    <SignInWrapper>
      {
        !isLoggedIn ? <GoogleLogin
          clientId={config.google.client_id}
          buttonText="Login"
          onSuccess={onSignIn}
          onFailure={onSignIn}
          isSignedIn={onSignIn}
          cookiePolicy={'single_host_origin'} />
          : <GoogleLogout
            clientId={config.google.client_id}
            buttonText="Logout"
            onLogoutSuccess={onLogOut} />
      }
    </SignInWrapper>
  )
}

const SignInWrapper = styled.div`
  display: block;
  box-sizing: border-box;
  background: #efefef;
`