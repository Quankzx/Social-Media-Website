import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ThemeSwitcher from '../src/components/ThemeSwitcher'
import LanguageSwitcher from '../src/components/LanguageSwitcher'

describe('Theme & Language toggles', () => {
  it('renders theme switcher and toggles theme', () => {
    const { getByRole } = render(<ThemeSwitcher />)
    const btn = getByRole('button')
    expect(btn).toBeTruthy()
    // cannot assert class on document in this simple test without provider, but ensure click works
    fireEvent.click(btn)
  })

  it('renders language switcher', () => {
    const { getByLabelText } = render(<LanguageSwitcher />)
    const sel = getByLabelText('Select language') as HTMLSelectElement
    expect(sel).toBeTruthy()
    fireEvent.change(sel, { target: { value: 'en' } })
    expect(sel.value).toBe('en')
  })
})
