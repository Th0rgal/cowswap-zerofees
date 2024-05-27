import { ReactNode, useEffect } from 'react'

import { PriorityTokensUpdater } from '@cowprotocol/balances-and-allowances'
import { useWalletInfo } from '@cowprotocol/wallet'

import { TradeFormValidationUpdater } from 'modules/tradeFormValidation'
import { TradeQuoteState, TradeQuoteUpdater, useUpdateTradeQuote } from 'modules/tradeQuote'

import { usePriorityTokenAddresses } from '../../hooks/usePriorityTokenAddresses'
import { CommonTradeUpdater } from '../../updaters/CommonTradeUpdater'
import { DisableNativeTokenSellingUpdater } from '../../updaters/DisableNativeTokenSellingUpdater'
import { PriceImpactUpdater } from '../../updaters/PriceImpactUpdater'
import { RecipientAddressUpdater } from '../../updaters/RecipientAddressUpdater'

interface TradeWidgetUpdatersProps {
  disableQuotePolling: boolean
  disableNativeSelling: boolean
  children: ReactNode
  tradeQuoteStateOverride?: TradeQuoteState
}

export function TradeWidgetUpdaters({
  disableQuotePolling,
  disableNativeSelling,
  tradeQuoteStateOverride,
  children,
}: TradeWidgetUpdatersProps) {
  const { chainId, account } = useWalletInfo()
  const updateQuoteState = useUpdateTradeQuote()
  const priorityTokenAddresses = usePriorityTokenAddresses()

  useEffect(() => {
    if (disableQuotePolling && tradeQuoteStateOverride) {
      updateQuoteState(tradeQuoteStateOverride)
    }
  }, [tradeQuoteStateOverride, disableQuotePolling, updateQuoteState])

  return (
    <>
      <PriorityTokensUpdater account={account} chainId={chainId} tokenAddresses={priorityTokenAddresses} />
      <RecipientAddressUpdater />

      {!disableQuotePolling && <TradeQuoteUpdater />}
      <PriceImpactUpdater />
      <TradeFormValidationUpdater />
      <CommonTradeUpdater />
      {disableNativeSelling && <DisableNativeTokenSellingUpdater />}
      {children}
    </>
  )
}
