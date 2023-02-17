import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import http from "../../api/http";
import './themetext.css'

export default function Themetext(){
    let role = window.localStorage.getItem('role')
    let user = window.localStorage.getItem('user')

    const [ lessonInfo, setLessonInfo] = useState({})

    const {idlesson}=useParams()

    useEffect(()=>{
        http
            .get(`/lesson/show/${idlesson}`)
            .then(res=>{
                setLessonInfo(res?.data)
                console.log(res?.data)
            })
            .catch(err=>console.log(err))
    },[])


    return(
        <div className="themetext">
            <header>
                <Navbar role={role} user={user}/>
            </header>
            <section className="content contentBody container">
                <div className="themetile">{lessonInfo?.title}</div>
                <div className="contentsImage"><img src={`${lessonInfo?.image}`}/></div>
                <div className="contentsText">
                <div>{lessonInfo?.description}</div>
                </div>
                <div className="contentsVideo"><div>Ссылка на видео:</div> <div><a href={lessonInfo?.video} target="_blank">{lessonInfo?.video}</a></div></div>
            </section>
        </div>
    )
}