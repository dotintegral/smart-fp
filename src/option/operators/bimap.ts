import { Option, Helpers } from '../helpers';

export type Bimap = <Reason1, Reason2, Value1, Value2>(
  mapReason: (e: Reason1 | null) => Reason2,
  mapValue: (a: Value1) => Value2
) => (option: Option<Reason1, Value1>) => Option<Reason2, Value2>;

export const getBimap = ({
  noneChecker,
  safeCall,
  getValue,
  none,
  create,
  getReason,
}: Helpers): Bimap => {
  const bimap: Bimap = (mapReason, mapValue) => (option) => {
    if (noneChecker(option)) {
      return safeCall(() => none(mapReason(getReason(option)))) || none();
    }

    return safeCall(() => create(mapValue(getValue(option)))) || none();
  };

  return bimap;
};
