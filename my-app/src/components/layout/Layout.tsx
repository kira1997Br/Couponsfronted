import React from "react";
import Header from "../header/Header";
import Aside from "../aside/Aside";
import Main from "../main/Main";
import Footer from "../footer/Footer";
import './Layout.css';

export default function Layout(){
return(
    <div>
            <header>
                <Header/>
            </header>
            <aside>
                <Aside/>
            </aside>
            <main>
                <Main/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
)
}