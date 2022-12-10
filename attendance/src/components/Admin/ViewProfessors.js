import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import { path } from '../../path'

const axios = require('axios')

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, branch, teacherId, email, contact) {
    return { name, branch, teacherId, email, contact };
}

const ViewProffessors = () => {

    const [rows, setrows] = useState([]);

    const getAllTeachers = async () => {
        await axios.post(`${path}/getTeachers`)
            .then(function (response) {
                console.log("Res: ", response);
                if (response.status == 203) {
                    // toast.error(response.data.msg);
                    setrows([])
                }
                else {
                    console.log("resp stud : ", response);
                    var r = [];
                    // name, branch,teacherId, email
                    response.data.data.map((s) => {
                        r.push(createData(s.name, s.branch, s.id, s.email, s.contact))
                    })
                    setrows(r);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        getAllTeachers();
    }, []);
    return (
        <div>
            <Header />
            <ToastContainer position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto">
                    <div className='mx-[2%]'>
                        <h2 className='text-3xl text-center mb-3'>All Professors</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>

                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Department</StyledTableCell>
                                        <StyledTableCell align="center">Teacher ID</StyledTableCell>
                                        <StyledTableCell align="center">E-mail</StyledTableCell>
                                        <StyledTableCell align="center">Contact No</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.length > 0 && rows.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align='left' component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center" component="th" scope="row">
                                                {row.branch}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.teacherId}</StyledTableCell>
                                            <StyledTableCell align="center">{row.email}</StyledTableCell>
                                            <StyledTableCell align="center">{row.contact}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    {
                                        rows.length == 0 && <h2>No Students Found!!</h2>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default ViewProffessors