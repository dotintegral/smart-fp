import { pipe } from 'fp-ts/lib/pipeable';
import option from '../option';

describe('option.tap()', () => {
  it('should pass some correctly', () => {
    const valueO = option.create(2);
    const expectedO = option.create(2);

    const resultO = pipe(
      valueO,
      option.tapReason(() => {})
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should pass none correctly', () => {
    const valueO = option.create(null, 'nothing');
    const expectedO = option.create(null, 'nothing');

    const resultO = pipe(
      valueO,
      option.tapReason(() => {})
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should give correct reason to tappable function when tapping over none', () => {
    const valueO = option.create(null, 'reason');
    const tappable = jest.fn();

    pipe(valueO, option.tapReason(tappable));

    expect(tappable).toBeCalledWith('reason');
  });

  it('should give correct nullish reason to tappable function when tapping over none w/o reason', () => {
    const valueO = option.create(null);
    const tappable = jest.fn();

    pipe(valueO, option.tapReason(tappable));

    expect(tappable).toBeCalledWith(null);
  });

  it('should not be called when tapping over some', () => {
    const valueO = option.create('value');
    const tappable = jest.fn();

    pipe(valueO, option.tapReason(tappable));

    expect(tappable).not.toBeCalled();
  });

  it('should catch an error and allow the pipe to continue', () => {
    const valueO = option.create(null, 'reason');
    const expectedO = option.create(null, 'reason');

    const resultO = pipe(
      valueO,
      option.tapReason(() => {
        throw new Error('some error');
      }),
      option.map(() => 'some value')
    );

    expect(resultO).toEqual(expectedO);
  });
});
