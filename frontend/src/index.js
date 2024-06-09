import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Banner from './lib/components/search/Banner';

const element = process.env.REACT_APP_COMPONENT || 'root';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>{element === 'root' ? <App /> : <Banner />}</React.StrictMode>);
