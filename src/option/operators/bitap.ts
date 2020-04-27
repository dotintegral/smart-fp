import { Option, Helpers } from '../helpers';

export type Bitap = <Reason, Value>(
  tapReason: (reason: Reason | null) => void,
  tapValue: (value: Value) => void
) => (option: Option<Reason, Value>) => Option<Reason, Value>;

export const getBitap = ({
  someChecker,
  safeCall,
  getValue,
  getReason
}: Helpers): Bitap => {
  const bitap: Bitap = (tapReason, tapValue) => option => {
    if (someChecker(option)) {
      safeCall(() => tapValue(getValue(option)));
    } else {
      safeCall(() => tapReason(getReason(option)));
    }

    return option;
  };

  return bitap;
};
