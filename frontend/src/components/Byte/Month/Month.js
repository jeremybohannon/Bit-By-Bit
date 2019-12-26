import React from 'react'
import styled from 'styled-components'

import Bit from '../Bit/Bit'

function Month({ bits, monthIndex, handleBitClick }) {
  return (
    <MonthWrapper>
      {Object.keys(bits).map((value, index) => {
        return <Bit 
        key={bits[value].date || Math.random() * index} 
        bitIndex={{month: monthIndex, bit: index}}
        bit={bits[value]} 
        handleBitClick={handleBitClick}/>
      })}
    </MonthWrapper>
  )
}

const MonthWrapper = styled.div`
  display: grid;
`

export default Month