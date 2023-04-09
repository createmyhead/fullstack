import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import store from './app/store'
import { ProviderStore } from './store/export'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProviderStore>
      <App />
    </ProviderStore>
  </React.StrictMode>
);

