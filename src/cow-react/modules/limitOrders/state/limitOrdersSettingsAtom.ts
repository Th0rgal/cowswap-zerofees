import { atomWithStorage } from 'jotai/utils'
import { defaultLimitOrderDeadline } from '@cow/modules/limitOrders/pure/DeadlineSelector/deadlines'
import { atom } from 'jotai'
import { Milliseconds, Timestamp } from '@cow/types'

export interface LimitOrdersSettingsState {
  readonly expertMode: boolean
  readonly showRecipient: boolean
  readonly partialFillsEnabled: boolean
  readonly deadlineMilliseconds: Milliseconds
  readonly customDeadlineTimestamp: Timestamp | null
}

export const defaultLimitOrdersSettings: LimitOrdersSettingsState = {
  expertMode: false,
  showRecipient: false,
  partialFillsEnabled: true,
  deadlineMilliseconds: defaultLimitOrderDeadline.value,
  customDeadlineTimestamp: null,
}

export const limitOrdersSettingsAtom = atomWithStorage<LimitOrdersSettingsState>(
  'limit-orders-settings-atom:v2',
  defaultLimitOrdersSettings
)

export const updateLimitOrdersSettingsAtom = atom(null, (get, set, nextState: Partial<LimitOrdersSettingsState>) => {
  set(limitOrdersSettingsAtom, () => {
    const prevState = get(limitOrdersSettingsAtom)

    return { ...prevState, ...nextState }
  })
})
