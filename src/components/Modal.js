// import React, { Component } from 'react';
// import Url from '../Url.js';
// import '../App.css'

// class Modal extends Component {

//     state = {
//         goals: this.props.current.goals,
//         formInputs: {
//             activity: '',
//             description: ''
//         },
//         striked: false
//     }

//     handleGoalChange = (event) => {
//         console.log(event.target.id, "is the target id", event.target.value)
//         const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
//         this.setState(updateInput)
//     }

//     handleNewSubmit = (event, id) => {
//         console.log(id)
//         event.preventDefault()
//         fetch(`${Url}/${id}/goals`, {
//             body: JSON.stringify(this.state.formInputs),
//             method: 'POST',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//               }
//         })
//         .then(createdGoal => {
//             return createdGoal.json()
//         })
//         .then(jsonedGoal => {
//             this.setState({
//                 formInputs: {
//                     activity: '',
//                     description: ''
//                 },
//                 goals: [...this.props.current.goals, jsonedGoal],
//                 goals: [...this.state.goals, jsonedGoal]
//             })
//         }).then(this.props.getExercises())
//         .then(localStorage.setItem("reloadPage", true))
//         .catch(error => console.log(error))
//     }

//     deleteGoal =(id, index) => {
//         fetch(`${Url}/${id}/goals/${id}`, {
//             method: 'DELETE',
//         }).then(() => {
//             this.setState({
//                 goals: [...this.state.goals.slice(0, index), ...this.state.goals.slice(index + 1)]
//             });
//             window.location.reload()
//             // this.getData();
//         });
//     };

//     striked = ''

//     strikeThrough = (id, event) => {
//         console.log(id, event.target.id)
//         if(id===event.target.id) {
//             this.striked = "striked"
//         }
//     }

//     onClose=(event) =>{
//         this.props.checkLocalStorage();
//         this.props.show = false;
//     }

//     render() {
//         console.log(this.props.checkLocalStorage)

//         if(!this.props.show){
//             return null;
//         }
//         return(
//             <>
//                 <h1>This is my day</h1>
//                 <h2>{this.props.current.day}: {this.props.current.description}</h2>
//                 <div>{this.state.goals.map(goal=>{
//                     return(
//                         <div>
//                         <li id={goal.id} className={this.striked==="striked" ? this.striked : ""} onClick = {(event)=>this.strikeThrough(goal.id, event)}>{goal.activity}: {goal.description}</li>
//                         <button onClick={()=>this.deleteGoal(goal.id,this.props.current)}>Delete Goal</button>
//                         </div>
//                     )
//                 })}
//                 </div>
//                 <div>
//                     <h2>Add a new goal!</h2>
//                     <form onSubmit={(event)=>this.handleNewSubmit(event, this.props.current.id )}>
//                         <label htmlFor="activity">Activity</label>
//                         <input type="text" id="activity" value={this.state.formInputs.activity} onChange={this.handleGoalChange}/>
//                         <label htmlFor="description">Description</label>
//                         <input type="text" id="description" value={this.state.formInputs.description} onChange={this.handleGoalChange}/>
//                         <input type="submit" className="submit" />
//                     </form>
//                 </div>
//                 <div>
//                     <button onClick={(event)=>{
//                         this.props.onClose && this.props.onClose(event)}}>See All Days</button>
//                 </div>
//             </>
//         )
//     }
// }

// export default Modal

// this.props.current.id