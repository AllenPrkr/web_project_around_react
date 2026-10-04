import type { ReactNode } from 'react'

export interface ModalData {
  title?: string
  children: ReactNode
}

export type PopupConfig = ModalData
