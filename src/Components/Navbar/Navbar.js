import React from "react";
import './navbar.css';
import avatar from '../../imgs/avatar.png'
import { NavLink } from "react-router-dom";

export default function Navbar({role, user}){
    return(
            <div className="navbar">
                    {
                        role == 'super-admin' ? <div className="navbar__panel"><NavLink to="/result">админ панель</NavLink></div> : <></>
                    }
                    <div className="navbar__user">
                        <div className="navbar__user-name">{user}</div>
                        <div className="navbar__user-avatar"><img src={avatar}/></div>
                        <div className="navbar__user-btn"></div>
                    </div>
            </div>
    )
}