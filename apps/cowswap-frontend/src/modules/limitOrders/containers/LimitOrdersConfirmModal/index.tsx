import { useAtom, useAtomValue } from 'jotai'
import React from 'react'

import { TokenSymbol } from '@cowswap/ui'

import { PriceImpact } from 'legacy/hooks/usePriceImpact'

import { LimitOrdersWarnings } from 'modules/limitOrders/containers/LimitOrdersWarnings'
import { useHandleOrderPlacement } from 'modules/limitOrders/hooks/useHandleOrderPlacement'
import { useIsSafeApprovalBundle } from 'modules/limitOrders/hooks/useIsSafeApprovalBundle'
import { useLimitOrdersWarningsAccepted } from 'modules/limitOrders/hooks/useLimitOrdersWarningsAccepted'
import { useRateImpact } from 'modules/limitOrders/hooks/useRateImpact'
import { executionPriceAtom } from 'modules/limitOrders/state/executionPriceAtom'
import { limitOrdersSettingsAtom } from 'modules/limitOrders/state/limitOrdersSettingsAtom'
import { limitRateAtom } from 'modules/limitOrders/state/limitRateAtom'
import { partiallyFillableOverrideAtom } from 'modules/limitOrders/state/partiallyFillableOverride'
import { TradeConfirmation, TradeConfirmModal, useTradeConfirmActions } from 'modules/trade'

import { useRateInfoParams } from 'common/hooks/useRateInfoParams'
import { CurrencyPreviewInfo } from 'common/pure/CurrencyAmountPreview'

import { LOW_RATE_THRESHOLD_PERCENT } from '../../const/trade'
import { LimitOrdersDetails } from '../../pure/LimitOrdersDetails'
import { TradeFlowContext } from '../../services/types'

export interface LimitOrdersConfirmModalProps {
  tradeContext: TradeFlowContext
  inputCurrencyInfo: CurrencyPreviewInfo
  outputCurrencyInfo: CurrencyPreviewInfo
  priceImpact: PriceImpact
}

export function LimitOrdersConfirmModal(props: LimitOrdersConfirmModalProps) {
  const { inputCurrencyInfo, outputCurrencyInfo, tradeContext, priceImpact } = props
  const warningsAccepted = useLimitOrdersWarningsAccepted(true)
  const settingsState = useAtomValue(limitOrdersSettingsAtom)
  const executionPrice = useAtomValue(executionPriceAtom)
  const limitRateState = useAtomValue(limitRateAtom)
  const partiallyFillableOverride = useAtom(partiallyFillableOverrideAtom)

  const { amount: inputAmount } = inputCurrencyInfo
  const { amount: outputAmount } = outputCurrencyInfo

  const rateImpact = useRateImpact()
  const rateInfoParams = useRateInfoParams(inputAmount, outputAmount)

  const tradeConfirmActions = useTradeConfirmActions()

  const doTrade = useHandleOrderPlacement(tradeContext, priceImpact, settingsState, tradeConfirmActions)
  const isTooLowRate = rateImpact < LOW_RATE_THRESHOLD_PERCENT
  const isConfirmDisabled = isTooLowRate ? !warningsAccepted : false

  const isSafeApprovalBundle = useIsSafeApprovalBundle(inputAmount)
  const buttonText = isSafeApprovalBundle ? (
    <>
      Confirm (Approve&nbsp;
      <TokenSymbol token={inputAmount?.currency.wrapped} length={6} />
      &nbsp;& Limit order)
    </>
  ) : (
    'Place limit order'
  )

  return (
    <TradeConfirmModal>
      <TradeConfirmation
        title="Review limit order"
        inputCurrencyInfo={inputCurrencyInfo}
        outputCurrencyInfo={outputCurrencyInfo}
        onConfirm={doTrade}
        onDismiss={tradeConfirmActions.onDismiss}
        isConfirmDisabled={isConfirmDisabled}
        priceImpact={priceImpact}
        buttonText={buttonText}
      >
        <>
          <LimitOrdersDetails
            limitRateState={limitRateState}
            tradeContext={tradeContext}
            rateInfoParams={rateInfoParams}
            settingsState={settingsState}
            executionPrice={executionPrice}
            partiallyFillableOverride={partiallyFillableOverride}
          />
          <LimitOrdersWarnings isConfirmScreen={true} />
        </>
      </TradeConfirmation>
    </TradeConfirmModal>
  )
}
