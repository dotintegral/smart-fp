import { pipe } from 'fp-ts/lib/pipeable';
import option, { Option } from '../option';

describe('option.flatten()', () => {
  it('should flatten the value correctly', () => {
    const valueO = option.create(option.create('value'));
    const expectedO = option.create('value');

    const resultO = pipe(valueO, option.flatten());

    expect(resultO).toEqual(expectedO);
  });

  it('should take the correct reason from inner option', () => {
    type Reason = 'reason-outer' | 'reason-inner';

    const innerO = option.none<Reason>('reason-inner');
    const outerO = option.create<Reason, Option<Reason, never>>(
      innerO,
      'reason-outer'
    );

    const expectedO = option.none('reason-inner');
    const resultO = pipe(outerO, option.flatten());

    expect(resultO).toEqual(expectedO);
  });

  it('should take the correct reason from outer option', () => {
    type Reason = 'reason-outer' | 'reason-inner';

    const outerO = option.none('reason-outer') as Option<
      Reason,
      Option<Reason, string>
    >;

    const expectedO = option.none('reason-outer');
    const resultO = pipe(outerO, option.flatten());

    expect(resultO).toEqual(expectedO);
  });
});
