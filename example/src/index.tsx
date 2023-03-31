import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleGuideProvider } from './styles';
import Main from './components/Main';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StyleGuideProvider>
      <Main />
    </StyleGuideProvider>
  </React.StrictMode>,
);
