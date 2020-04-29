import { Option, Helpers } from '../helpers';

export type Chain = <Reason, Value, Result>(
  chainner: (value: Value | null, reason: Reason | null) => Result
) => (option: Option<Reason, Value>) => Result;

export const getChain = ({
  someChecker,
  getValue,
  getReason,
}: Helpers): Chain => {
  const chain: Chain = (chainer) => (option) => {
    if (someChecker(option)) {
      return chainer(getValue(option), null);
    }

    return chainer(null, getReason(option));
  };

  return chain;
};
