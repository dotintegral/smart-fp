import { pipe } from 'fp-ts/lib/pipeable';
import option from './option';

describe('option.bimap()', () => {
  it('should map value correctly', () => {
    const valueO = option.create(2);
    const expectedO = option.create(4);

    const resultO = pipe(
      valueO,
      option.bimap(
        () => null,
        x => x * 2
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should map reason correctly', () => {
    const valueO = option.create(null, 'reason');
    const expectedO = option.none('new reason');

    const resultO = pipe(
      valueO,
      option.bimap(
        reason => `new ${reason}`,
        () => null
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should map to none if return result is null', () => {
    const valueO = option.create('value');
    const expectedO = option.none();

    const resultO = pipe(
      valueO,
      option.bimap(
        () => null,
        () => null
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should map to none if return result is undefined', () => {
    const valueO = option.create('value');
    const expectedO = option.none();

    const resultO = pipe(
      valueO,
      option.bimap(
        () => null,
        () => undefined
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should catch an exception when mapping over value', () => {
    const valueO = option.create('value');
    const expectedO = option.none();

    const resultO = pipe(
      valueO,
      option.bimap(
        () => null,
        () => {
          throw new Error();
          // eslint-disable-next-line no-unreachable
          return 'new value';
        }
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should catch an exception when mapping over reason', () => {
    const valueO = option.create(null, 'reason');
    const expectedO = option.none();

    const resultO = pipe(
      valueO,
      option.bimap(
        () => {
          throw new Error();
          // eslint-disable-next-line no-unreachable
          return 'new reason';
        },
        () => null
      )
    );

    expect(resultO).toEqual(expectedO);
  });
});
