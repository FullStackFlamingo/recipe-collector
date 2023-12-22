import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { LinkProps, To } from 'react-router-dom';
import DynamicLink from './DynamicLink';

type props = Omit<LinkProps, 'to'> &
  PropsWithChildren & {
    to?: To;
    className?: string | null;
  };
export default function RCButton({ children, to, className }: props) {
  const classNameExtended = classNames(
    'p-2 inline-block leading-none rounded-md border border-teal-400 bg-teal-600 text-white text-md no-underline',
    className,
  );

  return (
    <DynamicLink tag="button" to={to} className={classNameExtended}>
      {children}
    </DynamicLink>
  );
}
