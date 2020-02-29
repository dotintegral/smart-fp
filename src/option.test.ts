import { pipe } from 'fp-ts/lib/pipeable';
import option, { None } from './option';

describe('option', () => {
  describe('just()', () => {
    it('should return proper structure', () => {
      const value = { a: 'a' };
      const testO = option.just(value);

      const expected = {
        _type: 'option',
        _value: value
      };

      expect(testO).toEqual(expected);
    });
  });

  describe('none()', () => {
    it('should return proper structure without a reason', () => {
      const testO = option.none();

      const expected = {
        _type: 'option',
        _reason: null
      };

      expect(testO).toEqual(expected);
    });

    it('should return proper structure with a valid reason', () => {
      type Fail = 'fail-a' | 'fail-b';
      const testO = option.none<Fail>('fail-a');

      const expected = {
        _type: 'option',
        _reason: 'fail-a'
      };

      expect(testO).toEqual(expected);
    });
  });

  describe('create()', () => {
    it('should create just when non-nullable value given', () => {
      const value = { a: 'a' };
      const testO = option.create(value);
      const expected = option.just(value);

      expect(testO).toEqual(expected);
    });

    it('should create just when empty string given', () => {
      const value = '';
      const testO = option.create(value);
      const expected = option.just(value);

      expect(testO).toEqual(expected);
    });

    it('should create just when 0 given', () => {
      const value = 0;
      const testO = option.create(value);
      const expected = option.just(value);

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

  describe('map()', () => {
    it('should map value correctly', () => {
      const valueO = option.create(2);
      const expectedO = option.create(4);

      const resultO = pipe(
        valueO,
        option.map(x => x * 2)
      );

      expect(resultO).toEqual(expectedO);
    });

    it('should return none if mapped result is null', () => {
      const valueO = option.create(2);
      const expectedO = option.create(null);

      const resultO = pipe(
        valueO,
        option.map(() => null)
      );

      expect(resultO).toEqual(expectedO);
    });

    it('should return none if mapped result is undefined', () => {
      const valueO = option.create(2);
      const expectedO = option.create(undefined);

      const resultO = pipe(
        valueO,
        option.map(() => undefined)
      );

      expect(resultO).toEqual(expectedO);
    });

    it('should persist reason if mapping none with a reason', () => {
      const valueO = option.create(null as unknown, 'error');
      const expectedO = option.none('error');

      const resultO = pipe(
        valueO,
        option.map(() => 'value')
      );

      expect(resultO).toEqual(expectedO);
    });

    it('should have no reason if mapping none without a reason', () => {
      const valueO = option.create(null as unknown);
      const expectedO = option.none();

      const resultO = pipe(
        valueO,
        option.map(() => 'value')
      );

      expect(resultO).toEqual(expectedO);
    });
  });
});
