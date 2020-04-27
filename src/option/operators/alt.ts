import { Option, Helpers } from '../helpers';

export type Alt = <Reason, Value>(
  alternative: Option<Reason, Value>
) => (option: Option<Reason, Value>) => Option<Reason, Value>;

export const getAlt = ({ noneChecker, someChecker, none }: Helpers): Alt => {
  const alt: Alt = alternative => option => {
    return (
      someChecker(option) ||
      someChecker(alternative) ||
      noneChecker(alternative) ||
      none()
    );
  };

  return alt;
};
