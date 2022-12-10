import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import jwt_decode from "jwt-decode";
import { path } from '../../path'
import { useNavigate } from 'react-router-dom';

const axios = require('axios')

const Student = () => {
  const navigate = useNavigate();
  const [subjects, setsubjects] = useState([]);
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    var student = jwt_decode(token);
    console.log("std: ", student)
  }
  const getSubjList = async () => {
    if (student) {

      axios.post(`${path}/getSubjects`, {
        course: student.course,
        year: student.year,
        semester: student.semester,
        branch: student.branch
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
  useEffect(() => {
    getSubjList();
  }, []);
  return (
    <div className=''>
      <Header />
      <br />
      <section class="text-gray-600 body-font ">
        <div class="container px-5  mx-auto lg:w-[80%]">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-gray-900">Dashboard</h1>
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Welcome <span className='text-red-600'> {student.name}</span></h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>
          <div class="flex flex-wrap -m-2 ">
            {
              subjects.map((s) => {
                return <div class="p-2 lg:w-1/3 md:w-1/2 w-full "   >
                  <a href="/subjattendance" onClick={()=>{
                    navigate('/subjattendance',{state:{
                        student: student ,
                        subject : s.name,
                        subCode: s.code
                    }
                    })}}  >
                    <div class="bg-blue-100 hover:bg-blue-400 h-full flex items-center border-gray-200 border-2 hover:cursor-pointer p-4 rounded-lg hover:shadow-lg shadow-slate-300">
                      <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRAlBPmsRECoTvlQKFoT3uT5P9xGYGmaYkRM3lYpDGgMH4kLet6VLilfda76yIPRKq5_Q&usqp=CAU" />
                      <div class="flex-grow">
                        <p class="text-gray-500 ">{s.code}</p>
                        <h2 class="text-gray-900 title-font font-medium">{s.name}</h2>
                      </div>
                    </div>
                  </a>
                </div>
              })
            }


          </div>
        </div>
      </section>
    </div>
  )
}

export default Student