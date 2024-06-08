import { useState, useEffect } from 'react';
import Table from '../../lib/components/table/Table';
import '../../styles/App.css';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    {
        id: 'secondName',
        label: 'Second Name',
        minWidth: 170
    },
    {
        id: 'country',
        label: 'Country',
        minWidth: 170
    },
    {
        id: 'city',
        label: 'City',
        minWidth: 170
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 170
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170
    }
];

export default function ImmobiliSearch(props) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    // Aggiungere qui le fetch iniziali
    const fetchData = async () =>
        await fetch('http://localhost:3000/api/rows')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response NOT okk!');
                }
                return res.json();
            })
            .then((data) => setRows(data))
            .catch((err) => console.log('ERRORE! ERRORE!! ERRORE!!!', err));

    return (
        <div className="search-div">
            {/* <SearchBanner/> */}
            <div className="search-banner">SEARCHBANNER</div>
            <Table columns={columns} rows={rows} />
        </div>
    );
}
