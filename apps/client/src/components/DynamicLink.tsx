import { PropsWithChildren } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';

type props = Omit<LinkProps, 'to'> &
  PropsWithChildren & {
    to?: To;
    className?: string | null;
    tag?: keyof JSX.IntrinsicElements;
  };
/**
 * if `props.to` is supplied, will be a react-router-dom Link
 */
export default function DynamicLink({ children, to, className, tag = 'span' }: props) {
  const Component = tag as keyof JSX.IntrinsicElements;

  if (!to) return <Component className={className}>{children}</Component>;

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
