import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Alert from 'react-bootstrap/Alert'

function Editor({ selectedBit, setSelectedBit, updateServer }) {
  const [isLoading, setIsLoading] = useState(false)
  const [formIsDirty, setFormIsDirty] = useState(false)
  const [showAlert, setShowAlert] = useState(null)

  function onExit() {
    setSelectedBit({})
    setFormIsDirty(false)
  }

  function updateData() {
    setIsLoading(true)
    updateServer((resp) => {
      console.log(resp)
      if (resp !== null) {
        handleAlert('success', 'Saved!')
        setIsLoading(false)
        setFormIsDirty(false)
      } else {
        handleAlert('danger', 'Failed to save.')
        setIsLoading(false)
      }
    })
  }

  function handleAlert(variant, message) {
    setShowAlert({variant, message})
    setTimeout(() => {
      setShowAlert(null)
    }, 1000)
  }

  function updateBit(value) {
    console.log(value)
    setFormIsDirty(true)
    setSelectedBit(prevState => ({
      ...prevState,
      bit: {
        ...prevState.bit,
        mood: value
      }
    }))
  }

  return (
    <EditorWrapper isActive={Object.keys(selectedBit).length > 0}>
      {
        Object.keys(selectedBit).length > 0 ?
          <EditorContentWrapper>
            <EditorHeader>
              <Button variant="secondary" onClick={onExit}>X</Button>
            </EditorHeader>
            <EditorContent>
              <StyledButtonToolbar>
                <ToggleButtonGroup type="radio" name="options"
                  defaultValue={parseInt(selectedBit.bit.mood)}
                  onChange={updateBit}>
                  <ToggleButton value={0}>Very Bad</ToggleButton>
                  <ToggleButton value={1}>Bad</ToggleButton>
                  <ToggleButton value={2}>Neutral</ToggleButton>
                  <ToggleButton value={3}>Good</ToggleButton>
                  <ToggleButton value={4}>Very Good</ToggleButton>
                </ToggleButtonGroup>
              </StyledButtonToolbar>
            </EditorContent>
            <EditorFooter>
              {
                formIsDirty ?
                  <StyledButton variant="primary"
                    disabled={isLoading}
                    onClick={!isLoading ? updateData : null}>{isLoading ? 'Saving...' : 'Save'}</StyledButton>
                  : <div></div>
              }
              {
                showAlert !== null ? <StyledAlert variant={showAlert.variant}>{showAlert.message}</StyledAlert> : <div></div>
              }

            </EditorFooter>
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
  flex-wrap: wrap;
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
  justify-content: flex-end;
  align-items: center;
  padding: 0px 15px;
`

const EditorContent = styled.div`
  width: 100%;
  height: calc(100% - (200px));
  display: flex;
  justify-content: center;
`

const EditorFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 150px;
  padding: 5px 10px;
`

const StyledButtonToolbar = styled(ButtonToolbar)`
  height: fit-content;
` 

const StyledButton = styled(Button)`
  height: fit-content;
`

const StyledAlert = styled(Alert)`
  height: fit-content;
`

export default Editor