import { Option, Helpers } from '../helpers';

export type FlatMap = <Reason, Value1, Value2>(
  mapper: (value: Value1) => Option<Reason, Value2>
) => (option: Option<Reason, Value1>) => Option<Reason, Value2>;

export const getFlatMap = ({
  noneChecker,
  safeCall,
  getValue,
  none
}: Helpers): FlatMap => {
  const flatMap: FlatMap = <Reason, Value1, Value2>(
    mapper: (value: Value1) => Option<Reason, Value2>
  ) => (option: Option<Reason, Value1>): Option<Reason, Value2> => {
    return (
      noneChecker(option) || safeCall(() => mapper(getValue(option))) || none()
    );
  };

  return flatMap;
};
