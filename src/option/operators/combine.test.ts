import option from '../option';

describe('option.combine()', () => {
  it('should correctly combine 2 options', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create('o2', 'b');

    const expectedO = option.create(['o1', 'o2']);

    const result = option.combine(o1, o2);

    expect(result).toEqual(expectedO);
  });

  it('should correctly return none if one option is none', () => {
    const o1 = option.create('o1', 'a');
    const o2 = option.create(null, 'b');

    const expectedO = option.create(null, 'b');

    const result = option.combine(o1, o2);

    expect(result).toEqual(expectedO);
  });
});
