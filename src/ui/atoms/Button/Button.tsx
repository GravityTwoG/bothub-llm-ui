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
        props.className,
        classes[corner],
        classes[sizeMap[size]]
      )}
    >
      {props.children}
    </button>
  );
};
