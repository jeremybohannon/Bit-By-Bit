import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Year from './Year/Year'
import DayLegend from './DayLegend/DayLegend'
import MonthLegend from './MonthLegend/MonthLegend'
import Editor from './Editor/Editor'

function Byte({ byteData, setByteData, BackendService, userProfile }) {
  const [selectedBit, setSelectedBit] = useState({})
  const [index, setIndex] = useState({})

  async function updateServer(callBack = () => {}) {
    let newArr = [...byteData]
    newArr[index.month][index.bit].mood = selectedBit.bit.mood

    setByteData(newArr)
    try {
      const resp = await BackendService.updateUserData(userProfile.getAuthId(), newArr)
      const json = await resp.json()
      // TODO test wiht null and make pretty
      callBack(json)
    } catch (e) {
      console.error(e)
      callBack(null)
    }
  }

  function handleBitClick(index) {
    setIndex(index)
    setSelectedBit({ bit: byteData[index.month][index.bit], index: index })
  }

  return (
    <React.Fragment>
      {/* Todo, make this own function to share */}
      <Editor selectedBit={selectedBit} setSelectedBit={setSelectedBit} updateServer={updateServer} />
      <YearWithMonthLegendWrapper>
        <MonthLegend />
        <YearWithDayLegendWrapper>
          <DayLegend />
          <Year byte={byteData} handleBitClick={handleBitClick} />
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
  max-width: 400px;
  height: 100%;
  min-height: 600px;
  max-height: 820px;
  margin-left: auto;
  margin-right: auto;
`

export default Byte