import React from 'react'

export type GovDensity = 'comfortable' | 'default' | 'compact'

export interface GovConfig {
  agencyName: string
  agencyLogo?: string
  density?: GovDensity
  locale?: string // 'de-AT' default
}

export const GovContext = React.createContext<GovConfig>({ agencyName: '' })

export function GovProvider({
  config,
  children,
}: {
  config: GovConfig
  children: React.ReactNode
}) {
  return (
    <GovContext.Provider value={config}>
      <div data-gov-density={config.density ?? 'default'}>{children}</div>
    </GovContext.Provider>
  )
}

export function useGovTheme() {
  return React.useContext(GovContext)
}
