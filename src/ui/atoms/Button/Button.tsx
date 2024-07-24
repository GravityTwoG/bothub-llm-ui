import { clsx } from 'clsx';
import { HTMLComponentsProps } from '../../types';
import classes from './button.module.scss';

export type ButtonProps = HTMLComponentsProps<'button'> & {
  corner?: 'brick' | 'rounded';
};

export const Button = ({ corner = 'brick', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(classes.Button, props.className, classes[corner])}
    >
      {props.children}
    </button>
  );
};
