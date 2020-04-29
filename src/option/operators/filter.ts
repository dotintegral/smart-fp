import { Option, Helpers } from '../helpers';

export type Filter = <Reason, Value>(
  checker: (v: Value) => boolean,
  reason?: Reason
) => (option: Option<Reason, Value>) => Option<Reason, Value>;

export const getFilter = ({
  noneChecker,
  safeCall,
  none,
  getValue,
}: Helpers): Filter => {
  const filter: Filter = (checker, reason?) => (option) => {
    return noneChecker(option) || safeCall(() => checker(getValue(option)))
      ? option
      : none(reason);
  };

  return filter;
};
