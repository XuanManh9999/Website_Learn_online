import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/public/footer';
import ModelAuth from '../../components/share/ModelAuth/ModelAuth';
import { useDispatch } from 'react-redux';
import { clear_user, save_user } from '../../redux/action/auth';
import { apiGetInfo } from '../../services/private/auth';
import Header from '../../components/public/header';
import "./LayOutCss.scss"
function LayoutHome() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetching = async () => {
            const response = await apiGetInfo();
            if (response && response?.status == 200) {
                dispatch(save_user(response.user))
            } else {
                dispatch(clear_user())
            }
        }
        fetching();
    }, [])
    return (
        <div className='layout__home'>
            <Header />
            <main style={{
                marginTop: "66px"
            }}>
                <article>
                    <Outlet />
                </article>
            </main>
            <Footer />
            <ModelAuth />
        </div>
    )
}
export default LayoutHome
