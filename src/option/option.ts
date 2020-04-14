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

  const create: Create = <Reason, Value>(
    value: Value | null | undefined,
    reason?: Reason
  ) => {
    return validator(value) ? some(value as Value) : none(reason);
  };

  const map = <Reason, Value1, Value2>(mapper: (value: Value1) => Value2) => (
    option: Option<Reason, Value1>
  ): Option<Reason, Value2> => {
    return (
      noneChecker(option) ||
      create(safeCall(() => mapper((option as Some<Value1>)._value))) ||
      none()
    );
  };

  const flatMap = <Reason, Value1, Value2>(
    mapper: (value: Value1) => Option<Reason, Value2>
  ) => (option: Option<Reason, Value1>): Option<Reason, Value2> => {
    return (
      noneChecker(option) ||
      safeCall(() => mapper((option as Some<Value1>)._value)) ||
      none()
    );
  };

  const ap = <Reason, Value1, Value2>(
    applicative: Option<Reason, (a: Value1) => Value2>
  ) => (option: Option<Reason, Value1>): Option<Reason, Value2> => {
    return (
      noneChecker(option) ||
      noneChecker(applicative) ||
      create(
        safeCall(() =>
          (applicative as Some<(a: Value1) => Value2>)._value(
            (option as Some<Value1>)._value
          )
        )
      ) ||
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
      (noneChecker(option) && onReason((option as None<Reason>)._reason)) ||
      onValue((option as Some<Value1>)._value)
    );
  };

  const bimap = <Reason1, Reason2, Value1, Value2>(
    mapReason: (e: Reason1 | null) => Reason2,
    mapValue: (a: Value1) => Value2
  ) => (option: Option<Reason1, Value1>): Option<Reason2, Value2> => {
    if (noneChecker(option)) {
      return (
        safeCall(
          () =>
            none(mapReason((option as None<Reason1>)._reason)) as Option<
              Reason2,
              Value2
            >
        ) || none()
      );
    }

    return (
      safeCall(
        () =>
          create(mapValue((option as Some<Value1>)._value)) as Option<
            Reason2,
            Value2
          >
      ) || none()
    );
  };

  const mapReason = <Reason1, Reason2, Value>(
    mapper: (reason: Reason1 | null) => Reason2
  ) => (option: Option<Reason1, Value>): Option<Reason2, Value> => {
    return (
      someChecker(option) ||
      safeCall(() => none(mapper((option as None<Reason1>)._reason))) ||
      none()
    );
  };

  const filter = <Reason, Value>(
    checker: (v: Value) => boolean,
    reason?: Reason
  ) => (option: Option<Reason, Value>): Option<Reason, Value> => {
    return noneChecker(option) ||
      safeCall(() => checker((option as Some<Value>)._value))
      ? option
      : none(reason);
  };

  const tap = <Reason, Value>(tappable: (value: Value) => void) => (
    option: Option<Reason, Value>
  ): Option<Reason, Value> => {
    if (someChecker(option)) {
      safeCall(() => tappable((option as Some<Value>)._value));
    }

    return option;
  };

  const bitap = <Reason, Value>(
    tapReason: (reason: Reason | null) => void,
    tapValue: (value: Value) => void
  ) => (option: Option<Reason, Value>): Option<Reason, Value> => {
    if (someChecker(option)) {
      safeCall(() => tapValue((option as Some<Value>)._value));
    } else {
      safeCall(() => tapReason((option as None<Reason>)._reason));
    }

    return option;
  };

  const tapReason = <Reason, Value>(
    tappable: (reason: Reason | null) => void
  ) => (option: Option<Reason, Value>): Option<Reason, Value> => {
    if (noneChecker(option)) {
      safeCall(() => tappable((option as None<Reason>)._reason));
    }

    return option;
  };

  const flatten = <Reason, Value>() => (
    nestedOption: Option<Reason, Option<Reason, Value>>
  ): Option<Reason, Value> => {
    return (
      noneChecker(nestedOption) ||
      noneChecker((nestedOption as Some<Option<Reason, Value>>)._value) ||
      ((nestedOption as Some<Option<Reason, Value>>)._value as Some<Value>)
    );
  };

  const defaultOption = {
    // creators
    none,
    some,
    create,

    // operators
    map,
    flatMap,
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
