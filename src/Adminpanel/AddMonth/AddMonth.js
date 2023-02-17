import React, { useState, useEffect, useRef } from "react";
import './addmonth.css'
import SearchHeader from "../../Components/SearchHeader/SearchHeader";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddMonth() {
    const [months, setMonths] = useState([])
    const [OpenMonthsEdit, setOpenMonthsEdit] = useState(true)
    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const editMonthsNameInput = useRef(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm({
        mode: "onSubmit"
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (window.localStorage.getItem('role') !== "super-admin") {
            navigate('/main', { replace: true })
        }
    }, [])

    useEffect(() => {
        getCategoris()
    }, [])

    const getCategoris = async () => {
        await http
            .get('/category/index')
            .then(res => {
                setMonths(res?.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onsubmit = (data) => {
        http
            .post('/category/create', data)
            .then(res => {
                if(res.status == 201) {
                    getCategoris()
                } 
            })
            .catch(err => console.log(err));
        reset()
    }

    const edited = async (e) => {
        e.preventDefault()
        await http
            .post(`/category/update/${id}`, {
                name: name,
            })
            .then(res => {
                if(res.status == 200) {
                    getCategoris()
                } 
            })
            .catch(err => {
                console.log(err);
            })
    }

    const editWindow = (item) => {
        setOpenMonthsEdit(!OpenMonthsEdit)
        setId(item.id)
        editMonthsNameInput.current.value = item.name
    }

    const deleted = async (id) => {
        http
            .delete(`/category/delete/${id}`)
            .then(res => {
                let monthList = months.filter(item => item.id !== id)
                setMonths(monthList)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="adminPanelPage container">
            <SearchHeader />
            <div className="adminPanelPageTitle">Месяцы</div>
            <section>
                <div className={OpenMonthsEdit ? "monthsBLock_open" : "monthsBlock_close"}>
                    <div className="monthTable-add">
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <input
                                name="name"
                                type="text"
                                placeholder="добавить месяц"
                                {...register('name', {
                                    required: "Поле обьязательно к заполнению!"
                                })}
                            />
                            <div style={{ color: "red" }}>
                                {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
                            </div>
                            <button type="submit" disabled={!isValid}>добавить</button>
                        </form>
                    </div>
                </div>
                {/* =================================================MONTHs EDIT================================================= */}
                <div className={OpenMonthsEdit ? "monthsBlock_close" : "monthsBlock_open"}>
                    <div className="monthTable-add">
                        <form onSubmit={e => edited(e)}>
                            <input
                                ref={editMonthsNameInput}
                                name="name"
                                type="text"
                                placeholder="Название месяца"
                                onChange={(e) => { setName(e.target.value) }}
                            />

                            <button type="submit" onClick={() => setOpenMonthsEdit(!OpenMonthsEdit)}>изменить</button>
                        </form>
                    </div>
                </div>

                <div className="monthTable">
                    <div className="monthTable_th">
                        <div className="month-names">
                            <div>ID</div>
                            <div>Название</div>
                        </div>
                        <div className="month-options">
                            <div>Изменить</div>
                            <div>Удалить</div>
                        </div>
                    </div>

                    {
                        months?.map((item) => (
                            <div className="monthTable_tr" key={item?.id}>
                                <div className="month-name">
                                    <div>{item?.id}</div>
                                    <div>{item?.name}</div>
                                </div>
                                <div className="month-option">
                                    <div onClick={() => { editWindow(item) }}><i className='bx bxs-edit-alt'></i></div>
                                    <div onClick={() => { deleted(item?.id) }}><i className='bx bxs-trash-alt'></i></div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </section>
        </div>
    )
}