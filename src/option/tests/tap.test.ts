import { pipe } from 'fp-ts/lib/pipeable';
import option from '../option';

describe('option.tap()', () => {
  it('should pass just correctly', () => {
    const valueO = option.create(2);
    const expectedO = option.create(2);

    const resultO = pipe(
      valueO,
      option.tap(() => {})
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should pass none correctly', () => {
    const valueO = option.create(null, 'nothing');
    const expectedO = option.create(null, 'nothing');

    const resultO = pipe(
      valueO,
      option.tap(() => {})
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should give correct value to tappable function when tapping over just', () => {
    const valueO = option.create(2);
    const expected = 2;
    let result;

    pipe(
      valueO,
      option.tap((_reason, value) => {
        result = value;
      })
    );

    expect(result).toEqual(expected);
  });

  it('should give correct reason to tappable function when tapping over none', () => {
    const valueO = option.create(null, 'reason');
    const expected = 'reason';
    let result;

    pipe(
      valueO,
      option.tap(reason => {
        result = reason;
      })
    );

    expect(result).toEqual(expected);
  });

  it('should catch an error and allow the pipe to continue', () => {
    const valueO = option.create(2);
    const expectedO = option.create(4);

    const resultO = pipe(
      valueO,
      option.tap(() => {
        throw new Error('some error');
      }),
      option.map(v => v * 2)
    );

    expect(resultO).toEqual(expectedO);
  });
});
