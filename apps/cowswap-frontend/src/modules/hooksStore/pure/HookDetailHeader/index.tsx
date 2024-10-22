import { HookDappWalletCompatibility } from '@cowprotocol/hook-dapp-lib'

import * as styled from './styled'

import { HookDapp } from '../../types/hooks'

interface HookDetailHeaderProps {
  dapp: HookDapp
  walletType: HookDappWalletCompatibility
  onSelect?: () => void
  iconSize?: number
  gap?: number
  padding?: string
}

export function HookDetailHeader({ dapp, walletType, onSelect, iconSize, gap, padding }: HookDetailHeaderProps) {
  const { name, image, descriptionShort } = dapp

  const isCompatible =
    !dapp.conditions?.walletCompatibility ||
    dapp.conditions.walletCompatibility.includes(
      walletType === HookDappWalletCompatibility.EOA
        ? HookDappWalletCompatibility.EOA
        : HookDappWalletCompatibility.SMART_CONTRACT,
    )

  return (
    <styled.Header iconSize={iconSize} gap={gap} padding={padding}>
      <img src={image} alt={name} />
      <styled.Content>
        <h3>{name}</h3>
        <styled.Description>{descriptionShort}</styled.Description>
        {onSelect &&
          (isCompatible ? (
            <styled.AddButton onClick={onSelect}>Add</styled.AddButton>
          ) : (
            <styled.AddButton disabled title="Not compatible with current wallet type">
              n/a
            </styled.AddButton>
          ))}
      </styled.Content>
    </styled.Header>
  )
}
