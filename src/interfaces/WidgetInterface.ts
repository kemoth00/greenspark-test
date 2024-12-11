import type { ColorType } from '@/constants/colors'

interface WidgetInterface {
  id: number
  type: 'carbon' | 'plastic' | 'trees'
  amount: number
  action: 'collects' | 'plants' | 'offsets'
  active: boolean
  linked: boolean
  selectedColor: ColorType
}

export type { WidgetInterface }
