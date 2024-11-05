import React from 'react'
import Header from "../../components/public/header"
import Footer from "../../components/public/footer"
import { Outlet } from 'react-router-dom'
function InfoCourse() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default InfoCourse;