import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react'
import { getCards, getColumns } from '../apiCalls';
import Loader from '../Loader';

function TableDashboard() {
    const [cards, setcards] = useState([])
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCards().then(function (response) {
            setcards(response.data)
        });
        getColumns().then(function (response) {
            setColumns(response.data)
            setLoading(false)
        });
    }, [cards, columns])
    return (
        loading ? <Loader /> :
        <div style={styles.container}>
        <TableContainer  component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{backgroundColor: '#5290cc'}}>
                        <TableCell style={styles.colTitle}>Task Name</TableCell>
                        <TableCell style={styles.colTitle} align="left">Task Description</TableCell>
                        <TableCell style={styles.colTitle} align="left">Assignee</TableCell>
                        <TableCell style={styles.colTitle} align="left">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="left">{row.assignee}</TableCell>
                            <TableCell align="left">
                               {row.status}

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

const styles = {
    container: {
        margin: 30
    },
    colTitle:{
        fontSize: 20,
        color: 'white'
    }
}
export default TableDashboard;