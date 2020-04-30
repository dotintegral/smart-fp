import { pipe } from '../../pipe/pipe';
import option from '../option';

describe('option.reduce()', () => {
  it('should return correct value when reducing some', () => {
    const expected = 'value';
    const valueO = option.create(expected);

    const result = pipe(valueO, option.reduce());

    expect(result).toBe(expected);
  });

  it('should return null when reducing none w/o reason', () => {
    const expected = null;
    const valueO = option.create(null);

    const result = pipe(valueO, option.reduce());

    expect(result).toBe(expected);
  });

  it('should return correct value when reducing none with reason', () => {
    const expected = 'empty';
    const valueO = option.create<string, string>(null, 'empty');

    const result = pipe(valueO, option.reduce());

    expect(result).toBe(expected);
  });
});
