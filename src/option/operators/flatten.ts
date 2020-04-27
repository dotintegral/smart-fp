import { Option, Helpers } from '../helpers';

export type Flatten = <Reason, Value>() => (
  nestedOption: Option<Reason, Option<Reason, Value>>
) => Option<Reason, Value>;

export const getFlatten = ({ noneChecker, getValue }: Helpers): Flatten => {
  const flatten: Flatten = <Reason, Value>() => (
    nestedOption: Option<Reason, Option<Reason, Value>>
  ): Option<Reason, Value> => {
    return (
      noneChecker(nestedOption) ||
      noneChecker(getValue(nestedOption)) ||
      getValue(nestedOption)
    );
  };

  return flatten;
};
