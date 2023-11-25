const REMOVE_WITH_EMPTY_STRING = ''
const ALL_DOTS_REGEXP = /\./gi
const ALL_COMMA_REGEXP = /,/gi

export const keepOnlyPriceNumbers = (value: string) => {
  return value
    .replace(ALL_DOTS_REGEXP, REMOVE_WITH_EMPTY_STRING)
    .replace(ALL_COMMA_REGEXP, REMOVE_WITH_EMPTY_STRING)
}
