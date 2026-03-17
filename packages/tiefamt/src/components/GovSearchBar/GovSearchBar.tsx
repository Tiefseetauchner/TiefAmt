import React, { useEffect, useRef, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { GovFilterChip } from '../GovFilterChip/GovFilterChip'
import { gcn } from '../../utils/govClassNames'
import type { GovSearchBarProps } from './GovSearchBar.types'

export function GovSearchBar({
  value = '',
  onSearch,
  placeholder = 'Suchen…',
  debounce = 300,
  chips,
  loading = false,
  className,
  ...rest
}: GovSearchBarProps) {
  const [local, setLocal] = useState(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync when controlled value changes externally
  useEffect(() => { setLocal(value) }, [value])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    setLocal(q)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onSearch(q), debounce)
  }

  function handleClear() {
    setLocal('')
    onSearch('')
  }

  return (
    <div className={gcn('gov-search-bar', className)} {...rest}>
      <div className="gov-search-bar__input-wrap">
        <span className="gov-search-bar__icon" aria-hidden="true">⌕</span>
        <Form.Control
          type="search"
          value={local}
          onChange={handleChange}
          placeholder={placeholder}
          className="gov-search-bar__input"
          aria-label={placeholder}
        />
        {loading && (
          <Spinner
            animation="border"
            size="sm"
            style={{ position: 'absolute', right: '0.625rem' }}
            aria-label="Wird geladen"
          />
        )}
        {!loading && local && (
          <button
            type="button"
            className="btn-close"
            style={{ position: 'absolute', right: '0.625rem', fontSize: '0.625rem' }}
            aria-label="Suche löschen"
            onClick={handleClear}
          />
        )}
      </div>

      {chips && chips.length > 0 && (
        <div className="gov-search-bar__chips">
          {chips.map((chip, i) => (
            <GovFilterChip key={i} {...chip} />
          ))}
        </div>
      )}
    </div>
  )
}

export default GovSearchBar
