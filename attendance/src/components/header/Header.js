import React, { useState, useEffect } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  var profileType = localStorage.getItem('type');
  useEffect(() => {
    profileType = localStorage.getItem('type');
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    navigate('/');
  }
  return (
    <div>
      <header className="text-gray-600 body-font shadow-amber-50 border border-b-2 bg-slate-600 text-white">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center mb-4 md:mb-0">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3qXY4VJj3fsF0K7YdWNabC5Gn_UZvmZxzigSazHKXvRIGOOkm1J2GaVuN9uDadwp-nTo&usqp=CAU" alt="" className='w-12 h-12 rounded-3xl' />
            <div className='flex flex-col'>
            <a href='/' className='hover:cursor-pointer flex flex-col'>
            <div className="ml-3 text-xl no-underline">Student Attendance Management System</div>
            </a>
            <h2 className='ml-3 text-green-500'>National Institute Of Technology Sikkim</h2>
            </div>
          </a>
          {
            profileType == "student" && <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            </nav>
          }
          {
            profileType == "teacher" && <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <a className='mr-5 hover:text-gray-900 hover:cursor-pointer hover:text-blue-600' href='/takeAttendance'>Take Attendance</a>
              <a href='/viewAttendance' className='mr-5 hover:text-gray-900 hover:cursor-pointer hover:text-blue-600 '>View Attendance</a>
            </nav>
          }
          {
            profileType == "admin" && <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <a className='mr-5 hover:text-gray-900 hover:cursor-pointer hover:text-blue-600' href='/viewStudents'>Students</a>
              <a className='mr-5 hover:text-gray-900 hover:cursor-pointer hover:text-blue-600 ' href='/viewProff'>Faculty</a>
              <a className='mr-5 hover:text-gray-900 hover:cursor-pointer hover:text-blue-600' href='/viewAttendAdm'>Attendance</a>
            </nav>
          }
          {
            profileType && <button onClick={handleLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 text-slate-800 md:mt-0 hover:text-red-600"> Logout
              <LogoutIcon fontSize='small' />
            </button>
          }

        </div>
      </header>
    </div>
  )
}

export default Header