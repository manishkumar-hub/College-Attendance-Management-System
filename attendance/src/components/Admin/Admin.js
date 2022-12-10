import React, { useEffect } from 'react'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom';


const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token') == null || localStorage.getItem('type') !== 'admin') {
      navigate('/adminLogin');
    }
  }, []);

  const getAllSubj = async ()=>{
    
  }
  useEffect(() => {
    
   
  }, []);
  return (
    <div>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Welcome Admin </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>
          <div className="flex flex-wrap">
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 hover:cursor-pointer hover:bg-slate-200" onClick={() => {
              navigate('/viewProff')
            }}>
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">View Professors</h2>
              <p className="leading-relaxed text-base mb-4">View details of professors</p>
              <a className="text-indigo-500 inline-flex items-center hover:cursor-pointer">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a> 
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 hover:cursor-pointer hover:bg-slate-200" onClick={() => {
              navigate('/viewStudents')
            }}>
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">View Students</h2>
              <p className="leading-relaxed text-base mb-4">View details of Students</p>
              <a className="text-indigo-500 inline-flex items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a> 
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 hover:cursor-pointer hover:bg-slate-200" onClick={() => {
              navigate('/viewAttendAdm')
            }}>
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Attendance</h2>
              <p className="leading-relaxed text-base mb-4">View and update Attendance Records </p>
              <a className="text-indigo-500 inline-flex items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 hover:cursor-pointer hover:bg-slate-200" onClick={() => {
              navigate('/viewSubjs')
            }}>
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Manage Subjects</h2>
              <p className="leading-relaxed text-base mb-4">Add / Update/ Remove Subjects</p>
              <a className="text-indigo-500 inline-flex items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
         
        </div>
      </section>
    </div>
  )
}

export default Admin