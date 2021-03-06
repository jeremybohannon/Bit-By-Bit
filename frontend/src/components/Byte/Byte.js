import React, { useState } from 'react'
import styled from 'styled-components'

import Year from './Year/Year'
import DayLegend from './DayLegend/DayLegend'
import MonthLegend from './MonthLegend/MonthLegend'
import Editor from './Editor/Editor'

function Byte({ byteData, updateServer }) {
  const [selectedBit, setSelectedBit] = useState({})
  const [index, setIndex] = useState({})

  function handleBitClick(index) {
    setIndex(index)
    setSelectedBit({ bit: byteData[index.month][index.bit], index: index })
  }

  return (
    <React.Fragment>
      {/* Todo, make this own function to share */}
      <Editor selectedBit={selectedBit} setSelectedBit={setSelectedBit} index={index} updateServer={updateServer} />
      <YearWithMonthLegendWrapper>
        <MonthLegend />
        <YearWithDayLegendWrapper>
          <DayLegend />
          <Year byteData={byteData} handleBitClick={handleBitClick} />
        </YearWithDayLegendWrapper>
      </YearWithMonthLegendWrapper>
    </React.Fragment>
  )
}

const YearWithMonthLegendWrapper = styled.div`
  display: block;
  width: 100%;
  height: 855px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
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
  max-width: 400px;
  height: 100%;
  min-height: 600px;
  max-height: 820px;
  margin-left: auto;
  margin-right: auto;
`

export default Byte