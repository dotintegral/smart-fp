/* eslint-disable @typescript-eslint/ban-ts-ignore */
import option from '../option';
import { pipe } from '../../pipe/pipe';

describe('option.ap()', () => {
  it('should apply function correctly', () => {
    const valueO = option.create(2);
    const appO = option.create((x: number) => x * 3);
    const expectedO = option.create(6);

    const resultO = pipe(valueO, option.ap(appO));

    expect(resultO).toEqual(expectedO);
  });

  it('should return none if applied result is null', () => {
    const valueO = option.create(2);
    const appO = option.create(() => null);
    const expectedO = option.create(null);

    const resultO = pipe(valueO, option.ap(appO));

    expect(resultO).toEqual(expectedO);
  });

  it('should return none if applied result is undefined', () => {
    const valueO = option.create(2);
    const appO = option.create(() => undefined);
    const expectedO = option.create(undefined);

    const resultO = pipe(valueO, option.ap(appO));

    expect(resultO).toEqual(expectedO);
  });

  it('should persist reason if applying to none with a reason', () => {
    // @ts-ignore
    const valueO = option.create(null as number, 'error');
    const appO = option.create((x: number) => x * 3);
    const expectedO = option.none('error');

    const resultO = pipe(valueO, option.ap(appO));

    expect(resultO).toEqual(expectedO);
  });

  it('should have no reason if applying to none without a reason', () => {
    // @ts-ignore
    const valueO = option.create(null as number);
    const appO = option.create((x: number) => x * 3);
    const expectedO = option.none();

    const resultO = pipe(valueO, option.ap(appO));

    expect(resultO).toEqual(expectedO);
  });

  it('should catch error in mapper and return none', () => {
    const valueO = option.create(3);
    const appO = option.create((x: number) => {
      throw new Error('an error');

      // eslint-disable-next-line no-unreachable
      return x * 3;
    });
    const expectedO = option.none();

    const resultO = pipe(valueO, option.ap(appO));

    expect(resultO).toEqual(expectedO);
  });

  it('should return none if applying none', () => {
    const valueO = option.create(2);
    const appO = option.none();
    const expectedO = option.none();

    const resultO = pipe(valueO, option.ap(appO));

    expect(resultO).toEqual(expectedO);
  });

  it('should persist none reason of applicative function', () => {
    const valueO = option.create(2, 'error');
    const appO = option.none('error');
    const expectedO = option.none('error');

    const resultO = pipe(valueO, option.ap(appO));

    expect(resultO).toEqual(expectedO);
  });
});
