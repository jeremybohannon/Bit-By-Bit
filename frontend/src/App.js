import React, { useEffect, useState} from 'react'
import styled from 'styled-components'

import Data from './services/Data/Data'

import Byte from './components/Byte/Byte'
import Loading from './components/Loading/Loading'
import Login from './components/Login/Login'

function App() {
  const [byteData, setByteData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const dataService = new Data()
    const byteData = dataService.getData()
    
    setByteData(byteData)
    setIsLoading(false)
  }, [])

  

  return (
    <AppWrapper>
      <HeaderWrapper>
        <HeaderName>bitBybit</HeaderName>
      </HeaderWrapper>
      {/* {
        isLoading ? <Loading /> :
        <Byte byteData={byteData} />
      } */}
      <Login />
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 600px;
  height: 100%;
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
