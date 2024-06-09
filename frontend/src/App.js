import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InquiliniRoute from './routes/InquiliniRoute';
import Navbar from './components/navbar/Navbar';
import './styles/App.css';

const queryClient = new QueryClient();

const navbarOptions = [
    {
        label: 'IMMOBILI',
        path: '/'
    },
    {
        label: 'INQUILINI',
        onClick: () => console.log('clicked Inquilini'),
        path: '/inquilini'
    },
    {
        label: 'CONTRATTI',
        path: '/contratti'
    }
];

function App() {
    return (
        // Commento a caso
        <div className="viewport-div">
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Navbar options={navbarOptions} />
                    <Routes>
                        <Route path="/" element={<div>{'Welcome to IKEA 🪑'}</div>} />
                        <Route path="/contratti" element={<div>Hello World! 🧾</div>} />
                        <Route path="/inquilini" element={<InquiliniRoute />} />
                        <Route />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}

export default App;
