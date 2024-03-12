import React from 'react'

import { WRAPPED_NATIVE_CURRENCIES as WETH } from '@cowprotocol/common-const'
import { useWalletInfo } from '@cowprotocol/wallet'

import { EVENT_EMITTER } from 'eventEmitter'
import { Navigate, useLocation, useParams } from 'react-router-dom'

import { AppDataUpdater } from 'modules/appData'
import { HooksUpdater } from 'modules/hooks/updater/HooksUpdater'
import { SwapWidget, SwapDerivedStateUpdater, SwapAmountsFromUrlUpdater } from 'modules/swap'
import { useSwapSlippage } from 'modules/swap/hooks/useSwapSlippage'
import { getDefaultTradeRawState } from 'modules/trade/types/TradeRawState'
import { parameterizeTradeRoute } from 'modules/trade/utils/parameterizeTradeRoute'

import { Routes } from 'common/constants/routes'

export interface SwapPageProps {
  hooksEnabled: boolean
}

export function SwapPage({ hooksEnabled }: SwapPageProps) {
  const params = useParams()
  const slippage = useSwapSlippage()

  if (!params.chainId) {
    return <SwapPageRedirect />
  }

  return (
    <>
      <AppDataUpdater orderClass="market" slippage={slippage} />
      <HooksUpdater eventEmitter={EVENT_EMITTER} />
      <SwapDerivedStateUpdater />
      <SwapAmountsFromUrlUpdater />
      <SwapWidget hooksEnabled={hooksEnabled} />
    </>
  )
}

function SwapPageRedirect() {
  const { chainId } = useWalletInfo()
  const location = useLocation()

  if (!chainId) return null

  const defaultState = getDefaultTradeRawState(chainId)
  const searchParams = new URLSearchParams(location.search)
  const inputCurrencyId = searchParams.get('inputCurrency') || defaultState.inputCurrencyId || WETH[chainId]?.symbol
  const outputCurrencyId = searchParams.get('outputCurrency') || defaultState.outputCurrencyId || undefined

  searchParams.delete('inputCurrency')
  searchParams.delete('outputCurrency')
  searchParams.delete('chain')

  const pathname = parameterizeTradeRoute({ chainId: String(chainId), inputCurrencyId, outputCurrencyId }, Routes.SWAP)

  return <Navigate to={{ ...location, pathname, search: searchParams.toString() }} />
}
