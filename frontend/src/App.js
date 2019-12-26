import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import styled from 'styled-components'

import Backend from './services/Backend/Backend'

import Byte from './components/Byte/Byte'
import Login from './components/Login/Login'

function App() {
  const [byteData, setByteData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [BackendService, setBackendService] = useState({})

  useEffect(() => {
    setBackendService(new Backend())
  }, [])

  useEffect(() => {
    if (Object.entries(user).length !== 0) {
      const userID = user.getAuthId()

      // See if we have this user in our DB
      BackendService.getUserData(userID).then((_user) => {
        console.log(_user)
        setIsLoggedIn(true)
        setByteData(_user.userData)
        user.setUserData(_user.userData)
        user.setId(_user._id)
        setIsLoading(false)
      })
    } else {
      setIsLoggedIn(false)
      setByteData({})
      setIsLoading(false)
    }
  }, [user])

  return (
    <AppWrapper>
      <Router>
        <HeaderWrapper>
          <HeaderName>bitBybit</HeaderName>
          <Login setUser={setUser}/>
        </HeaderWrapper>
        <Switch>
          <Route path="/">
            {!isLoggedIn ?
              <div>Login to get started</div> :
              <Byte byteData={byteData} 
              setByteData={setByteData}
              userProfile={user}
              BackendService={BackendService}/>
            }
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 600px;
  height: fit-content;
  min-height: 100%;
  margin-left: auto;
  margin-right: auto;
  background: white;
  box-shadow: grey 0px 0px 10px 0px;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  background: #efefef;
`

const HeaderName = styled.h1`
  height: fit-content;
  margin: 0;
  font-size: 20px;
`

export default App
