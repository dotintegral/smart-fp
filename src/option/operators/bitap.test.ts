import { pipe } from '../../pipe/pipe';
import option from '../option';

describe('option.bitap()', () => {
  it('should pass some correctly', () => {
    const valueO = option.create(2);
    const expectedO = option.create(2);

    const resultO = pipe(
      valueO,
      option.bitap(
        () => {},
        () => {}
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should pass none correctly', () => {
    const valueO = option.create(null, 'nothing');
    const expectedO = option.create(null, 'nothing');

    const resultO = pipe(
      valueO,
      option.bitap(
        () => {},
        () => {}
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should call correct function with correct argument when tapping over some', () => {
    const valueO = option.create(7);
    const tapNone = jest.fn();
    const tapSome = jest.fn();

    pipe(valueO, option.bitap(tapNone, tapSome));

    expect(tapNone).not.toBeCalled();
    expect(tapSome).toBeCalledWith(7);
  });

  it('should call correct function with correct argument when tapping over none with reason', () => {
    const valueO = option.create(null, 'reason');
    const tapNone = jest.fn();
    const tapSome = jest.fn();

    pipe(valueO, option.bitap(tapNone, tapSome));

    expect(tapNone).toBeCalledWith('reason');
    expect(tapSome).not.toBeCalled();
  });

  it('should call correct function with correct argument when tapping over none without reason', () => {
    const valueO = option.create(null);
    const tapNone = jest.fn();
    const tapSome = jest.fn();

    pipe(valueO, option.bitap(tapNone, tapSome));

    expect(tapNone).toBeCalledWith(null);
    expect(tapSome).not.toBeCalled();
  });

  it('should catch an error and allow the pipe to continue when tapping over some', () => {
    const valueO = option.create(2);
    const expectedO = option.create(4);

    const resultO = pipe(
      valueO,
      option.bitap(
        () => {
          throw new Error('some error');
        },
        () => {
          throw new Error('some error');
        }
      ),
      option.map(v => v * 2)
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should catch an error and allow the pipe to continue when tapping over none', () => {
    const valueO = option.create(null);
    const expectedO = option.create(null, 'reason');

    const resultO = pipe(
      valueO,
      option.bitap(
        () => {
          throw new Error('some error');
        },
        () => {
          throw new Error('some error');
        }
      ),
      option.mapReason(() => 'reason')
    );

    expect(resultO).toEqual(expectedO);
  });
});
