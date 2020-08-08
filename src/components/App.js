import React, { Component } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Exercise from './Exercise';
import Url from '../Url'

export default class App extends Component {
    render() {
        return (
            <div className='App'>
                <Nav />
                <h2 className="text-center">Hi, welcome to Swole Goals!</h2>
                <p className="blockquote">Swole Goals is a full-CRUD application designed to help task-oriented users achieve their desired fitness goals. The user simply creates a secure account, and enters the day and the fitness goal for the day (i.e Mondays are my leg days). Within each day, they can enter specific activities they want to complete, along with a description of the activity, such as the number of sets or repetitions, duration of activity, or links to tutorials they want to refer to. With each activity they complete, they are able to feel the accomplishment by crossing it off the list. The application entails Ruby on Raiils on the backend, React on the front end, and basic CSS and Bootstrap for the final design. Simple as that. Let's get swole!</p>
                <h2 className="text-center">About Me</h2>
                <div className="text-center">
                    <img src="https://i.imgur.com/vuX3ls7.png" alt="Zoe Chen" width="150" height="200" className="img-thumbnail" ></img>
                </div>
                <p className="blockquote">My name is Zoe (Luting) Chen, and I am a fullstack developer based out of Boston, MA with experience in the MERN stack, Ruby on Rails, Javascript, HTML, and CSS. I love to create apps that solve human problems. The inspiration for this project came from my own inability to focus on my exercise goals, often times forgetting what I set out to accomplish the day prior. I wanted to create an app that would keep me accountable, but also lets me review all my previous accomplishments. If you are interest in getting to know more about my works, please check out my GitHub, and LinkedIn below! </p>
                <Footer />
            </div>
        );
    }
}

