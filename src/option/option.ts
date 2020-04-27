import { getMap } from './operators/map';
import { getHelpers } from './helpers';
import { getFlatMap } from './operators/flatMap';
import { getAp } from './operators/ap';
import { getAlt } from './operators/alt';
import { getFold } from './operators/fold';
import { getBimap } from './operators/bimap';
import { getMapReason } from './operators/mapReason';

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

const defaultValidator: ValueValidator = v => {
  return v !== undefined && v !== null;
};

export const createOption = (validator: ValueValidator) => {
  // -- HELPERS --
  const none: NoneCreator = reason => ({
    _type: 'option',
    _reason: reason || null
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
    none: helpers.none,
    some: helpers.some,
    create: helpers.create,

    // operators
    map: getMap(helpers),
    flatMap: getFlatMap(helpers),
    ap: getAp(helpers),
    alt: getAlt(helpers),
    fold: getFold(helpers),
    bimap: getBimap(helpers),
    mapReason: getMapReason(helpers),
    filter,
    tap,
    bitap,
    tapReason,
    flatten
  };

  return defaultOption;
};

export default createOption(defaultValidator);
