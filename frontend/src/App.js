import React from 'react'
import styled from 'styled-components'

import Data from './services/Data/Data'

import Byte from './components/Byte/Byte'

import './App.css'

function App() {
  const dataService = new Data()
  const byteData = dataService.getData()

  return (
    <AppWrapper>
      <HeaderWrapper>
        <HeaderName>bitBybit</HeaderName>
      </HeaderWrapper>
      <Byte byteData={byteData} />
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: white;
  box-shadow: grey 0px 0px 10px 0px;
`

const HeaderWrapper = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
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
