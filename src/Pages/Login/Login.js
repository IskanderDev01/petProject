import React from "react";
import { useNavigate } from "react-router-dom";
import http from "../../api/http";
import { useForm } from "react-hook-form";
import "./login.css"

export default function Login(){
    

    let navigate = useNavigate();

    const { 
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    
    function EnterFun(){
        navigate("/main", {replace:true})
    }


    const onSubmit=(data)=>{
        http
            .post('/login',data)
            .then(res =>{
                console.log(res?.data?.data?.role);
                window.localStorage.setItem('role', res?.data?.data?.role)
                window.localStorage.setItem('token', res?.data?.data?.token)
                window.localStorage.setItem('user', res?.data?.data?.user_name)
                window.localStorage.setItem('user_id', res?.data?.data?.id)
                EnterFun()
            })
            .catch(err=>{
                console.log(err)
                console.log(data);
            })
    }

    return(
        <div className="login">
        <div className="login-background">
        <div className="form-login-block">
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <span>Авторизоваться</span>
            <input  
                name="email" 
                type="email" 
                placeholder="Email"
                {...register("email", { required: true })}
            />
            <input  
                name="password" 
                type="password" 
                placeholder="Пароль"
                {...register("password", { required: true })}
            />
            <button type="submit" >отправить</button>
        </form>
        </div>
        </div>
        </div>
    )
}