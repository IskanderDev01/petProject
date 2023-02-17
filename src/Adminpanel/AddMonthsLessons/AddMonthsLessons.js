import React, { useState,useEffect, useRef } from "react";
import SearchHeader from "../../Components/SearchHeader/SearchHeader";
import './addmonthslessons.css'
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddMonthsLessons(){
    let formData = new FormData();
    const [images,setImages] = useState([])
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [video,setVideo]=useState('')
    const [categoriyId,setCategoriyId]=useState('')
    const [openLessonsEdit,setOpenLessonsEdit]=useState(false)
    const [months,setMonths]=useState([])
    const [openAddMonth,setOpenAddMonth]=useState(false)
    const [id, setId] = useState('')
    const [selectCategoryId,setSelectCategoryId]=useState([])
    const navigate=useNavigate()

    const editTitleInput = useRef(null)
    const editDescriptionInput = useRef(null)
    const editVideosLinkInput = useRef(null)

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: {errors,isValid}
    }=useForm({
        mode: "onSubmit"
    })

    useEffect(()=>{
        if(window.localStorage.getItem('role')!=="super-admin"){
            navigate('/main', {replace:true})
        }
    },[])

    const getLessons = async ()=>{
        await http    
            .get('/lesson/index')
            .then(res=>{
                setMonths(res?.data)
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const getCategorys = async ()=>{
        await http
            .get('/category/index')
            .then(res =>{
                setSelectCategoryId(res?.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    useEffect(()=>{
        getLessons()
        getCategorys()
    },[])

    const submited = (e) =>{
        e.preventDefault()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image',images)
        formData.append('video',video)
        formData.append('category_id',categoriyId)
            http
                .post('/lesson/create',formData)
                .then(res=>{
                    if(res.status==201){
                        getLessons()
                    }
                })
                .catch(err => console.log(err))
                
            setOpenAddMonth(!openAddMonth)
    }

    const edited= async (e)=>{
        e.preventDefault()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image',images)
        formData.append('video',video)
        formData.append('category_id',categoriyId)
        await http
                .post(`/lesson/update/${id}`,formData)
                .then(res=>{
                    if(res.status==200){
                        getLessons()
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
                
            setOpenLessonsEdit(!openLessonsEdit)
    }


    const editwindow=(item)=>{
        setOpenLessonsEdit(!openLessonsEdit)
        setId(item.id)
        editTitleInput.current.value = item.title
        editDescriptionInput.current.value = item.description
        editVideosLinkInput.current.value = item.video
    }

    const deleted = async (id) =>{
        http
            .delete(`/lesson/delete/${id}`)
            .then(res =>{
                let monthList = months.filter(user => user.id !== id)
                setMonths(monthList)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="adminPanelPage container">
        <SearchHeader/>
        <div className="adminPanelPageTitle">Урок</div>
        <section>
        <div className={openLessonsEdit ? "monthsLessonsEdit_close" : "monthsLessonsEdit_open"}>
            <div className={openAddMonth ? "addMonth_close" : "addMonth_open"}>
                <div className="addMonths_lesson_btn">
                    <button onClick={()=>setOpenAddMonth(!openAddMonth)}>добавить</button>
                </div>
            </div>
        </div>

        <div className={openLessonsEdit ? "monthsLessonsEdit_close" : "monthsLessonsEdit_open"}>
                <div className={openAddMonth ? "addMonth_close" : "addMonth_open"}>
                    <div className="addTables">
                        <div className="addTables_th">
                            <div className="addTables_none">ID</div>
                            <div>Тема</div>
                            <div>Текст</div>
                            <div className="addTables_none">Картинка</div>
                            <div className="addTables_none">Видео</div>
                            <div className="addTables_th_options">
                                <div>Изменить</div>
                                <div>Удалить</div>
                            </div>
                        </div>

                        {
                            months?.map((item)=>(
                                <div className="addTables_th th_topborder" key={item?.id}>
                                    <div className="addTables_none">{item?.id}</div>
                                    <div>{item?.title}</div>
                                    <div>{item?.description}</div>
                                    <div className="addTables_none"><img src={item?.image} /></div>
                                    <div className="addTables_none">{item?.video}</div>
                                    <div className="addTables_th_options">
                                        <div onClick={()=> {editwindow(item)}} className="addTbles_shift_one"><i className='bx bxs-edit-alt'></i></div>
                                        <div onClick={()=>{deleted(item?.id)}} className="addTbles_shift_two"><i className='bx bxs-trash-alt'></i></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


{/* =================================================LESSONS ADD================================================= */}
                <div className={openLessonsEdit ? "monthsLessonsEdit_close" : "monthsLessonsEdit_open"}>
                    <div className={openAddMonth ? "addMonth_open" : "addMonth_close"}>
                        <div className="addMonths_lesson">
                            <div className="addMonths_close"><span onClick={()=>{setOpenAddMonth(!openAddMonth)}}>x</span></div>
                            <div className="addMonths_title">Создаем урок</div>
                            <form onSubmit={(e)=>{submited(e)}}>
                                <label htmlFor="title">Название темы</label>
                                <input type="text" name="title" id="title" onChange={(e)=>{setTitle(e.target.value)}} required/>
                                <label htmlFor="description">Содержание темы</label>
                                <textarea className="textareaL" onChange={(e)=> setDescription(e.target.value)}/>
                                <label htmlFor="image">Выберите изображение</label>
                                <input type="file" name="image" id="image" onChange={(e)=>{setImages(e.target.files[0])}} required/>
                                <label htmlFor="video">Оставьте ссылку на видео</label>
                                <input type="text" name="video" id="video" onChange={(e)=>{setVideo(e.target.value)}} required/>
                                <label htmlFor="categoryId">Месяц в которую добавляем урок</label>
                                <select className="selectCategoryId" onChange={(e)=>{setCategoriyId(e.target.value)}}>
                                    {
                                        selectCategoryId?.map(item=>(
                                            <option key={item?.id} value={item?.id}>{item?.name}</option>
                                        ))
                                    }
                                </select>
                                <button type="submit">Создать урок</button>
                            </form>
                        </div>
                    </div>
                </div>
{/* =================================================LESSONS EDIT================================================= */}

                <div className={openLessonsEdit ? "monthsLessonsEdit_open" : "monthsLessonsEdit_close"}>
                    <div className="addMonths_lesson">
                        <div className="addMonths_close" onClick={()=>{setOpenLessonsEdit(!openLessonsEdit)}}><span>x</span></div>
                        <div className="addMonths_title">Изменяем урок</div>
                        <form onSubmit={e => edited(e)}>
                            <label htmlFor="title">Поменяйте название темы</label>
                            <input 
                                ref={editTitleInput}
                                type="text" 
                                name="title" 
                                id="title" 
                                onChange={(e)=>{setTitle(e.target.value)}} 
                                required
                                />
                            <label htmlFor="description">Поменяйте содержание темы</label>
                            <textarea 
                                ref={editDescriptionInput}
                                className="textareaL" 
                                onChange={(e)=> setDescription(e.target.value)}
                                />
                            <label htmlFor="image">Выберите изображение</label>
                            <input 
                                type="file" 
                                name="image" 
                                id="image" 
                                onChange={(e)=>{setImages(e.target.files[0])}} 
                                required
                                />
                            <label htmlFor="video">Оставьте ссылку на видео</label>
                            <input 
                                ref={editVideosLinkInput}
                                type="text" 
                                name="video" 
                                id="video" 
                                onChange={(e)=>{setVideo(e.target.value)}} 
                                required
                                />
                            <label htmlFor="categoryId"> Месяц в которую добавляем урок</label>
                            <select className="selectCategoryId" onChange={(e)=>{setCategoriyId(e.target.value)}}>
                                    {
                                        selectCategoryId?.map(item=>(
                                            <option key={item?.id} value={item?.id}>{item?.name}</option>
                                        ))
                                    }
                            </select>
                            <button type="submit">Изменить урок</button>
                        </form>
                    </div>
                </div>
        </section>
        </div>
    )
}