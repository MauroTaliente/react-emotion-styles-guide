import React from 'react';
import { render } from '@testing-library/react';

import 'jest-canvas-mock';

import createStyleGuide from '../src';

describe('Common render', () => {
  it('renders without crashing', () => {
    const { StyleGuideProvider } = createStyleGuide({
      forceIrr: { active: true },
      breakPoints: { sm: 320 },
      initThemeName: 'themeMila',
      root: {
        colors: { color: '#eaeaea' },
        fontFamily: { display: 'Font Family' },
      },
      scheme: {
        name: ['themeMila', 'themePancho'],
        tags: ['dark', 'light', 'rounded'],
        colors: ['acent', 'primary', 'secondary', 'ngAcent', 'bgPrimary', 'bgSecondary'],
        fontFamily: ['display', 'body'],
      },
      themes: [
        {
          name: 'themeMila',
          tags: ['dark', 'rounded'],
          colors: {
            acent: '#9e8de5',
            primary: '#0f0f11',
            secondary: '#393e43',
            ngAcent: '#ffffff',
            bgPrimary: '#ffffff',
            bgSecondary: '#edf0fa',
          },
          fontFamily: {
            display: 'Unbounded',
            body: 'Raleway',
          },
        },
        {
          name: 'themePancho',
          tags: ['light'],
          colors: {
            acent: '#ff4e30',
            primary: '#020202',
            secondary: '#747474',
            ngAcent: '#f0f0f0',
            bgPrimary: '#f0f0f0',
            bgSecondary: '#ffffff',
          },
          fontFamily: {
            display: 'Playfair Display',
            body: 'IBM Plex Sans',
          },
        },
      ],
    } as const);

    render(
      <StyleGuideProvider>
        <React.Fragment />
      </StyleGuideProvider>,
    );
  });
  it('renders without scheme', () => {
    const { StyleGuideProvider } = createStyleGuide({
      forceIrr: { active: false },
      breakPoints: { sm: 320 },
      initThemeName: 'themeMila',
      root: {
        colors: { color: '#eaeaea' },
        fontFamily: { display: 'Font Family' },
      },
      themes: [
        {
          name: 'themeMila',
          tags: ['dark'],
          colors: {
            acent: '#9e8de5',
            primary: '#0f0f11',
          },
          fontFamily: {
            display: 'Unbounded',
            body: 'Raleway',
          },
        },
      ],
    } as const);

    render(
      <StyleGuideProvider>
        <React.Fragment />
      </StyleGuideProvider>,
    );
  });
});
