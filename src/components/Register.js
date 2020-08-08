import React, { Component } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Url from '../Url';
export default class Register extends Component {
    state = {
        username: '',
        password: '',
        err: '',
    };
    handleInput = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.err, 'from handle submit');
        fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password,
                },
            }),
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data.username, 'from post req');
                console.log(data);
                if (data.username[0] === 'has already been taken') {
                    this.setState({
                        username: '',
                        password: '',
                        err: data.username[0],
                    });
                } else if (data.username[0] !== 'has already been taken') {
                    // window.location.reload()
                    console.log(data.username[0]);
                    this.setState({
                        err: '',
                    });
                    this.props.history.push('/login');
                }
            })
            .then(console.log(this.state, 'after data resp'))
            .catch(err => console.error(err, 'is error'));
    };
    render() {
        console.log(this.state.err, 'is the err from reg in state');
        console.log(this.state);
        return (
            <div className='login'>
                <Nav />
                <div className='text-center' data-gr-c-s-loaded="true">
                    <img className="mb-4" src="https://i.imgur.com/AZWXyaj.png?2" alt width="72" height="72"></img>
                    <h1 className='h3 mb-3 font-weight-normal'>Register</h1>
                    {this.state.err !== '' ? (
                        <div>
                            <h6 className='user-taken-h6'>{`Username ${this.state.err}`}</h6>
                            <form onSubmit={this.handleSubmit} className='form-signin'>
                                <label htmlFor='username' className="sr-only">
                                    <input
                                        className='form-control'
                                        placeholder='Create username'
                                        type='username'
                                        name='username'
                                        id='username'
                                        onChange={this.handleInput}
                                    />
                                </label>
                                <label htmlFor='password' className="sr-only">
                                    <input
                                        className='form-control'
                                        placeholder='Create password'
                                        type='password'
                                        name='password'
                                        id='password'
                                        onChange={this.handleInput}
                                    />
                                </label>
                                <div className="checkbox mb-3">
                                    <label>
                                    <input type="checkbox" value="remember-me"> Remember me</input>
                                    </label>
                                </div>
                                <button type='submit' className='btn btn-primary'>Sign Up</button>
                            </form>
                        </div>
                    ) : (
                        <form onSubmit={this.handleSubmit} className='form-signin'>
                            <label htmlFor='username'>
                                <input
                                    className='form-control mx-sm-4 login-input'
                                    placeholder='Create username'
                                    type='username'
                                    name='username'
                                    id='username'
                                    onChange={this.handleInput}
                                />
                            </label>
                            <label htmlFor='password'>
                                <input
                                    className='form-control mx-sm-5 login-input'
                                    placeholder='Create password'
                                    type='password'
                                    name='password'
                                    id='password'
                                    onChange={this.handleInput}
                                />
                            </label>
                            <div className="checkbox mb-3">
                                    <label>
                                    <input type="checkbox" value="remember-me"/> Remember me
                                    </label>
                                </div>
                            <button type='submit' className='btn btn-primary'>
                                Register
                            </button>
                            <p class="mt-5 mb-3 text-muted">© 2020</p>
                        </form>
                    )}
                </div>
                <Footer />
            </div>
        );
    }
}