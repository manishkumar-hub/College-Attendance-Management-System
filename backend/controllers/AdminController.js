// import conn from '../config/conn.'
var mysql = require('mysql');
require('dotenv').config();
var connection = require('../config/conn')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const USERNAME = "admin";
const PWD = "admin";
const secretKey = process.env.SECRET_KEY;

module.exports.loginAdmin = async (req, res) => {
    console.log("Inside Controller")
    const { username, password } = req.body;
    console.log("req body : ", req.body);
    if (username == USERNAME && password == PWD) {
        // const resData = JSON.stringify(response[0]);
        var token = jwt.sign(req.body, secretKey);
        return res.status(200).json({ "msg": "Logged in succesfully!!.", "data": token })
    }
    else
    {
        return res.status(203).json({ "msg": "Invalid Credentials" })
    }
}

module.exports.addSubject = async (req, res) => {
    console.log("Inside Controller")
    const { code } = req.body;
    console.log("req body : ", req.body);
    connection.query('SELECT * FROM subjects WHERE code = ?', code, async (err, response) => {
        console.log("Response : ", response);
        if (response.length > 0) {
            return res.status(203).json({ "msg": "Subject is already Added." })
        }
        else {
            connection.query('INSERT INTO subjects SET ?', req.body, (err, response) => {
                if (err) {
                    console.log("Insert Error: ", err);
                }
                else {
                    console.log("Res: ", response);
                }
            });
            console.log("res: ", response);
            return res.status(200).json({ "res": response, "msg": "Added succesfully!!" });
        }
    })
}
module.exports.updateSubject = async (req, res) => {
    // console.log("Inside Controller")
    const updatedSubj = req.body;
    // console.log("req body : ", updatedSubj);
    var query = `UPDATE subjects SET code='${updatedSubj.code}',name='${updatedSubj.name}', course='${updatedSubj.course}', branch='${updatedSubj.branch}' ,semester='${updatedSubj.semester}', year='${updatedSubj.year}' , teacher_id='${updatedSubj.teacher_id}'  WHERE id='${updatedSubj.id}' `; 
    console.log("upd query : ",query);
    connection.query(query, async (err, response) => {
        console.log("Response : ", response);
        // if (response.length > 0) {
            return res.status(200).json({ "msg": "Subject updated succesfully!" })
        // }
        // else {
            // connection.query('INSERT INTO subjects SET ?', req.body, (err, response) => {
            //     if (err) {
            //         console.log("Insert Error: ", err);
            //     }
            //     else {
            //         console.log("Res: ", response);
            //     }
            // });
            // console.log("res: ", response);
            return res.status(203).json({ "msg": "Oops!! Try again!" });
        // }
    })
}
module.exports.deleteSubject = async (req, res) => {
    console.log("Inside Controller",req.body)
    // const updatedSubj = req.body;
    // console.log("req body : ", updatedSubj);
    var query = `DELETE FROM subjects WHERE id='${req.body.id}' `; 
    console.log("Delete query : ",query);
    connection.query(query, async (err, response) => {
        console.log("Response : ", response);
        // if (response.length > 0) {
            return res.status(200).json({ "msg": "Subject deleted succesfully!" })
        // }
        // else {
            // connection.query('INSERT INTO subjects SET ?', req.body, (err, response) => {
            //     if (err) {
            //         console.log("Insert Error: ", err);
            //     }
            //     else {
            //         console.log("Res: ", response);
            //     }
            // });
            // console.log("res: ", response);
            return res.status(203).json({ "msg": "Oops!! Try again!" });
        // }
    })
}
module.exports.getAllSubj = async (req, res) => {
    console.log("Inside Controller")
    // const { code } = req.body;
    console.log("req body : ", req.body);
    connection.query('SELECT * FROM subjects ', async (err, response) => {
        console.log("Response : ", response);
        if (response.length > 0) {
            return res.status(200).json({"data": response} )
        }
        else {
            return res.status(203).json({ "res": response, "msg": "No Subjects Found!" });
        }
    })
}
module.exports.getStudentsByCourseAndyear = async (req, res) => {
    console.log("Inside Controller")
    const { course , year , branch } = req.body;
    console.log("req body : ", req.body);
    var query = `SELECT * FROM student WHERE course='${course}' AND year= '${year}' AND branch='${branch}' `; 
    console.log(" get stud query : ",query)
    connection.query(query, async (err, response) => {
        console.log("Response : ", response);
        if (response.length > 0) {
            return res.status(200).json({"data": response} )
        }
        else {
            return res.status(203).json({ "res": response, "msg": "No students Found!" });
        }
    })
}

module.exports.getAllTeachers = async (req, res) => {
    // console.log("Inside Controller")
    // const { course , year , branch } = req.body;
    // console.log("req body : ", req.body);
    var query = `SELECT * FROM teacher `; 
    console.log(" get teacher query : ",query)
    connection.query(query, async (err, response) => {
        console.log("Response : ", response);
        if (response.length > 0) {
            return res.status(200).json({"data": response} )
        }
        else {
            return res.status(203).json({ "res": response, "msg": "No proffesors Found!" });
        }
    })
}

module.exports.getSubjByCourseAndyear = async (req, res) => {
    console.log("Inside Controller")
    const { course, year } = req.body;
    console.log("req body : ", req.body);
    var quer = `SELECT * FROM subjects WHERE  course = '${course}' AND year = '${year}' `;
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