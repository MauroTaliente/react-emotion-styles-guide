import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleGuideProvider } from './styles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StyleGuideProvider>
      <h2>StyleGuide Example</h2>
    </StyleGuideProvider>
  </React.StrictMode>,
);
