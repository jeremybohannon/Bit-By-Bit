import React from 'react'
import styled from 'styled-components'

function MonthLegend() {
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]

  return (
    <MonthLegendWrapper>
      <MonthWrapper maxWidth={"30px"}></MonthWrapper>
      {months.map((value, index) => {
        return <MonthWrapper key={index}>{months[index]}</MonthWrapper>
      })}
    </MonthLegendWrapper>
  )
}

const MonthLegendWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  height: 30px;
  width: 100%;
`
const MonthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;
  max-width: ${({ maxWidth }) => maxWidth || 'inherit'};
`

export default MonthLegend