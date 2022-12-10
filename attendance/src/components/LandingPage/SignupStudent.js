import React, { useState,useEffect } from 'react'
import { path } from '../../path'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

const axios = require('axios')


const SignupStudent = () => {
    const [name, setname] = useState("");
    const [roll, setroll] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [course, setcourse] = useState("");
    const [dept, setdept] = useState("");
    const [sem, setsem] = useState("");
    const [year, setyear] = useState("");
    const [pwd, setpwd] = useState("");
    const [cpwd, setcpwd] = useState("");
    const navigate= useNavigate();
    const btechDept = [['CSE', 'Computer Science & Engineering'], ['ECE', 'Electronics & Communication Engineering'], ['EEE', 'Electrical & Electronics Engineering'], ['ME', 'Mechanical Engineering'], ['CE', 'Civil Engineering']];
    const mtechDept = [['CSE', 'Computer Science & Engineering'], ['ECE', 'Electronics & Communication Engineering']];
    const handleCourseChange = (e) => {
        setcourse(e.target.value)
        console.log("Course: ", course)
    }
    console.log("body : ", name, roll, course, dept, sem, year, email, pwd, cpwd);
    useEffect(() => {
        if ( localStorage.getItem('token')!=null ) {
            var profileType = localStorage.getItem('type');
            if (profileType=='teacher') {
                navigate('/teacher');
            }
            else if (profileType=='student') {
                navigate('/student');
            }
        }
        
    }, []);
    const handleSubmit =async () => {
        if (name.length && roll.length && course.length && dept.length && sem.length && year.length && email.length && (pwd === cpwd)) {
           
            axios.post(`${path}/registerStudent`, {
                roll: roll,
                name: name,
                email: email,
                contact: contact,
                course: course,
                year: year,
                branch: dept,
                semester: sem,
                password: pwd
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        toast.error(response.data.msg);
                    }
                    else{
                        localStorage.setItem('token',response.data.res);
                        localStorage.setItem('type',"student");
                        toast.success(response.data.msg);
                        setTimeout(() => {
                            navigate('/')
                          }, 2000);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            console.log("please")
            toast.warn("Please fill all the details carefully!!")
        }
        console.log("Handle submit ");
        console.log("Path ", path);

    }
    return (
        <div className=''>
        <Header/>
            <ToastContainer position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

            <div className='flex flex-col justify-center border border-2 shadow-md'>
                <div className=''>
                    <div class="container mx-auto">
                        <div class="flex  justify-center px-6 my-12">
                            <div class="w-[80%] ">
                                <div class=" bg-white p-5 rounded-lg lg:rounded-l-none">
                                    <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
                                    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                        <div class="mb-4 md:flex md:justify-between">
                                            <div class="mb-4 md:mr-2 md:mb-0 w-1/2">
                                                <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                                    Roll Number
                                                </label>
                                                <input
                                                    required
                                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="roll"
                                                    name='roll'
                                                    type="text"
                                                    value={roll}
                                                    onChange={(e) => {
                                                        setroll(e.target.value);
                                                    }}
                                                    placeholder="e.g. B200060CS"
                                                />
                                            </div>
                                            <div class="md:ml-2 w-1/2">
                                                <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="lastName">
                                                    Name
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    required
                                                    id="name"
                                                    name='name'
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => {
                                                        setname(e.target.value);
                                                    }}
                                                    placeholder="Name"
                                                />
                                            </div>
                                        </div>
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
                                                    <option value="1">1st Year</option>
                                                    <option value="2">2nd Year</option>
                                                    <option value="3">3rd Year</option>
                                                    <option value="4">4th Year</option>
                                                </select>
                                            </div>
                                            <div class="mb-4 md:mr-2 md:mb-0 w-1/2">
                                                <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                                    Semester
                                                </label>
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
                                        <div class="mb-4  md:flex md:justify-between">
                                            <div className='mb-4 md:mr-2 md:mb-0 w-1/2'>
                                                <label class="block mb-2 text-sm font-bold flex justify-start text-gray-700" for="email">
                                                    Email
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="email"
                                                    required
                                                    type="email"
                                                    value={email}
                                                    name='email'
                                                    onChange={(e) => {
                                                        setemail(e.target.value);
                                                    }}
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div class="md:ml-2 w-1/2">
                                                <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="lastName">
                                                    Contact Number
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    required
                                                    id="contact"
                                                    name='contact'
                                                    type="text"
                                                    value={contact}
                                                    onChange={(e) => {
                                                        setcontact(e.target.value);
                                                    }}
                                                    placeholder="Contact number"
                                                />
                                            </div>
                                        </div>
                                        <div class="mb-4 md:flex md:justify-between">
                                            <div class="mb-4 md:mr-2 md:mb-0 w-1/2">
                                                <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="password">
                                                    Password
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="password"
                                                    type="password"
                                                    name='pwd'
                                                    onChange={(e) => {
                                                        setpwd(e.target.value);
                                                    }}
                                                    required
                                                    placeholder="password"
                                                />
                                                <p class="text-xs italic text-red-500">Please choose a password.</p>
                                            </div>
                                            <div class="md:ml-2 w-1/2">
                                                <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="c_password">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="c_password"
                                                    type="password"
                                                    required
                                                    name='cpwd'
                                                    onChange={(e) => {
                                                        setcpwd(e.target.value);
                                                    }}
                                                    placeholder="Re-enter password"
                                                />
                                            </div>
                                        </div>
                                        <div class="mb-6 text-center">
                                            <button
                                                class=" px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                                type="button"
                                                onClick={handleSubmit}
                                            >
                                                Register Account
                                            </button>
                                        </div>
                                        <hr class="mb-6 border-t" />
                                        <div class="text-center">
                                            <a
                                                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                                href="#"
                                            >
                                                Forgot Password?
                                            </a>
                                        </div>
                                        <div class="text-center">
                                            <a
                                                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                                href="./index.html"
                                            >
                                                Already have an account? Login!
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupStudent