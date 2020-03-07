/* eslint-disable no-underscore-dangle */
export interface ValueValidator {
  (v: any): boolean;
}

export interface None<E> {
  readonly _type: 'option';
  readonly _reason: E | null;
}

export interface Just<A> {
  readonly _type: 'option';
  readonly _value: A;
}

export type Option<E, A> = None<E> | Just<A>;

type NoneCreator = <E>(reason?: E) => None<E>;
type JustCreator = <A>(value: A) => Just<A>;

type Create = <E, A>(value: A | null | undefined, reason?: E) => Option<E, A>;

type Map = <E, A, B>(
  mapper: (value: A) => B
) => (option: Option<E, A>) => Option<E, B>;

type FlatMap = <E, A, B>(
  mapper: (value: A) => Option<E, B>
) => (option: Option<E, A>) => Option<E, B>;

type Ap = <E, A, B>(
  applicative: Option<E, (a: A) => B>
) => (option: Option<E, A>) => Option<E, B>;

const defaultValidator: ValueValidator = v => {
  return v !== undefined && v !== null;
};

export const createOption = (validator: ValueValidator) => {
  const none: NoneCreator = reason => ({
    _type: 'option',
    _reason: reason || null
  });

  const just: JustCreator = value => ({
    _type: 'option',
    _value: value
  });

  const noneChecker = <E, A>(option: Option<E, A>): None<E> | null => {
    if ('_reason' in option) {
      if (option._reason === null || option._reason === undefined) {
        return none() as None<E>;
      }
      return none(option._reason);
    }

    return null;
  };

  const justChecker = <E, A>(option: Option<E, A>): Just<A> | null => {
    if ('_value' in option) {
      return option as Just<A>;
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

  const create: Create = <E, A>(value: A | null | undefined, reason?: E) => {
    return validator(value) ? just(value as A) : none(reason);
  };

  const map: Map = <E, A, B>(mapper: (value: A) => B) => (
    option: Option<E, A>
  ): Option<E, B> => {
    return (
      noneChecker(option) ||
      create(safeCall(() => mapper((option as Just<A>)._value))) ||
      none()
    );
  };

  const flatMap: FlatMap = <E, A, B>(mapper: (value: A) => Option<E, B>) => (
    option: Option<E, A>
  ): Option<E, B> => {
    return (
      noneChecker(option) ||
      safeCall(() => mapper((option as Just<A>)._value)) ||
      none()
    );
  };

  const ap: Ap = <E, A, B>(applicative: Option<E, (a: A) => B>) => (
    option: Option<E, A>
  ): Option<E, B> => {
    return (
      noneChecker(option) ||
      noneChecker(applicative) ||
      create(
        safeCall(() =>
          (applicative as Just<(a: A) => B>)._value((option as Just<A>)._value)
        )
      ) ||
      none()
    );
  };

  const alt = <E, A>(alternative: Option<E, A>) => (
    option: Option<E, A>
  ): Option<E, A> => {
    return (
      justChecker(option) ||
      justChecker(alternative) ||
      noneChecker(alternative) ||
      none()
    );
  };

  const fold = <E, A, B>(onLeft: (e: E | null) => B, onRight: (a: A) => B) => (
    option: Option<E, A>
  ): B => {
    return (
      (noneChecker(option) &&
        safeCall(() => onLeft((option as None<E>)._reason))) ||
      safeCall(() => onRight((option as Just<A>)._value)) ||
      onLeft(null)
    );
  };

  const defaultOption = {
    // creators
    none,
    just,
    create,

    // operators
    map,
    flatMap,
    ap,
    alt,
    fold
  };

  return defaultOption;
};

export default createOption(defaultValidator);
