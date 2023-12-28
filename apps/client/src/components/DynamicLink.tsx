import { JSX } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export type props<T extends keyof JSX.IntrinsicElements> =
  | ({ as?: undefined } & LinkProps)
  | ({ as: React.ElementType<any> } & JSX.IntrinsicElements[T]);

/**
 * if `props.as` is not supplied, deault to be a react-router-dom `Link`
 */
export default function DynamicLink<T extends keyof JSX.IntrinsicElements>({ as, children, ...props }: props<T>) {
  const Component = as || Link;

  return <Component {...props}>{children}</Component>;
}
