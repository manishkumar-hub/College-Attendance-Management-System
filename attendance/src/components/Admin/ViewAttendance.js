import React, { useState, useEffect } from 'react'
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';
import { path } from '../../path'

const axios = require('axios')

const ViewAttendanceAdm = () => {
    const navigate = useNavigate();
    const [course, setcourse] = useState("");
    const [dept, setdept] = useState("");
    const [year, setyear] = useState("");
    const [subjects, setsubjects] = useState([]);
    const [students, setstudents] = useState([]);
    const [subject, setsubject] = useState("");

    const btechyear = [['1', '1st Year'], ['2', '2nd Year'], ['3', '3rd Year'], ['4', '4th Year']];
    const mtechyear = [['1', '1st Year'], ['2', '2nd Year']];
    const handleCourseChange = (e) => {
        setcourse(e.target.value)
        console.log("Course: ", course)
    }
    const handleYearChange = (e) => {
        setyear(e.target.value);
        console.log("year: ", year);
        // getSubjListByCourseYear();
    }

    const getSubjList = async () => {
        await axios.post(`${path}/getAllSubj`)
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

    const getSubjListByCourseYear = async () => {
        console.log("c: ", course, " year: ", year);
        await axios.post(`${path}/getSubjByCourseAndyear`, {
            course: course,
            year: year
        })
            .then(function (response) {
                console.log("Res: ", response);
                if (response.status == 203) {
                    // toast.error(response.data.msg);
                    setsubjects([])
                }
                else {
                    console.log("resp subj: ", response);
                    setsubjects(response.data.data)
                    console.log("subjects: ", subjects);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        getSubjList();
    }, []);
    return (
        <div>
            <Header />
            <div className="container mx-auto">
                <div className="flex  justify-center px-6">
                    <div className="w-[80%] ">
                        <h3 className="pt-4 text-2xl text-center font-bold">View Attendance </h3>
                        <div className=" bg-white p-5 rounded-lg lg:rounded-l-none">
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
                                        <div className='border-2 rounded-2xl border-slate-400 flex align-middle p-2  bg-blue-500 hover:bg-blue-700 cursor-pointer' onClick={getSubjListByCourseYear}>
                                            <div className='text-white'>Get Subjects </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="flex flex-wrap -m-2">
                            {
                                subjects.map((s) => {
                                    return <div class="p-2 lg:w-1/3 md:w-1/2 w-full"   >
                                        <a href="/viewSubjectAttend" onClick={() => {
                                            navigate('/viewSubjectAttend', {
                                                state: {
                                                    subject: s,
                                                }
                                            })
                                        }}  >
                                            <div class="h-full flex items-center border-gray-200 border-2 hover:cursor-pointer p-4 rounded-lg hover:shadow-lg shadow-slate-300">
                                                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRAlBPmsRECoTvlQKFoT3uT5P9xGYGmaYkRM3lYpDGgMH4kLet6VLilfda76yIPRKq5_Q&usqp=CAU" />
                                                <div class="flex-grow">
                                                    <p class="text-gray-500">{s.code}</p>
                                                    <h2 class="text-gray-900 title-font font-medium">{s.name}</h2>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAttendanceAdm