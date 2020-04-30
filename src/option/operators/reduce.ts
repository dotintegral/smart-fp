import { Option, Helpers } from '../helpers';

export type Reduce = <Reason, Value>() => (
  option: Option<Reason, Value>
) => Reason | Value | null;

export const getReduce = ({
  someChecker,
  noneChecker,
  getReason,
  getValue,
}: Helpers): Reduce => {
  const reduce: Reduce = () => (option) => {
    return (
      (someChecker(option) && getValue(option)) ||
      (noneChecker(option) && getReason(option))
    );
  };

  return reduce;
};
