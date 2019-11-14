import React from 'react'
import styled from 'styled-components'

import Bit from '../Bit/Bit'

function Month(props) {
  return (
    <MonthWrapper>
      {props.data.map((value, index) => {
        return <Bit key={index} mood={value}/>
      })}
    </MonthWrapper>
  )
}

const MonthWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: 100%;
`

export default Month