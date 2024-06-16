import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
///////////////////////////////////////
// the component to test is imported here
import Input from './lib/components/input/Input';

const element = process.env.REACT_APP_COMPONENT || 'root';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>{element === 'root' ? <App /> : <Input />}</React.StrictMode>);
