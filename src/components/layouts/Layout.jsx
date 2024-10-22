import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {

  const [theme,setTheme] = useState("light");

  useEffect(()=> {
    if(theme === "dark"){
      document.documentElement.classList.add("dark")
    }
    else{
      document.documentElement.classList.remove("dark")
    }

  },[theme])

  const changeTheme = () => {
    setTheme( theme === "light"? "dark" : "light")
  }

  return (
    <>
    <Navbar theme={theme} changeTheme={changeTheme} />
    <main>
      {children}
    </main>
    <Footer/>

      
    </>
  )
}

export default Layout
