var mysql = require('mysql');
const connection = require('../config/conn')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

module.exports.registerTeacher = async (req, res) => {
    console.log("Inside Controller")
    const { name, email, contact, branch, password } = req.body;
    console.log("req body : ", req.body);
    connection.query('SELECT * FROM teacher WHERE email = ?', email, async (err, response) => {
        console.log("Response if earl : ", response);
        if (response.length > 0) {
            return res.status(203).json({ "msg": "User is already registered." })
        }
        else {
            const salt = await bcrypt.genSaltSync(10);
            const hashedPwd = await bcrypt.hash(password, salt);
            const data = req.body;
            data.password = hashedPwd;
            connection.query('INSERT INTO teacher SET ?', data, (err, response) => {
                if (err) {
                    console.log("Insert Error: ", err);
                }
                else {
                    console.log("Res: ", response);
                }
                // console.log("Secret key jwt: ", secretKey)
                console.log("Res: ", response);
                var resp = JSON.parse(JSON.stringify(response))
                var token = jwt.sign(resp, secretKey);
                return res.status(200).json({ "res": token, "msg": "Registered Succesfully!!" });
            });
            // console.log("res: ",response);
        }
    })
}
module.exports.loginTeacher = async (req, res) => {
    console.log("Inside Controller")
    const { email, password } = req.body;
    console.log("req body : ", req.body);
    connection.query('SELECT * FROM teacher WHERE email = ?', email, async (err, response) => {
        console.log("Response : ", response);
        if (response.length > 0) {
            console.log("response: ", response[0])
            const pwdCheck = await bcrypt.compare(password, response[0].password);
            if (pwdCheck) {
                const resData =JSON.parse(JSON.stringify(response[0]));
                // console.log("res log data: ",resData)
                // console.log("res log data id: ",resData.id)
                var token = jwt.sign(resData, secretKey);
                return res.status(200).json({ "msg": "Logged in succesfully!!.", "data": token })
            }
            else
                return res.status(203).json({ "msg": "Invalid Credentials" })
        }
        else {
            return res.status(203).json({ "msg": "User not registered!!" });
            // console.log("res: ",response);
        }
    })
}

module.exports.getSubjByCourse = async (req, res) => {
    console.log("Inside Controller")
    const { teacher_id, course, year } = req.body;
    console.log("req body : ", req.body);
    var quer = `SELECT * FROM subjects WHERE  teacher_id='${teacher_id}' AND course = '${course}' AND year = '${year}' `;
    console.log("quer: ",quer)
    connection.query(quer, async (err, response) => {
        console.log("Response : ", response);
        if (response) {
            return res.status(200).json({ "data": response })
        }
        else {
            return res.status(203).json({ "res": response, "msg": "No Subjects Found!" });
        }
    })
}


module.exports.getStudentsBySubject = async (req, res) => {
    console.log("Inside Controller")
    const { course, year, semester, branch } = req.body;
    console.log("req body : ", req.body);
    var quer = `SELECT * FROM student WHERE  course = '${course}' AND branch='${branch}' AND semester='${semester}' AND year = ${year} ORDER BY roll ASC`;
    connection.query(quer, async (err, response) => {
        console.log("Response : ", response);
        if (response) {
            return res.status(200).json({ "data": response })
        }
        else {
            return res.status(203).json({ "res": response, "msg": "No Students  Found!" });
        }
    })
}
module.exports.takeAttendance = async (req, res) => {
    console.log("Inside take attendance Controller")
    const { subject, year, semester, attendance } = req.body;
    console.log("req body : ", req.body);
    var success = true;

    function convertDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
    }
    var dt = convertDate(new Date());

    var quer = `SELECT * FROM attendance WHERE roll= '${attendance[0].roll}' AND semester='${semester}' AND year = '${year}' AND subject = '${subject}' AND date= '${dt}' `;
    console.log("quer: ", quer);
    connection.query(quer, async (err, response) => {
        // console.log("Response : ", response);
        if (response.length > 0) {
            return res.status(203).json({ "msg": "Attendance already Recorded!" });
        }
        else {
            attendance.map((a) => {
                var data = {
                    "roll": a.roll,
                    "year": year,
                    "semester": semester,
                    "subject": subject,
                    "status": a.status
                }
                connection.query('INSERT INTO attendance SET ?', data, async (err, response) => {
                    // console.log("Response : ", response);
                    if (err) {
                        console.log("Insert Error: ", err);
                    }
                    else {
                        // console.log("Res: ", response);
                    }
                })
            })
            return res.status(200).json({ "msg": "Attendance Recorded Succesfully!!" })
        }
    })
}

module.exports.getAttendanceBySubject = async (req, res) => {
    console.log("Inside Controller")
    const { course, year, subject } = req.body;
    // console.log("req body : ", req.body);
    var quer = `SELECT roll ,name FROM student WHERE  course = '${course}' AND year = ${year} ORDER BY roll ASC`;
    // console.log("Quer: ", quer)
    let resData = [];
    let data = [];
    await connection.query(quer, async (err, response) => {
        // console.log("Response studnts: ", response);
        if (response) {
            data = response;
            var lastRoll = data[data.length - 1].roll;
            for (let i = 0; i < data.length; i++) {
                const st = data[i];
                var stObj = {
                    "roll": st.roll,
                    "name": st.name,
                    "attendance": []
                };
                resData.push(stObj);
                var quer = `SELECT id,date, status FROM attendance WHERE roll='${st.roll}'  AND subject='${subject}' AND year = ${year} ORDER BY date DESC`;
                await connection.query(quer, async (err, resp) => {
                    // console.log("Response attedn : ", resp);
                    if (resp) {
                        // return res.status(200).json({ "data": response })
                        // console.log("resdata length: ",resData.length)
                        resData[i].attendance = resp;
                        // console.log("St obj : ",stObj)
                    }
                    else {
                        // return res.status(203).json({ "res": response, "msg": "No Students  Found!" });
                    }
                    // console.log("res data: ", resData);
                    if ((i + 1) == data.length) {
                        console.log("after last Data: ", resData);
                        return res.status(200).json({ "data": resData })
                    }
                })
            }
        }
        else {
            return res.status(203).json({ "res": response, "msg": "No records  Found!" });
        }
    })
}

module.exports.updateAttendance = async (req, res) => {
    console.log("Inside Controller")
    const { id, status} = req.body;
    console.log("req body : ", req.body);
    var quer = `UPDATE attendance SET status='${status}' WHERE id= '${id}'`;
    connection.query(quer, async (err, response) => {
        console.log("Response : ", response);
        if (response) {
            return res.status(200).json({ "data": response ,"msg" : "Updated!" })
        }
        else {
            return res.status(203).json({ "res": response, "msg": "Oops !! Cannot Update" });
        }
    })
}