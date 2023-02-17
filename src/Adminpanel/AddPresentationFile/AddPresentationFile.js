import React, { useState, useEffect } from "react";
import http from "../../api/http";
import SearchHeader from "../../Components/SearchHeader/SearchHeader";
import { useNavigate } from "react-router-dom";
import './addpresentationfile.css'
import { useRef } from "react";

export default function AddPresentationFile() {
    const [openPresentAdd, setOpenPresentAdd] = useState(false)
    const [selectLessonId, setSelectLessonId] = useState([])
    const [openPresentEdit, setOpenPresentEdit] = useState(false)

    const editTitleInput = useRef(null)


    let formData = new FormData();
    const [title, setTitle] = useState('')
    const [media, setMedia] = useState([])
    const [lessonsId, setLessonsId] = useState('')
    const navigate = useNavigate()
    const [presentDate, setPresentDate] = useState([])
    const [id, setId] = useState('')

    useEffect(() => {
        if (window.localStorage.getItem('role') !== "super-admin") {
            navigate('/main', { replace: true })
        }
    }, [])

    const getAdditional = async ()=>{
        await http
                .get('/additional/index')
                .then(res => {
                    setPresentDate(res?.data)
                })
                .catch(err => console.log(err))
    }

    const getLessons = async ()=>{
        await http
                .get('/lesson/index')
                .then(res => {
                    setSelectLessonId(res?.data)
                })
                .catch(err => console.log(err))
    }

    useEffect(() => {
        getAdditional()
        getLessons()
    }, [])

    const submited = (e) => {
        e.preventDefault()
        formData.append('title', title)
        formData.append('media', media)
        formData.append('lesson_id', lessonsId)
        http
            .post('/additional/create', formData)
            .then(res => {
                if(res.status==201){
                    getAdditional()
                }
            })
            .catch(err => console.log(err))
    }

    const edited = async (e) => {
        e.preventDefault()
        formData.append('title', title)
        formData.append('media', media)
        formData.append('lesson_id', lessonsId)
        await http
            .post(`/additional/update/${id}`, formData)
            .then(res => {
                if(res.status==200){
                    getAdditional()
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    const editwindow = (item) => {
        setOpenPresentEdit(!openPresentEdit)
        setId(item.id)
        editTitleInput.current.value = item.title
    }

    const deleted = async (id) => {
        http
            .delete(`/additional/delete/${id}`)
            .then(res => {
                let presentList = presentDate.filter(user => user.id !== id)
                setPresentDate(presentList)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="adminPanelPage container">
            <SearchHeader />
            <div className="adminPanelPageTitle">Презентационный файл на тему</div>
            <section>
                <div className={openPresentEdit ? "presentEdit_close" : "presentEdit_open"}>
                    <div className={openPresentAdd ? "presentAdd_close" : "presentAdd_open"}>
                        <div onClick={() => { setOpenPresentAdd(!openPresentAdd) }} className="user_add_btn"><button>добавить</button></div>
                    </div>
                </div>
                <div className={openPresentEdit ? "presentEdit_close" : "presentEdit_open"}>
                    <div className={openPresentAdd ? "presentAdd_close" : "presentAdd_open"}>
                        <div className="presentTabel">
                            <div className="presentTable_header">
                                <div className="presentTable_infos">
                                    <div>ID</div>
                                    <div>Название файла</div>
                                    <div>Файл</div>
                                    <div>Уроку</div>
                                </div>
                                <div className="presentTable_options">
                                    <div>изменить</div>
                                    <div>удалить</div>
                                </div>
                            </div>
                            {
                                presentDate?.map(item => (
                                    <div className="presentTable_body" key={item?.id}>
                                        <div className="presentTable_info">
                                            <div>{item?.id}</div>
                                            <div>{item?.title}</div>
                                            <div><a href={item?.media} download={item?.media}>cкачать</a></div>
                                            <div>{item?.lesson_title}</div>
                                        </div>
                                        <div className="presentTable_option">
                                            <div onClick={() => { editwindow(item) }}><i className='bx bxs-edit-alt'></i></div>
                                            <div onClick={() => { deleted(item.id) }}><i className='bx bxs-trash-alt'></i></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {/* =================================================PRESENTATION ADD================================================= */}
                <div className={openPresentEdit ? "presentEdit_close" : "presentEdit_open"}>
                    <div className={openPresentAdd ? "presentAdd_open" : "presentAdd_close"}>
                        <div className="presentation_add">
                            <div className="presentationForm_close"><span onClick={() => setOpenPresentAdd(!openPresentAdd)}>x</span></div>
                            <div className="presentationAdd_title">добавить презентационный файл</div>
                            <form onSubmit={(e) => { submited(e) }}>
                                <input
                                    name="title"
                                    placeholder="Название темы"
                                    type="text"
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    required
                                />
                                <input
                                    name="media"
                                    placeholder="Выберите файл"
                                    type="file"
                                    onChange={(e) => { setMedia(e.target.files[0]) }}
                                    required
                                />
                                <select className="selectLessonId" onChange={(e) => setLessonsId(e.target.value)}>
                                    {
                                        selectLessonId?.map(item => (
                                            <option key={item?.id} value={item?.id}>{item?.title}</option>
                                        ))
                                    }
                                </select>
                                <button type="submit" onClick={() => { setOpenPresentAdd(!openPresentAdd) }}>Добавить</button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* =================================================PRESENTATION EDIT================================================= */}
                <div className={openPresentEdit ? "presentEdit_open" : "presentEdit_close"}>
                    <div className="presentation_add">
                        <div className="presentationForm_close"><span onClick={() => setOpenPresentEdit(!openPresentEdit)}>x</span></div>
                        <div className="presentationAdd_title">изменить презентационный файл</div>
                        <form onSubmit={e => edited(e)}>
                            <input
                                ref={editTitleInput}
                                name="title"
                                placeholder="Название темы"
                                type="text"
                                onChange={(e) => { setTitle(e.target.value) }}
                                required
                            />
                            <input
                                name="media"
                                placeholder="Выберите файл"
                                type="file"
                                onChange={(e) => { setMedia(e.target.files[0]) }}
                                required
                            />
                            <select className="selectLessonId" onChange={(e) => setLessonsId(e.target.value)}>
                                {
                                    selectLessonId?.map(item => (
                                        <option key={item?.id} value={item?.id}>{item?.title}</option>
                                    ))
                                }
                            </select>
                            <button type="submit" onClick={() => { setOpenPresentEdit(!openPresentEdit) }}>Изменить</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}