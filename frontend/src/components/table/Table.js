import { memo } from 'react';
import '../../styles/table.css';

function TableHeader(props) {
    const { rowData, sticky } = props;

    return (
        <thead className={`table-header table-row${sticky ? ' sticky' : ''}`}>
            <tr key="header">
                {rowData.map((el) => (
                    <td className="table-cell" key={el.id}>
                        {el.label}
                    </td>
                ))}
            </tr>
        </thead>
    );
}

function _TableRow(props) {
    const { rowData, columns, mapped = true, id } = props;

    const tdWidth =
        (!mapped && Array.isArray(rowData) && Array.isArray(columns) && Math.floor(columns.length / rowData.length)) ||
        1;

    return rowData ? (
        mapped && columns ? (
            <tr
                onClick={rowData.onClick}
                className={`table-row ${rowData.className ? rowData.className : ''}`}
                key={`row-${id}`}
            >
                {Object.values(columns).map((column, i) => {
                    return (
                        <TableCell
                            value={rowData[column.id]}
                            key={`table-cell-${id}-${i}`}
                            id={rowData.id}
                            i={i}
                            tdWidth={tdWidth}
                        />
                    );
                })}
            </tr>
        ) : (
            Array.isArray(rowData) && (
                <tr className="table-row" key={`row-${id}`}>
                    {rowData.map((el, i) => (
                        <TableCell {...el} id={id} i={i} tdWidth={tdWidth} />
                    ))}
                </tr>
            )
        )
    ) : null;
}
const TableRow = memo(_TableRow, (prev, next) => {
    return JSON.stringify(prev.rowData) === JSON.stringify(next.rowData);
});

// TODO: implementare sistema di onClick e className
function _TableCell(props) {
    const { id, i, value, tdWidth } = props;
    return (
        <td key={`cell-${id}-${i}`} colSpan={tdWidth} className={`table-cell`}>
            {value}
        </td>
    );
}

const TableCell = memo(_TableCell, (prev, next) => prev.value === next.value);

export default function Table(props) {
    const { className, columns, rows, mapped = true } = props;

    return (
        <div className={'table-container ' + className}>
            <table>
                <TableHeader rowData={columns} sticky={true} />
                <tbody>
                    {columns && rows.length > 0 ? (
                        rows.map((row, i) => (
                            <TableRow key={'row-' + i} id={row._id} rowData={row} columns={columns} mapped={mapped} />
                        ))
                    ) : (
                        <TableRow
                            key="table-row-no-results"
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
