import React from 'react'
import styled from 'styled-components'

import Bit from '../Bit/Bit'

function Month({ bits }) {
  return (
    <MonthWrapper>
      {Object.keys(bits).map((value, index) => {
        return <Bit key={bits[value].date || Math.random() * index} bit={bits[value]}/>
      })}
    </MonthWrapper>
  )
}

const MonthWrapper = styled.div`
  display: grid;
`

export default Month