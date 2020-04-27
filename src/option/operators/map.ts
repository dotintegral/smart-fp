import { Option, Helpers } from '../helpers';

export type Map = <Reason, Value1, Value2>(
  mapper: (value: Value1) => Value2
) => (option: Option<Reason, Value1>) => Option<Reason, Value2>;

export const getMap = ({
  noneChecker,
  safeCall,
  getValue,
  none,
  create
}: Helpers): Map => {
  const map: Map = <Reason, Value1, Value2>(
    mapper: (value: Value1) => Value2
  ) => (option: Option<Reason, Value1>): Option<Reason, Value2> => {
    return (
      noneChecker(option) ||
      create(safeCall(() => mapper(getValue(option)))) ||
      none()
    );
  };

  return map;
};
