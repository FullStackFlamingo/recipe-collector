import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';

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
  if (!to) return <span className={classNameExtended}>{children}</span>;
  return (
    <Link to={to} className={classNameExtended}>
      {children}
    </Link>
  );
}
