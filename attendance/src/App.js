import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header'
import Login from './components/LandingPage/Login';
import { Route, Routes, Switch, BrowserRouter } from 'react-router-dom';
// import Login from './components/LandingPage/Login';
import SignupStudent from './components/LandingPage/SignupStudent';
import SignupTeacher from './components/LandingPage/signupTeacher';
import Teacher from './components/Teacher/Teacher';
import Home from './components/home/Home';
import Student from './components/Student/Student';
import Admin from './components/Admin/Admin';
import AdminLogin from './components/Admin/Login';
import ViewSubjs from './components/Subjects/ViewSubjs';
import TakeAttendance from './components/Teacher/TakeAttendance';
import ViewAttendance from './components/Teacher/ViewAttendance';
import SubjAttend from './components/Student/SubjAttend';
import ViewAttendanceAdm from './components/Admin/ViewAttendance';
import ViewStudAtten from './components/Teacher/ViewStudAtten';
import ViewSubjAttendance from './components/Admin/ViewSubjAttendance';
import ViewStudents from './components/Admin/ViewStudents';
import ViewProffessors from './components/Admin/ViewProfessors';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
 
    <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/registerStudent" element={ <SignupStudent/> }></Route>
          <Route path="/teacher" element={ <Teacher/> }></Route>
          <Route path="/takeAttendance" element={ <TakeAttendance/> }></Route>
          <Route path="/viewAttendance" element={ <ViewAttendance/> }></Route>
          <Route path="/viewStudAtten" element={ <ViewStudAtten /> }></Route>
          <Route path="/student" element={ <Student/> }></Route>
          <Route path="/subjattendance" element={ <SubjAttend /> }></Route>
          <Route path="/admin" element={ <Admin/> }></Route>
          <Route path="/adminLogin" element={ <AdminLogin/> }></Route>
          <Route path="/viewSubjs" element={ <ViewSubjs/> }></Route>
          <Route path="/registerTeacher" element={ <SignupTeacher /> }></Route>
          <Route path="/viewAttendAdm" element={ <ViewAttendanceAdm /> }></Route>
          <Route path="/viewSubjectAttend" element={ <ViewSubjAttendance /> }></Route>
          <Route path="/viewStudents" element={ <ViewStudents /> }></Route>
          <Route path="/viewProff" element={ <ViewProffessors /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
