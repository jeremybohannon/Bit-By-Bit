import React from 'react'
import styled from 'styled-components'

import Month from '../Month/Month'

function Year({ byte, handleBitClick }) {
  return (
    <YearWrapper>
      {Object.keys(byte).map((value, index) => {
        return <Month key={`month:${index}`} 
        monthIndex={index} 
        bits={byte[value]} 
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