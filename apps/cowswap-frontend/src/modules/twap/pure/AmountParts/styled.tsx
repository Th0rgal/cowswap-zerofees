import { FiatAmount, TokenAmount } from '@cowprotocol/ui'
import { UI } from '@cowprotocol/common-const'

import styled from 'styled-components/macro'

import { QuestionWrapper } from 'legacy/components/QuestionHelper'

import { TradeWidgetFieldBox, TradeWidgetFieldLabel } from 'modules/trade/pure/TradeWidgetField/styled'

export const Wrapper = styled.div`
  display: flex;
  grid-gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    grid-gap: 6px;
  `}
`

export const Part = styled(TradeWidgetFieldBox)`
  background-color: transparent;
  border: 1px solid var(${UI.COLOR_PAPER_DARKER});
  align-content: flex-start;
`

export const Label = styled(TradeWidgetFieldLabel)`
  ${QuestionWrapper} {
    opacity: 0.5;
    transition: opacity 0.1s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
`

export const Amount = styled(TokenAmount)`
  display: flex;
  flex-flow: row wrap;
  font-size: 18px;
  font-weight: 500;
  padding: 2px 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 5px;

  > div:first-child {
    margin: 0 5px 0 0;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 18px;
    padding: 5px 0;
  `}
`

export const Fiat = styled(FiatAmount)`
  color: inherit;
  font-size: 13px;
  opacity: 0.7;
  transition: opacity 0.1s ease-in-out;

  &:hover {
    opacity: 1;
  }
`
