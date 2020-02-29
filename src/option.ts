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

type none = <E>(reason?: E) => None<E>;
type just = <A>(value: A) => Just<A>;

type create = <A, E>(value: A | null | undefined, reason?: E) => Option<A, E>;

type map = <A, B, E>(
  mapper: (value: A) => B
) => (option: Option<A, E>) => Option<B, E>;

const defaultValidator: ValueValidator = v => {
  return v !== undefined && v !== null;
};

const createOptionMonad = (validator: ValueValidator) => {
  const none: none = reason => ({
    _type: 'option',
    _reason: reason || null
  });

  const just: just = value => ({
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

  const create: create = <A, E>(value: A | null | undefined, reason?: E) => {
    return validator(value) ? just(value as A) : none(reason);
  };

  const map: map = <A, B, E>(mapper: (value: A) => B) => (
    option: Option<A, E>
  ): Option<B, E> => {
    return noneChecker(option) || create(mapper((option as Just<A>)._value));
  };

  const defaultOption = {
    // internal implementation
    none,
    just,

    // creators
    create,

    // operators
    map
  };

  return defaultOption;
};

export default createOptionMonad(defaultValidator);
