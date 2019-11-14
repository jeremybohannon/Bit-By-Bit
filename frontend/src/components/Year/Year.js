import React from 'react'
import styled from 'styled-components'

import Month from '../Month/Month'

function Year(props) {
  return (
    <YearWrapper>
      {Object.keys(props.bitData).map((value, index) => {
        return <Month key={index} data={props.bitData[value]}/>
      })}
    </YearWrapper>
  )
}

const YearWrapper = styled.div`
  display: block;
  height: 100%;
`

export default Year