import React, { useState,useEffect } from "react";
import http from "../../api/http";
import SearchHeader from "../../Components/SearchHeader/SearchHeader";
import { useNavigate } from "react-router-dom";
import './studentsanswers.css'

export default function StudentAnswers(){
    const navigate=useNavigate()
    const [usersRespons,setUsersRespons]=useState([])
    
    useEffect(()=>{
        if(window.localStorage.getItem('role')!=="super-admin"){
            navigate('/main', {replace:true})
        }
    },[])

    const getRespones = async ()=>{
        await http    
            .get('/response/index')
            .then(res=>{
                setUsersRespons(res?.data)
            })
            .catch(err=> console.log(err))
    }

    useEffect(()=>{
        getRespones()
    },[])

    const deleted = async (id) =>{
            http
            .delete(`/response/delete/${id}`)
            .then(res =>{
                let resList = usersRespons.filter(item => item.id !== id)
                setUsersRespons(resList)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="adminPanelPage container">
            <SearchHeader/>
                <div className="adminPanelPageTitle">Ответы учеников</div>
            <section>
            <div className="usersResTable">
                        <div className="usersResTable_header">
                            <div className="usersResTable_infos">
                                <div>ID</div>
                                <div>Имя пользователя</div>
                                <div>Сообщение от пользователя</div>
                                <div>Отправлено</div>
                                <div>Файл</div>
                                <div>Уроку</div>
                            </div>
                            <div className="usersResTable_options">
                                <div>удалить</div>
                            </div>
                        </div>
                                    {
                                        usersRespons?.map(item=>(
                                            <div className="usersResTable_body" key={item?.id}>
                                                <div className="usersResTable_info">
                                                    <div>{item?.id}</div>
                                                    <div>{item?.user_name}</div>
                                                    <div>{item?.title}</div>
                                                    <div>{item?.created_at}</div>
                                                    <div><a href={item?.file} download={item?.file}>скачать</a></div>
                                                    <div>{item?.assignment}</div>
                                                </div>
                                                <div className="usersResTable_option">
                                                    <div onClick={()=>{deleted(item?.id)}}><i className='bx bxs-trash-alt'></i></div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    
                    </div>
            </section>
        </div>
    )
}