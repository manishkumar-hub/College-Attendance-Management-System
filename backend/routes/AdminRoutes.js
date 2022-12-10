const app = require('express');
const router = app.Router();
const { loginAdmin,addSubject,getAllSubj ,getSubjByCourseAndyear , updateSubject,deleteSubject, getStudentsByCourseAndyear,getAllTeachers} = require('../controllers/AdminController');
const bodyParser = require('body-parser');


// console.log("Reg stud: ",registerStudent)
router.use(bodyParser.urlencoded({ extended: false }))
router.post('/loginAdmin',loginAdmin);
router.post('/addSubj',addSubject);
router.delete('/deleteSubj',deleteSubject);
router.post('/updateSubj',updateSubject);
router.post('/getAllSubj',getAllSubj);
router.post('/getStudentsCourseAndyear',getStudentsByCourseAndyear);
router.post('/getSubjByCourseAndyear',getSubjByCourseAndyear);
router.post('/getTeachers',getAllTeachers);
module.exports=router;