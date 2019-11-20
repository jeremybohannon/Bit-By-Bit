import React from 'react'
import styled from 'styled-components'

function Loading({message = "Loading..."}) {
  return (
  <LoadingWrapper>{message}</LoadingWrapper>
  )
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
`

export default Loading