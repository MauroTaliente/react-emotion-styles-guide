import * as React from 'react';
import { render } from '@testing-library/react';

import 'jest-canvas-mock';

import { StyleGuideProvider } from '../src';

describe('Common render', () => {
  it('renders without crashing', () => {
    const config = {
      initTheme: 'dark',
      baseTheme: 'ligth',
      themes: {
        ligth: {
          colors: {
            primary: '#0f172a',
            secondary: '#eaeaea',
          },
          atoms: {
            card: {
              borderRadius: 20,
            },
          },
        },
        dark: {
          colors: {
            primary: '#34d399',
          },
        },
      },
    };
    render(<StyleGuideProvider config={config} />);
  });
});
