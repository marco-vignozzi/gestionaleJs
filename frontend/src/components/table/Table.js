import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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

export default function StickyHeadTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(25);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		fetchData();
	}, []);

	// Aggiungere qui le fetch iniziali
	const fetchData = () => {
		fetch("http://localhost:3000/api/rows")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Network response NOT okk!");
				}
				return res.json();
			})
			.then((data) => setRows(data))
			.catch((err) => console.log("ERRORE! ERRORE!! ERRORE!!!", err));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleRowClick = (event, rowCode, rowName) => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				rowCode: rowCode,
				newValue: rowName + "!",
				message: "Change this row pls: " + rowCode,
			}),
		};
		fetch("http://localhost:3000/api", options)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Network response NOT okk!");
				}
				return res.json();
			})
			.then((data) => {
				fetchData();
			});
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer /*  sx={{ : 700 }} */>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows &&
							rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => {
									return (
										<TableRow
											hover
											onClick={(event) =>
												handleRowClick(
													event,
													row.code,
													row.name
												)
											}
											role="checkbox"
											tabIndex={-1}
											key={row.code}
										>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell
														key={column.id}
														align={column.align}
													>
														{column.format &&
														typeof value ===
															"number"
															? column.format(
																	value
															  )
															: value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						{"Nessun risultato"}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
