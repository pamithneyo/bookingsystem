import React from 'react'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout(){
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }
    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/home">Booking.com</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav justify-content-start mr-5">
                        <>
                            {user ? (<>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span style={{ color: "white" }}>👥</span>  {user.name} 
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="/profile" style={{ color: "black" }}>Profile</a>
                                        <a class="dropdown-item" href="#" onClick={logout} style={{ color: "black" }}>Logout</a>
                                    </div>
                                </div>
                            </>
                            ) : (
                                <>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/register">
                                            Register
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">
                                            Login
                                        </a>
                                    </li>
                                </>)}
                        </>
                    </ul>

                </div>
            </nav>
        </div>
    );
}
export default Navbar