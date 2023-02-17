import React, { useState,useEffect, useRef } from "react";
import http from "../../api/http";
import SearchHeader from "../../Components/SearchHeader/SearchHeader";
import { useNavigate } from "react-router-dom";
import './addhomework.css'

export default function AddHomeWork(){
    const [homeFiles,setHomeFiles]=useState([])
    const [selectLessonId,setSelectLessonId]=useState([])
    const [openHwAdd,setOpenHwAdd]=useState(false)
    const [openHwEdit,setOpenHwEdit]=useState(false)
    const [title,setTitle]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [file,setFile]=useState([])
    const [lessonsId,setLessonsId]=useState('')
    const [id,setId]=useState('')
    let formData = new FormData()
    const navigate=useNavigate()

    const editTitleInput = useRef(null)

    useEffect(()=>{
        if(window.localStorage.getItem('role')!=="super-admin"){
            navigate('/main', {replace:true})
        }
    },[])

    const getAssigments = async ()=>{
        await http
            .get('/assignment/index')
            .then(res=>{
                setHomeFiles(res?.data)
            })
            .catch(err => console.log(err))
    }

    const getLessons = async ()=>{
        await http
            .get('/lesson/index')
            .then(res=>{
                setSelectLessonId(res?.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getAssigments()
        getLessons()
    },[])

    const submited = (e)=>{
        e.preventDefault()
        formData.append('title',title)
        formData.append('file',file)
        formData.append('due_date',dueDate)
        formData.append('lesson_id',lessonsId)
        http
            .post('/assignment/create', formData)
            .then(res =>{
                if(res.status==201){
                    getAssigments()
                }
            })
            .catch(err => console.log(err))
    }

    const edited= async (e)=>{
        e.preventDefault()
        formData.append('title',title)
        formData.append('file',file)
        formData.append('due_date',dueDate)
        formData.append('lesson_id',lessonsId)
        await http
                .post(`/assignment/update/${id}`,formData)
                .then(res=>{
                    if(res.status==200){
                        getAssigments()
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
    }

    const editwindow=(item)=>{
        setOpenHwEdit(!openHwEdit)
        setId(item.id)
        editTitleInput.current.value=item.title
    }

    const deleted = async (id) =>{
        http
            .delete(`/assignment/delete/${id}`)
            .then(res =>{
                let hwList = homeFiles.filter(item => item.id !== id)
                setHomeFiles(hwList)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="adminPanelPage container">
            <SearchHeader/>
                <div className="adminPanelPageTitle">Задания на тему</div>
            <section>
            <div className={openHwEdit ? "hwEdit_close" : "hwEdit_open"}>   
            <div className={openHwAdd ? "hwAdd_close" : "hwAdd_open"}>
                <div className="addMonths_lesson_btn">
                    <button onClick={()=>setOpenHwAdd(!openHwAdd)}>добавить</button>
                </div>
                <div className="hwTabel">
                        <div className="hwTabel_header">
                            <div className="hwTabel_infos">
                                <div>ID</div>
                                <div>Название файла</div>
                                <div>Срок сдачи</div>
                                <div>Файл</div>
                                <div>Уроку</div>
                            </div>
                            <div className="hwTabel_options">
                                <div>изменить</div>
                                <div>удалить</div>
                            </div>
                        </div>
                        
                            {
                                homeFiles?.map(item=>(
                                    <div className="hwTabel_body" key={item?.id}>
                                        <div className="hwTabel_info">
                                            <div>{item?.id}</div>
                                            <div>{item?.title}</div>
                                            <div>{item?.due_date}</div>
                                            <div><a href={item?.file} download={item?.file}>скачать</a></div>
                                            <div>{item?.lesson}</div>
                                        </div>
                                        <div className="hwTabel_option">
                                            <div onClick={()=> {editwindow(item)}}><i className='bx bxs-edit-alt'></i></div>
                                            <div onClick={()=>{deleted(item?.id)}} ><i className='bx bxs-trash-alt'></i></div>
                                        </div>
                                    </div>
                                ))
                            }
                    </div>
                    </div>
                    </div>
                                            
{/* =================================================HOMEWORK ADD================================================= */}
                    <div className={openHwEdit ? "hwEdit_close" : "hwEdit_open"}>   
                        <div className={openHwAdd ? "hwAdd_open" : "hwAdd_close"}>
                            <div className="presentation_add">
                                <div className="presentationForm_close"><span onClick={()=>{setOpenHwAdd(!openHwAdd)}}>x</span></div>
                                    <div className="presentationAdd_title">Добавить домашнее задание</div>
                                        <form onSubmit={(e)=>{submited(e)}}>
                                            <input
                                                type="text"
                                                name="title"
                                                onChange={(e)=>{setTitle(e.target.value)}}
                                                placeholder='Название файла'
                                                required
                                            />
                                            <input
                                                type='date'
                                                name="due_date"
                                                onChange={(e)=>{setDueDate(e.target.value)}}
                                                placeholder="Укажите дату"
                                                required
                                            />
                                            <select className="selectLessonId" onChange={(e)=>{setLessonsId(e.target.value)}}>
                                                {
                                                    selectLessonId?.map(item=>(
                                                        <option key={item?.id} value={item?.id}>{item?.title}</option>
                                                    ))
                                                }
                                            </select>
                                            <input
                                                type="file"
                                                name='file'
                                                onChange={(e)=>{setFile(e.target.files[0])}}
                                                required
                                            />
                                            <button type="submit" onClick={()=>{setOpenHwAdd(!openHwAdd)}}>Добавить</button>
                                        </form>
                            </div>
                        </div>
                    </div>
                    
{/* =================================================HOMEWORK EDIT================================================= */}
                        <div className={openHwEdit ? "hwEdit_open" : "hwEdit_close"}>
                                <div className="presentation_add">
                                    <div className="presentationForm_close"><span onClick={()=>{setOpenHwEdit(!openHwEdit)}}>x</span></div>
                                        <div className="presentationAdd_title">Изменить домашнее задание</div>
                                            <form onSubmit={e => edited(e)}>
                                                <input
                                                    ref={editTitleInput}
                                                    type="text"
                                                    name="title"
                                                    onChange={(e)=>{setTitle(e.target.value)}}
                                                    placeholder='Название файла'
                                                    required
                                                />
                                                <input
                                                    type='date'
                                                    name="due_date"
                                                    onChange={(e)=>{setDueDate(e.target.value)}}
                                                    placeholder="Укажите дату"
                                                    required
                                                />
                                                <select className="selectLessonId" onChange={(e)=>{setLessonsId(e.target.value)}}>
                                                {
                                                    selectLessonId?.map(item=>(
                                                        <option key={item?.id} value={item?.id}>{item?.title}</option>
                                                    ))
                                                }
                                            </select>
                                                <input
                                                    type="file"
                                                    name='file'
                                                    onChange={(e)=>{setFile(e.target.files[0])}}
                                                    required
                                                />
                                                <button type="submit" onClick={()=>{setOpenHwEdit(!openHwEdit)}}>Изменить</button>
                                            </form>
                                </div>
                            </div>
            </section>
        </div>
    )
}