import { TokenAmount } from '@cowprotocol/ui'
import { Currency } from '@uniswap/sdk-core'

import { Trans } from '@lingui/macro'

import { BalanceAndSubsidy } from 'legacy/hooks/useCowBalanceAndSubsidy'

import { ReceiveAmountInfoTooltip } from 'modules/swap/pure/ReceiveAmountInfo'
import { ReceiveAmountInfo } from 'modules/trade/types'

import * as styledEl from './styled'

export interface ReceiveAmountProps {
  receiveAmountInfo: ReceiveAmountInfo
  currency: Currency
  subsidyAndBalance: BalanceAndSubsidy
  allowsOffchainSigning: boolean
}

export function ReceiveAmount(props: ReceiveAmountProps) {
  const { type, amountAfterFees, customTitle } = props.receiveAmountInfo
  const title = amountAfterFees.toExact() + ' ' + props.currency.symbol

  return (
    <styledEl.ReceiveAmountBox>
      <div>
        <span>
          <Trans>{customTitle || (type === 'from' ? 'From (incl. costs)' : 'Receive (incl. costs)')}</Trans>
        </span>

        <styledEl.QuestionHelperWrapped text={<ReceiveAmountInfoTooltip {...props} />} />
      </div>
      <div>
        <styledEl.ReceiveAmountValue title={title}>
          <TokenAmount amount={amountAfterFees} defaultValue="0" />
        </styledEl.ReceiveAmountValue>
      </div>
    </styledEl.ReceiveAmountBox>
  )
}
