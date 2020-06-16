import { Option, Helpers } from '../helpers';

export type MultiMap = {
  <R, V, V1, V2>(mapper1: (value: V) => V1, mapper2: (value: V) => V2): (
    option: Option<R, V>
  ) => Option<R, [V1, V2]>;
  <R, V, V1, V2, V3>(
    mapper1: (value: V) => V1,
    mapper2: (value: V) => V2,
    mapper3: (value: V) => V3
  ): (option: Option<R, V>) => Option<R, [V1, V2, V3]>;
  <R, V, V1, V2, V3, V4>(
    mapper1: (value: V) => V1,
    mapper2: (value: V) => V2,
    mapper3: (value: V) => V3,
    mapper4: (value: V) => V4
  ): (option: Option<R, V>) => Option<R, [V1, V2, V3, V4]>;
  <R, V, V1, V2, V3, V4, V5>(
    mapper1: (value: V) => V1,
    mapper2: (value: V) => V2,
    mapper3: (value: V) => V3,
    mapper4: (value: V) => V4,
    mapper5: (value: V) => V5
  ): (option: Option<R, V>) => Option<R, [V1, V2, V3, V4, V5]>;
};

export const getMultiMap = ({
  noneChecker,
  safeCall,
  getValue,
  validator,
  some,
  none,
}: Helpers): MultiMap => {
  const multiMap: MultiMap = <R, V, V1, V2, V3, V4, V5>(
    mapper1: (value: V) => V1,
    mapper2: (value: V) => V2,
    mapper3?: (value: V) => V3,
    mapper4?: (value: V) => V4,
    mapper5?: (value: V) => V5
  ) => (option: Option<R, V>): any => {
    if (noneChecker(option)) {
      return noneChecker(option);
    }
    const value = getValue(option);

    if (!mapper3) {
      const v1 = safeCall(() => mapper1(value));
      const v2 = safeCall(() => mapper2(value));

      if (validator(v1) && validator(v2)) {
        return some([v1, v2]);
      }
    } else if (!mapper4) {
      const v1 = safeCall(() => mapper1(value));
      const v2 = safeCall(() => mapper2(value));
      const v3 = safeCall(() => mapper3(value));

      if (validator(v1) && validator(v2) && validator(v3)) {
        return some([v1, v2, v3]);
      }
    } else if (!mapper5) {
      const v1 = safeCall(() => mapper1(value));
      const v2 = safeCall(() => mapper2(value));
      const v3 = safeCall(() => mapper3(value));
      const v4 = safeCall(() => mapper4(value));

      if (validator(v1) && validator(v2) && validator(v3) && validator(v4)) {
        return some([v1, v2, v3, v4]);
      }
    } else {
      const v1 = safeCall(() => mapper1(value));
      const v2 = safeCall(() => mapper2(value));
      const v3 = safeCall(() => mapper3(value));
      const v4 = safeCall(() => mapper4(value));
      const v5 = safeCall(() => mapper5(value));

      if (
        validator(v1) &&
        validator(v2) &&
        validator(v3) &&
        validator(v4) &&
        validator(v5)
      ) {
        return some([v1, v2, v3, v4, v5]);
      }
    }

    return none();
  };

  return multiMap;
};
