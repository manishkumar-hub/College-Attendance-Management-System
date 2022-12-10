import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import { path } from '../../path'

const axios = require('axios')

const ViewStudAtten = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [atendstatus, setatendtsatus] = useState("");
    const [updId, setupdId] = useState("");

    console.log("stude prop: ", location.state.student)
    const student = location.state.student;
    const [attendance, setattendance] = useState(student.attendance);
    const subj = location.state.subject;


    var beg = new Date(attendance[attendance.length - 1].date), end = new Date(attendance[0].date);
    const beginDate = beg.toLocaleDateString('en-GB');
    const endDate = end.toLocaleDateString('en-GB');
    var p = 0, a = 0, l = 0, perc = 0;
    (attendance).forEach((e) => {
        if (e.status == 'present') {
            p = p + 1;
        }
        else if (e.status == 'absent') {
            a = a + 1;
        }
        else {
            l = l + 1;
        }
    })
    perc = p / (p + a + l) * 100;
    var sn = 1;

    const handleUpdateSubmit = async () => {
        console.log("id: stat : ", updId, atendstatus)
        if (atendstatus.length) {
            axios.post(`${path}/updateAttendance`, {
                id: updId,
                status: atendstatus,
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        toast.error(response.data.msg);
                    }
                    else {
                        console.log("resp: ", response);
                        toast.success(response.data.msg);
                        var t = attendance;
                        var x = t.find((a) => {
                            if (a.id == updId) {
                                return true;
                            }
                        });
                        x.status = atendstatus;
                        console.log("x: ", x)
                        console.log("t: ", t)
                        setattendance(t);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            handleClose();
        }
        else {
            console.log("please fill")
            toast.warn("Please fill all the details carefully!!")
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {

    }, [attendance]);
    return (
        <div>
            <ToastContainer position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
            <Header />
            <div>
                <div className='container mx-auto '>
                    <div className='flex  justify-center px-6'>
                        <div className='flex flex-row justify-evenly w-[80%]'>
                            <h1 className='text-3xl font-bold'>Attendance Records</h1>
                        </div>
                    </div>
                    <br /><br />
                </div>
                <div className='container mx-auto '>
                    <div className='flex flex-col justify-center px-6 border border-2 rounded-2xl w-[80%] ml-[10%]'>
                        <div className='flex flex-row justify-evenly  my-1'>
                            <h2 className='font-semibold' >Name : {student.name}</h2>
                            <h2 className='font-semibold' >Roll no:  : {student.roll}  </h2>
                        </div>
                        <hr />
                        <div className='flex flex-row justify-evenly  my-1'>
                            <h2 className='font-semibold' >Subject : {subj}</h2>
                            <h2 className='font-semibold' >Total Working Days : {attendance.length}  </h2>
                            <h2 className='font-semibold' > Date : {beginDate} to {endDate}   </h2>
                        </div>

                    </div>
                    <br />
                    <br />
                    <br />
                </div>
                <div className="container mx-auto">
                    <div className="flex  justify-center px-6">
                        <div className="w-[80%] ">
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full">
                                                <thead className="bg-white border-b ">
                                                    <tr className=''>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            S.No
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            Date
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        attendance.map((a) => {
                                                            return <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:cursor-pointer">
                                                                    {sn++}
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        (new Date(a.date).toLocaleDateString('en-GB'))
                                                                    }
                                                                </td>
                                                                <td className="text- text-gray-900  px-6 py-4 whitespace-nowrap">
                                                                    {a.status}
                                                                </td>
                                                                <td className="text- text-gray-900  px-6 py-4 whitespace-nowrap">
                                                                    <button onClick={() => {
                                                                        setupdId(a.id);
                                                                        handleClickOpen();
                                                                    }} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                                        Update
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        })

                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Update Attendance </DialogTitle>
                        <DialogContent>
                            <form className=" space-y-6" action="#" method="POST" autoComplete="none">
                                <div className=''>
                                    <h2 className='font-semibold'>Select Status</h2>
                                    <select required
                                        value={atendstatus}
                                        onChange={(e) => {
                                            setatendtsatus(e.target.value);
                                        }}
                                        className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>
                                        <option >Select Status</option>
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                        <option value="leave">Leave</option>
                                    </select>
                                </div>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleUpdateSubmit} >Update</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default ViewStudAtten