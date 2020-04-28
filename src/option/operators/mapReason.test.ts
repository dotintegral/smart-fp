import { pipe } from '../../pipe/pipe';
import option from '../option';

describe('option.mapReason()', () => {
  it('should map reason correctly', () => {
    const valueO = option.create(null, 'reason');
    const expectedO = option.create(null, 'new reason');

    const resultO = pipe(
      valueO,
      option.mapReason(reason => `new ${reason}`)
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should pass value correctly', () => {
    const valueO = option.create('value', 'reason');
    const expectedO = option.create('value');

    const resultO = pipe(
      valueO,
      option.mapReason(reason => `new ${reason}`)
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should map reason correctly even when the result of mapping is null', () => {
    const valueO = option.create(null, 'reason');
    const expectedO = option.create(null);

    const resultO = pipe(
      valueO,
      option.mapReason(() => null)
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should map reason correctly even when the result of mapping is undefined', () => {
    const valueO = option.create(null, 'reason');
    const expectedO = option.create(null);

    const resultO = pipe(
      valueO,
      option.mapReason(() => undefined)
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should catch an error', () => {
    const valueO = option.create(null, 'reason');
    const expectedO = option.create(null);

    const resultO = pipe(
      valueO,
      option.mapReason(() => {
        throw new Error('Error');
        // eslint-disable-next-line no-unreachable
        return 'new reason';
      })
    );

    expect(resultO).toEqual(expectedO);
  });
});
