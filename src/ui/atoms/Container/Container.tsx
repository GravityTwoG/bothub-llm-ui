import classes from './container.module.scss';

import { HTMLComponentsProps } from '../../types';
import { clsx } from 'clsx';

export type ContainerProps = HTMLComponentsProps<'div'>;

export const Container = (props: ContainerProps) => {
  return (
    <div {...props} className={clsx(classes.Container, props.className)}></div>
  );
};
