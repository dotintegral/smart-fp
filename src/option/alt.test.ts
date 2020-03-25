/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { pipe } from 'fp-ts/lib/pipeable';
import option, { Option } from './option';

describe('option.alt()', () => {
  it('should do nothing if value is `just`', () => {
    const valueO = option.create(2);
    const alternativeO = option.create(4);
    const expectedO = option.create(2);

    const resultO = pipe(valueO, option.alt(alternativeO));

    expect(resultO).toEqual(expectedO);
  });

  it('should return alternative if value is `none` and alternative is `just`', () => {
    const valueO = option.none() as Option<never, number>;
    const alternativeO = option.create(4);
    const expectedO = option.create(4);

    const resultO = pipe(valueO, option.alt(alternativeO));

    expect(resultO).toEqual(expectedO);
  });

  it('should return `none` if both are `none`', () => {
    const valueO = option.none() as Option<never, number>;
    const alternativeO = option.none() as Option<never, number>;
    const expectedO = option.none() as Option<never, number>;

    const resultO = pipe(valueO, option.alt(alternativeO));

    expect(resultO).toEqual(expectedO);
  });

  it('should return `none` with correct reason if both are `none`', () => {
    const valueO = option.none('value') as Option<never, number>;
    const alternativeO = option.none('alternative') as Option<never, number>;
    const expectedO = option.none('alternative') as Option<never, number>;

    const resultO = pipe(valueO, option.alt(alternativeO));

    expect(resultO).toEqual(expectedO);
  });
});
