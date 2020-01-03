import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'

function Editor({ selectedBit, setSelectedBit, index, updateServer }) {
  const [isLoading, setIsLoading] = useState(false)
  const [formIsDirty, setFormIsDirty] = useState(false)
  const [showAlert, setShowAlert] = useState(null)

  //TODO Get from db or global state
  const colorMap = ['#620ba0c7', '#9e77d0', '#0baef1c9', '#52AA5E', '#388659']

  function onExit() {
    setSelectedBit({})
    setFormIsDirty(false)
  }

  function updateData() {
    setIsLoading(true)
    updateServer(index, selectedBit, (resp) => {
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
    setShowAlert({ variant, message })
    setTimeout(() => {
      setShowAlert(null)
    }, 1000)
    setTimeout(() => {
      onExit()
    }, 1200)
  }

  function updateBit(value) {
    setFormIsDirty(true)
    setSelectedBit(prevState => ({
      ...prevState,
      bit: {
        ...prevState.bit,
        mood: value
      }
    }))
  }

  function updateNotes({ target: { value } }) {
    setFormIsDirty(true)
    setSelectedBit(prevState => ({
      ...prevState,
      bit: {
        ...prevState.bit,
        notes: value
      }
    }))
  }

  function formatDate(date) {
    const dateObj = new Date(date)
    return dateObj.toGMTString().substr(0, 16)
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
              <Form>
                <h4>{formatDate(selectedBit.bit.date)}</h4>
                <Form.Group>
                  <Form.Label>Mood</Form.Label>
                  <StyledButtonToolbar>
                    <ToggleButtonGroup
                      type="radio"
                      name="options"
                      defaultValue={parseInt(selectedBit.bit.mood)}
                      onChange={updateBit}>
                      <StyledToggleButton value={0} colormap={colorMap}>Very Bad</StyledToggleButton>
                      <StyledToggleButton value={1} colormap={colorMap}>Bad</StyledToggleButton>
                      <StyledToggleButton value={2} colormap={colorMap}>Neutral</StyledToggleButton>
                      <StyledToggleButton value={3} colormap={colorMap}>Good</StyledToggleButton>
                      <StyledToggleButton value={4} colormap={colorMap}>Very Good</StyledToggleButton>
                    </ToggleButtonGroup>
                  </StyledButtonToolbar>
                </Form.Group>
                <Form.Group controlId="editor.Notes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows="3" value={`${selectedBit.bit.notes}`} onChange={updateNotes} />
                </Form.Group>
                <StyledFormGroupSave>
                  {
                    formIsDirty ?
                      <StyledButton variant="primary"
                        disabled={isLoading}
                        onClick={!isLoading ? updateData : null}>{isLoading ? 'Saving...' : 'Save'}</StyledButton>
                      : <div></div>
                  }
                </StyledFormGroupSave>
              </Form>
            </EditorContent>
            <EditorFooter>
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
  height: 50%;
  width: 87%;
  min-width: 325px;
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
  height: calc(100% - (125px));
  display: flex;
  justify-content: center;
  padding: 0px 20px;
`

const EditorFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 75px;
  padding: 5px 10px;
`

const StyledButtonToolbar = styled(ButtonToolbar)`
  height: fit-content;
`

const StyledButton = styled(Button)`
  height: fit-content;
`

const StyledToggleButton = styled(ToggleButton)`
  background-color: ${({ value, colormap }) => colormap[value]} !important;
  border-color: ${({ value, colormap }) => colormap[value]} !important;

  &:not(:disabled):not(.disabled).active {
    font-weight: bold;
    font-style: italic;
  }
`

const StyledAlert = styled(Alert)`
  height: fit-content;
`

const StyledFormGroupSave = styled(Form.Group)`
  display: flex;
  justify-content: flex-end;
`

export default Editor
