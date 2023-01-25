import React from 'react';
import ReactDOM from 'react-dom/client';
import GuideTest from './components/GuideTest';
import { StyleGuideProvider } from './styles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StyleGuideProvider>
      <GuideTest />
    </StyleGuideProvider>
  </React.StrictMode>,
);
