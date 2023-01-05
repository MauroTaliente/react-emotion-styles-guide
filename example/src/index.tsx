import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleGuideProvider } from 'react-emotion-styles-guide';

const config = {
  initTheme: 'ligth',
  baseTheme: 'ligth',
  breakPoints: [1140],
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
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StyleGuideProvider config={config}>
      <h2>StyleGuide Example</h2>
    </StyleGuideProvider>
  </React.StrictMode>,
);
