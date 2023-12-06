import { UI } from '@cowprotocol/common-const'

import styled, { css } from 'styled-components/macro'

export const Wrapper = styled.div`
  border-top: 1px solid var(${UI.COLOR_BORDER});
  border-bottom: 1px solid var(${UI.COLOR_BORDER});
`

export const TokenItem = styled.button<{ $isVirtual?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: 0;
  outline: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  margin-bottom: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: background 0.1s ease-in-out, color 0.1s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${({ disabled }) => !disabled && `var(${UI.COLOR_PRIMARY_OPACITY_25})`};
    color: inherit;
  }

  ${({ $isVirtual }) =>
    $isVirtual &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    `}
`
