import { clsx } from 'clsx';
import { HTMLComponentsProps } from '../../types';
import classes from './button.module.scss';

const sizeMap = {
  md: 'SizeMedium',
  sm: 'SizeSmall',
};

export type ButtonProps = HTMLComponentsProps<'button'> & {
  corner?: 'brick' | 'rounded';
  size?: 'md' | 'sm';
};

export const Button = ({
  corner = 'brick',
  size = 'sm',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        classes.Button,
        classes[corner],
        classes[sizeMap[size]],
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
