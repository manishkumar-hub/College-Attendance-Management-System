// import conn from '../config/conn.'
var mysql = require('mysql');
require('dotenv').config();
var connection = require('../config/conn')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

module.exports.registerStudent = async (req, res) => {
    console.log("Inside Controller")
    const { roll, name, course, email, contact, branch, year, semester, password } = req.body;
    console.log("req body : ", req.body);
    connection.query('SELECT * FROM student WHERE roll = ?', roll, async (err, response) => {
        console.log("Response : ", response);
        if (response.length > 0) {
            return res.status(203).json({ "msg": "User is already registered." })
        }
        else {
            const salt = await bcrypt.genSaltSync(10);
            const hashedPwd = await bcrypt.hash(password, salt);
            const data = req.body;
            data.password = hashedPwd;
            connection.query('INSERT INTO student SET ?', data, (err, response) => {
                if (err) {
                    console.log("Insert Error: ", err);
                }
                else {
                    console.log("Res: ", response);
                }
            });
            console.log("res: ", response);
            console.log("Secret key jwt: ", secretKey)
            var token = jwt.sign(data, secretKey);
            return res.status(200).json({ "res": token, "msg": "Registered Succesfully!!" });
        }
    })
}

module.exports.loginStudent = async (req, res) => {
    console.log("Inside Controller")
    const { roll, password } = req.body;
    console.log("req body : ", req.body);
    connection.query('SELECT * FROM student WHERE roll = ?', roll, async (err, response) => {
        console.log("Response : ", response);
        if (response.length > 0) {
            const pwdCheck = await bcrypt.compare(password, response[0].password);
            if (pwdCheck) {
                const resData = JSON.stringify(response[0]);
                var token = jwt.sign(resData, secretKey);
                return res.status(200).json({ "msg": "Logged in succesfully!!.", "data": token })
            }
            else {
                return res.status(203).json({ "msg": "Invalid Credentials" })
            }
        }
        else {
            return res.status(203).json({ "msg": "User not registered!!" });
            // console.log("res: ",response);
        }
    })
}

module.exports.getSubjects = async (req, res) => {
    console.log("Inside Controller")
    const { branch,semester, course, year } = req.body;
    // console.log("req body : ", req.body);
    var quer = `SELECT * FROM subjects WHERE  branch='${branch}' AND course = '${course}' AND year = '${year}' AND semester='${semester}'`;
    console.log("Query: ",quer);
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

module.exports.getattendance = async (req, res) => {
    console.log("Inside Controller")
    const { roll , subject } = req.body;
    // console.log("req body : ", req.body);
    var quer = `SELECT * FROM attendance WHERE roll= '${roll}' AND  subject = '${subject}' ORDER BY date DESC `;
    // console.log("Query: ",quer);
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