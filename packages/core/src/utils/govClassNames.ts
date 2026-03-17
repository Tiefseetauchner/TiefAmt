import { clsx, type ClassValue } from 'clsx'

/**
 * Merges class names using clsx.
 * Thin wrapper so consumers don't need to import clsx directly.
 */
export function gcn(...inputs: ClassValue[]): string {
  return clsx(...inputs)
}
