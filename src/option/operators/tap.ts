import { Option, Helpers } from '../helpers';

export type Tap = <Reason, Value>(
  tappable: (value: Value) => void
) => (option: Option<Reason, Value>) => Option<Reason, Value>;

export const getTap = ({ someChecker, safeCall, getValue }: Helpers): Tap => {
  const tap: Tap = (tappable) => (option) => {
    if (someChecker(option)) {
      safeCall(() => tappable(getValue(option)));
    }

    return option;
  };

  return tap;
};
