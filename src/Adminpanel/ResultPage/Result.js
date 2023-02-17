import React, { useState,useEffect } from "react";
import './result.css'
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import SearchHeader from "../../Components/SearchHeader/SearchHeader";

export default function Result(){
    const navigate=useNavigate()
    const [months,setMonths]=useState([])
    const [users,setUsers]=useState([])
    const [lessons,setLessons]=useState([])
    const [presentFiles,setPresentFiles]=useState([])
    const [homeWorkfiles,setHomeWorkFiles]=useState([])
    const [usersResponse,setUsersRespons]=useState([])

    useEffect(()=>{
        if(window.localStorage.getItem('role')!=="super-admin"){
            navigate('/main', {replace:true})
        }
    },[])
    
    const getCategorys = async ()=>{
        await http
            .get('/category/index')
            .then(res => {setMonths(res?.data)})
            .catch(err => console.log(err))
    }

    const getLessons = async ()=>{
        await http
        .get('/lesson/index')
        .then(res => setLessons(res?.data))
        .catch(err=>console.log(err))
    }

    const getUsers = async ()=>{
        await http
        .get('/user/index')
        .then(res => setUsers(res?.data))
        .catch(err => console.log(err))
    }

    const getAdditionals = async ()=>{
        await http
        .get('/additional/index')
        .then(res => setPresentFiles(res?.data))
        .catch(err => console.log(err))
    }

    const getAssigments = async ()=>{
        await http
        .get('/assignment/index')
        .then(res=>{
            setHomeWorkFiles(res?.data);
        })
        .catch(err=> console.log(err))
    }

    const getResponses = async ()=>{
        await http    
        .get('/response/index')
        .then(res=>{
            setUsersRespons(res?.data)
        })
        .catch(err=> console.log(err))
    }

    useEffect(()=>{
    getCategorys()
    getLessons()
    getUsers()
    getAdditionals()
    getAssigments()
    getResponses()
    },[])

    return(
    <div className="adminPanelPage container">
        <header className="result_header">
            <SearchHeader/>
        </header>
        <div className="adminPanelPageTitle">Статистика</div>
        
            <section className="resultBoard_boxs">
                <div className="resultBoard_box">
                    <div className="resulBoard_icon"><i className='bx bx-calendar'></i></div> 
                    <div className="resultBoard_box_info">
                        <div> Месяцев:</div>
                        <div>{months?.length}</div>    
                    </div> 
                </div>
                <div className="resultBoard_box">
                    <div className="resulBoard_icon"><i className='bx bxs-user'></i></div> 
                    <div className="resultBoard_box_info">
                        <div>Учеников:</div>
                        <div>{users?.length}</div>    
                    </div> 
                </div>
                <div className="resultBoard_box">
                    <div className="resulBoard_icon"><i className='bx bxs-file' ></i></div> 
                    <div className="resultBoard_box_info">
                        <div>Заданий по теме:</div>
                        <div>{homeWorkfiles?.length}</div>    
                    </div> 
                </div>
                <div className="resultBoard_box">
                    <div className="resulBoard_icon"><i className='bx bx-file' ></i></div> 
                    <div className="resultBoard_box_info">
                        <div>Количество всех уроков:</div>
                        <div>{lessons?.length}</div>    
                    </div> 
                </div>
                <div className="resultBoard_box">
                    <div className="resulBoard_icon"><i className='bx bxs-file-pdf'></i></div> 
                    <div className="resultBoard_box_info">
                        <div>Количество файлов по теме:</div>
                        <div>{presentFiles?.length}</div>    
                    </div> 
                </div>
                <div className="resultBoard_box">
                    <div className="resulBoard_icon"><i className='bx bxs-message-rounded-dots'></i></div> 
                    <div className="resultBoard_box_info">
                        <div>Ответы учеников:</div>
                        <div>{usersResponse?.length}</div>    
                    </div> 
                </div>
            </section>
            
    </div>
    )
}
