import React, { useEffect, useState } from "react";
import './lesson.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import http from "../../api/http";

export default function Lesson(){
    let role = window.localStorage.getItem('role')
    let user = window.localStorage.getItem('user')
    const navigate = useNavigate()
    const {idlesson}=useParams()
    const {idmonthlessons} = useParams()
    const [lessonsDate,setLessonsDate]=useState({})
    const [lessonsFile,setLessonsFile]=useState({})
    useEffect(()=>{
        http
            .get(`/lesson/show/${idlesson}`)
            .then(res=>{
                setLessonsDate(res?.data)
                setLessonsFile(res?.data?.additionals[0])
            })
            .catch(err=>console.log(err))
    },[])

    return(
        <div className="lesson">
            <header>
                <Navbar role={role} user={user}/>
            </header>
            <section className="content container">
                <div>
                    <div className="board">Тема 1. {lessonsDate?.title}</div>
                    <div className="tasks">
                    <div><i class='bx bxs-file-txt'></i><Link to={`/main/${idmonthlessons}/${idlesson}/text`}>{lessonsDate?.title}  содержание</Link></div>
                    <div><i class='bx bxs-file-pdf'></i>{lessonsFile?.media ? <a href={lessonsFile?.media} download={lessonsFile?.media}>{lessonsFile?.title}</a> : <></>} </div>
                    <div><i class='bx bx-file'></i><Link to={`/main/${idmonthlessons}/${idlesson}/tasks/mytask`}>Задания по теме </Link></div>
                    </div>
                </div>
            </section>
        </div>
    )
}