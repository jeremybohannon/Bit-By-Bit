import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import styled from 'styled-components'

import Navbar from 'react-bootstrap/Navbar'

import Backend from './services/Backend/Backend'

import Byte from './components/Byte/Byte'
import Home from './components/Home/Home'
import Login from './components/Login/Login'

function App() {
  const [byteData, setByteData] = useState({})
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({ authId: null })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [BackendService, setBackendService] = useState({})

  useEffect(() => {
    setBackendService(new Backend())
  }, [])

  useEffect(() => {
    if (Object.entries(user).length > 1) {
      const userID = user.getAuthId()

      // See if we have this user in our DB
      BackendService.getUserData(userID).then((_user) => {
        if (_user !== undefined || _user !== null) {
          console.log(_user)
          setByteData(_user.userData[currentYear])
          user.setUserData(_user.userData)
          user.setId(_user._id)
          setIsLoading(false)
          setIsLoggedIn(true)
          console.log('is logged in: ' + isLoggedIn)
        } else {
          console.error('User is undefined')
        }
      })
    } else {
      setIsLoggedIn(false)
      setByteData({})
      setIsLoading(false)
    }
  }, [user.authId])

  async function updateServer(index, selectedBit, callBack = () => {}) {
    let newArr = [...byteData]
    newArr[index.month][index.bit] = selectedBit.bit
    setByteData(newArr)
    //Update data in user profile
    const userData = user.getUserData()
    userData[currentYear] = newArr
    user.setUserData(userData)
    try {
      const resp = await BackendService.updateUserData(user.getAuthId(), userData)
      const json = await resp.json()
      // TODO test wiht null and make pretty
      callBack(json)
    } catch (e) {
      console.error(e)
      callBack(null)
    }
  }

  return (
    <AppWrapper>
      <Router>
        <HeaderWrapper>
          <HeaderName href="#home">bitBybit</HeaderName>
          <Login setUser={setUser}/>
        </HeaderWrapper>
        <Switch>
          <Route path="/">
            {!isLoggedIn ?
              <Home /> :
              <Byte byteData={byteData}
                updateServer={updateServer}/>
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

const HeaderWrapper = styled(Navbar)`
  justify-content: space-between !important;
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  max-width: 560px;
  background: white;
`

const HeaderName = styled(Navbar.Brand)`
  font-size: 27px !important;
  color: #83d0ff !important;
`

export default App
