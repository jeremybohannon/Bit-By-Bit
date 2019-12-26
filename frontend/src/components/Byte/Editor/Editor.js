import React from 'react'
import styled from 'styled-components'

function Editor({ selectedBit, setSelectedBit}) {
  function onExit() {
    setSelectedBit({})
  }

  function updateBit(e) {
    console.log('updating Bit...')
    setSelectedBit(prevState => ({
      ...prevState,
      bit:{
        ...prevState.bit,
        mood: e.target.value
      }
    }))
  }

  return (
    <EditorWrapper isActive={Object.keys(selectedBit).length > 0}>
      {
      Object.keys(selectedBit).length > 0 ?
      <EditorContentWrapper>
        <EditorHeader>
          <ExitButton onClick={onExit}>X</ExitButton>
          {/* Temp */}
          <input type="text" pattern="[0-5]*" onChange={updateBit} value={selectedBit.bit.mood} />
        </EditorHeader>
      </EditorContentWrapper>
      : <div></div>
      }
    </EditorWrapper>
  )
}

const EditorWrapper = styled.div`
  display: ${({ isActive }) => isActive ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 855px;
  width: 100%;
  background-color: #b5b5b5ab;
  z-index: 2;
`

const EditorContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  height: 75%;
  width: 87%;
  border-radius: 7px;
  z-index: 2;
  background-color: #fff;
`

const EditorHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
`

const ExitButton = styled.button`
  background: none;
  border: none;
  height: 50px;
  width: 50px;
  cursor: pointer;
  font-size: 15px;
`

export default Editor