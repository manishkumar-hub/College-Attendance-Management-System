const app = require('express');
const router = app.Router();
const {registerStudent ,loginStudent,getSubjects,getattendance} = require('../controllers/StudentController');

// console.log("Reg stud: ",registerStudent)
router.post('/registerStudent',registerStudent);
router.post('/loginStudent',loginStudent);
router.post('/getSubjects',getSubjects);
router.post('/getattendance',getattendance);

module.exports=router;