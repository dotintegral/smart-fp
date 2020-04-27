import { getMap } from './operators/map';
import { getHelpers } from './helpers';
import { getFlatMap } from './operators/flatMap';

/* eslint-disable no-underscore-dangle */
export interface ValueValidator {
  (v: any): boolean;
}

export interface None<Reason> {
  readonly _type: 'option';
  readonly _reason: Reason | null;
}

export interface Some<Value> {
  readonly _type: 'option';
  readonly _value: Value;
}

export type Option<Reason, Value> = None<Reason> | Some<Value>;

type NoneCreator = <Reason>(reason?: Reason) => None<Reason>;
type SomeCreator = <Value>(value: Value) => Some<Value>;

type Create = <Reason, Value>(
  value: Value | null | undefined,
  reason?: Reason
) => Option<Reason, Value>;

const defaultValidator: ValueValidator = v => {
  return v !== undefined && v !== null;
};

export const createOption = (validator: ValueValidator) => {
  // -- HELPERS --
  const none: NoneCreator = reason => ({
    _type: 'option',
    _reason: reason || null
  });

  const some: SomeCreator = value => ({
    _type: 'option',
    _value: value
  });

  const noneChecker = <Reason, Value>(
    option: Option<Reason, Value>
  ): None<Reason> | null => {
    if ('_reason' in option) {
      if (option._reason === null || option._reason === undefined) {
        return none() as None<Reason>;
      }
      return none(option._reason);
    }

    return null;
  };

  const someChecker = <Reason, Value>(
    option: Option<Reason, Value>
  ): Some<Value> | null => {
    if ('_value' in option) {
      return option as Some<Value>;
    }

    return null;
  };

  const safeCall = <Value>(func: () => Value | null) => {
    try {
      return func();
    } catch (e) {
      return null;
    }
  };

  const getReason = <Reason, Value>(option: Option<Reason, Value>) =>
    (option as None<Reason>)._reason;

  const getValue = <Reason, Value>(option: Option<Reason, Value>) =>
    (option as Some<Value>)._value;

  // -- API --
  const create: Create = <Reason, Value>(
    value: Value | null | undefined,
    reason?: Reason
  ) => {
    return validator(value) ? some(value as Value) : none(reason);
  };

  const ap = <Reason, Value1, Value2>(
    applicative: Option<Reason, (a: Value1) => Value2>
  ) => (option: Option<Reason, Value1>): Option<Reason, Value2> => {
    return (
      noneChecker(option) ||
      noneChecker(applicative) ||
      create(safeCall(() => getValue(applicative)(getValue(option)))) ||
      none()
    );
  };

  const alt = <Reason, Value>(alternative: Option<Reason, Value>) => (
    option: Option<Reason, Value>
  ): Option<Reason, Value> => {
    return (
      someChecker(option) ||
      someChecker(alternative) ||
      noneChecker(alternative) ||
      none()
    );
  };

  const fold = <Reason, Value1, Value2>(
    onReason: (e: Reason | null) => Value2,
    onValue: (a: Value1) => Value2
  ) => (option: Option<Reason, Value1>): Value2 => {
    return (
      (noneChecker(option) && onReason(getReason(option))) ||
      onValue(getValue(option))
    );
  };

  const bimap = <Reason1, Reason2, Value1, Value2>(
    mapReason: (e: Reason1 | null) => Reason2,
    mapValue: (a: Value1) => Value2
  ) => (option: Option<Reason1, Value1>): Option<Reason2, Value2> => {
    if (noneChecker(option)) {
      return (
        safeCall(
          () => none(mapReason(getReason(option))) as Option<Reason2, Value2>
        ) || none()
      );
    }

    return (
      safeCall(
        () => create(mapValue(getValue(option))) as Option<Reason2, Value2>
      ) || none()
    );
  };

  const mapReason = <Reason1, Reason2, Value>(
    mapper: (reason: Reason1 | null) => Reason2
  ) => (option: Option<Reason1, Value>): Option<Reason2, Value> => {
    return (
      someChecker(option) ||
      safeCall(() => none(mapper(getReason(option)))) ||
      none()
    );
  };

  const filter = <Reason, Value>(
    checker: (v: Value) => boolean,
    reason?: Reason
  ) => (option: Option<Reason, Value>): Option<Reason, Value> => {
    return noneChecker(option) || safeCall(() => checker(getValue(option)))
      ? option
      : none(reason);
  };

  const tap = <Reason, Value>(tappable: (value: Value) => void) => (
    option: Option<Reason, Value>
  ): Option<Reason, Value> => {
    if (someChecker(option)) {
      safeCall(() => tappable(getValue(option)));
    }

    return option;
  };

  const bitap = <Reason, Value>(
    tapReason: (reason: Reason | null) => void,
    tapValue: (value: Value) => void
  ) => (option: Option<Reason, Value>): Option<Reason, Value> => {
    if (someChecker(option)) {
      safeCall(() => tapValue(getValue(option)));
    } else {
      safeCall(() => tapReason(getReason(option)));
    }

    return option;
  };

  const tapReason = <Reason, Value>(
    tappable: (reason: Reason | null) => void
  ) => (option: Option<Reason, Value>): Option<Reason, Value> => {
    if (noneChecker(option)) {
      safeCall(() => tappable(getReason(option)));
    }

    return option;
  };

  const flatten = <Reason, Value>() => (
    nestedOption: Option<Reason, Option<Reason, Value>>
  ): Option<Reason, Value> => {
    return (
      noneChecker(nestedOption) ||
      noneChecker(getValue(nestedOption)) ||
      (getValue(nestedOption) as Some<Value>)
    );
  };

  const helpers = getHelpers(validator);

  const defaultOption = {
    // creators
    none,
    some,
    create,

    // operators
    map: getMap(helpers),
    flatMap: getFlatMap(helpers),
    ap,
    alt,
    fold,
    bimap,
    mapReason,
    filter,
    tap,
    bitap,
    tapReason,
    flatten
  };

  return defaultOption;
};

export default createOption(defaultValidator);
