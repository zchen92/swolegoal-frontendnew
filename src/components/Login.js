import React, { Component } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Url from '../Url';


export default class Login extends Component {
    state = {
        currentUser: {},
        msg: '',
        username: '',
        password: '',
    };
    tryAgain = () => {
        this.setState({
            msg: ''
        })
        this.props.history.push('/login')
    }
    handleInput = event => {
        console.log(event.target.value)
        this.setState({
            [event.target.id]: event.target.value,
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        fetch(`http://localhost:3000/users/login`, {
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password,
                },
            }),
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json, text/plain, */*',
            },
        })
            .then(response => response.json())
            .then(response => {
                // localStorage.clear();
                localStorage.token = response.token;
                localStorage.setItem('id', response.user.id);
                console.log(localStorage, 'from login ')
                return this.setState({
                    currentUser: response.currentUser,
                    username: '',
                    password: '',
                });
            })
            .then(e => this.props.history.push('/home'))
            .catch(err =>
                this.setState({
                    msg: 'Incorrect username or password',
                }),
            );
    };
    render() {
        if (this.state.msg === '') {
            return (
                <div className='container-fluid'>
                    <Nav />
                    <div className='text-center' data-gr-c-s-loaded="true">
                    <img className="mb-4" src="https://i.imgur.com/AZWXyaj.png?2" alt width="72" height="72"></img>
                        <h1 className='h3 mb-3 font-weight-normal'>Login</h1>
                        <form onSubmit={this.handleSubmit} className=''>
                        {/* <i className='far fa-dumbbell'></i>  */}
                            <label htmlFor='username'>
                                <input
                                    className='form-control mx-sm-4 login-input'
                                    placeholder='Enter Username'
                                    type='text'
                                    name='username'
                                    id='username'
                                    required={true}
                                    onChange={this.handleInput}
                                />
                            </label>
                            <label htmlFor='password'>
                                <input
                                    className='form-control mx-sm-5 login-input'
                                    placeholder='Enter password'
                                    type='password'
                                    name='password'
                                    id='password'
                                    required={true}
                                    onChange={this.handleInput}
                                />
                            </label>
                            <div className="checkbox mb-3">
                                    <label>
                                    <input type="checkbox" value="remember-me"/> Remember me
                                    </label>
                                </div>
                            <button type="button" className='btn btn-primary' type='submit'>
                                Login
                            </button>
                            <p class="mt-5 mb-3 text-muted">© 2020</p>
                        </form>
                    </div>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div className='container-fluid'>
                    <Nav />
                    <div className="text-center">
                        <h2 className='h3 mb-3 font-weight-normal'>Incorrect username or password</h2>
                        <button type="button" className='btn btn-danger' onClick={this.tryAgain}>Try again?</button>
                        <p class="mt-5 mb-3 text-muted">© 2020</p>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}