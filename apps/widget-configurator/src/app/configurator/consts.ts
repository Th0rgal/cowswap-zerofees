import { TradeType } from '@cowprotocol/widget-lib'

export const TRADE_MODES = [TradeType.SWAP, TradeType.LIMIT, TradeType.ADVANCED]

// TODO: Move default palette to a new lib that only exposes the palette colors.
// This wayit can be consumed by both the configurator and the widget.
export const DEFAULT_LIGHT_PALETTE = {
  primary: '#052b65',
  background: '#ffffff',
  paper: '#ffffff',
  text: '#052B65',
  danger: '#D41300',
  warning: '#DB971E',
  info: '#CAE9FF',
  success: '#007B28',
}

export const DEFAULT_DARK_PALETTE = {
  primary: '#0d5ed9',
  background: '#303030',
  paper: '#0c264b',
  text: '#CAE9FF',
  danger: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  success: '#4caf50',
}
