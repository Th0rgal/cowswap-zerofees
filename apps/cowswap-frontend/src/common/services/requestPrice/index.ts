import { getAddress, getIsNativeToken } from '@cowprotocol/common-utils'
import { Currency, Fraction } from '@uniswap/sdk-core'

import * as Sentry from '@sentry/browser'

import { getNativePrice } from 'api/cowProtocol'

import { parsePrice } from '../../utils/parsePrice'

type PriceResult = number | Error | undefined

async function requestPriceForCurrency(chainId: number | undefined, currency: Currency | null): Promise<PriceResult> {
  const currencyAddress = getAddress(currency)

  if (!chainId || !currency) {
    return
  }

  try {
    if (getIsNativeToken(currency) || !currencyAddress) {
      return parsePrice(1, currency)
    }

    const result = await getNativePrice(chainId, currencyAddress)

    if (!result) {
      throw new Error('No result from native_price endpoint')
    }

    const price = parsePrice(result.price || 0, currency)
    if (!price) {
      throw new Error("Couldn't parse native_price result")
    }

    return price
  } catch (error: any) {
    console.warn('[requestPriceForCurrency] Error fetching native_price', error)

    const sentryError = Object.assign(error, {
      message: error.message || 'Error fetching native_price ',
      name: 'NativePriceFetchError',
    })

    const params = {
      chainId,
      tokenAddress: currencyAddress,
      tokenName: currency?.name,
      tokenSymbol: currency.symbol,
    }

    Sentry.captureException(sentryError, {
      contexts: {
        params,
      },
    })

    return error
  }
}

export async function requestPrice(
  chainId: number | undefined,
  inputCurrency: Currency | null,
  outputCurrency: Currency | null,
): Promise<Fraction | null> {
  return Promise.all([
    requestPriceForCurrency(chainId, inputCurrency),
    requestPriceForCurrency(chainId, outputCurrency),
  ]).then(([inputPrice, outputPrice]) => {
    if (!inputPrice || !outputPrice || inputPrice instanceof Error || outputPrice instanceof Error) {
      return null
    }

    const result = new Fraction(inputPrice, outputPrice)

    console.debug('Updated limit orders initial price: ', result.toSignificant(18))

    return result
  })
}
