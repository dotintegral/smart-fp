import { pipe } from 'fp-ts/lib/pipeable';
import option from '../option';

describe('option.tap()', () => {
  it('should pass some correctly', () => {
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

  it('should give correct value to tappable function when tapping over some', () => {
    const valueO = option.create(7);
    const tappable = jest.fn();

    pipe(valueO, option.tap(tappable));

    expect(tappable).toBeCalledWith(7);
  });

  it('should not be called when tapping over none', () => {
    const valueO = option.create(null, 'reason');
    const tappable = jest.fn();

    pipe(valueO, option.tap(tappable));

    expect(tappable).not.toBeCalled();
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
