import classNames from 'classnames';
import DynamicLink, { props } from './DynamicLink';

export default function TagPill<T extends keyof JSX.IntrinsicElements>({ className, children, ...props }: props<T>) {
  const classNameExtended = classNames(
    'p-2 inline-block leading-none rounded-md border border-green-500 bg-green-200 text-black text-sm',
    className,
  );

  return (
    <DynamicLink<T> {...props} className={classNameExtended}>
      {children}
    </DynamicLink>
  );
}
