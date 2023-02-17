import React, { useState,useEffect } from "react";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import SearchHeader from "../../Components/SearchHeader/SearchHeader";
import './studentscomment.css'

export default function StudentsComment(){
    const navigate=useNavigate()
    const [usersComments,setUsersComments]=useState([])

    const getComment = async ()=>{
        await http    
            .get('/comment/index')
            .then(res=>{
                setUsersComments(res?.data)
            })
            .catch(err=> console.log(err))
    }

    useEffect(()=>{
        getComment()
    },[])

    useEffect(()=>{
        if(window.localStorage.getItem('role')!=="super-admin"){
            navigate('/main', {replace:true})
        }
    },[])

    const deleted = async (id) =>{
        http
            .delete(`/comment/delete/${id}`)
            .then(res =>{
                let resList = usersComments.filter(item => item.id !== id)
                setUsersComments(resList)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="adminPanelPage container">
            <SearchHeader/>
                <div className="adminPanelPageTitle">Комменты учеников</div>
                <section>
                    <div className="commentsTable">
                    <div className="commentsTable_header">
                            <div className="commentsTable_infos">
                                <div>ID</div>
                                <div>Имя пользователя</div>
                                <div>Сообщение от пользователя</div>
                                <div>Дата отправки</div>   
                                <div>На тему</div>   
                            </div>
                            <div className="commentsTable_options">
                                <div>удалить</div>
                            </div>
                    </div>
                    {
                        usersComments?.map(item =>(
                            <div className="commentsTable_body" key={item?.id}>
                                <div className="commentsTable_info">
                                    <div>{item?.id}</div>
                                    <div>{item?.user_name}</div>
                                    <div>{item?.message}</div>
                                    <div>{item?.created_at}</div>
                                    <div>{item?.assignment}</div>
                                </div>
                                <div className="commentsTable_option">
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