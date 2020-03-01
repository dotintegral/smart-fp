/* eslint-disable no-underscore-dangle */
export interface ValueValidator {
  (v: any): boolean;
}

export interface None<E> {
  _type: 'option';
  _reason: E | null;
}

export interface Just<A> {
  _type: 'option';
  _value: A;
}

export type Option<A, E> = None<E> | Just<A>;

type NoneCreator = <E>(reason?: E) => None<E>;
type JustCreator = <A>(value: A) => Just<A>;

type Create = <A, E>(value: A | null | undefined, reason?: E) => Option<A, E>;

type Map = <A, B, E>(
  mapper: (value: A) => B
) => (option: Option<A, E>) => Option<B, E>;

type FlatMap = <A, B, E>(
  mapper: (value: A) => Option<B, E>
) => (option: Option<A, E>) => Option<B, E>;

const defaultValidator: ValueValidator = v => {
  return v !== undefined && v !== null;
};

const createOptionMonad = (validator: ValueValidator) => {
  const none: NoneCreator = reason => ({
    _type: 'option',
    _reason: reason || null
  });

  const just: JustCreator = value => ({
    _type: 'option',
    _value: value
  });

  const noneChecker = <A, E>(option: Option<A, E>): None<E> | null => {
    if ('_reason' in option) {
      if (option._reason === null || option._reason === undefined) {
        return none() as None<E>;
      }
      return none(option._reason);
    }

    return null;
  };

  const safeCall = <A>(func: () => A | null) => {
    try {
      return func();
    } catch (e) {
      return null;
    }
  };

  const create: Create = <A, E>(value: A | null | undefined, reason?: E) => {
    return validator(value) ? just(value as A) : none(reason);
  };

  const map: Map = <A, B, E>(mapper: (value: A) => B) => (
    option: Option<A, E>
  ): Option<B, E> => {
    return (
      noneChecker(option) ||
      create(safeCall(() => mapper((option as Just<A>)._value))) ||
      none()
    );
  };

  const flatMap: FlatMap = <A, B, E>(mapper: (value: A) => Option<B, E>) => (
    option: Option<A, E>
  ): Option<B, E> => {
    return (
      noneChecker(option) ||
      safeCall(() => mapper((option as Just<A>)._value)) ||
      none()
    );
  };

  const defaultOption = {
    // creators
    none,
    just,
    create,

    // operators
    map,
    flatMap
  };

  return defaultOption;
};

export default createOptionMonad(defaultValidator);
