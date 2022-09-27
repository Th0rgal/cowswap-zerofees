import { Routes } from 'constants/routes'
import { useWeb3React } from '@web3-react/core'
import { useAtomValue } from 'jotai/utils'
import { limitOrdersAtom } from 'cow-react/modules/limitOrders/state/limitOrdersAtom'
import { useMemo } from 'react'

export function useParameterizeLimitOrdersRoute(): string {
  const { chainId } = useWeb3React()
  const { inputCurrencyId, outputCurrencyId } = useAtomValue(limitOrdersAtom)

  return useMemo(() => {
    return parameterizeLimitOrdersRoute(chainId, inputCurrencyId, outputCurrencyId)
  }, [chainId, inputCurrencyId, outputCurrencyId])
}

export function parameterizeLimitOrdersRoute(
  chainId: number | null | undefined,
  inputCurrencyId: string | null,
  outputCurrencyId: string | null
): string {
  return Routes.LIMIT_ORDER.replace('/:chainId?', chainId ? `/${chainId}` : '')
    .replace('/:inputCurrencyId?', inputCurrencyId ? `/${inputCurrencyId}` : '')
    .replace('/:outputCurrencyId?', outputCurrencyId ? `/${outputCurrencyId}` : '')
}
