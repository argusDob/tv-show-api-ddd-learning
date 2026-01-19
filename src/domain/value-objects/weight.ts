export type Weight = {
  value: number
}

export function createWeight(value: number): Weight {
  if(value < 0 || value > 100) {
    throw new Error('Weight must be between 0 and 100')
  }
  return { value }
}
