import React from 'react'
import { Outlet } from 'react-router-dom'

function LayoutHome() {
    return (
        <>
            <header>
                Header
            </header>
            <main>
                <nav>
                    Nav
                </nav>
                <article>
                    <Outlet />
                </article>
            </main>
            <footer>
                Footer
            </footer>
        </>
    )
}
export default LayoutHome
