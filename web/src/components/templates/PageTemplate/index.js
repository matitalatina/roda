import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { size } from 'styled-theme'
import logoImg from '../../../resources/tire-icon.png'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  min-height: 100vh;
  box-sizing: border-box;
  @media screen and (max-width: 640px) {
    padding-top: 3.25rem;
  }
`

const Header = styled.header``

const HeaderWrapper = styled.div`
  max-width: 1100px;
  margin: auto;
  font-family: 'Audiowide';
  font-size: 30pt;
`

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
  max-width: ${size('maxWidth')};
`

const Footer = styled.footer`
  margin-top: auto;
  background-color: #222;
  color: #aaa;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  font-size: 7pt;
`

const Logo = styled.img`
  height: 50px;
  margin-right: 1rem;
`

const PageTemplate = ({
  header, children, footer, ...props
}) => {
  if (!header) {
    header = (
      <HeaderWrapper>
        <Logo src={logoImg} />
        Röda Project
      </HeaderWrapper>
    )
  }
  if (!footer) {
    footer = (
      <FooterWrapper>
        Made with&nbsp;<span role="img" aria-label="heart">❤️</span>&nbsp;by Mattia Natali
      </FooterWrapper>
    )
  }
  return (
    <Wrapper {...props}>
      <Header>{header}</Header>
      <Content>{children}</Content>
      <Footer>{footer}</Footer>
    </Wrapper>
  )
}

PageTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.any.isRequired,
}

export default PageTemplate
