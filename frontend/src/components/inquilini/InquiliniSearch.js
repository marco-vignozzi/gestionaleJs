import { useState, useEffect } from 'react';
import Table from '../table/Table';
import useInquilini from './use-inquilini';
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
    const { data, isPending, ...rest } = useInquilini();

    const [rows, setRows] = useState([]);

    useEffect(() => {
        data && setRows(data);
    }, [isPending, data]);

    return (
        <div className="search-div">
            {/* <SearchBanner/> */}
            <div className="search-banner">SEARCHBANNER</div>
            <Table columns={columns} rows={rows} />
        </div>
    );
}
