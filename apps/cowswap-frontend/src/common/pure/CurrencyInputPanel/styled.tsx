import { TokenAmount, loadingOpacityMixin } from '@cowprotocol/ui'

import { transparentize } from 'polished'
import styled from 'styled-components/macro'

import Input from 'legacy/components/NumericalInput'

import { UI } from '@cowprotocol/ui'

export const OuterWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-flow: column wrap;
`

export const Wrapper = styled.div<{ withReceiveAmountInfo: boolean; readOnly: boolean; pointerDisabled: boolean }>`
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  gap: 10px;
  padding: 16px;
  background: ${({ readOnly }) => (readOnly ? 'transparent' : `var(${UI.COLOR_PAPER_DARKER})`)};
  border: ${({ theme, readOnly }) => (readOnly ? `1px solid ${theme.grey1}` : 'none')};
  border-radius: ${({ withReceiveAmountInfo }) => (withReceiveAmountInfo ? '16px 16px 0 0' : '16px')};
  min-height: 106px;
  pointer-events: ${({ pointerDisabled }) => (pointerDisabled ? 'none' : '')};
  max-width: 100%;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px 12px;
  `}
`

export const CurrencyInputBox = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, auto);
  word-break: break-all;
  gap: 16px;
  margin: 0;
  font-weight: 400;
  font-size: 13px;
  color: ${`var(${UI.COLOR_TEXT_OPACITY_70})`};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    gap: 8px;
  `}

  > div {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  > div:last-child {
    text-align: right;
    margin: 0 0 0 auto;
  }
`

export const CurrencyTopLabel = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: auto 0;
  color: ${`var(${UI.COLOR_TEXT_OPACITY_70})`};
`

export const NumericalInput = styled(Input)<{ $loading: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: none;
  font-size: 28px;
  font-weight: 500;
  color: ${`var(${UI.COLOR_TEXT})`};

  &::placeholder {
    color: ${({ theme }) => transparentize(0.3, theme.text)};
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 26px;
  `}

  ${loadingOpacityMixin}
`

export const TokenAmountStyled = styled(TokenAmount)`
  font-size: 28px;
  font-weight: 500;
  color: ${`var(${UI.COLOR_TEXT})`};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 26px;
  `}
`

export const BalanceText = styled.span`
  font-weight: inherit;
  font-size: inherit;
  gap: 5px;
  display: flex;
  align-items: center;
`

export const FiatAmountText = styled.span`
  // TODO: inherit font styles from 'CurrencyInputBox' instead
  > div {
    font-weight: 400;
    font-size: 13px;
  }
`

export const SetMaxBtn = styled.button`
  display: inline-block;
  cursor: pointer;
  margin: 0;
  background: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text3};
  font-weight: 600;
  font-size: 11px;
  background: ${({ theme }) => transparentize(0.9, theme.text3)};
  border-radius: 6px;
  padding: 3px 4px;
  text-transform: uppercase;
  transition: background 0.15s ease-in-out;

  &:hover {
    background: ${({ theme }) => transparentize(0.7, theme.text3)};
  }
`
