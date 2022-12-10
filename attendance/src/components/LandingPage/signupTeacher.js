import React, { useState ,useEffect } from 'react'
import { path } from '../../path'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';


const axios = require('axios')



const SignupTeacher = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [dept, setdept] = useState("");
    const [pwd, setpwd] = useState("");
    const [cpwd, setcpwd] = useState("");
    const navigate= useNavigate();
    const Dept = [['CSE', 'Computer Science & Engineering'], ['ECE', 'Electronics & Communication Engineering'], ['EEE', 'Electrical & Electronics Engineering'], ['ME', 'Mechanical Engineering'], ['CE', 'Civil Engineering']];

    console.log("body : ", name, dept, email, pwd, cpwd);
    const handleSubmit = () => {
        if (name.length && dept.length && email.length && (pwd === cpwd)) {
            axios.post(`${path}/registerTeacher`, {
                name: name,
                email: email,
                contact: contact,
                branch: dept,
                password: pwd
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        toast.error(response.data.msg);
                    }
                    else{
                        localStorage.setItem('token',response.data.res);
                        localStorage.setItem('type',"teacher");
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
                                                <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="lastName">
                                                    Name
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="name"
                                                    name='name'
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => {
                                                        setname(e.target.value);
                                                    }}
                                                    required
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div class="mb-4 w-1/2 ml-2">
                                                <label class="block mb-2 text-sm font-bold flex justify-start text-gray-700" for="email">
                                                    Email
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    value={email}
                                                    name='email'
                                                    onChange={(e) => {
                                                        setemail(e.target.value);
                                                    }}
                                                    required
                                                    type="email"
                                                    placeholder="Email"
                                                />
                                            </div>
                                        </div>
                                        <div class="mb-4 md:flex md:justify-between">
                                            <div class="mb-4 md:mr-2 md:mb-0 w-1/2">
                                                <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="firstName">
                                                    Department
                                                </label>
                                                <select required
                                                    name='dept'
                                                    value={dept}
                                                    onChange={(e) => {
                                                        setdept(e.target.value);
                                                    }}
                                                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>
                                                    <option >Select Department</option>
                                                    {
                                                        Dept.map((dept) => {
                                                            return <option value={dept[0]}>{dept[1]}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div class="md:ml-2 w-1/2">
                                                <label class="block mb-2 text-sm font-bold text-gray-700 flex justify-start" for="lastName">
                                                    Contact
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="contact"
                                                    name='contact'
                                                    type="text"
                                                    value={contact}
                                                    onChange={(e) => {
                                                        setcontact(e.target.value);
                                                    }}
                                                    required
                                                    placeholder="Contact"
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

export default SignupTeacher