import { pipe } from '../../pipe/pipe';
import option, { Option } from '../option';

describe('option.getOrElse()', () => {
  it('should return correct value when folding some', () => {
    const expected = 'value';
    const valueO = option.create(expected);

    const result = pipe(
      valueO,
      option.getOrElse(() => 'reason')
    );

    expect(result).toBe(expected);
  });

  it('should return correct value when folding over none', () => {
    const expected = 'reason';
    const valueO = option.create(null) as Option<string, string>;

    const result = pipe(
      valueO,
      option.getOrElse(() => expected)
    );

    expect(result).toBe(expected);
  });

  it('should return give correct reason if present in none', () => {
    const expected = 'abcd';
    const valueO = option.create(null, 'ab') as Option<string, string>;

    const result = pipe(
      valueO,
      option.getOrElse((r) => `${r}cd`)
    );

    expect(result).toBe(expected);
  });
});
