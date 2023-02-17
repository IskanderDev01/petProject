import React, { useState,useEffect, useRef } from "react";
import http from "../../api/http";
import SearchHeader from "../../Components/SearchHeader/SearchHeader";
import { useForm } from "react-hook-form";
import './addusers.css'
import { useNavigate } from "react-router-dom";


export default function AddUsers(){
    const [usersProfile,setUsersProfile]=useState([])
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [openUserAdd,setOpenUserAdd]=useState(false)
    const [openUserEdit,setOpenUserEdit]=useState(false)
    const [id, setId] = useState('')
    const navigate=useNavigate()

    const editedNameInput = useRef(null)
    const editedGmailInput = useRef(null)

    useEffect(()=>{
        if(window.localStorage.getItem('role')!=="super-admin"){
            navigate('/main', {replace:true})
        }
    },[])

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    }=useForm({
        mode:"onBlur"
    })

    const getUsers = async ()=>{
        await http    
                .get('/user/index')
                .then(res=>{
                    setUsersProfile(res?.data)
                })
                .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getUsers()
    },[])

    const onsubmit = (data)=>{
        http
            .post('/user/create', data)
            .then(res =>{
                console.log(res)
                if(res.status == 201){
                    getUsers()
                }
            })
            .catch(err => console.log(err))
            reset();
    }

    const edited= async (e)=>{
        e.preventDefault()
        await http
                .post(`/user/update/${id}`,{
                    name:name,
                    email:email,
                    password:password
                })
                .then(res=>{
                    console.log(res);
                    if(res.status == 200){
                        getUsers()
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
    }


    const editwindow=(user)=>{
        setOpenUserEdit(!openUserEdit)
        setId(user.id)
        editedNameInput.current.value = user.name
        editedGmailInput.current.value = user.email
    }

    const deleted = async (id) =>{
        http
            .delete(`/user/delete/${id}`)
            .then(res =>{
                let userList = usersProfile.filter(user => user.id !== id)
                setUsersProfile(userList)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="adminPanelPage container">
            <SearchHeader/>
            <div className="adminPanelPageTitle">Пользователи</div>
            <section>
{/* =================================================USER ADD================================================= */}
        <div className={openUserEdit?"user_edit_close" : "user_edit_open"}>
            <div className={openUserAdd ? "user_add_open" : "user_add_close"}>
                <div className="user_add">
                    <div className="userForm_close"><span onClick={()=>{setOpenUserAdd(!openUserAdd)}}>x</span></div>
                    <div className="userAdd_title">Регистрация участника</div>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <input 
                    name="name" 
                    type="text" 
                    placeholder="Имя"
                    {...register('name', {
                        required:"Поле обьязательно к заполнению"
                    })} 
                    />
                    <div style={{color:"red"}}>
                        {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
                    </div>
                    <input 
                    name="email" 
                    type="email" 
                    placeholder="Email"
                    {...register('email', {
                        required: "Поле обьязательно к заполнению"
                    })}
                    />
                    <div style={{color:"red"}}>
                        {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
                    </div>
                    <input 
                    name="password"  
                    type="password" 
                    placeholder="Пароль"
                    {...register('password', {
                        required: "Поле обьязательно к заполнению",
                        minLength:{
                            value:8,
                            message:"Пароль должен содержать больше 8 символов"
                        }
                    })}
                    />
                    <div style={{color:"red"}}>
                        {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
                    </div>
                    <button type="submit" disabled={!isValid} onClick={()=>setOpenUserAdd(!openUserAdd)}>добавить</button>
                </form>
                </div>
            </div>
        </div>
        <div className={openUserEdit?"user_edit_close" : "user_edit_open"}>
            <div className={openUserAdd ? "user_btn_close" : "user_btn_open"}>
                <div className="user_add_btn"><button onClick={()=>setOpenUserAdd(!openUserAdd)}>добавить</button></div>
            </div>
            </div>
{/* =================================================USERS LIST================================================= */}
    <section className={openUserEdit?"user_edit_close" : "user_edit_open"}>
                <div className={openUserAdd ? "user_btn_close" : "user_btn_open"}>
                    <div className="userTable">
                        <div className="users_table_header">
                            <div className="users_infos">
                                <div>Email</div>
                                <div>Имя</div>
                            </div>
                            <div className="users-options">
                                <div>Изменить</div>
                                <div>Удалить</div>
                            </div>
                        </div>
                        
                        {
                            usersProfile?.map((user,id)=>(
                        <div className="users_table" key={user?.id}>
                            <div className="users_info">
                                <div>{user?.email}</div>
                                <div>{user?.name}</div>
                            </div>
                            <div className="users-option">
                                <div onClick={()=> {editwindow(user)}}><i className='bx bxs-edit-alt'></i></div>
                                <div onClick={()=>{deleted(user?.id)}}><i className='bx bxs-trash-alt'></i></div>
                            </div>
                        </div>
                                
                            ))
                        }
                        
                    </div>
                    </div>
    </section>
                <div className={openUserEdit ? "user_edit_open" : "user_edit_close"}>
                    <div className="user_add">
                    <div className="userForm_close"><span onClick={()=>{setOpenUserEdit(!openUserEdit)}}>x</span></div>
                        <div className="userAdd_title">Изменить</div>
                        <form onSubmit={e => edited(e)}>
                            <input
                            ref={editedNameInput}
                            name="name"
                            type="text"
                            onChange={(e)=>{setName(e.target.value)}}
                            placeholder="Имя"
                            />
                            <input
                            ref={editedGmailInput}
                            name="email"
                            type="email"
                            onChange={(e)=>{setEmail(e.target.value)}}
                            placeholder="Email"
                            />
                            <input
                            name="password"
                            type="password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                            placeholder="Пароль"
                            />
                            <button type="submit" onClick={()=>{setOpenUserEdit(!openUserEdit)}}>Изменить</button>
                        </form>
                    </div>
                    </div>
            </section>
        </div>
    )
}