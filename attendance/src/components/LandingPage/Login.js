import * as React from 'react'
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
import Header from '../header/Header'

const axios = require('axios')



const Login = () => {
  const [value, setValue] = React.useState('1');
  const [roll, setroll] = useState("");
  const [email, setemail] = useState("");
  const [studentPwd, setstudentPwd] = useState("");
  const [teacherPwd, setteacherPwd] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (roll.length && studentPwd.length) {
      axios.post(`${path}/loginStudent`, {
        roll: roll,
        password: studentPwd
      })
        .then(function (response) {
          console.log("Res: ", response);
          if (response.status == 203) {
            toast.error(response.data.msg);
          }
          else {
            toast.success(response.data.msg);
            localStorage.setItem('token', response.data.data);
            localStorage.setItem('type', "student");
            setTimeout(() => {
              navigate('/student')
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
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      var profileType = localStorage.getItem('type');
      if (profileType == 'teacher') {
        navigate('/teacher');
      }
      else if (profileType == 'student') {
        navigate('/student');
      }
      else if (profileType == 'admin') {
        navigate('/admin');
      }
    }

  }, []);
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    if (email.length && teacherPwd.length) {
      axios.post(`${path}/loginTeacher`, {
        email: email,
        password: teacherPwd
      })
        .then(function (response) {
          console.log("Res: ", response);
          if (response.status == 203) {
            toast.error(response.data.msg);
          }
          else {
            toast.success(response.data.msg);
            localStorage.setItem('token', response.data.data);
            localStorage.setItem('type', "teacher");
            setTimeout(() => {
              navigate('/teacher')
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
    <div className=' '>
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
      <div className="flex justify-center  min-h-full items-center  py-12 px-4 sm:px-6 lg:px-8 mt-[0%] px-[5%] bg-center" style={{  
        backgroundImage: "url(" + "https://www.talentproindia.com/wp-content/uploads/2020/11/How-Does-the-Attendance-Management-System-Help-the-Employees.jpg" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} >
        <div className="w-full max-w-md space-y-8 bg-white bg-opacity-85 rounded-2xl">
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
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Student" value="1" className='w-1/2' />
                <Tab label="Teacher" value="2" className='w-1/2' />
              </TabList>
            </Box>
            <TabPanel value="1">
              <form className=" space-y-6" action="#" method="POST" autoComplete="none">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Roll Number
                    </label>
                    <input
                      name="roll"
                      type="text"
                      value={roll}
                      onChange={(e) => {
                        setroll(e.target.value);
                      }}
                      autoComplete="none"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Roll Number"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={studentPwd}
                      name='pwd'
                      onChange={(e) => {
                        setstudentPwd(e.target.value);
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

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleStudentLogin}
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                    </span>
                    Sign in
                  </button>
                </div>
                <h2>Don't have an account?  <Link href='/registerStudent'>Register Now</Link></h2>
              </form>
            </TabPanel>
            <TabPanel value="2">
              <form className=" space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      value={email}
                      name='email'
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      type="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={teacherPwd}
                      name='pwd'
                      onChange={(e) => {
                        setteacherPwd(e.target.value);
                      }}
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

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleTeacherLogin}
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                    </span>
                    Sign in
                  </button>
                </div>
                <h2>Don't have an account?  <Link href='/registerTeacher'>Register Now</Link></h2>

              </form>

            </TabPanel>
          </TabContext>

        </div>
      </div>

    </div>
  )
}

export default Login