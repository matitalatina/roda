import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { size } from 'styled-theme'
import logoImg from '../../../resources/tire-icon.png'
import Link from '../../atoms/Link'
import { coreEndpoint } from '../../../config'

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
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`

const Credits = styled.div`
  font-size: 7pt;
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
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
        <Links>
          <Link href={`${coreEndpoint}/`} target="_blank" animated>API Documentation</Link>&nbsp;·&nbsp;
          <Link href={`${coreEndpoint}/admin`} target="_blank" animated>Admin Panel</Link>&nbsp;·&nbsp;
          <Link href="https://github.com/matitalatina/roda" target="_blank" animated>Source Code</Link>
        </Links>
        <Credits>Made with&nbsp;<span role="img" aria-label="heart">❤️</span>&nbsp;by <Link href="https://www.mattianatali.it/" target="_blank">Mattia Natali</Link></Credits>
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
