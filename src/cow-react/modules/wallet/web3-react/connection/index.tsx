import { Connector } from '@web3-react/types'

import { isChrome, isMobile } from 'utils/userAgent'
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains'
import { getIsCoinbaseWallet, getIsInjected, getIsMetaMask } from '@cow/modules/wallet/api/utils/connection'

import { Web3ReactConnection } from '../types'
import { ConnectionType } from '../../api/types'

import { CoinbaseWalletOption } from './coinbase'
import { InjectedOption, InstallMetaMaskOption, MetaMaskOption, OpenMetaMaskMobileOption } from './injected'
import { WalletConnectOption } from './walletConnect'
import { gnosisSafeConnection } from './safe'
import { injectedConnection } from './injected'
import { coinbaseWalletConnection } from './coinbase'
import { walletConnectConnection } from './walletConnect'
import { fortmaticConnection } from './formatic'
import { networkConnection } from './network'
import { ZengoOption } from './zengo'
import { AmbireOption } from './ambire'
import { AlphaOption } from './alpha'
import { tallyWalletConnection, TallyWalletOption } from './tally'

const CONNECTIONS: Web3ReactConnection[] = [
  gnosisSafeConnection,
  injectedConnection,
  coinbaseWalletConnection,
  walletConnectConnection,
  fortmaticConnection,
  networkConnection,
  tallyWalletConnection,
]

export function isChainAllowed(connector: Connector, chainId: number) {
  switch (connector) {
    case fortmaticConnection.connector:
      return chainId === SupportedChainId.MAINNET
    case injectedConnection.connector:
    case coinbaseWalletConnection.connector:
    case walletConnectConnection.connector:
    case networkConnection.connector:
    case gnosisSafeConnection.connector:
    case tallyWalletConnection.connector:
      return ALL_SUPPORTED_CHAIN_IDS.includes(chainId)
    default:
      return false
  }
}

export function getWeb3ReactConnection(c: Connector | ConnectionType): Web3ReactConnection {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find((connection) => connection.connector === c)
    if (!connection) {
      throw Error('unsupported connector')
    }
    return connection
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection
      case ConnectionType.COINBASE_WALLET:
        return coinbaseWalletConnection
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection
      case ConnectionType.ZENGO:
        return walletConnectConnection
      case ConnectionType.FORTMATIC:
        return fortmaticConnection
      case ConnectionType.NETWORK:
        return networkConnection
      case ConnectionType.GNOSIS_SAFE:
        return gnosisSafeConnection
      case ConnectionType.AMBIRE:
        return walletConnectConnection
      case ConnectionType.ALPHA:
        return walletConnectConnection
      case ConnectionType.TALLY:
        return tallyWalletConnection
    }
  }
}

export type TryActivation = (connector: Connector) => void

export function ConnectWalletOptions({ tryActivation }: { tryActivation: TryActivation }) {
  const isInjected = getIsInjected()
  const isMetaMask = getIsMetaMask()
  const isCoinbaseWallet = getIsCoinbaseWallet()

  const isCoinbaseWalletBrowser = isMobile && isCoinbaseWallet
  const isMetaMaskBrowser = isMobile && isMetaMask
  const isInjectedMobileBrowser = isCoinbaseWalletBrowser || isMetaMaskBrowser

  let injectedOption
  if (!isInjected) {
    if (!isMobile) {
      injectedOption = <InstallMetaMaskOption />
    } else {
      injectedOption = <OpenMetaMaskMobileOption />
    }
  } else if (!isCoinbaseWallet) {
    if (isMetaMask) {
      injectedOption = <MetaMaskOption tryActivation={tryActivation} />
    } else {
      injectedOption = <InjectedOption tryActivation={tryActivation} />
    }
  }

  const coinbaseWalletOption = <CoinbaseWalletOption tryActivation={tryActivation} />

  const walletConnectionOption =
    (!isInjectedMobileBrowser && <WalletConnectOption tryActivation={tryActivation} />) ?? null

  // Wallet-connect based
  const zengoOption = (!isInjectedMobileBrowser && <ZengoOption tryActivation={tryActivation} />) ?? null
  const ambireOption = (!isInjectedMobileBrowser && <AmbireOption tryActivation={tryActivation} />) ?? null
  const alphaOption = (!isInjectedMobileBrowser && <AlphaOption tryActivation={tryActivation} />) ?? null

  // Injected
  const tallyOption =
    (!isInjectedMobileBrowser && isChrome && <TallyWalletOption tryActivation={tryActivation} />) ?? null

  return (
    <>
      {injectedOption}
      {walletConnectionOption}
      {coinbaseWalletOption}
      {zengoOption}
      {ambireOption}
      {alphaOption}
      {tallyOption}
    </>
  )
}

export function onError(error: Error) {
  console.debug(`[web3-react] Error: ${error}`)
}
