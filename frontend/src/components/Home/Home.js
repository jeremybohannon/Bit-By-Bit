import React from 'react'
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Home() {
  return (
    <HomeWrapper>
      <Container>
        <Row>
          <Col>
            <StyledHeader>Track your mood,</StyledHeader>
            <StyledHeader>day by day,</StyledHeader>
            <StyledHeader>bit by bit.</StyledHeader>
          </Col>
        </Row>
        <Row className="margin-top-200">
          <Col>
            <StyledSubHeader>Login to get started!</StyledSubHeader>
          </Col>
        </Row>
      </Container>
      
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div`
  display: block;
  width: 100%;
  height: 855px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15%;
  background: white;
  color: #6c6d6d;
  box-sizing: border-box;
  padding-bottom: 10px;
  padding-right: 5px;
  font-size: 10px;
`

const StyledHeader = styled.h1`
  text-align: center;
`

const StyledSubHeader = styled.h3`
  text-align: center;
`