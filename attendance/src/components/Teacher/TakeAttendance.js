import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { path } from '../../path'
import jwt_decode from "jwt-decode";
import Footer from '../Footer/Footer';

const axios = require('axios')

var attendance = [];
var p = 0, ab = 0, l = 0;
const TakeAttendance = () => {

    const [course, setcourse] = useState("");
    const [dept, setdept] = useState("");
    const [year, setyear] = useState("");
    const [subjects, setsubjects] = useState([]);
    const [students, setstudents] = useState([]);
    const [subject, setsubject] = useState("");
    const [showRecord, setshowRecord] = useState(false);



    const token = localStorage.getItem('token');
    var teacher;
    const navigate = useNavigate();
    const getTeacherFromToken = () => {
        console.log("token in take:", token)
        // if (token!=null) {   
        console.log("token : ", token)
        teacher = jwt_decode(token);
        console.log("Teacher : ", teacher)
        // }
    }

    useEffect(() => {
        getTeacherFromToken();
    }, [year]);
    console.log("Decode: ", teacher)

    const btechyear = [['1', '1st Year'], ['2', '2nd Year'], ['3', '3rd Year'], ['4', '4th Year']];
    const mtechyear = [['1', '1st Year'], ['2', '2nd Year']];
    const handleCourseChange = (e) => {
        setcourse(e.target.value)
        console.log("Course: ", course)
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
    const getStudentsBySubject = async () => {
        var sub = subjects.find((s) => {
            return s.code == subject;
        })
        console.log("sub : ", sub);
        if (sub) {
            axios.post(`${path}/getStudentsBySubject`, sub)
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        // toast.error(response.data.msg);
                        setsubjects([])
                    }
                    else {
                        console.log("resp: ", response);
                        setstudents(response.data.data);
                        (response.data.data).map((s) => {
                            attendance.push({ "roll": s.roll, "status": "absent" })
                        })
                        // console.log("attendance arr: ",attendance)
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
    // console.log("Date: ",(new Date()).toISOString().split('T')[0])
    const handleAttendanceSubmit = async () => {
        var sub = subjects.find((s) => {
            return s.code == subject;
        })
        if (attendance.length) {
            axios.post(`${path}/takeAttendance`, {
                "subject": sub.code,
                "year": sub.year,
                "semester": sub.semester,
                "attendance": attendance
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        toast.error(response.data.msg);
                    }
                    else {
                        console.log("resp: ", response);
                        toast.success(response.data.msg);
                        // console.log("attendance arr: ",attendance)

                        for (let i = 0; i < attendance.length; i++) {
                            if (attendance[i].status == 'present') {
                                p = p + 1;
                            }
                            else if (attendance[i].status == 'absent') {
                                ab = ab + 1;
                            }
                        }
                        l = attendance.length - p - ab;
                        setshowRecord(true);
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
        getSubjListByYear();
    }, [year]);

    useEffect(() => {
        getStudentsBySubject();
    }, [subject]);
    useEffect(() => {
        console.log("token: ", localStorage.getItem('token'))
        if (localStorage.getItem('token') == null || localStorage.getItem('type') !== 'teacher') {
            navigate('/');
        }
    }, []);
    const selectOnlyThis = (e, roll) => {
        var myCheckbox = document.getElementsByName(roll);
        Array.prototype.forEach.call(myCheckbox, function (el) {
            el.checked = false;
        });
        e.target.checked = true;
        // console.log("roll :",roll)
        // console.log(" bef Attendance : ",attendance);
        var i = attendance.findIndex((e) => {
            // console.log("e: ",e)
            if (e.roll == roll) {
                return true;
            }
        })
        // console.log("i:",i)
        attendance[i].status = e.target.value;
        // console.log("Attendance : ",attendance);
    }
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
            <div class="container mx-auto">
                <div class="flex  justify-center px-6">
                    <div class="w-[80%] ">
                        <div class=" bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 class="pt-4 text-2xl text-center">Select Subject </h3>
                            <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">

                                <div class="mb-4 md:flex md:justify-between">
                                    <div class="mb-4 md:mr-2 md:mb-0 w-1/2">
                                        <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                            Course
                                        </label>
                                        <select name="" className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' id="course" value={course} onChange={handleCourseChange} required>
                                            <option >Select Course</option>
                                            <option value="btech">B-tech </option>
                                            <option value="mtech">M-tech</option>
                                        </select>
                                    </div>


                                    <div class="mb-4 md:mr-2 md:mb-0 w-1/2">
                                        <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
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
                                    <div class="mb-4 md:mr-2 md:mb-0 w-1/2">
                                        <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                            Choose Subject
                                        </label>
                                        <select required
                                            id="subject"
                                            name='subject'
                                            value={subject}
                                            onChange={(e) => {
                                                setsubject(e.target.value);
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
            {
                students.length > 0 && <div class="container mx-auto xl:w-[80%]">
                    <div class="flex  justify-center px-6 ">
                        <div class="md:w-[100%] ">
                            <div class=" bg-white p-5 rounded-lg lg:rounded-l-none">
                                <h3 class="pt-4 text-2xl text-center">Attendance List </h3>
                                <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                    {
                                        students.map((st) => {
                                            return <div>  <div class="mb-4 md:mr-2 md:mb-2  flex flex-row items-center">
                                                <h2>{st.roll}</h2>
                                                <h2 className='w-1/2 ml-2 text-left'>{st.name}</h2>
                                                <div class="flex justify-between w-1/2">
                                                    <div class="form-check form-check-inline flex flex-row justify-between">
                                                        <h3>Present &nbsp; </h3>
                                                        <input type="checkbox" name={st.roll} value="present" onClick={(e) => {
                                                            selectOnlyThis(e, st.roll)
                                                        }
                                                        }
                                                        />
                                                    </div>
                                                    <div class="form-check form-check-inline flex flex-row">
                                                        <h3>Absent &nbsp;  </h3>
                                                        <input type="checkbox" name={st.roll} value="absent" onClick={(e) => {
                                                            selectOnlyThis(e, st.roll)
                                                        }
                                                        } />
                                                    </div>
                                                    <div class="form-check form-check-inline flex flex-row">
                                                        <h3>Leave &nbsp;  </h3>
                                                        <input type="checkbox" name={st.roll} value="leave" onClick={(e) => {
                                                            selectOnlyThis(e, st.roll)
                                                        }
                                                        } />
                                                    </div>
                                                </div>
                                            </div>
                                                <hr />
                                            </div>
                                        })
                                    }


                                    <div class="mb-6 text-center">
                                        <button onClick={handleAttendanceSubmit}
                                            class=" px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="button" >
                                            Take Attendance
                                        </button>
                                    </div>
                                    {

                                        showRecord && <div class="mb-6 text-center">
                                            <h2>Attendance recorded succesfully!</h2>
                                            <h2>Present: {p} Absent : {ab}  Leave : {l}</h2>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default TakeAttendance