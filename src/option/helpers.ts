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

export type NoneCreator = <Reason>(reason?: Reason) => None<Reason>;
export type SomeCreator = <Value>(value: Value) => Some<Value>;

export type NoneChecker = <Reason, Value>(
  option: Option<Reason, Value>
) => None<Reason> | null;

export type SomeChecker = <Reason, Value>(
  option: Option<Reason, Value>
) => Some<Value> | null;

export type SafeCall = <Value>(func: () => Value | null) => Value | null;

export type GetReason = <Reason, Value>(
  option: Option<Reason, Value>
) => Reason | null;

export type GetValue = <Reason, Value>(option: Option<Reason, Value>) => Value;

export type Create = <Reason, Value>(
  value: Value | null | undefined,
  reason?: Reason
) => Option<Reason, Value>;

export interface Helpers {
  none: NoneCreator;
  some: SomeCreator;
  noneChecker: NoneChecker;
  someChecker: SomeChecker;
  validator: ValueValidator;
  safeCall: SafeCall;
  getReason: GetReason;
  getValue: GetValue;
  create: Create;
}

export const getHelpers = (validator: ValueValidator): Helpers => {
  const none: NoneCreator = reason => ({
    _type: 'option',
    _reason: reason || null
  });

  const some: SomeCreator = value => ({
    _type: 'option',
    _value: value
  });

  const noneChecker: NoneChecker = <Reason, Value>(
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

  const someChecker: SomeChecker = <Reason, Value>(
    option: Option<Reason, Value>
  ): Some<Value> | null => {
    if ('_value' in option) {
      return option as Some<Value>;
    }

    return null;
  };

  const safeCall: SafeCall = <Value>(func: () => Value | null) => {
    try {
      return func();
    } catch (e) {
      return null;
    }
  };

  const getReason: GetReason = <Reason, Value>(option: Option<Reason, Value>) =>
    (option as None<Reason>)._reason;

  const getValue: GetValue = <Reason, Value>(option: Option<Reason, Value>) =>
    (option as Some<Value>)._value;

  const create: Create = <Reason, Value>(
    value: Value | null | undefined,
    reason?: Reason
  ) => {
    return validator(value) ? some(value as Value) : none(reason);
  };

  return {
    none,
    some,
    noneChecker,
    someChecker,
    validator,
    safeCall,
    getReason,
    getValue,
    create
  };
};
