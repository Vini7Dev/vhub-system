export const removeTextsFromArray = (
  array: string[],
  textToBeRemoved: string,
  countOfTextsToBeRemoved: number,
): string[] => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const firstTextIndex = array.findIndex(text => text.indexOf(textToBeRemoved) !== -1)
    if (firstTextIndex === -1) break
    array.splice(firstTextIndex, countOfTextsToBeRemoved)
  }

  return array
}
