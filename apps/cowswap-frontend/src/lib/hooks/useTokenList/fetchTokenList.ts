import { contenthashToUri, parseENSAddress, uriToHttp } from '@cowprotocol/common-utils'
import { validateTokenList } from '@cowprotocol/tokens'
import type { TokenList } from '@uniswap/token-lists'

export const DEFAULT_TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

const listCache = new Map<string, TokenList>()

/** Fetches and validates a token list. */
export default async function fetchTokenList(
  listUrl: string,
  resolveENSContentHash: (ensName: string) => Promise<string>
): Promise<TokenList> {
  const cached = listCache?.get(listUrl) // avoid spurious re-fetches
  if (cached) {
    return cached
  }

  let urls: string[]
  const parsedENS = parseENSAddress(listUrl)
  if (parsedENS) {
    let contentHashUri
    try {
      contentHashUri = await resolveENSContentHash(parsedENS.ensName)
    } catch (error: any) {
      const message = `failed to resolve ENS name: ${parsedENS.ensName}`
      console.debug(message, error)
      throw new Error(message)
    }
    let translatedUri
    try {
      translatedUri = contenthashToUri(contentHashUri)
    } catch (error: any) {
      const message = `failed to translate contenthash to URI: ${contentHashUri}`
      console.debug(message, error)
      throw new Error(message)
    }
    urls = uriToHttp(`${translatedUri}${parsedENS.ensPath ?? ''}`)
  } else {
    urls = uriToHttp(listUrl)
  }

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const isLast = i === urls.length - 1
    let response
    try {
      response = await fetch(url, { credentials: 'omit' })
    } catch (error: any) {
      const message = `failed to fetch list: ${listUrl}`
      console.debug(message, error)
      if (isLast) throw new Error(message)
      continue
    }

    if (!response.ok) {
      const message = `failed to fetch list: ${listUrl}`
      console.debug(message, response.statusText)
      if (isLast) throw new Error(message)
      continue
    }

    const json = await response.json()
    const list = await validateTokenList(json)
    listCache?.set(listUrl, list)
    return list
  }

  throw new Error('Unrecognized list URL protocol.')
}
