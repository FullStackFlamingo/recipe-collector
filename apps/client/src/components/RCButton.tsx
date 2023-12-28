import classNames from 'classnames';
import DynamicLink, { props } from './DynamicLink';

export default function RCButton<T extends keyof JSX.IntrinsicElements>({ className, children, ...props }: props<T>) {
  const classNameExtended = classNames(
    'p-2 inline-block leading-none rounded-md border border-teal-400 bg-teal-600 text-white text-md no-underline',
    className,
  );

  return (
    <DynamicLink<T> {...props} className={classNameExtended}>
      {children}
    </DynamicLink>
  );
}
