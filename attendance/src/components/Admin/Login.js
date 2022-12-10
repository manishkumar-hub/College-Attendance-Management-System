import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Link from '@mui/material/Link';
import { path } from '../../path'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

const axios = require('axios')

const AdminLogin = () => {
    const [userName, setuserName] = useState("");
    const [Pwd, setPwd] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (userName.length && Pwd.length) {
            axios.post(`${path}/loginAdmin`, {
                username: userName,
                password: Pwd
            })
                .then(function (response) {
                    console.log("Res: ", response);
                    if (response.status == 203) {
                        toast.error(response.data.msg);
                    }
                    else {
                        toast.success(response.data.msg);
                        localStorage.setItem('token', response.data.data);
                        localStorage.setItem('type', "admin");
                        setTimeout(() => {
                            navigate('/admin')
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
        // console.log("Handle submit ");
        // console.log("Path ", path);
    }
    return (
        <div>
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
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-[0%] px-[5%]">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Log In
                        </h2>
                    </div>
                    <form className=" space-y-6" action="#" method="POST" autoComplete="none">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Username
                                </label>
                                <input
                                    name="roll"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => {
                                        setuserName(e.target.value);
                                    }}
                                    autoComplete="off"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={Pwd}
                                    name='pwd'
                                    onChange={(e) => {
                                        setPwd(e.target.value);
                                    }}
                                    autoComplete="none"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleLogin}
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                                </span>
                                Sign in
                            </button>
                        </div>
                        <h2>Don't have an account?  <Link href='/registerStudent'>Register Now</Link></h2>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin