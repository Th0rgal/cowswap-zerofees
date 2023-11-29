import { UI } from '@cowprotocol/ui'

import { transparentize } from 'polished'
import styled from 'styled-components/macro'

import { RateWrapper } from 'common/pure/RateInfo'

export const TableHeader = styled.div<{ isOpenOrdersTab: boolean; isRowSelectable: boolean }>`
  --height: 50px;
  --checkboxSize: 16px;
  --checkBoxBorderRadius: 3px;
  display: grid;
  gap: 14px;
  grid-template-columns: ${({ isOpenOrdersTab, isRowSelectable }) =>
    `${isRowSelectable && isOpenOrdersTab ? 'var(--checkboxSize) 3fr' : '3.2fr'} repeat(2,2fr) ${
      isOpenOrdersTab ? '2.5fr 1.4fr' : ''
    } 0.7fr 108px 24px`};
  grid-template-rows: minmax(var(--height), 1fr);
  align-items: center;
  border: none;
  border-bottom: 1px solid ${({ theme }) => transparentize(0.8, theme.text3)};
  padding: 0 12px;

  ${({ theme, isRowSelectable, isOpenOrdersTab }) => theme.mediaWidth.upToLargeAlt`
  grid-template-columns: ${`${
    isRowSelectable && isOpenOrdersTab ? 'var(--checkboxSize) minmax(200px,2fr)' : 'minmax(200px,2fr)'
  } repeat(2,minmax(110px,2fr)) ${
    isOpenOrdersTab ? 'minmax(140px,2.2fr) minmax(100px,1fr)' : ''
  } minmax(50px,1fr) 108px 24px`};
  `}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    --checkboxSize: 24px;
    --checkBoxBorderRadius: 6px;
  `}
`

export const TableRow = styled(TableHeader)<{ isChildOrder?: boolean }>`
  background: ${({ isChildOrder }) => (isChildOrder ? transparentize(0.91, `var(${UI.COLOR_TEXT})`) : 'transparent')};
  transition: background 0.15s ease-in-out;
  display: grid;

  &:hover {
    background: ${({ theme }) => transparentize(0.9, theme.bg1)};
  }

  > div:first-child {
    margin: 0;

    &::before {
      display: ${({ isChildOrder }) => (isChildOrder ? 'inline-block' : 'none')};
      color: ${({ theme }) => transparentize(0.5, theme.text)};
      content: '↳';
      text-decoration: none !important;
    }
  }

  > div:first-child {
    margin-left: ${({ isChildOrder }) => (isChildOrder ? '5px' : '')};

    &::before {
      display: ${({ isChildOrder }) => (isChildOrder ? 'inline-block' : 'none')};
      color: ${({ theme }) => transparentize(0.6, theme.text3)};
      content: '↳';
      text-decoration: none !important;
    }
  }

  &:last-child {
    border-bottom: 0;
  }

  ${RateWrapper} {
    text-align: left;
  }
`

export const CheckboxCheckmark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: transparent;
  width: 100%;
  height: 100%;
  height: var(--checkboxSize);
  width: var(--checkboxSize);
  top: -1px;
  bottom: 0;

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 31%;
    height: 66%;
    border: solid ${({ theme }) => theme.bg1};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);

    ${({ theme }) => theme.mediaWidth.upToSmall`
      border-width: 0 3px 3px 0;
    `}
  }
`

export const TableRowCheckbox = styled.input`
  width: var(--checkboxSize);
  height: var(--checkboxSize);
  background: transparent;
  border: 2px solid ${({ theme }) => transparentize(0.5, theme.text)};
  border-radius: var(--checkBoxBorderRadius);
  appearance: none;
  margin: 0;
  outline: 0;

  &:checked {
    background-color: ${`var(${UI.COLOR_TEXT})`};
  }

  &:checked + ${CheckboxCheckmark}::after {
    display: block;
  }

  &:indeterminate {
    border-color: ${`var(${UI.COLOR_TEXT})`};
  }

  &:indeterminate + ${CheckboxCheckmark}::after {
    display: block;
    border: solid ${({ theme }) => theme.text1};
    border-width: 2px 0 0 0;
    top: calc(50% + 3px);
    transform: none;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      top: calc(50% + 4px);
    `}
  }

  &[disabled],
  &[disabled] + ${CheckboxCheckmark} {
    cursor: default;
  }
`

export const TableRowCheckboxWrapper = styled.label`
  width: var(--checkboxSize);
  height: var(--checkboxSize);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  &:hover > ${TableRowCheckbox}:not(:checked):not([disabled]) {
    background: ${({ theme }) => transparentize(0.85, theme.text)};
  }
`
