import React from 'react'
import styled from 'styled-components'

function Bit({ mood, text }) {
  const colors = ['#d50000', '#ff5252', '#26C6DA', '#66BB6A', '#2E7D32']

  function bitClick(e) {
    console.log(e)
  }

  return (
    <BitWrapper onClick={bitClick} mood={mood} colorMap={colors}>{text || ''}</BitWrapper>
  )
}

const BitWrapper = styled.div`
  width: 20px;
  height: 20px;
  background: ${({mood, colorMap}) => colorMap[mood] || '#eee'};
  border: .5px solid #eee;
`

export default Bit