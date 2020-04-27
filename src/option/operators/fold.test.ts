/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { pipe } from 'fp-ts/lib/pipeable';
import option from '../option';

describe('option.fold()', () => {
  it('should return correct value when folding some', () => {
    const expected = 'value';
    const valueO = option.create(expected);

    const result = pipe(
      valueO,
      option.fold(
        () => 'none',
        v => v
      )
    );

    expect(result).toBe(expected);
  });

  it('should return correct value when folding over none', () => {
    const expected = 'none';
    const valueO = option.create(null);

    const result = pipe(
      valueO,
      option.fold(
        () => 'none',
        v => v
      )
    );

    expect(result).toBe(expected);
  });

  it('should return give correct reason if present in none', () => {
    type Reason = 'empty' | 'non-empty';
    const expected = 'empty';
    const valueO = option.create<Reason, string>(null, 'empty');

    const result = pipe(
      valueO,
      option.fold(
        r => r,
        () => 'non-empty'
      )
    );

    expect(result).toBe(expected);
  });
});
