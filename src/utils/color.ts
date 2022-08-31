export const numberToHex = (n: number): string => {
  return Math.floor((1 - n) * 255).toString(16)
}
