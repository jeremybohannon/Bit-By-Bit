import React from 'react'
import styled from 'styled-components'

import Month from '../Month/Month'

function Year({ byteData, handleBitClick }) {
  return (
    <YearWrapper>
      {Object.keys(byteData).map((value, index) => {
        return <Month key={`month:${index}`} 
        monthIndex={index} 
        bits={byteData[value]} 
        handleBitClick={handleBitClick}/>
      })}
    </YearWrapper>
  )
}

const YearWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  height: 100%;
  width: 100%;
  max-height: 820px;
`

export default Year