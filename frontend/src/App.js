import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ImmobiliSearch from './components/immobili/ImmobiliSearch';
import Navbar from './components/navbar/Navbar';
import './styles/App.css';

const navbarOptions = [
    {
        label: 'Immobili',
        onClick: (e) => console.log('Clicca immobili!')
    },
    {
        label: 'Inquilini',
        onClick: (e) => console.log('Clicca inquilini!')
    },
    {
        label: 'Contratti',
        onClick: (e) => console.log('Clicca contratti!')
    }
];

function App() {
    return (
        // Commento a caso
        <div className="viewport-div">
            <Navbar options={navbarOptions} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ImmobiliSearch />}>
                        <Route />
                        <Route />
                        <Route />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
