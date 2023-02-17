import React from "react";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Main from "../Pages/Main/Main";
import MonthLessons from "../Pages/MonthLessons/MonthLessons";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Lesson from "../Pages/Lesson/Lesson";
import Themetext from "../Pages/Themetext/Themetext";
import Tasks from "../Pages/Tasks/Tasks";
import Result from "../Adminpanel/ResultPage/Result";
import AddMonth from "../Adminpanel/AddMonth/AddMonth";
import AddMonthsLessons from "../Adminpanel/AddMonthsLessons/AddMonthsLessons";
import AddUsers from "../Adminpanel/AddUsers/AddUsers";
import AddPresentationFile from "../Adminpanel/AddPresentationFile/AddPresentationFile";
import AddHomeWork from "../Adminpanel/AddHomeWork/AddHomeWork";
import StudentAnswers from "../Adminpanel/StudentsAnswers/StudentsAnswers";
import StudentsComment from "../Adminpanel/StudentsComment/StudentsComment";
export default function Routers(){
    
    return(
        <Router>
            <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/main" element={<Main/>}/>
            <Route path="/result" element={<Result/>}/>
            <Route path="/addmonth" element={<AddMonth/>}/>
            <Route path="/addmonthslessons" element={<AddMonthsLessons/>}/>
            <Route path="/addusers" element={<AddUsers/>}/>
            <Route path="/addpresentationfile" element={<AddPresentationFile/>}/>
            <Route path="/addhomework" element={<AddHomeWork/>}/>
            <Route path="/studentscomments" element={<StudentsComment/>}/>
            <Route path="/studentsanswers" element={<StudentAnswers/>}/>
            <Route path="/main/:idmonthlessons" element={<MonthLessons/>}/>
            <Route path="/main/:idmonthlessons/:idlesson" element={<Lesson/>}/>
            <Route path="/main/:idmonthlessons/:idlesson/:textname" element={<Themetext/>}/>
            <Route path="/main/:idmonthlessons/:idlesson/tasks/:taskname" element={<Tasks/>}/>
            </Routes>
        </Router>
    )
}