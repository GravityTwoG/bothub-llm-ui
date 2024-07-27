import { clsx } from 'clsx';
import classes from './typography.module.scss';

import { HTMLComponentsProps } from '@/ui/types';

export type H1Props = HTMLComponentsProps<'h1'>;

export const H1 = (props: H1Props) => {
  return <h1 {...props} className={clsx(classes.H1, props.className)} />;
};

export type H2Props = HTMLComponentsProps<'h2'>;

export const H2 = (props: H2Props) => {
  return <h2 {...props} className={clsx(classes.H2, props.className)} />;
};

export type H3Props = HTMLComponentsProps<'h3'>;

export const H3 = (props: H3Props) => {
  return <h3 {...props} className={clsx(classes.H3, props.className)} />;
};

export type H4Props = HTMLComponentsProps<'h4'>;

export const H4 = (props: H4Props) => {
  return <h4 {...props} className={clsx(classes.H4, props.className)} />;
};

export type H5Props = HTMLComponentsProps<'h5'>;

export const H5 = (props: H5Props) => {
  return <h5 {...props} className={clsx(classes.H5, props.className)} />;
};

export type H6Props = HTMLComponentsProps<'h6'>;

export const H6 = (props: H6Props) => {
  return <h6 {...props} className={clsx(classes.H6, props.className)} />;
};

const fontWeightMap = {
  normal: 'FontWeightNormal',
  medium: 'FontWeightMedium',
  semibold: 'FontWeightSemibold',
  bold: 'FontWeightBold',
};

const sizeMap = {
  sm: 'ParagraphSizeSm',
  md: 'ParagraphSizeMd',
};

export type ParagraphProps = HTMLComponentsProps<'p'> & {
  fontWeight?: 'normal' | 'bold' | 'medium' | 'semibold';
  size?: 'sm' | 'md';
};

export const Paragraph = ({
  fontWeight = 'normal',
  size = 'md',
  ...props
}: ParagraphProps) => {
  return (
    <p
      {...props}
      className={clsx(
        classes.Paragraph,
        classes[fontWeightMap[fontWeight]],
        classes[sizeMap[size]],
        props.className
      )}
    />
  );
};
