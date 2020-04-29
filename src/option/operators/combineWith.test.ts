import option from '../option';
import { pipe } from '../../pipe/pipe';

describe('option.combineWith()', () => {
  it('should correctly combine with 1 option (of some value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');

    const expected = option.create(['o1', 'o2']);

    const result = pipe(o1, option.combineWith(o2));

    expect(result).toEqual(expected);
  });

  it('should correctly combine with 1 option (of none value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create(null, 'b');

    const expected = option.create(null, 'b');

    const result = pipe(o1, option.combineWith(o2));

    expect(result).toEqual(expected);
  });

  it('should correctly combine with 2 options (of some value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');

    const expected = option.create(['o1', 'o2', 'o3']);

    const result = pipe(o1, option.combineWith(o2, o3));

    expect(result).toEqual(expected);
  });

  it('should correctly combine with 2 options (of none value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create(null, 'c');

    const expected = option.create(null, 'c');

    const result = pipe(o1, option.combineWith(o2, o3));

    expect(result).toEqual(expected);
  });

  it('should correctly combine with 3 options (of some value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');

    const expected = option.create(['o1', 'o2', 'o3', 'o4']);

    const result = pipe(o1, option.combineWith(o2, o3, o4));

    expect(result).toEqual(expected);
  });

  it('should correctly combine with 3 options (of none value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create(null, 'd');

    const expected = option.create(null, 'd');

    const result = pipe(o1, option.combineWith(o2, o3, o4));

    expect(result).toEqual(expected);
  });

  it('should correctly combine with 4 options (of some value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');
    const o5 = option.create('o5', 'e');

    const expected = option.create(['o1', 'o2', 'o3', 'o4', 'o5']);

    const result = pipe(o1, option.combineWith(o2, o3, o4, o5));

    expect(result).toEqual(expected);
  });

  it('should correctly combine with 4 options (of none value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');
    const o5 = option.create(null, 'e');

    const expected = option.create(null, 'e');

    const result = pipe(o1, option.combineWith(o2, o3, o4, o5));

    expect(result).toEqual(expected);
  });

  it('should correctly combine with 5 options (of some value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');
    const o5 = option.create('o5', 'e');
    const o6 = option.create('o6', 'f');

    const expected = option.create(['o1', 'o2', 'o3', 'o4', 'o5', 'o6']);

    const result = pipe(o1, option.combineWith(o2, o3, o4, o5, o6));

    expect(result).toEqual(expected);
  });

  it('should correctly combine with 5 options (of none value)', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');
    const o5 = option.create('o5', 'e');
    const o6 = option.create(null, 'f');

    const expected = option.create(null, 'f');

    const result = pipe(o1, option.combineWith(o2, o3, o4, o5, o6));

    expect(result).toEqual(expected);
  });
});
