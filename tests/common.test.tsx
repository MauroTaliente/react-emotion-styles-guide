import * as React from 'react';
import { render } from '@testing-library/react';

import 'jest-canvas-mock';

import createStyleGuide from "../src";

// test types =>
// const test = {
//   name: 'Test',
//   initState: { l1: { l2: { l3: 'hola' }}},
//   reducer: (v: any) => v,
// } as const;

// type Test = typeof test;
// type TestInfer = Inf<Test>;

// const {
//   initState,
// } = newContext(test);

// console.log(initState.l1.l2.l3);
// test types <=

describe('Common render', () => {
  it('renders without crashing', () => {
    const { StyleGuideProvider } = createStyleGuide({
      activeTheme: 'ligth',
      baseTheme: 'ligth',
      breakPoints: [640, 1140],
      colors: {
        brand: 'red',
      },
      themes: {
        ligth: {
          colors: {
            acent: '#34d399',
            primary: '#0f172a',
            secondary: '#eaeaea',
          },
        },
        dark: {
          colors: {
            acent: '#34d399',
            primary: '#eaeaea',
            secondary: '#0f172a',
          },
        },
      },
    });
    render(<StyleGuideProvider />);
  });
});
