import { useCallback, useState } from 'react'

export interface UseGovDocumentDrawerReturn<T> {
  isOpen: boolean
  selectedDocument: T | null
  open: (doc: T) => void
  close: () => void
}

export function useGovDocumentDrawer<T>(): UseGovDocumentDrawerReturn<T> {
  const [selectedDocument, setSelectedDocument] = useState<T | null>(null)

  const open = useCallback((doc: T) => setSelectedDocument(doc), [])
  const close = useCallback(() => setSelectedDocument(null), [])

  return {
    isOpen: selectedDocument !== null,
    selectedDocument,
    open,
    close,
  }
}
