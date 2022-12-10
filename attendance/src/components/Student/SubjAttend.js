import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../header/Header';
import { ToastContainer, toast } from 'react-toastify';
import { path } from '../../path'
import { PieChart } from 'react-minimal-pie-chart';


const axios = require('axios')
let beginDate, endDate
let p = 0, a = 0, l = 0, perc = 0;
let pieData = [];
const SubjAttend = () => {
    const location = useLocation();
    const [atendstatus, setatendtsatus] = useState("");
    const [updId, setupdId] = useState("");
    console.log("loc: ", location.state)

    // console.log("stude prop: ", location.state.student)
    const student = location.state.student;
    const [attendance, setattendance] = useState([]);
    const subj = location.state.subject;
    // console.log("Stude: ", student, subj)


    let sn = 1;

    const getattendance = async () => {
        if (student && subj) {
            await axios.post(`${path}/getattendance`, {
                roll: student.roll,
                subject: location.state.subCode
            })
                .then(function (response) {
                    // console.log("Res: ", response);
                    if (response.status == 203) {
                        toast.error(response.data.msg);
                    }
                    else {
                        // console.log("reps : ", response.data.data);
                        setattendance(response.data.data);
                        var aten = response.data.data;
                        var beg = new Date(aten[aten.length - 1].date), end = new Date(aten[0].date);
                        beginDate = beg.toLocaleDateString('en-GB');
                        endDate = end.toLocaleDateString('en-GB');
                        console.log("ate: ",aten)
                        p=0;l=0;a=0; perc=0;
                        console.log("p abovve: ",p,a,l,perc);
                        aten.forEach((e) => {
                            console.log("e: ",e);
                            if (e.status == 'present') {
                                p = p + 1;
                            }
                            else if (e.status == 'absent') {
                                a = a + 1;
                            }
                            else if(e.status=='leave')
                            {
                                l = l + 1;
                            }
                        })
                        pieData=[]
                        if (p > 0) {
                            pieData.push({ title: 'Present', value: p, color: '#059500' })
                        }
                        if (a > 0) {
                            pieData.push({ title: 'Absent', value: a, color: '#EE4B4B' })
                        }
                        if (l > 0) {
                            pieData.push({ title: 'Leave', value: l, color: '#6A2135' })
                        }
                        perc = Math.round(p / (p + a ) * 100);
                        console.log("p: ",p,a,l,perc);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            console.log("please fill")
            toast.warn("Please fill all the details carefully!!")
        }
    }
    const defaultLabelStyle = {
        fontSize: '5px',
        fontFamily: 'sans-serif' 
    };

    useEffect(() => {
        getattendance()
    }, []);
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
            <div>
                <div className='container mx-auto '>
                    <div className='flex  justify-center px-6'>
                        <div className='flex flex-row justify-evenly w-[80%]'>
                            <h1 className='text-3xl font-bold'>Attendance Records</h1>
                        </div>
                    </div>
                    <br /><br />
                </div>

                <div className='container mx-auto '>
                    <div className='flex flex-col justify-center px-6 border border-2 rounded-2xl w-[80%] ml-[10%]'>
                        <div className='flex flex-row justify-evenly  my-1'>
                            <h2 className='font-semibold' >Name : {student.name}</h2>
                            <h2 className='font-semibold' >Roll no:  {student.roll}  </h2>
                        </div>
                        <hr />
                        <div className='flex flex-row justify-evenly  my-1'>
                            <h2 className='font-semibold' >Subject : {subj}</h2>
                            <h2 className='font-semibold' >Total Working Days : {attendance.length}  </h2>
                            <h2 className='font-semibold' > Date : {beginDate} to {endDate}   </h2>
                        </div>
                    </div>
                </div>
                <div className='container mx-auto '>
                    <div className='flex flex-row  justify-center px-6'>
                        <div className='flex  justify-evenly w-[80%]-mx-96'>
                            <PieChart
                                data={pieData}
                                segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                                // segmentsShift={(index) => (index === selected ? 6 : 1)}
                                animate={true} 
                                label={({ dataEntry }) => (Math.round(dataEntry.percentage)+'%')}
                                labelStyle={defaultLabelStyle}
                                animationDuration={2000}
                                radius={35}
                                viewBoxSize={[100, 100]}
                            />
                        </div>
                        <div className='flex items-center flex-row'>
                            <div className='flex flex-row items-center'>
                                <div className='w-4 h-4 bg-[#059500]'> </div>
                                <h1> &nbsp; Present</h1>
                            </div>
                            <div className='flex flex-row items-center mx-2'>
                                <div className='w-4 h-4 bg-[#EE4B4B]'> </div>
                                <h1> &nbsp; Absent</h1>
                            </div>
                            <div className='flex flex-row items-center'>
                                <div className='w-4 h-4 bg-[#6A2135]'> </div>
                                <h1> &nbsp; Leave</h1>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='container mx-auto '>
                    <div className='flex flex-col justify-center px-6 border border-2  w-[80%] ml-[10%]'>
                        <div className='flex flex-row justify-evenly  my-1'>
                            <h2 className='font-semibold' >Present : {p}</h2>
                            <h2 className='font-semibold' >Absent : {a}  </h2>
                            <h2 className='font-semibold' > Leave : {l}</h2>
                            <h2 className='font-semibold' > Attendance (%) : {perc}%</h2>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto">
                    <div className="flex  justify-center px-6">
                        <div className="w-[80%] ">
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full">
                                                <thead className="bg-white border-b ">
                                                    <tr className=''>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            S.No
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            Date
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        attendance.map((a) => {
                                                            return <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:cursor-pointer">
                                                                    {sn++}
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        (new Date(a.date).toLocaleDateString('en-GB'))
                                                                    }
                                                                </td>
                                                                <td className="text- text-gray-900  px-6 py-4 whitespace-nowrap">
                                                                    {a.status}
                                                                </td>
                                                            </tr>
                                                        })

                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubjAttend