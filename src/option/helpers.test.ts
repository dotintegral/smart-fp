import option, { None } from './option';

describe('option.some()', () => {
  it('should return proper structure', () => {
    const value = { a: 'a' };
    const testO = option.some(value);

    const expected = {
      _type: 'option',
      _value: value,
    };

    expect(testO).toEqual(expected);
  });
});

describe('option.none()', () => {
  it('should return proper structure without a reason', () => {
    const testO = option.none();

    const expected = {
      _type: 'option',
      _reason: null,
    };

    expect(testO).toEqual(expected);
  });

  it('should return proper structure with a valid reason', () => {
    type Fail = 'fail-a' | 'fail-b';
    const testO = option.none<Fail>('fail-a');

    const expected = {
      _type: 'option',
      _reason: 'fail-a',
    };

    expect(testO).toEqual(expected);
  });
});

describe('option.create()', () => {
  it('should create some when non-nullable value given', () => {
    const value = { a: 'a' };
    const testO = option.create(value);
    const expected = option.some(value);

    expect(testO).toEqual(expected);
  });

  it('should create some when empty string given', () => {
    const value = '';
    const testO = option.create(value);
    const expected = option.some(value);

    expect(testO).toEqual(expected);
  });

  it('should create some when 0 given', () => {
    const value = 0;
    const testO = option.create(value);
    const expected = option.some(value);

    expect(testO).toEqual(expected);
  });

  it('should create none when null value given', () => {
    const value = null;
    const testO = option.create(value) as None<null>;
    const expected = option.none();

    expect(testO).toEqual(expected);
  });

  it('should create none when undefined value given', () => {
    const value = undefined;
    const testO = option.create(value) as None<undefined>;
    const expected = option.none();

    expect(testO).toEqual(expected);
  });
});

describe('option.isSome()', () => {
  it('should return true if some given', () => {
    const value = option.create('some value', 'reason');

    expect(option.isSome(value)).toBeTruthy();
  });

  it('should return false if none given', () => {
    const value = option.create(null, 'reason');

    expect(option.isSome(value)).toBeFalsy();
  });
});

describe('option.isNone()', () => {
  it('should return false if some given', () => {
    const value = option.create('some value', 'reason');

    expect(option.isNone(value)).toBeFalsy();
  });

  it('should return true if none given', () => {
    const value = option.create(null, 'reason');

    expect(option.isNone(value)).toBeTruthy();
  });
});
