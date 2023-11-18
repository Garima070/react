import React ,{useEffect} from 'react'
import {Link, useHistory} from "react-router-dom"
import {useLocation} from "react-router-dom"


const Navbar = () => {
  let history=useHistory()
  const handlelogout=()=>{
    localStorage.removeItem('token')
    history.push("/login")
  }
    let location =useLocation()
    // useEffect(()=>{
    //     console.log(location.pathname)
    // },[location])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNoteBook </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link"  aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/about">About</Link>
        </li>
      </ul>
      {!(localStorage.getItem("token"))? <form className="d-flex">
        <Link className="btn btn-primary mx-1" to="/login" role="button">login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">signup</Link>
      </form>: <button onClick={handlelogout} className="btn btn-primary">Log out</button>
}
    </div>
  </div>
</nav>
  )
}

export default Navbar
