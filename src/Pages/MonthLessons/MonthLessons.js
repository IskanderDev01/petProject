import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import './monthlessons.css'
import { useNavigate, useParams, Link } from "react-router-dom";
import http from "../../api/http";

export default function MonthLessons(){
    const navigate = useNavigate()
    let { idmonthlessons } = useParams()
    let role = window.localStorage.getItem('role')
    let user = window.localStorage.getItem('user')
    const [lessons, setLessons] = useState({})
    useEffect(()=>{
        http
        .get(`/category/show/${idmonthlessons}`)
        .then(res =>{
            setLessons(res?.data)
        })
        .catch(err => console.log(err))
    },[])

    return(
        <div className="lessons">
            <header>
                <Navbar role={role} user={user}/>
            </header>
            <section className="content container">
                <div className="board">Уроки {lessons?.name}</div>
                <div className="lessonsTable">
                    {
                        lessons?.lessons?.map((item, index)=>{
                            return(
                                <div key={item?.id}>
                                    <Link to={`/main/${idmonthlessons}/${item?.id}`}>Тема {index + 1}. {item?.title}</Link>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </section>
        </div>
    )
}