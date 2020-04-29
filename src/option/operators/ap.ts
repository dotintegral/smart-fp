import { Option, Helpers } from '../helpers';

export type Ap = <Reason, Value1, Value2>(
  applicative: Option<Reason, (a: Value1) => Value2>
) => (option: Option<Reason, Value1>) => Option<Reason, Value2>;

export const getAp = ({
  noneChecker,
  safeCall,
  getValue,
  none,
  create,
}: Helpers): Ap => {
  const ap: Ap = (applicative) => (option) => {
    return (
      noneChecker(option) ||
      noneChecker(applicative) ||
      create(safeCall(() => getValue(applicative)(getValue(option)))) ||
      none()
    );
  };

  return ap;
};
