import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryDefaultCornerBrick: Story = {
  args: {
    //👇 The args you need here will depend on your component
    children: 'Button',
  },
};

export const PrimaryDisabledCornerBrick: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};

export const PrimaryDefaultCornerRounded: Story = {
  args: {
    children: '',
    corner: 'rounded',
  },
};

export const PrimaryDisabledCornerRounded: Story = {
  args: {
    children: '',
    corner: 'rounded',
    disabled: true,
  },
};
