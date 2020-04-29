import { Option, Helpers } from '../helpers';

export type Map = <Reason, Value1, Value2>(
  mapper: (value: Value1) => Value2
) => (option: Option<Reason, Value1>) => Option<Reason, Value2>;

export const getMap = ({
  noneChecker,
  safeCall,
  getValue,
  none,
  create,
}: Helpers): Map => {
  const map: Map = (mapper) => (option) => {
    return (
      noneChecker(option) ||
      create(safeCall(() => mapper(getValue(option)))) ||
      none()
    );
  };

  return map;
};
