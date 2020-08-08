import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <div className="blockquote-footer" className="text-center">
                <h6 className='footer-h5'>Created by: Zoe(Luting) Chen</h6>
                <div className='footer-icons'>
                <a id='github' href='https://github.com/zchen92' rel='noopener noreferrer' target='_blank'> <span> <i className='fa fa-github-square'></i></span></a>
                <a id='github' href='https://www.linkedin.com/in/luting-chen/' rel='noopener noreferrer' target='_blank'> <span> <i className='fa fa-linkedin'></i> </span></a>
                <Link className='' to='/about'>
                    <h6 className=''>Learn More</h6>
                </Link>
                </div>
            </div>
        );
    }
}