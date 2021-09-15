import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'


export const Navbar = () => {
  const [progress, setProgress] = useState(0)
    return (
        <>
             <LoadingBar
        color='#f11520'
        height={3}
        progress={progress}
        shadow='true'
        onLoaderFinished={() => setProgress(0)}
      />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" onClick={() => setProgress(100)} to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" onClick={() => setProgress(100)} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={() => setProgress(100)} to="/about">About</Link>
        </li>
       
      </ul>
      <form className="d-flex">
        <input className="form-control me-2 round search" type="search" placeholder="Search" aria-label="Search"/>
        </form>
    </div>
  </div>
</nav>
        </>
    )
}

export default Navbar
