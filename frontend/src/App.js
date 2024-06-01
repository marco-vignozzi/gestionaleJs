import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ImmobiliSearch from './components/immobili/ImmobiliSearch';
import InquiliniSearch from './components/inquilini/InquiliniSearch';
import Navbar from './components/navbar/Navbar';
import './styles/App.css';

const queryClient = new QueryClient();

const navbarOptions = [
    {
        label: 'Immobili',
        path: '/'
    },
    {
        label: 'Inquilini',
        onClick: () => console.log('clicked Inquilini'),
        path: '/inquilini'
    },
    {
        label: 'Contratti',
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
                        <Route
                            path="/"
                            element={<div>{'Welcome to IKEA 🪑'}</div>}
                        />
                        <Route
                            path="/contratti"
                            element={<div>Hello World! 🧾</div>}
                        />
                        <Route
                            path="/inquilini"
                            element={<InquiliniSearch />}
                        />
                        <Route />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}

export default App;
