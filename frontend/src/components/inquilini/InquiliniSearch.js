import { useState, useEffect } from 'react';
import Table from '../table/Table';
import useInquilini from './use-inquilini';
import InquiliniPagamenti from './InquiliniPagamenti';
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

export default function InquiliniSearch(props) {
    const { data, update, query, ...rest } = useInquilini();

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (
            !data ||
            !Array.isArray(data) ||
            query.isPending ||
            update.isPending
        )
            return;
        const newData = data.map((el, i) => {
            return {
                ...el,
                onClick: () => {
                    console.log('Mutating: ', el._id);
                    const data = {
                        ...el,
                        name: el.name?.includes('ARMINIO')
                            ? 'FERRANDO 💪🏻'
                            : 'ARMINIO 🧠'
                    };
                    update.mutate(data);
                },
                className: 'inquilini-row'
            };
        });
        setRows(newData);
    }, [query.isPending, data, update.isPending]);

    return (
        <div className="search-div">
            {/* <SearchBanner/> */}
            <div className="search-banner">SEARCHBANNER</div>
            <Table columns={columns} rows={rows} />
            <InquiliniPagamenti data={data} />
        </div>
    );
}
