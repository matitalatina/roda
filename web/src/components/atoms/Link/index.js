import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

const styles = css`
  font-family: ${font('primary')};
  text-decoration: none;
  font-weight: 500;
  color: ${palette('foreground', 0)};
  position: relative;
  text-decoration: underline;
  text-decoration-style: dotted;

  &:focus,
  &:active {
    color: ${palette('foreground', 0)};
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    right: 0;
    width: 0;
    bottom: 0.2em;
    background: ${palette('foreground', 0)};
    height: ${props => props.animated ? '1px' : '0'};
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  &:hover:after,
  &:focus:after,
  &:active:after {
    color: ${palette('foreground', 0)};
    left: 0;
    right: auto;
    width: 100%;
  }

  &:hover {
    text-decoration: underline;
    text-decoration-style: dotted;
    color: ${palette('foreground', 1)};
  }
`
const Anchor = styled.a`${styles}`

const Link = ({ ...props }) => {
  return <Anchor {...props} />
}

Link.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
  to: PropTypes.string,
  animated: PropTypes.bool,
}

Link.defaultProps = {
  palette: 'primary',
}

export default Link
