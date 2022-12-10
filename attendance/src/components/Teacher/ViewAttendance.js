import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { path } from '../../path'
import jwt_decode from "jwt-decode";
import Footer from '../Footer/Footer';

const axios = require('axios')

const ViewAttendance = () => {
    const [course, setcourse] = useState("");
    const [dept, setdept] = useState("");
    const [year, setyear] = useState("");
    const [subjects, setsubjects] = useState([]);
    const [students, setstudents] = useState([]);
    const [subject, setsubject] = useState("");
    const [subjectName, setsubjectName] = useState("");
    const [showRecord, setshowRecord] = useState(false);
    const [beginDate, setbeginDate] = useState();
    const [endDate, setendDate] = useState();



    const navigate = useNavigate();
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        var teacher = jwt_decode(token);
    }
    
    // dfk

    const btechyear = [['1', '1st Year'], ['2', '2nd Year'], ['3', '3rd Year'], ['4', '4th Year']];
    const mtechyear = [['1', '1st Year'], ['2', '2nd Year']];
    const handleCourseChange = (e) => {
        setcourse(e.target.value)
        // console.log("Course: ", course)
    }
    const getSubjListByYear = async () => {
        if (course.length && year.length) {

            axios.post(`${path}/getSubjByYear`, {
                course: course,
                year: year,
                teacher_id: teacher.id
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        // toast.error(response.data.msg);
                        setsubjects([])
                    }
                    else {
                        console.log("resp: ", response);
                        setsubjects(response.data.data)
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
    const getAttendanceBySubject = async () => {
        if (course.length && year.length) {
            axios.post(`${path}/getAttendanceBySubject`, {
                course: course,
                year: year,
                subject: subject
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
            
        }
        console.log("Handle submit ");
        console.log("Path ", path);
    }
    useEffect(() => {
        getSubjListByYear();
    }, [year]);

    useEffect(() => {
        getAttendanceBySubject();
    }, [subject]);
    useEffect(() => {
        console.log("token: ", localStorage.getItem('token'))
        if (localStorage.getItem('token') == null || localStorage.getItem('type') !== 'teacher') {
            navigate('/');
        }
    }, []);
    return (
        <div>
            <Header />

            <div className="container mx-auto">
                <div className="flex  justify-center px-6">
                    <div className="w-[80%] ">
                        <div className=" bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">View Attendance </h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">

                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0 w-1/2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                            Course
                                        </label>
                                        <select name="" className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' id="course" value={course} onChange={handleCourseChange} required>
                                            <option >Select Course</option>
                                            <option value="btech">B-tech </option>
                                            <option value="mtech">M-tech</option>
                                        </select>
                                    </div>


                                    <div className="mb-4 md:mr-2 md:mb-0 w-1/2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                            Year
                                        </label>
                                        <select required
                                            id="year"
                                            name='year'
                                            value={year}
                                            onChange={(e) => {
                                                setyear(e.target.value);
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
                                    <div className="mb-4 md:mr-2 md:mb-0 w-1/2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                            Choose Subject
                                        </label>
                                        <select required
                                            id="subject"
                                            name='subject'
                                            value={subject}
                                            onChange={(e) => {
                                                setsubject(e.target.value);
                                                var sub = subjects.find((s) => {
                                                    if (s.code == e.target.value) {
                                                        return true;
                                                    }
                                                }).name;
                                                setsubjectName(sub)
                                            }}
                                            className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>
                                            <option >Select Subject</option>
                                            {
                                                subjects.map((s) => {
                                                    return <option value={s.code} >{s.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
                            <h2 className='font-semibold' >Subject : {subjectName}</h2>
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
                                                                            subject: subjectName
                                                                        }
                                                                    })
                                                                }} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:cursor-pointer">

                                                                    {st.roll}

                                                                </td>
                                                                <td onClick={() => {
                                                                    navigate('/viewStudAtten', {
                                                                        state: {
                                                                            student: st,
                                                                            subject: subjectName
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

export default ViewAttendance