import { useState } from 'react'
import { Dropdown } from '@cow/common/pure/Dropdown'

import { CloseIcon } from 'theme'
import { DatePicker } from '@blueprintjs/datetime'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'

import { GpModal as Modal } from '@src/custom/components/Modal'
import { LimitOrderDeadline, limitOrdersDeadlines, maxCustomDeadline } from './deadlines'

import { useCallback, useMemo, useRef } from 'react'
import { ChevronDown } from 'react-feather'
import * as styledEl from './styled'
import { Trans } from '@lingui/macro'
import ms from 'ms.macro'

function limitDateString(date: Date): string {
  const [first, second] = date.toISOString().split(':')

  return [first, second].join(':')
}

const customDateOptions: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
}

export interface DeadlineSelectorProps {
  deadline: LimitOrderDeadline | undefined
  customDeadline: number | null
  selectDeadline(deadline: LimitOrderDeadline): void
  selectCustomDeadline(deadline: number): void
}

export function DeadlineSelector(props: DeadlineSelectorProps) {
  const { deadline, customDeadline, selectDeadline, selectCustomDeadline } = props
  const currentDeadlineNode = useRef<HTMLButtonElement>()

  const min = limitDateString(new Date(Date.now() + ms`30min`))
  const max = limitDateString(new Date(Date.now() + maxCustomDeadline))

  const existingDeadline = useMemo(() => {
    return limitOrdersDeadlines.find((item) => item === deadline)
  }, [deadline])

  const customDeadlineTitle = useMemo(() => {
    if (!customDeadline) return ''
    return new Date(customDeadline * 1000).toLocaleString(undefined, customDateOptions)
  }, [customDeadline])

  const setDeadline = useCallback(
    (deadline: LimitOrderDeadline) => {
      selectDeadline(deadline)
      currentDeadlineNode.current?.click() // Close dropdown
    },
    [selectDeadline]
  )

  const onChange = useCallback(
    (event) => {
      const customDeadline = Math.round(new Date(event.target.value).getTime() / 1000)

      selectCustomDeadline(customDeadline)
    },
    [selectCustomDeadline]
  )

  // Create isopen state for modal and close modal on dismiss or select deadline from list items (see list)
  const [isOpen, setIsOpen] = useState(false)
  const onDismiss = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const list = (
    <styledEl.ListWrapper>
      {limitOrdersDeadlines.map((item) => (
        <li key={item.value}>
          <styledEl.ListItem onClick={() => setDeadline(item)}>
            <Trans>{item.title}</Trans>
          </styledEl.ListItem>
        </li>
      ))}

      <styledEl.ListItem onClick={() => setIsOpen(true)}>
        <Trans>Custom</Trans>
        {/* <styledEl.CustomInput type="datetime-local" onChange={onChange} min={min} max={max} /> */}
      </styledEl.ListItem>

      <Modal isOpen={isOpen} onDismiss={() => false}>
        <div>
          <CloseIcon onClick={() => onDismiss()} />
          <span>Custom select</span>
          <DatePicker timePrecision="minute" minDate={new Date(min)} maxDate={new Date(max)} showActionsBar />

          <button onClick={() => onDismiss()}>Cancel</button>
          <button onClick={() => onDismiss()}>Set date</button>
        </div>
      </Modal>
    </styledEl.ListWrapper>
  )

  return (
    <styledEl.Wrapper>
      <styledEl.Header>
        <Trans>Expiry</Trans>
      </styledEl.Header>
      <Dropdown content={list}>
        <styledEl.Current ref={currentDeadlineNode as any} isCustom={!!customDeadline}>
          <span>{customDeadline ? customDeadlineTitle : existingDeadline?.title}</span>
          <ChevronDown size="18" />
        </styledEl.Current>
      </Dropdown>
    </styledEl.Wrapper>
  )
}
