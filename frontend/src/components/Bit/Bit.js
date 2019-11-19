import React from 'react'
import styled from 'styled-components'

function Bit({ bit: { date, mood } }) {
  const colors = ['#620ba0c7', '#9e77d0', '#0baef1c9', '#52AA5E', '#388659']
  
  function bitClick(e) {
    console.log(date)
  }

  function borderEval(mood, date) {
    if(date !== null) {
      if(mood > -1) {
        return '#ffffff 0px 0px 1px 0px'
      }
      return '#808080 0px 0px 1px 0px'
    }
    return ''
  }

  return (
    <BitWrapper onClick={bitClick} mood={mood} colorMap={colors} date={date} borderEval={borderEval}></BitWrapper>
  )
}

const BitWrapper = styled.div`
  background: ${({ mood, colorMap, date }) => date !== null ? colorMap[mood] || '#fff' : "#efefef"};
  box-shadow: ${({mood, date, borderEval}) => borderEval(mood, date)};
  z-index: ${({ date }) => date !== null ? '1' : '0'};
`

export default Bit