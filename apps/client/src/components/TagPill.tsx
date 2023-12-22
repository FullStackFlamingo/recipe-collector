import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { LinkProps, To } from 'react-router-dom';
import DynamicLink from './DynamicLink';

type props = Omit<LinkProps, 'to'> &
  PropsWithChildren & {
    to?: To;
    className?: string | null;
  };
export default function TagPill({ children, to, className }: props) {
  const classNameExtended = classNames(
    'p-2 inline-block leading-none rounded-md border border-green-500 bg-green-200 text-black text-sm',
    className,
  );

  return (
    <DynamicLink to={to} className={classNameExtended}>
      {children}
    </DynamicLink>
  );
}
