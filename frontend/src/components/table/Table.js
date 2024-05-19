import '../../styles/table.css';

function TableHeader(props) {
    const { rowData, sticky } = props;

    return (
        <thead
            key="header"
            className={`table-header table-row${sticky ? ' sticky' : ''}`}
        >
            {rowData.map((el) => (
                <th className="table-cell" key={el.id}>
                    {el.label}
                </th>
            ))}
        </thead>
    );
}

function TableRow(props) {
    const { rowData, columns } = props;

    return (
        <tr className="table-row">
            {rowData &&
                Object.values(columns).map((el) => (
                    <td className="table-cell" key={rowData[el.id]}>
                        {rowData[el.id]}
                    </td>
                ))}
        </tr>
    );
}

function TableCell() {
    return <th>Hello</th>;
}

export default function Table(props) {
    const { columns, rows } = props;

    return (
        <div className="table-container">
            <table>
                <TableHeader rowData={columns} sticky={true} />
                {rows.length > 0 ? (
                    rows.map((row, i) => (
                        <TableRow
                            key={`row-${i}`}
                            rowData={row}
                            columns={columns}
                        />
                    ))
                ) : (
                    <tr key="no-results">No results :\</tr>
                )}
            </table>
        </div>
    );
}
