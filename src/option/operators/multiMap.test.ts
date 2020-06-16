/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { pipe } from '../../pipe/pipe';
import option from '../option';
import { argsCombination } from '../../utils/test-combinator';

const sample = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
};

type Sample = typeof sample;
type Mapper = (sample: Sample) => string | null | undefined;

describe('option.multiMap()', () => {
  it('should map 2 values correctly', () => {
    const valueO = option.create(sample);
    const expectedO = option.create(['a', 'b']);

    const resultO = pipe(
      valueO,
      option.multiMap(
        (val) => val.a,
        (val) => val.b
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should map 3 values correctly', () => {
    const valueO = option.create(sample);
    const expectedO = option.create(['a', 'b', 'c']);

    const resultO = pipe(
      valueO,
      option.multiMap(
        (val) => val.a,
        (val) => val.b,
        (val) => val.c
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should map 4 values correctly', () => {
    const valueO = option.create(sample);
    const expectedO = option.create(['a', 'b', 'c', 'd']);

    const resultO = pipe(
      valueO,
      option.multiMap(
        (val) => val.a,
        (val) => val.b,
        (val) => val.c,
        (val) => val.d
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should map 5 values correctly', () => {
    const valueO = option.create(sample);
    const expectedO = option.create(['a', 'b', 'c', 'd', 'e']);

    const resultO = pipe(
      valueO,
      option.multiMap(
        (val) => val.a,
        (val) => val.b,
        (val) => val.c,
        (val) => val.d,
        (val) => val.e
      )
    );

    expect(resultO).toEqual(expectedO);
  });

  it('should return none if at least one mapper maps to null', () => {
    const minArgs = 2;
    const maxArgs = 5;
    const valueO = option.create(sample);
    const expectedO = option.create(null);

    const correctValues: Mapper[] = [
      (val) => val.a,
      (val) => val.b,
      (val) => val.c,
      (val) => val.d,
      (val) => val.e,
    ];
    const incorrectValue: Mapper = () => null;

    const combinations = argsCombination(
      minArgs,
      maxArgs,
      correctValues,
      incorrectValue
    );

    combinations((mappers) => {
      // @ts-ignore
      const resultO = pipe(valueO, option.multiMap(...mappers));

      expect(resultO).toEqual(expectedO);
    });

    expect(true).toBeTruthy();
  });

  it('should return none if at least one mapper throws an exception', () => {
    const minArgs = 2;
    const maxArgs = 5;
    const valueO = option.create(sample);
    const expectedO = option.create(null);

    const correctValues: Mapper[] = [
      (val) => val.a,
      (val) => val.b,
      (val) => val.c,
      (val) => val.d,
      (val) => val.e,
    ];
    const incorrectValue: Mapper = () => {
      throw new Error('e');
      // eslint-disable-next-line no-unreachable
      return 'val';
    };

    const combinations = argsCombination(
      minArgs,
      maxArgs,
      correctValues,
      incorrectValue
    );

    combinations((mappers) => {
      // @ts-ignore
      const resultO = pipe(valueO, option.multiMap(...mappers));

      expect(resultO).toEqual(expectedO);
    });

    expect(true).toBeTruthy();
  });
});
