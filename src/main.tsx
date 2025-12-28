import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Buffer } from 'buffer';
import TagManager from 'react-gtm-module';
import App from './App.tsx';
import './index.css';

window.Buffer = Buffer;

// Initialize Google Tag Manager
const tagManagerArgs = {
  gtmId: 'GTM-MN96DX79'
};

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
