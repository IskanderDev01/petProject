import React, { useState } from "react";
import './searchheader.css'
import adminlogo from '../../imgs/AdminLTELogo.png'
import avatar from '../../imgs/avatar.png'
import { Link } from "react-router-dom";
export default function SearchHeader(){
    const [opentSearchBlock,setOpenSearchBlock]=useState(false)
    const [openSidebarBlock,setOpenSidebarBlock]=useState(false)
    const [serachData,setSearchData]=useState('')
    let user = window.localStorage.getItem('user')


    return(
        <div className="search-sidebar">
            <div className="sidebar">
                <div className={openSidebarBlock ? "sidebarOpen" : "sidebarClose"}>
                <div className="sidebar_block">
                    <div className="adminLogo"><img src={adminlogo}/> <span>Админ панель</span></div>
                    <div className="sidebar_navs">
                        <div className="user_account"><img src={avatar}/><span>{user}</span></div>
                        <Link to="/result"><div className="sidebar_nav"><span>Статистика</span> </div></Link>
                        <Link to="/addmonth"><div className="sidebar_nav"><span>Месяцы</span></div></Link>
                        <Link to="/addmonthslessons"><div className="sidebar_nav"><span>Уроки месяцев</span></div></Link>
                        <Link to="/addusers"><div className="sidebar_nav"><span>Пользователи</span></div></Link>
                        <Link to="/addpresentationfile"><div className="sidebar_nav"><span>Презентация на тему</span></div></Link>
                        <Link to="/addhomework"><div className="sidebar_nav"><span>Задания по теме</span></div></Link>
                        <Link to="/studentsanswers"><div className="sidebar_nav"><span>Ответы учеников</span></div></Link>
                        <Link to="/studentscomments"><div className="sidebar_nav"><span>Комменты учеников</span></div></Link>
                    </div>
                </div>
                </div>
                <div className="sidebar-btn">
                    <button onClick={()=>setOpenSidebarBlock(!openSidebarBlock)}><i className='bx bx-menu'></i></button>
                </div>
            </div>

            <div className="search">
            <div className={opentSearchBlock ? "searchOpen" : "searchClose"}>
            <div className="search_input">
                <input 
                type="text"
                value={serachData}
                onChange={event => setSearchData(event.target.value)}
                placeholder="Search"
                />
                <div className="input-buttons">
                    <button className="btn-search"><i className='bx bx-search'></i></button>
                    <button className="btn-close" onClick={()=>setOpenSearchBlock(false)}><i className='bx bx-x'></i></button>
                </div>
            </div>
            </div>
            <button className={opentSearchBlock ? "serch-icon-btn" : "search-icon-btn-open"} onClick={()=>setOpenSearchBlock(true)}><i className='bx bx-search'></i></button>
            </div>
        </div>
    )
}