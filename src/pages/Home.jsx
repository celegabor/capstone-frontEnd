import React from 'react'
import PostProvider from "../context/context";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarElement from '../components/navbar/MyNavbar';
import MyFooter from '../components/footer/MyFooter';
import Main from '../components/main/Main';
import MySidebar from '../components/L-sidebar/MySidebar';
import MySidebarR from '../components/R-sidebar/MyR-Sidebar'
import MyTopSidebar from '../components/topSidebar/MyTopSidebar'


const Home = ()=> {
  return (
    <PostProvider>
      <nav>
        <NavbarElement/>
      </nav>
      <section>
        <MySidebar/>
        <MyTopSidebar/>
        <MySidebarR/>
      </section>
      <main>
        <Main/>
      </main>
      <footer>
        <MyFooter/>
      </footer>
    </PostProvider>
  )
}

export default Home;