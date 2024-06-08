import { memo } from 'react';
import '../../styles/table.css';

// TODO: implementare sistema di onClick e className
function _TableCell(props) {
    const { id, columnIndex, value } = props;
    return (
        <td key={`cell-${id + '00' + columnIndex}`} className={`table-cell`}>
            {value}
        </td>
    );
}

const TableCell = memo(_TableCell, (prev, next) => prev.value === next.value);

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
    const { rowData, columns, id } = props;

    return rowData && columns ? (
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
                        columnIndex={i}
                    />
                );
            })}
        </tr>
    ) : null;
}
const TableRow = memo(_TableRow, (prev, next) => {
    return JSON.stringify(prev.rowData) === JSON.stringify(next.rowData);
});

export default function Table(props) {
    if (!props) return null;
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
                        <RowNoResults columnNum={columns.length} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

function RowNoResults(props) {
    const { columnNum } = props;
    return (
        <tr>
            <td key={`cell-no-results`} colSpan={columnNum} className={`table-cell`}>
                No results :/
            </td>
        </tr>
    );
}
