import '../../styles/table.css';

function TableHeader(props) {
    const { rowData, sticky } = props;

    return (
        <thead
            key="header"
            className={`table-header table-row${sticky ? ' sticky' : ''}`}
        >
            <tr>
                {rowData.map((el) => (
                    <td className="table-cell" key={el.id}>
                        {el.label}
                    </td>
                ))}
            </tr>
        </thead>
    );
}

function TableRow(props) {
    const { rowData, columns, mapped = true, id } = props;

    const tdWidth =
        (!mapped &&
            Array.isArray(rowData) &&
            Array.isArray(columns) &&
            Math.floor(columns.length / rowData.length)) ||
        1;

    return rowData ? (
        mapped && columns ? (
            <tr className="table-row" key={`row-${id}`}>
                {Object.values(columns).map((el) => (
                    <td className="table-cell" key={rowData[el.id]}>
                        {rowData[el.id]}
                    </td>
                ))}
            </tr>
        ) : (
            Array.isArray(rowData) && (
                <tr className="table-row" key={`row-${id}`}>
                    {rowData.map((el, i) => (
                        <td
                            key={`cell-${id}-${i}`}
                            colSpan={tdWidth}
                            className={`table-cell ${
                                el.className ? el.className : ''
                            }`}
                        >
                            {el.value}
                        </td>
                    ))}
                </tr>
            )
        )
    ) : null;
}

// function TableCell() {
//     return <th>Hello</th>;
// }

export default function Table(props) {
    const { columns, rows, mapped = true } = props;

    return (
        <div className="table-container">
            <table>
                <TableHeader rowData={columns} sticky={true} />
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row, i) => (
                            <TableRow
                                key={'row-' + i}
                                id={i}
                                rowData={row}
                                columns={columns}
                                mapped={mapped}
                            />
                        ))
                    ) : (
                        <TableRow
                            key="row-no-results"
                            id="no-results"
                            mapped={false}
                            columns={columns}
                            rowData={[{ value: 'No results :/' }]}
                        />
                    )}
                </tbody>
            </table>
        </div>
    );
}
