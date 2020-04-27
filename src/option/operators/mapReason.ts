import { Option, Helpers } from '../helpers';

export type MapReason = <Reason1, Reason2, Value>(
  mapper: (reason: Reason1 | null) => Reason2
) => (option: Option<Reason1, Value>) => Option<Reason2, Value>;

export const getMapReason = ({
  someChecker,
  safeCall,
  none,
  getReason
}: Helpers): MapReason => {
  const mapReason: MapReason = mapper => option => {
    return (
      someChecker(option) ||
      safeCall(() => none(mapper(getReason(option)))) ||
      none()
    );
  };

  return mapReason;
};
