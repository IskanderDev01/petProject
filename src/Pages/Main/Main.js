import React, {useState, useEffect} from "react";
import './main.css'
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import http from "../../api/http";

export default function Main(){
    const navigate = useNavigate()
    let role = window.localStorage.getItem('role')
    let user = window.localStorage.getItem('user')
    const [months, setMonths] = useState([])

    useEffect(() => {
        if (!localStorage.getItem('token')){
            navigate('/', {replace: true})
        }
    }, [])

    useEffect(()=>{
        http
        .get('/category/index')
        .then(res =>{
            setMonths(res?.data)
        })
        .catch(err =>{
            console.log(err);
        })
    },[])

    return(
        <div className="main">
            <header><Navbar role={role} user={user}/></header>
        <section className="courseBlock">
            <div className="courseMonts">
                {
                    months?.map((item)=>{
                        return(
                            <div className="courseMonth" key={item?.id}>
                                <Link to={`/main/${item?.id}`}>
                                    <div className="courseIcon"><i className='bx bx-calendar'></i></div>
                                    <div><span>{item?.name}</span></div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </section>
        </div>
    )
}