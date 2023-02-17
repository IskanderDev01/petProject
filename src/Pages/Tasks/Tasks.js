import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import http from "../../api/http";
import './tasks.css'

export default function Tasks() {
    const [file, setFile] = useState([])
    const [title, setTitle] = useState('')
    const [comment, setComment] = useState('')

    const fileInput = useRef(null)
    const titleInput = useRef(null)
    const commentInput = useRef(null)

    let formData = new FormData()
    let role = window.localStorage.getItem('role')
    let user = window.localStorage.getItem('user')
    let userId = window.localStorage.getItem('user_id')

    const navigate = useNavigate()
    const [assId, setAssId] = useState(1)
    const [lessonInfo, setLessonInfo] = useState({})
    const { idlesson } = useParams()

    const getLessons = async ()=>{
        await http
                .get(`/lesson/show/${idlesson}`)
                .then(res => {
                    setLessonInfo(res?.data?.assignments[0])
                    setAssId(res?.data?.assignments[0]?.id)

                })
                .catch(err => console.log(err))
    }

    useEffect(() => {
        getLessons()
    }, [])

    const Submited = (e) => {
        e.preventDefault()
        formData.append("user_id", userId)
        formData.append("assignment_id", assId)
        formData.append("file", file)
        formData.append("title", title)
        
        http
            .post('/response/create', formData)
            .then(res => {
                fileInput.current.value = null
                titleInput.current.value = null
                commentInput.current.value = null
                
            })
            .catch(err => {
                console.log(err)
            })

        http
            .post('/comment/create', {
                message: comment,
                assignment_id: assId,
            })
            .then(res => {
            })
            .catch(err => console.log(err))
    }



    return (
        <div>
            <header>
                <Navbar role={role} user={user} />
                <section className="content container">
                    <div className="contentsTask">
                        <div className="tasksTitle">Задание по теме</div>
                        <div className="homeTasks_date">
                            <div>Добавлено:    <span>{lessonInfo?.created_at}</span></div>
                            <div>Срок сдачи: <span>{lessonInfo?.due_date}</span></div>
                            <div>Файл: <span>{lessonInfo?.title}</span></div>
                        </div>

                        <div className="tasksResponse">
                            <div>Отправить задание</div>
                            <form onSubmit={(e) => { Submited(e) }}>
                                <label htmlFor="file">Выберите файл:</label>
                                <input
                                    ref={fileInput}
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={(e) => { setFile(e.target.files[0]) }}
                                />
                                <label htmlFor="title">Напишите название файла:</label>
                                <input
                                    ref={titleInput}
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="название файла"
                                    onChange={(e) => { setTitle(e.target.value) }}
                                />
                                <label htmlFor="comment">Добавить коммент</label>
                                <input
                                    ref={commentInput}
                                    type="text"
                                    id="comment"
                                    name="title"
                                    placeholder="напишите коммент"
                                    onChange={(e) => { setComment(e.target.value) }}
                                />
                                <button type="submit">отправить</button>
                            </form>


                        </div>

                    </div>
                </section>
            </header>
        </div>
    )
}