import React from 'react';
import Table from '../../components/table/Table'


const columns = [
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "code", label: "ISO\u00a0Code", minWidth: 100 },
	{
		id: "population",
		label: "Population",
		minWidth: 170,
		align: "right",
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "size",
		label: "Size\u00a0(km\u00b2)",
		minWidth: 170,
		align: "right",
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "density",
		label: "Density",
		minWidth: 170,
		align: "right",
		format: (value) => value.toFixed(2),
	},
];


export default function ImmobiliSearch (props){
    	// Aggiungere qui le fetch iniziali
	const fetchData = () => 
		fetch("http://localhost:3000/api/rows")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Network response NOT okk!");
				}
				return res.json();
			});

    return <div>
        <Table columns={columns} fetchData={fetchData} />
    </div>
}