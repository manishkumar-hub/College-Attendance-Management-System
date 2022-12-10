const app = require('express');
const router = app.Router();
const {registerTeacher, loginTeacher,getSubjByCourse,getStudentsBySubject,takeAttendance ,getAttendanceBySubject,updateAttendance} = require('../controllers/TeacherController');
const bodyParser = require('body-parser');
const Auth = require('../utills/Auth');


// console.log("Reg stud: ",registerStudent)
router.use(bodyParser.urlencoded({ extended: false }))
router.post('/registerTeacher',registerTeacher);
router.post('/loginTeacher',loginTeacher);
router.post('/getSubjByYear',getSubjByCourse);
router.post('/getStudentsBySubject',getStudentsBySubject);
router.post('/takeAttendance',takeAttendance);
router.post('/updateAttendance',updateAttendance);
router.post('/getAttendanceBySubject',getAttendanceBySubject);
module.exports=router;