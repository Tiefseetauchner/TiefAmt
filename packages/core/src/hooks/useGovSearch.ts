import { useCallback, useRef, useState } from 'react'

export interface UseGovSearchOptions {
  /** Debounce delay in ms (default 300) */
  debounce?: number
  /** Initial search query */
  initialQuery?: string
  /** Initial filter state */
  initialFilters?: Record<string, unknown>
}

export interface UseGovSearchReturn {
  query: string
  filters: Record<string, unknown>
  setQuery: (q: string) => void
  setFilter: (key: string, value: unknown) => void
  removeFilter: (key: string) => void
  clearAll: () => void
  /** Debounced query — use this to trigger your data fetch */
  debouncedQuery: string
}

export function useGovSearch({
  debounce = 300,
  initialQuery = '',
  initialFilters = {},
}: UseGovSearchOptions = {}): UseGovSearchReturn {
  const [query, setQueryRaw] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<Record<string, unknown>>(initialFilters)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const setQuery = useCallback((q: string) => {
    setQueryRaw(q)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedQuery(q), debounce)
  }, [debounce])

  const setFilter = useCallback((key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const removeFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    setQueryRaw('')
    setDebouncedQuery('')
    setFilters({})
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  return { query, filters, setQuery, setFilter, removeFilter, clearAll, debouncedQuery }
}
