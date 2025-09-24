import React from 'react';
import ReactDOM from 'react-dom'; // Correct import for React 17
import App from './App';
import './styles/index.css';

// Delete the 'createRoot' lines

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);