import { pipe } from 'fp-ts/lib/pipeable';
import option from '../option';

describe('option.filter()', () => {
  it('should filter value correctly when checker returns true', () => {
    const valueO = option.create(2);
    const expectedO = option.create(2);

    const resultO = pipe(
      valueO,
      option.filter(x => x > 1)
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should filter value to none when checker returns false', () => {
    const valueO = option.create(2);
    const expectedO = option.create(null);

    const resultO = pipe(
      valueO,
      option.filter(x => x < 1)
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should add correct reason when checker returns false', () => {
    const valueO = option.create(2, 'reason');
    const expectedO = option.create(null, 'new reason');

    const resultO = pipe(
      valueO,
      option.filter(x => x < 1, 'new reason')
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should do nothing when filtering over none', () => {
    const valueO = option.create((null as unknown) as number, 'reason');
    const expectedO = option.create(null, 'reason');

    const resultO = pipe(
      valueO,
      option.filter(x => x < 1)
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should return none when encountering an exception', () => {
    const valueO = option.create(2, 'reason');
    const expectedO = option.create(null);

    const resultO = pipe(
      valueO,
      option.filter(() => {
        throw new Error('error');
        // eslint-disable-next-line no-unreachable
        return true;
      })
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should return valid reason when filtering none even with the exception being thrown', () => {
    const valueO = option.create(null, 'reason');
    const expectedO = option.create(null, 'reason');

    const resultO = pipe(
      valueO,
      option.filter(() => {
        throw new Error('error');
        // eslint-disable-next-line no-unreachable
        return true;
      })
    );

    expect(resultO).toEqual(expectedO);
  });
});
