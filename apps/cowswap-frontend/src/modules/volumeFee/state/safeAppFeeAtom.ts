import { atom } from 'jotai'

import { STABLECOINS } from '@cowprotocol/common-const'
import { getCurrencyAddress } from '@cowprotocol/common-utils'
import { OrderKind, SupportedChainId } from '@cowprotocol/cow-sdk'
import { walletDetailsAtom, walletInfoAtom } from '@cowprotocol/wallet'

import { featureFlagsAtom } from '../../../common/state/featureFlagsState'
import { derivedTradeStateAtom } from '../../trade'
import { VolumeFee } from '../types'

const SAFE_FEE_RECIPIENT = '0x63695Eee2c3141BDE314C5a6f89B98E62808d716'

const FEE_TIERS = {
  TIER_1: 100_000, // 0 - 100k
  TIER_2: 1_000_000, // 100k - 1m
}

const FEE_PERCENTAGE_BPS = {
  REGULAR: {
    TIER_1: 0,
    TIER_2: 0,
    TIER_3: 0,
  },
  STABLE: {
    TIER_1: 0,
    TIER_2: 0,
    TIER_3: 0,
  },
}

/**
 * https://help.safe.global/en/articles/178530-how-does-the-widget-fee-work-for-native-swaps
 * https://github.com/safe-global/safe-wallet-web/blob/0818e713fa0f9bb7a6472e34a05888896ffc3835/src/features/swap/helpers/fee.ts
 */
export const safeAppFeeAtom = atom<VolumeFee | null>((get) => {
  const { chainId } = get(walletInfoAtom)
  const { isSafeApp } = get(walletDetailsAtom)
  const { isSafeAppFeeEnabled } = get(featureFlagsAtom)
  const { inputCurrency, outputCurrency, inputCurrencyFiatAmount, outputCurrencyFiatAmount, orderKind } =
    get(derivedTradeStateAtom) || {}
  const isBaseNetwork = chainId === SupportedChainId.BASE

  if (!isSafeApp || !isSafeAppFeeEnabled || isBaseNetwork) return null

  const fiatCurrencyValue = orderKind === OrderKind.SELL ? inputCurrencyFiatAmount : outputCurrencyFiatAmount
  const fiatAmount = fiatCurrencyValue ? +fiatCurrencyValue.toExact() : null

  if (typeof fiatAmount !== 'number') return null

  const stablecoins = STABLECOINS[chainId]
  const isInputStableCoin = !!inputCurrency && stablecoins.has(getCurrencyAddress(inputCurrency).toLowerCase())
  const isOutputStableCoin = !!outputCurrency && stablecoins.has(getCurrencyAddress(outputCurrency).toLowerCase())
  const isStableCoinTrade = isInputStableCoin && isOutputStableCoin

  const bps = (() => {
    if (fiatAmount < FEE_TIERS.TIER_1) {
      return isStableCoinTrade ? FEE_PERCENTAGE_BPS.STABLE.TIER_1 : FEE_PERCENTAGE_BPS.REGULAR.TIER_1
    }

    if (fiatAmount < FEE_TIERS.TIER_2) {
      return isStableCoinTrade ? FEE_PERCENTAGE_BPS.STABLE.TIER_2 : FEE_PERCENTAGE_BPS.REGULAR.TIER_2
    }

    return isStableCoinTrade ? FEE_PERCENTAGE_BPS.STABLE.TIER_3 : FEE_PERCENTAGE_BPS.REGULAR.TIER_3
  })()

  return { bps, recipient: SAFE_FEE_RECIPIENT }
})
