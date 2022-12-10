import React, { useEffect } from 'react'
import Header from '../header/Header'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';


const Teacher = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token') == null || localStorage.getItem('type') !== 'teacher') {
      navigate('/login');
    }

  }, []);
  return (
    <div>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Dashboard</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Welcome to the Student Attendance Management Portal </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">A complete digital solution to maintain record of attendance</p>
          </div>
          <div className="flex flex-wrap">
            <div className="xl:w-1/2 lg:w-1/2 md:w-full  px-8 py-6  border-l-2 border-gray-200 hover:shadow-xl hover:bg-slate-300 border-opacity-60 hover:cursor-pointer flex flex-col justify-center">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2 text-center">View Attendance</h2>
              <p className="leading-relaxed text-center mb-4">View and Delete Attendance records</p>
              <a className="text-indigo-500 inline-flex items-center hover:cursor-pointer" href='/viewAttendance'>
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </a>
            </div>
            <div
              className="xl:w-1/2 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 hover:cursor-pointer flex flex-col justify-center hover:shadow-xl hover:bg-slate-300 ">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2 text-center">Take Attendance</h2>
              <p className="leading-relaxed text-center mb-4">Take Subject Wise Attendance</p>
              <a className="text-indigo-500 inline-flex items-center" href='/takeAttendance'>
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </a>
            </div>

          </div>

        </div>
      </section>
      <div className='mt-8'>
        <Footer />
      </div>
    </div>
  )
}

export default Teacher