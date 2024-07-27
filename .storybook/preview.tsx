import { Preview } from '@storybook/react';

import { font } from '../app/fonts';

import '../src/ui/styles/theme.scss';

const preview: Preview = {
  parameters: {},
  decorators: [
    (Story) => (
      <main className={font.className}>
        <Story />
      </main>
    ),
  ],
};

export default preview;
