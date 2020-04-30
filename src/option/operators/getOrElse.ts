import { Option, Helpers } from '../helpers';

export type GetOrElse = <Reason, Value>(
  onReason: (e: Reason | null) => Value
) => (option: Option<Reason, Value>) => Value;

export const getGetOrElse = ({
  noneChecker,
  getReason,
  getValue,
}: Helpers): GetOrElse => {
  const getOrElse: GetOrElse = (onReason) => (option) => {
    return (
      (noneChecker(option) && onReason(getReason(option))) || getValue(option)
    );
  };

  return getOrElse;
};
