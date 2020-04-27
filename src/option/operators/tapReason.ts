import { Option, Helpers } from '../helpers';

export type TapReason = <Reason, Value>(
  tappable: (reason: Reason | null) => void
) => (option: Option<Reason, Value>) => Option<Reason, Value>;

export const getTapReason = ({
  noneChecker,
  safeCall,
  getReason
}: Helpers): TapReason => {
  const tapReason: TapReason = tappable => option => {
    if (noneChecker(option)) {
      safeCall(() => tappable(getReason(option)));
    }

    return option;
  };

  return tapReason;
};
