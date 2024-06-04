import { useState, useEffect } from 'react';
import Table from '../table/Table';
import useInquilini from './use-inquilini';
import InquiliniPagamenti from './InquiliniPagamenti';
import '../../styles/App.css';
import InquiliniEdit from './InquiliniEdit';

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

const processData = (data, update) =>
    data.map((el, i) => {
        return {
            ...el,
            onClick: () => {
                console.log('Mutating: ', el._id);
                const data = {
                    ...el,
                    name: el.name?.includes('ARMINIO') ? 'FERRANDO 💪🏻' : 'ARMINIO 🧠'
                };
                update.mutate(data);
            },
            className: 'inquilini-row'
        };
    });

export default function InquiliniRoute(props) {
    const { data, update, query, ...rest } = useInquilini();

    const [isEditMode, setIsEditMode] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (!data || !Array.isArray(data) || query.isPending || update.isPending) return;
        const newData = processData(data, update);
        setRows(newData);
    }, [query.isPending, data, update.isPending]);

    return (
        <div className="search-div">
            {/* <SearchBanner/> */}
            <div className="search-banner">SEARCHBANNER</div>
            <div className="inquilini-edit-div">
                <InquiliniEdit />
                <Table columns={columns} rows={rows} />
            </div>
            <InquiliniPagamenti data={data} />
        </div>
    );
}
