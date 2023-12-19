import { PropsWithChildren } from 'react';
import classNames from 'classnames';

export function Wrapper(props: PropsWithChildren<{ className: string | null }>) {
  const className = classNames('mx-auto w-full max-w-6xl px-4', props.className);
  return <section className={className}>{props.children}</section>;
}
