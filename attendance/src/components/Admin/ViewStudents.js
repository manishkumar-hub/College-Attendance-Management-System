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

function createData(roll, name, course, year, sem, branch, email) {
    return { roll, name, course, year, sem, branch, email };
}

const ViewStudents = () => {
    const [course, setcourse] = useState("");
    const [dept, setdept] = useState("");
    const [year, setyear] = useState("");
    const [subjects, setsubjects] = useState([]);
    const [students, setstudents] = useState([]);
    const [rows, setrows] = useState([]);


    const btechyear = [['1', '1st Year'], ['2', '2nd Year'], ['3', '3rd Year'], ['4', '4th Year']];
    const mtechyear = [['1', '1st Year'], ['2', '2nd Year']];
    const btechDept = [['CSE', 'Computer Science & Engineering'], ['ECE', 'Electronics & Communication Engineering'], ['EEE', 'Electrical & Electronics Engineering'], ['ME', 'Mechanical Engineering'], ['CE', 'Civil Engineering']];
    const mtechDept = [['CSE', 'Computer Science & Engineering'], ['ECE', 'Electronics & Communication Engineering']];
    const handleCourseChange = (e) => {
        setcourse(e.target.value)
        console.log("Course: ", course)
    }
    const handleYearChange = (e) => {
        setyear(e.target.value);
        console.log("year: ", year);
        // getSubjListByCourseYear();
    }
    const getStudentsCourseYear = async () => {
        console.log("c: ", course, " year: ", year);
        await axios.post(`${path}/getStudentsCourseAndyear`, {
            course: course,
            year: year,
            branch: dept
        })
            .then(function (response) {
                console.log("Res: ", response);
                if (response.status == 203) {
                    // toast.error(response.data.msg);
                    setrows([])
                }
                else {
                    console.log("resp stud : ", response);
                    // setrows(response.data.data)
                    var r = [];
                    // roll,name,course, year,sem,branch,email
                    response.data.data.map((s) => {
                        r.push(createData(s.roll, s.name, s.course, s.year, s.semester, s.branch, s.email))
                    })
                    setrows(r);
                    console.log("students : ", subjects);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
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
                    <div className=" bg-white p-5 rounded-lg lg:rounded-l-none">
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">

                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0 w-1/3">
                                    <label className="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                        Course
                                    </label>
                                    <select name="" className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' id="course" value={course} onChange={handleCourseChange} required>
                                        <option >Select Course</option>
                                        <option value="btech">B-tech </option>
                                        <option value="mtech">M-tech</option>
                                    </select>
                                </div>
                                <div class="mb-4 md:mr-2 md:mb-0 w-1/3">
                                    <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                        Department
                                    </label>
                                    <select required id="dept"
                                        name='dept'
                                        value={dept}
                                        onChange={(e) => {
                                            setdept(e.target.value);
                                        }}
                                        className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>
                                        <option >Select branch</option>
                                        {
                                            course == 'btech' && btechDept.map((dept) => {
                                                return <option value={dept[0]}>{dept[1]}</option>
                                            })
                                        }
                                        {
                                            course == 'mtech' && mtechDept.map((dept) => {
                                                return <option value={dept[0]}>{dept[1]}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-4 md:mr-2 md:mb-0 w-1/3">
                                    <label className="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                        Year
                                    </label>
                                    <select required
                                        id="year"
                                        name='year'
                                        value={year}
                                        onChange={(e) => {
                                            handleYearChange(e);
                                        }}
                                        className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>
                                        <option >Select Year</option>
                                        {
                                            console.log("course: ", course)
                                        }
                                        {
                                            course == "btech" && btechyear.map((y) => {
                                                return <option value={y[0]}>{y[1]}</option>
                                            })
                                        }
                                        {
                                            course == "mtech" && mtechyear.map((y) => {
                                                return <option value={y[0]}>{y[1]}</option>
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="mb-4 md:mr-2 md:mb-0 w-1/2 flex align-middle py-4">
                                    <div className='border-2 rounded-2xl border-slate-400 flex align-middle p-2  bg-blue-500 hover:bg-blue-700 cursor-pointer' onClick={getStudentsCourseYear}>
                                        <div className='text-white'>View Students </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='mx-[2%]'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Roll No</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Course</StyledTableCell>
                                        <StyledTableCell align="center">Year</StyledTableCell>
                                        <StyledTableCell align="center">Semester</StyledTableCell>
                                        <StyledTableCell align="center">Branch</StyledTableCell>
                                        <StyledTableCell align="center">Email</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.length > 0 && rows.map((row) => (
                                        <StyledTableRow key={row.roll}>
                                            <StyledTableCell align='left' component="th" scope="row">
                                                {row.roll}
                                            </StyledTableCell>
                                            <StyledTableCell align="center" component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.course}</StyledTableCell>
                                            <StyledTableCell align="center">{row.year}</StyledTableCell>
                                            <StyledTableCell align="center">{row.sem}</StyledTableCell>
                                            <StyledTableCell align="center">{row.branch}</StyledTableCell>
                                            <StyledTableCell align="center">{row.email}</StyledTableCell>
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

export default ViewStudents