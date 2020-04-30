import { Option, Helpers } from '../helpers';

export type Fold = <Reason, Value, Result>(
  onReason: (e: Reason | null) => Result,
  onValue: (a: Value) => Result
) => (option: Option<Reason, Value>) => Result;

export const getFold = ({
  noneChecker,
  getReason,
  getValue,
}: Helpers): Fold => {
  const fold: Fold = (onReason, onValue) => (option) => {
    return (
      (noneChecker(option) && onReason(getReason(option))) ||
      onValue(getValue(option))
    );
  };

  return fold;
};
