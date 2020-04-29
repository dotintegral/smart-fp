import option from '../option';

describe('option.combine()', () => {
  it('should correctly combine 1 option', () => {
    const o1 = option.create('o1', 'a');
    const expectedO = option.create(['o1']);

    const result = option.combine(o1);

    expect(result).toEqual(expectedO);
  });

  it('should correctly combine 2 options', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');

    const expectedO = option.create(['o1', 'o2']);

    const result = option.combine(o1, o2);

    expect(result).toEqual(expectedO);
  });

  it('should correctly return none if one option out of 2 is none', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create(null, 'b');

    const expectedO = option.create(null, 'b');

    const result = option.combine(o1, o2);

    expect(result).toEqual(expectedO);
  });

  it('should correctly combine 3 options', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');

    const expectedO = option.create(['o1', 'o2', 'o3']);

    const result = option.combine(o1, o2, o3);

    expect(result).toEqual(expectedO);
  });

  it('should correctly return none if one option out of 3 is none', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create(null, 'c');

    const expectedO = option.create(null, 'c');

    const result = option.combine(o1, o2, o3);

    expect(result).toEqual(expectedO);
  });

  it('should correctly combine 4 options', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');

    const expectedO = option.create(['o1', 'o2', 'o3', 'o4']);

    const result = option.combine(o1, o2, o3, o4);

    expect(result).toEqual(expectedO);
  });

  it('should correctly return none if one option out of 4 is none', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create(null, 'd');

    const expectedO = option.create(null, 'd');

    const result = option.combine(o1, o2, o3, o4);

    expect(result).toEqual(expectedO);
  });

  it('should correctly combine 5 options', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');
    const o5 = option.create('o5', 'e');

    const expectedO = option.create(['o1', 'o2', 'o3', 'o4', 'o5']);

    const result = option.combine(o1, o2, o3, o4, o5);

    expect(result).toEqual(expectedO);
  });

  it('should correctly return none if one option out of 5 is none', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');
    const o5 = option.create(null, 'e');

    const expectedO = option.create(null, 'e');

    const result = option.combine(o1, o2, o3, o4, o5);

    expect(result).toEqual(expectedO);
  });

  it('should correctly combine 6 options', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');
    const o5 = option.create('o5', 'e');
    const o6 = option.create('o6', 'f');

    const expectedO = option.create(['o1', 'o2', 'o3', 'o4', 'o5', 'o6']);

    const result = option.combine(o1, o2, o3, o4, o5, o6);

    expect(result).toEqual(expectedO);
  });

  it('should correctly return none if one option out of 6 is none', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');
    const o3 = option.create('o3', 'c');
    const o4 = option.create('o4', 'd');
    const o5 = option.create('o5', 'e');
    const o6 = option.create(null, 'f');

    const expectedO = option.create(null, 'f');

    const result = option.combine(o1, o2, o3, o4, o5, o6);

    expect(result).toEqual(expectedO);
  });
});
