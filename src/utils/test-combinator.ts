export const argsCombination = <X>(
  minArgs: number,
  maxArgs: number,
  correctValues: X[],
  incorrectValue: X
) => {
  return (callback: (values: X[]) => void) => {
    for (
      let numberOfArguments = minArgs;
      numberOfArguments < maxArgs + 1;
      // eslint-disable-next-line no-plusplus
      numberOfArguments++
    ) {
      for (
        let invalidPosition = 0;
        invalidPosition < numberOfArguments;
        // eslint-disable-next-line no-plusplus
        invalidPosition++
      ) {
        const values = correctValues.slice(0, numberOfArguments);
        values.splice(invalidPosition, 1, incorrectValue);
        callback(values);
      }
    }
  };
};
