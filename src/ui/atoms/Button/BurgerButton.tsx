import { clsx } from 'clsx';

import classes from './burger-button.module.scss';

import { Button, ButtonProps } from './Button';

export type BurgerButtonProps = Omit<ButtonProps, 'children'> & {
  isOpen: boolean;
};

export const BurgerButton = ({ isOpen, ...props }: BurgerButtonProps) => {
  return (
    <Button
      {...props}
      className={clsx(
        classes.BurgerButton,
        props.className,
        isOpen && classes.BurgerButtonOpen
      )}
    >
      <span></span>
      <span></span>
      <span></span>
    </Button>
  );
};
