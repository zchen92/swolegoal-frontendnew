import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

export default class Nav extends Component {
    
    logout = () => {
        localStorage.clear();
    }

    render() {
        if(localStorage.token && localStorage.id) {
            return (

                    <nav className="navbar navbar-expand-lg navbar-light bg-light nav justify-content-end">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse nav justify-content-end" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="/about"><img className="mb-4" src="https://i.imgur.com/AZWXyaj.png?2" alt width="72" height="72"></img></a>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/login" onClick={this.logout}>Logout<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Profile</a>
                        </li>
                        </ul>
                    </div>
                    </nav>

            //     <nav className="nav-bar" className='container-fluid navbar-expand-lg navbar-light bg-light' className="card-header">
            //     {/* <img src="https://i.imgur.com/do73SsO.jpg" alt="exercise-image"></img> */}
            //     <div className='container-fluid'>
            //         <ul className='nav justify-content-end'>
            //             <li className='nav-item'>
            //                 <Link className="alert-link" to='/about'>
            //                     <h1 className='display-6'>SwoleGoals</h1>
            //                 </Link>
            //                 <Link className='nav-link active' to='/login'>
            //                     <button type="button" className='btn btn-outline-warning' onClick={this.logout}></button>
            //                 </Link>
            //                 <Link className='nav-link active' to='/home'>
            //                     <button type="button" className='btn btn-outline-warning'></button>
            //                 </Link>
            //             </li>
            //         </ul>
            //     </div>
            // </nav>
            )
        } else
        return (
            <nav className="container-fluid navbar-expand-lg navbar-light bg-light" className="card-header">
                {/* <img src="https://i.imgur.com/do73SsO.jpg" alt="exercise-image" className="card-img-top"></img> */}
                {/* <Link className="alert-link" class="alert alert-info" to='/'>
                    <h1 className='display-6'>Swole Goals</h1>
                </Link> */}
                <div className='container-fluid'>
                    <ul className='nav justify-content-end'>
                        <li className='nav-item'>
                            <Link className="alert-link" to='/about'>
                                <h1 className='display-6'>Swole Goals</h1>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link active' to='/register'>
                                <button type="button" className='btn btn-outline-warning'>Register</button>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link active' to='/'>
                                <button type="button" className='btn btn-outline-warning'>Login</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


