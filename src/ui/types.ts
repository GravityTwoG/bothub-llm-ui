import { ElementType } from 'react';

export type HTMLComponentsProps<T extends ElementType> =
  React.ComponentPropsWithRef<T>;
