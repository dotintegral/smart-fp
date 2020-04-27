import { pipe } from 'fp-ts/lib/pipeable';
import option from '../option';

describe('option.map()', () => {
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

  it('should catch error in mapper and return none', () => {
    const valueO = option.create('value');
    const expectedO = option.none();

    const resultO = pipe(
      valueO,
      option.map(() => {
        throw new Error('an error');

        // eslint-disable-next-line no-unreachable
        return 'new-value';
      })
    );

    expect(resultO).toEqual(expectedO);
  });
});
