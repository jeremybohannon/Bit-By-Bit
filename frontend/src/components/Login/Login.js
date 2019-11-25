import React, { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import styled from 'styled-components'
import config from '../../config'

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState({})

  function onSignIn(googleUser) {
    if (googleUser && googleUser.error !== undefined) {
      // TODO notify failure to sign on
      return
    }
    const profile = {
      userDetails: googleUser.getBasicProfile(),
      authID: googleUser.getAuthResponse().id_token
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
  height: calc(100% - 50px);
  min-height: calc(100% - 50px);
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  background: #efefef;
`