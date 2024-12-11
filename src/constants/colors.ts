export const COLORS = ['blue', 'green', 'beige', 'white', 'black'] as const
export type ColorType = (typeof COLORS)[number]
