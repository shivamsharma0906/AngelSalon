import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/motion.css';

// Progressive enhancement: add 'js' class to <html> so animations only apply when JS is enabled
document.documentElement.classList.add('js');

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
