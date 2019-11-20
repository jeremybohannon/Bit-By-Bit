import React from 'react'
import styled from 'styled-components'

import Year from '../Year/Year'
import DayLegend from '../DayLegend/DayLegend'
import MonthLegend from '../MonthLegend/MonthLegend'

const Byte = function ({ byteData }) {
  return (
    <YearWithMonthLegendWrapper>
      <MonthLegend />
      <YearWithDayLegendWrapper>
        <DayLegend />
        <Year byte={byteData} />
      </YearWithDayLegendWrapper>
    </YearWithMonthLegendWrapper>
  )
}

const YearWithMonthLegendWrapper = styled.div`
  display: block;
  width: 100%;
  height: 855px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  background: #efefef;
  color: #6c6d6d;
  box-sizing: border-box;
  padding-bottom: 10px;
  padding-right: 5px;
  font-size: 10px;
`

const YearWithDayLegendWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 600px;
  max-height: 820px;
`

export default Byte