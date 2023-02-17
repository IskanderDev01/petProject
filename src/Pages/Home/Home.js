import React from "react";
import './home.css'
import logotype from '../../imgs/logotype.png'
import { NavLink } from "react-router-dom";


export default function Home(){
    return(
        <div className="page">
                <section className="home_header">
                    <div className="home_header_banner">
                    <div className="body">
                    <div className="home_header_banner_menu">
                        <div><img src={logotype}/></div>
                        <NavLink to="/login"><div>Вход <i className='bx bx-door-open'></i></div></NavLink>
                    </div>
                    <div className="home_header_banner_info">
                        <div>ОБРАЗОВАТЕЛЬНЫЙ УЧЕБНЫЙ КУРС</div>
                        <div>ОНЛАЙН КУРС ПО РУССКОМУ ЯЗЫКУ</div>
                    </div>
                    </div>
                    </div>
                </section>
                <section className="home_footer">
                    <div className="home_footer_icons">
                        <div><i className='bx bxl-facebook'></i></div>
                        <div><i className='bx bxl-instagram-alt' ></i></div>
                        <div><i className='bx bxl-telegram' ></i></div>
                        <div><i className='bx bxl-twitter' ></i></div>
                    </div>
                </section>
        </div>
    )
}