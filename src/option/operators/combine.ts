import { Option, Helpers } from '../helpers';

export type Combine = {
  <R1, V1>(o1: Option<R1, V1>): Option<never, [V1]>;
  <R1, V1, R2, V2>(o1: Option<R1, V1>, o2: Option<R2, V2>): Option<
    R1 | R2,
    [V1, V2]
  >;
  <R1, V1, R2, V2, R3, V3>(
    o1: Option<R1, V1>,
    o2: Option<R2, V2>,
    o3: Option<R3, V3>
  ): Option<R1 | R2 | R3, [V1, V2, V3]>;
  <R1, V1, R2, V2, R3, V3, R4, V4>(
    o1: Option<R1, V1>,
    o2: Option<R2, V2>,
    o3: Option<R3, V3>,
    o4: Option<R4, V4>
  ): Option<R1 | R2 | R3 | R4, [V1, V2, V3, V4]>;
  <R1, V1, R2, V2, R3, V3, R4, V4, R5, V5>(
    o1: Option<R1, V1>,
    o2: Option<R2, V2>,
    o3: Option<R3, V3>,
    o4: Option<R4, V4>,
    o5: Option<R5, V5>
  ): Option<R1 | R2 | R3 | R4 | R5, [V1, V2, V3, V4, V5]>;
  <R1, V1, R2, V2, R3, V3, R4, V4, R5, V5, R6, V6>(
    o1: Option<R1, V1>,
    o2: Option<R2, V2>,
    o3: Option<R3, V3>,
    o4: Option<R4, V4>,
    o5: Option<R5, V5>,
    o6: Option<R6, V6>
  ): Option<R1 | R2 | R3 | R4 | R5 | R6, [V1, V2, V3, V4, V5, V6]>;
};

export const getCombine = ({
  isNone,
  none,
  some,
  getValue,
  getReason
}: Helpers): Combine => {
  const combine: Combine = <R1, V1, R2, V2, R3, V3, R4, V4, R5, V5, R6, V6>(
    o1: Option<R1, V1>,
    o2?: Option<R2, V2>,
    o3?: Option<R3, V3>,
    o4?: Option<R4, V4>,
    o5?: Option<R5, V5>,
    o6?: Option<R6, V6>
  ): any => {
    if (!o2) {
      if (isNone(o1)) {
        return none(getReason(o1));
      }
      return some([getValue(o1)]);
    }

    if (!o3) {
      if (isNone(o1)) {
        return none(getReason(o1));
      }
      if (isNone(o2)) {
        return none(getReason(o2));
      }
      return some([getValue(o1), getValue(o2)]);
    }

    if (!o4) {
      if (isNone(o1)) {
        return none(getReason(o1));
      }
      if (isNone(o2)) {
        return none(getReason(o2));
      }
      if (isNone(o3)) {
        return none(getReason(o3));
      }
      return some([getValue(o1), getValue(o2), getValue(o3)]);
    }

    if (!o5) {
      if (isNone(o1)) {
        return none(getReason(o1));
      }
      if (isNone(o2)) {
        return none(getReason(o2));
      }
      if (isNone(o3)) {
        return none(getReason(o3));
      }
      if (isNone(o4)) {
        return none(getReason(o4));
      }
      return some([getValue(o1), getValue(o2), getValue(o3), getValue(o4)]);
    }

    if (!o6) {
      if (isNone(o1)) {
        return none(getReason(o1));
      }
      if (isNone(o2)) {
        return none(getReason(o2));
      }
      if (isNone(o3)) {
        return none(getReason(o3));
      }
      if (isNone(o4)) {
        return none(getReason(o4));
      }
      if (isNone(o5)) {
        return none(getReason(o5));
      }
      return some([
        getValue(o1),
        getValue(o2),
        getValue(o3),
        getValue(o4),
        getValue(o5)
      ]);
    }

    if (isNone(o1)) {
      return none(getReason(o1));
    }
    if (isNone(o2)) {
      return none(getReason(o2));
    }
    if (isNone(o3)) {
      return none(getReason(o3));
    }
    if (isNone(o4)) {
      return none(getReason(o4));
    }
    if (isNone(o5)) {
      return none(getReason(o5));
    }
    if (isNone(o6)) {
      return none(getReason(o6));
    }
    return some([
      getValue(o1),
      getValue(o2),
      getValue(o3),
      getValue(o4),
      getValue(o5),
      getValue(o6)
    ]);
  };

  return combine;
};
