import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import { useLocation } from 'react-router-dom';
import { path } from '../../path'
import { useNavigate } from 'react-router-dom';


const axios = require('axios')

const ViewSubjAttendance = () => {
    const location = useLocation();

    const navigate = useNavigate();
    // console.log("stude prop: ", location.state.student)
    const subject = location.state.subject;
    const [students, setstudents] = useState([]);
    const [beginDate, setbeginDate] = useState();
    const [endDate, setendDate] = useState();

    const getAttendanceBySubject = async () => {
        console.log("Subject : ",subject.subject)
        if (subject) {
            axios.post(`${path}/getAttendanceBySubject`, {
                course: subject.course,
                year: subject.year,
                subject: subject.code
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        // toast.error(response.data.msg);
                    }
                    else {
                        console.log("resp: ", response);
                        setstudents(response.data.data);
                        const st0 = response.data.data[0].attendance;
                        var beg = new Date(st0[st0.length - 1].date), end = new Date(st0[0].date);
                        // console.log("beg end: ",beg.toLocaleDateString(), beg.getDate() ," to ",end) ;
                        setbeginDate(beg.toLocaleDateString('en-GB'));
                        setendDate(end.toLocaleDateString('en-GB'));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            console.log("please fill")
            // toast.warn("Please fill all the details carefully!!")
        }
        console.log("Handle submit ");
        console.log("Path ", path);
    }

    useEffect(() => {
        getAttendanceBySubject();
    }, [subject]);
    useEffect(() => {
        getAttendanceBySubject();
    }, []);
    return (
        <div>
            <Header />
            {students.length > 0 && <div>
                <div className='container mx-auto '>
                    <div className='flex  justify-center px-6'>
                        <div className='flex flex-row justify-evenly w-[80%]'>
                            <h1 className='text-3xl font-bold'>Attendance Records</h1>
                        </div>
                    </div>
                    <br /><br />
                </div>
                <div className='container mx-auto '>
                    <div className='flex  justify-center px-6'>
                        <div className='flex flex-row justify-evenly w-[80%]'>
                            <h2 className='font-semibold' >Subject : {subject.name}</h2>
                            <h2 className='font-semibold' >Total Working Day's : {students[0].attendance.length}  </h2>
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
                                            <table className="min-w-full border border-2 border-black ">
                                                <thead className="bg-white  ">
                                                    <tr className=''>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            Roll Number
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            No. of Present Days
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            No. of Absent Days
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            No. of Leave Taken
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            Attendance(%)
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        students.map((st) => {
                                                            var p = 0, a = 0, l = 0, perc = 0;
                                                            (st.attendance).forEach((e) => {
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
                                                            perc = p / (p + a) * 100;
                                                            return <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                                <td onClick={() => {
                                                                    navigate('/viewStudAtten', {
                                                                        state: {
                                                                            student: st,
                                                                            subject: subject.name
                                                                        }
                                                                    })
                                                                }} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:cursor-pointer">

                                                                    {st.roll}

                                                                </td>
                                                                <td onClick={() => {
                                                                    navigate('/viewStudAtten', {
                                                                        state: {
                                                                            student: st,
                                                                            subject: subject.name
                                                                        }
                                                                    })
                                                                }} className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap hover:cursor-pointer">
                                                                    {st.name}
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {p}
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {a}
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {l}
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {perc}
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ViewSubjAttendance