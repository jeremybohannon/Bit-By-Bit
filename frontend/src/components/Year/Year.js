import React from 'react'
import styled from 'styled-components'

import Month from '../Month/Month'

function Year({ byte }) {
  return (
    <YearWrapper>
      {Object.keys(byte).map((value, index) => {
        return <Month key={index} bits={byte[value]} />
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