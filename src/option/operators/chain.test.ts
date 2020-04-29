import { pipe } from '../../pipe/pipe';
import option from '../option';

describe('option.chain()', () => {
  it('should pass correct values for some', () => {
    const valueO = option.create(7);
    const chainner = jest.fn((value, reason) => ({ value, reason }));

    const result = pipe(valueO, option.chain(chainner));

    expect(chainner).toBeCalledWith(7, null);
    expect(result).toEqual({ value: 7, reason: null });
  });

  it('should pass correct values for none (with reason)', () => {
    const valueO = option.create(null, 'reason');
    const chainner = jest.fn((value, reason) => ({ value, reason }));

    const result = pipe(valueO, option.chain(chainner));

    expect(chainner).toBeCalledWith(null, 'reason');
    expect(result).toEqual({ value: null, reason: 'reason' });
  });

  it('should pass correct values for none (with reason)', () => {
    const valueO = option.create(null);
    const chainner = jest.fn((value, reason) => ({ value, reason }));

    const result = pipe(valueO, option.chain(chainner));

    expect(chainner).toBeCalledWith(null, null);
    expect(result).toEqual({ value: null, reason: null });
  });
});
