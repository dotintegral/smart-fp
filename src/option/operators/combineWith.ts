import { Option, Helpers } from '../helpers';
import { getCombine } from './combine';

export type CombineWith = {
  <R1, V1, R2, V2>(o2: Option<R2, V2>): (
    o1: Option<R1, V1>
  ) => Option<R1 | R2, [V1, V2]>;
  <R1, V1, R2, V2, R3, V3>(o2: Option<R2, V2>, o3: Option<R3, V3>): (
    o1: Option<R1, V1>
  ) => Option<R1 | R2 | R3, [V1, V2, V3]>;
  <R1, V1, R2, V2, R3, V3, R4, V4>(
    o2: Option<R2, V2>,
    o3: Option<R3, V3>,
    o4: Option<R4, V4>
  ): (o1: Option<R1, V1>) => Option<R1 | R2 | R3 | R4, [V1, V2, V3, V4]>;
  <R1, V1, R2, V2, R3, V3, R4, V4, R5, V5>(
    o2: Option<R2, V2>,
    o3: Option<R3, V3>,
    o4: Option<R4, V4>,
    o5: Option<R5, V5>
  ): (
    o1: Option<R1, V1>
  ) => Option<R1 | R2 | R3 | R4 | R5, [V1, V2, V3, V4, V5]>;
  <R1, V1, R2, V2, R3, V3, R4, V4, R5, V5, R6, V6>(
    o2: Option<R2, V2>,
    o3: Option<R3, V3>,
    o4: Option<R4, V4>,
    o5: Option<R5, V5>,
    o6: Option<R6, V6>
  ): (
    o1: Option<R1, V1>
  ) => Option<R1 | R2 | R3 | R4 | R5 | R6, [V1, V2, V3, V4, V5, V6]>;
};

export const getCombineWith = (helpers: Helpers): CombineWith => {
  const combine = getCombine(helpers);

  const combineWith: CombineWith = <
    R1,
    V1,
    R2,
    V2,
    R3,
    V3,
    R4,
    V4,
    R5,
    V5,
    R6,
    V6
  >(
    o2: Option<R2, V2>,
    o3?: Option<R3, V3>,
    o4?: Option<R4, V4>,
    o5?: Option<R5, V5>,
    o6?: Option<R6, V6>
  ) => (o1: Option<R1, V1>): any => {
    if (!o3) {
      return combine(o1, o2);
    }

    if (!o4) {
      return combine(o1, o2, o3);
    }

    if (!o5) {
      return combine(o1, o2, o3, o4);
    }

    if (!o6) {
      return combine(o1, o2, o3, o4, o5);
    }

    return combine(o1, o2, o3, o4, o5, o6);
  };

  return combineWith;
};
