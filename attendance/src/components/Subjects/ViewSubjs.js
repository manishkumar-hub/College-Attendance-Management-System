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

function createData(Subject, Subj_Code, Faculty_ID, Course, Year, Branch, Sem, id) {
    return { Subject, Subj_Code, Course, Faculty_ID, Year, Branch, Sem, id };
}

const ViewSubjs = () => {
    const [open, setOpen] = React.useState(false);
    const [sname, setsname] = useState("");
    const [scode, setscode] = useState("");
    const [facID, setfacId] = useState("");
    const [course, setcourse] = useState("");
    const [dept, setdept] = useState("");
    const [sem, setsem] = useState("");
    const [year, setyear] = useState("");
    const [rows, setrows] = useState([]);
    const [openUpdateDialog, setopenUpdateDialog] = useState(false);
    const [updateSubjId, setupdateSubjId] = useState('');


    const btechDept = [['CSE', 'Computer Science & Engineering'], ['ECE', 'Electronics & Communication Engineering'], ['EEE', 'Electrical & Electronics Engineering'], ['ME', 'Mechanical Engineering'], ['CE', 'Civil Engineering']];
    const mtechDept = [['CSE', 'Computer Science & Engineering'], ['ECE', 'Electronics & Communication Engineering']];
    const handleCourseChange = (e) => {
        setcourse(e.target.value)
        console.log("Course: ", course)
    }
    const handleOpenUpdateDialog = (s) => {
        console.log("update s: ", s);
        setupdateSubjId(s.id)
        setsname(s.Subject);
        setscode(s.Subj_Code);
        setfacId(s.Faculty_ID);
        setcourse(s.Course);
        setdept(s.Branch);
        setsem(s.Sem);
        setyear(s.Year);
        setupdateSubjId(s.id);
        setopenUpdateDialog(true);
    }
    const handleSubmit = async () => {
        if (sname.length && scode.length && course.length && dept.length && sem.length && year.length && facID.length) {

            axios.post(`${path}/addSubj`, {
                code: scode,
                name: sname,
                course: course,
                branch: dept,
                year: year,
                semester: sem,
                teacher_id: facID,
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        toast.error(response.data.msg);
                    }
                    else {
                        toast.success(response.data.msg);
                        setTimeout(() => {
                            handleClose();
                            getAllSubj()
                            // navigate('/')
                        }, 1000);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            toast.warn("Please fill all the details carefully!!")
        }
        console.log("Handle submit ");
        console.log("Path ", path);

    }
    const handleUpdateSubmit = async () => {
        console.log("upd sub :", sem.length, year.length, facID.length)
        if (sname.length && scode.length && course.length && dept.length && sem.length && year.length && facID.length) {
            axios.post(`${path}/updateSubj`, {
                id: updateSubjId,
                code: scode,
                name: sname,
                course: course,
                branch: dept,
                year: year,
                semester: sem,
                teacher_id: facID,
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        toast.error(response.data.msg);
                    }
                    else {
                        toast.success(response.data.msg);
                        setupdateSubjId("")
                        setsname("");
                        setscode("");
                        setfacId("");
                        setcourse("");
                        setdept("");
                        setsem("");
                        setyear("");
                        setupdateSubjId("");
                        setTimeout(() => {
                            handleClose();
                            getAllSubj()
                            // navigate('/')
                        }, 1000);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            toast.warn("Please fill all the details carefully!!")
        }
    }
    const handleDeleteSubmit = async (id) => {
        if (id) {
            axios.delete(`${path}/deleteSubj`, {
                data: {
                    id: id
                }
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        toast.error(response.data.msg);
                    }
                    else {
                        toast.success(response.data.msg);
                        setTimeout(() => {
                            handleClose();
                            getAllSubj()
                            // navigate('/')
                        }, 1000);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            toast.warn("Opps!! Cannot delete this Subject")
        }
    }
    const getAllSubj = async () => {

        axios.post(`${path}/getAllSubj`, {})
            .then(function (response) {
                console.log("Res: ", response);
                if (response.status == 203) {
                    console.log("No data found!!")
                }
                else {
                    var r = [];
                    console.log("res: ", response.data.data);
                    response.data.data.map((s) => {
                        r.push(createData(s.name, s.code, s.teacher_id, s.course, s.year, s.branch, s.semester, s.id))
                    })
                    setrows(r);
                    console.log("Rows: ", rows)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log("Handle submit ");
        console.log("Path ", path);

    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setopenUpdateDialog(false);
    };

    useEffect(() => {
        getAllSubj();
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
                    <div class="flex flex-row text-center justify-between  mb-20 mx-[2%]">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">All Subjects</h1>
                        <Button className='text-black border border-2 rounded-xl p-3 ' variant="outlined" onClick={handleClickOpen}>
                            Add New Subject
                        </Button>
                    </div>
                    <div className='mx-[2%]'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Subject Name</StyledTableCell>
                                        <StyledTableCell align="right">Subject Code</StyledTableCell>
                                        <StyledTableCell align="right">Faculty ID</StyledTableCell>
                                        <StyledTableCell align="right">Course</StyledTableCell>
                                        <StyledTableCell align="right">Year</StyledTableCell>
                                        <StyledTableCell align="right">Branch</StyledTableCell>
                                        <StyledTableCell align="right">Sem</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.Subject}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.Subj_Code}</StyledTableCell>
                                            <StyledTableCell align="right">{row.Faculty_ID}</StyledTableCell>
                                            <StyledTableCell align="right">{row.Course}</StyledTableCell>
                                            <StyledTableCell align="right">{row.Year}</StyledTableCell>
                                            <StyledTableCell align="right">{row.Branch}</StyledTableCell>
                                            <StyledTableCell align="right">{row.Sem}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <div className='border-2 rounded-2xl border-slate-400 flex justify-center align-middle p-2  bg-blue-500 hover:bg-blue-700 cursor-pointer' onClick={(t) => {
                                                    handleOpenUpdateDialog(row);
                                                }} >
                                                    <div className='text-white text-center'>Update </div>
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <div className='border-2 rounded-2xl border-slate-400 flex justify-center align-middle p-2  bg-red-500 hover:bg-red-700 cursor-pointer' onClick={(e) => {
                                                    handleDeleteSubmit(row.id);
                                                }} >
                                                    <div className='text-white text-center'>Delete </div>
                                                </div>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </div>
            </section>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Subject</DialogTitle>
                    <DialogContent>
                        <form className=" space-y-6" action="#" method="POST" autoComplete="none">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div className='my-1'>
                                    <h2 className='font-semibold'>Subject Name</h2>
                                    <input
                                        name="sname"
                                        type="text"
                                        value={sname}
                                        onChange={(e) => {
                                            setsname(e.target.value);
                                        }}
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g. Operating System"
                                    />
                                </div>
                                <div className='flex flex-row justify-between my-1'>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Subject Code</h2>
                                        <input
                                            name="scode"
                                            type="text"
                                            value={scode}
                                            onChange={(e) => {
                                                setscode(e.target.value);
                                            }}
                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            placeholder="e.g. CS12102"
                                        />
                                    </div>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Faculty ID</h2>
                                        <input
                                            name="facID"
                                            type="text"
                                            value={facID}
                                            onChange={(e) => {
                                                setfacId(e.target.value);
                                            }}
                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Faculty ID"
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between my-1'>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Course</h2>
                                        <select name="" className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' id="course" value={course} onChange={handleCourseChange} required>
                                            <option >Select Course</option>
                                            <option value="btech">B-tech </option>
                                            <option value="mtech">M-tech</option>
                                        </select>
                                    </div>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Select Year</h2>
                                        <select required
                                            id="year"
                                            name='year'
                                            value={year}
                                            onChange={(e) => {
                                                setyear(e.target.value);
                                            }}
                                            className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>
                                            <option >Select Year</option>
                                            <option value="1">1st Year</option>
                                            <option value="2">2nd Year</option>
                                            <option value="3">3rd Year</option>
                                            <option value="4">4th Year</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between my-1'>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Dept</h2>
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
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Semester</h2>
                                        <select required
                                            id="sem"
                                            name='sem'
                                            value={sem}
                                            onChange={(e) => {
                                                setsem(e.target.value);
                                            }}
                                            className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>
                                            <option >Select Semester</option>
                                            <option value="1">1st Sem</option>
                                            <option value="2">2nd Sem</option>
                                            <option value="3">3rd Sem</option>
                                            <option value="4">4th Sem</option>
                                            <option value="5">5th Sem</option>
                                            <option value="6">6th Sem</option>
                                            <option value="7">7th Sem</option>
                                            <option value="8">8th Sem</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={openUpdateDialog} onClose={handleClose}>
                    <DialogTitle>Update Subject</DialogTitle>
                    <DialogContent>
                        <form className=" space-y-6" action="#" method="POST" autoComplete="none">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div className='my-1'>
                                    <h2 className='font-semibold'>Subject Name</h2>
                                    <input
                                        name="sname"
                                        type="text"
                                        value={sname}
                                        onChange={(e) => {
                                            setsname(e.target.value);
                                        }}
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g. Operating System"
                                    />
                                </div>
                                <div className='flex flex-row justify-between my-1'>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Subject Code</h2>
                                        <input
                                            name="scode"
                                            type="text"
                                            value={scode}
                                            onChange={(e) => {
                                                setscode(e.target.value);
                                            }}
                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            placeholder="e.g. CS12102"
                                        />
                                    </div>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Faculty ID</h2>
                                        <input
                                            name="facID"
                                            type="text"
                                            value={facID}
                                            onChange={(e) => {
                                                setfacId(e.target.value);
                                            }}
                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Faculty ID"
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between my-1'>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Course</h2>
                                        <select name="" className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' id="course" value={course} onChange={handleCourseChange} required>
                                            <option >Select Course</option>
                                            <option value="btech">B-tech </option>
                                            <option value="mtech">M-tech</option>
                                        </select>
                                    </div>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Select Year</h2>
                                        <select required
                                            id="year"
                                            name='year'
                                            value={year}
                                            onChange={(e) => {
                                                setyear(e.target.value);
                                            }}
                                            className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>
                                            <option >Select Year</option>
                                            <option value="1">1st Year</option>
                                            <option value="2">2nd Year</option>
                                            <option value="3">3rd Year</option>
                                            <option value="4">4th Year</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between my-1'>
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Dept</h2>
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
                                    <div className='m-1 w-1/2'>
                                        <h2 className='font-semibold'>Semester</h2>
                                        <select required
                                            id="sem"
                                            name='sem'
                                            value={sem}
                                            onChange={(e) => {
                                                setsem(e.target.value);
                                            }}
                                            className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>
                                            <option >Select Semester</option>
                                            <option value="1">1st Sem</option>
                                            <option value="2">2nd Sem</option>
                                            <option value="3">3rd Sem</option>
                                            <option value="4">4th Sem</option>
                                            <option value="5">5th Sem</option>
                                            <option value="6">6th Sem</option>
                                            <option value="7">7th Sem</option>
                                            <option value="8">8th Sem</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleUpdateSubmit}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )
}

export default ViewSubjs