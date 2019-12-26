import React from 'react'
import styled from 'styled-components'

function DayLegend() {
  const maxNumOfDays = 31

  return (
    <DayLegendWrapper>
      {Array.from(Array(maxNumOfDays)).map((value, index) => {
        return <DayWrapper key={index}>{index + 1}</DayWrapper>
      })}
    </DayLegendWrapper>
  )
}

const DayLegendWrapper = styled.div`
  display: grid;
  min-width: 30px;
`
const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default DayLegend