import { pipe } from './pipe';

describe('pipe()', () => {
  it('should pipe correctly 1 argument', () => {
    const result = pipe('a');

    expect(result).toEqual('a');
  });

  it('should pipe correctly 2 arguments', () => {
    const result = pipe('a', (x) => `${x}b`);

    expect(result).toEqual('ab');
  });

  it('should pipe correctly 3 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`
    );

    expect(result).toEqual('abc');
  });

  it('should pipe correctly 4 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`
    );

    expect(result).toEqual('abcd');
  });

  it('should pipe correctly 5 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`
    );

    expect(result).toEqual('abcde');
  });

  it('should pipe correctly 6 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`
    );

    expect(result).toEqual('abcdef');
  });

  it('should pipe correctly 7 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`
    );

    expect(result).toEqual('abcdefg');
  });

  it('should pipe correctly 8 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`
    );

    expect(result).toEqual('abcdefgh');
  });

  it('should pipe correctly 9 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`
    );

    expect(result).toEqual('abcdefghi');
  });

  it('should pipe correctly 10 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`
    );

    expect(result).toEqual('abcdefghij');
  });

  it('should pipe correctly 11 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`
    );

    expect(result).toEqual('abcdefghijk');
  });

  it('should pipe correctly 12 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`,
      (x) => `${x}l`
    );

    expect(result).toEqual('abcdefghijkl');
  });

  it('should pipe correctly 13 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`,
      (x) => `${x}l`,
      (x) => `${x}m`
    );

    expect(result).toEqual('abcdefghijklm');
  });

  it('should pipe correctly 14 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`,
      (x) => `${x}l`,
      (x) => `${x}m`,
      (x) => `${x}n`
    );

    expect(result).toEqual('abcdefghijklmn');
  });

  it('should pipe correctly 15 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`,
      (x) => `${x}l`,
      (x) => `${x}m`,
      (x) => `${x}n`,
      (x) => `${x}o`
    );

    expect(result).toEqual('abcdefghijklmno');
  });

  it('should pipe correctly 16 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`,
      (x) => `${x}l`,
      (x) => `${x}m`,
      (x) => `${x}n`,
      (x) => `${x}o`,
      (x) => `${x}p`
    );

    expect(result).toEqual('abcdefghijklmnop');
  });

  it('should pipe correctly 17 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`,
      (x) => `${x}l`,
      (x) => `${x}m`,
      (x) => `${x}n`,
      (x) => `${x}o`,
      (x) => `${x}p`,
      (x) => `${x}q`
    );

    expect(result).toEqual('abcdefghijklmnopq');
  });

  it('should pipe correctly 18 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`,
      (x) => `${x}l`,
      (x) => `${x}m`,
      (x) => `${x}n`,
      (x) => `${x}o`,
      (x) => `${x}p`,
      (x) => `${x}q`,
      (x) => `${x}r`
    );

    expect(result).toEqual('abcdefghijklmnopqr');
  });

  it('should pipe correctly 19 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`,
      (x) => `${x}l`,
      (x) => `${x}m`,
      (x) => `${x}n`,
      (x) => `${x}o`,
      (x) => `${x}p`,
      (x) => `${x}q`,
      (x) => `${x}r`,
      (x) => `${x}s`
    );

    expect(result).toEqual('abcdefghijklmnopqrs');
  });

  it('should pipe correctly 20 arguments', () => {
    const result = pipe(
      'a',
      (x) => `${x}b`,
      (x) => `${x}c`,
      (x) => `${x}d`,
      (x) => `${x}e`,
      (x) => `${x}f`,
      (x) => `${x}g`,
      (x) => `${x}h`,
      (x) => `${x}i`,
      (x) => `${x}j`,
      (x) => `${x}k`,
      (x) => `${x}l`,
      (x) => `${x}m`,
      (x) => `${x}n`,
      (x) => `${x}o`,
      (x) => `${x}p`,
      (x) => `${x}q`,
      (x) => `${x}r`,
      (x) => `${x}s`,
      (x) => `${x}t`
    );

    expect(result).toEqual('abcdefghijklmnopqrst');
  });
});
