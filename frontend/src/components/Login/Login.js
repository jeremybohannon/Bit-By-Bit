import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import styled from 'styled-components'
import config from '../../config'

import User from '../../services/User/User'

export default function Login({setUser}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function onSignIn(googleUser) {
    if (googleUser && googleUser.error !== undefined) {
      // TODO notify failure to sign on
      console.log(googleUser)
      return
    }
    const authId = googleUser.getBasicProfile().getEmail()
    const userDetails = googleUser.getBasicProfile()
    const newUser = new User(authId, userDetails)

    setUser(newUser)
    setIsLoggedIn(true)
  }

  function onLogOut() {
    setUser({})
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
`