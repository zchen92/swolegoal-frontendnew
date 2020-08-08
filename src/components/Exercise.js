import React, { Component, useEffect, useState } from 'react';
// import Modal from './Modal.js';
import Url from '../Url.js';
import "./style.css"

function Exercise(props) {

    const [exercises, setExercises] = useState([])
    const [day, setDay] = useState("")
    const [description, setDescription] = useState("")
    const [user_id, setUserID] = useState(parseInt(localStorage.id))
    console.log(user_id)
    const [editing, setEditing] = useState(false)
    const [exerciseToEdit, setExerciseToEdit] = useState({})
    const [exerciseId, setExerciseId] = useState("")
    const [editedDay, setEditedDay] = useState("")
    const [editedDescription, setEditedDescription] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalExercise, setModalExercise] = useState([])
    const [goals, setGoal] = useState([])
    const [newGoalActivity, setGoalActivity] = useState("")
    const [newGoalDescription, setGoalDescription] = useState("")
    const [toggleGoal, setToggleGoal] = useState("none")
    const [checked, setChecked] = useState(false)
    const state = {
        items: []
    }

    useEffect(()=>{
        fetch(`${Url}`)
        .then(res => res.json())
        .then(jsonExercises=> setExercises(jsonExercises))
        .catch(error => console.error(error))
    }, [])

    const handleChange = (event) => {
        if (event.target.id === "day") setDay(event.target.value)
        if (event.target.id === "description") setDescription(event.target.value)
        if (event.target.id === "editedDay") setEditedDay(event.target.value)
        if (event.target.id === "editedDescription") setEditedDescription(event.target.value)
        if (event.target.id === "newGoalActivity") setGoalActivity(event.target.value)
        if (event.target.id === "newGoalDescription") setGoalDescription(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let form = event.currentTarget
        let data = {
            day: day,
            description: description,
            user_id: user_id
        }
        fetch(`${Url}`, {
          body: JSON.stringify(data),
          method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
        }).then(response => response.json())
        .then(jsonedExercise => fetch(`${Url}`)
            .then(res => res.json())
            .then(jsonExercises=> setExercises(jsonExercises))
            .then(form.reset())
            .catch(error => console.error(error)))
        .catch(error => console.log(error))
        }

        const handleDelete =(id, index) => {
          fetch(`${Url}/${id}`, {
              method: 'DELETE',
          }).then(() => {
            fetch(`${Url}`)
            .then(res => res.json())
            .then(jsonExercises=> setExercises(jsonExercises))
            .catch(error => console.error(error))
          });
        };

        const toggleEdit=(exercise) =>{
            setExerciseToEdit(exercise)
            setEditing(true)
            setExerciseId(exercise.id)
        }
    
        const handleEdit = (event) => {
            event.preventDefault();
            let data = {
                day: editedDay,
                description: editedDescription
            }
            fetch(`${Url}/${exerciseToEdit.id}`, {
                body: JSON.stringify(data),
                method: 'PUT',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(updatedExercise => {
                    fetch(`${Url}`)
                    .then(res => res.json())
                    .then(jsonExercises=> setExercises(jsonExercises))
                    .then(setEditing(false))
                    .catch(error => console.error(error))
                });
        }
    
        const toggleModal = (exercise) => {
            console.log(exercise)
            if(showModal === false) {
                setShowModal(true)
                setModalExercise(exercise)
            } else setShowModal(false)

        }

        const updateModalExercise = () => {
            fetch(`${Url}/${modalExercise.id}`)
            .then((data)=>{
                console.log(data)
                return data.json()
            }).then(response => setModalExercise(response))
        }

        const deleteGoal = (id, index) => {
            fetch(`${Url}/${modalExercise.id}/goals/${id}`, {
                method: 'DELETE',
            }).then(() => {
                updateModalExercise()
                fetch(`${Url}`)
                .then(res => res.json())
                .then(jsonExercises=> setExercises(jsonExercises))
                .catch(error => console.error(error))
            })
        };

        const handleNewSubmit = (event, id) => {
            event.preventDefault();
            let form = event.currentTarget
            let data = {
                activity: newGoalActivity,
                description: newGoalDescription
            }
            console.log(modalExercise.id)
            fetch(`${Url}/${modalExercise.id}/goals`, {
              body: JSON.stringify(data),
              method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
            }).then(response => response.json())
            .then(jsonedExercise => fetch(`${Url}`)
            .then(res => res.json())
            .then(jsonExercises=> {
                updateModalExercise()
                setExercises(jsonExercises)
            })
            .then(form.reset())
            .catch(error => console.error(error)))
        }

        let className = "none"
        const toggleStrikeThrough = (id, e) => {
            console.log(e.target.className)
            // e.target.className = "line-through"
            if(e.target.className === "none") {
                e.target.className = "line-through"
            } else {
                e.target.className = "none"
            }
        }

        
    return(
        <div className="container-fluid"> 
            {showModal === false ? 
                <div>
                    <div>
                        <h2>Set Up Tomorrow for Success!</h2>
                        <form onSubmit={handleSubmit} className="form-group">
                            <label htmlFor="day">Day</label>
                            <input type="text" id="day" onChange={handleChange} className="form-control"/>
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" onChange={handleChange} className="form-control"/>
                            <input type="submit" className="submit" />
                        </form>
                    </div>
                    {exercises.length && exercises.map(exercise=>{
                        // console.log(exercise, exercise.user_id, localStorage.id)
                        return(
                            <>
                                {exercise.user_id === parseInt(localStorage.id) ?
                                <div>
                                    <h3>{exercise.day} : {exercise.description}</h3>
                                    <button onClick={()=>handleDelete(exercise.id)} type="button" className="btn btn-danger">Delete Day</button>
                                    <button onClick={()=>toggleEdit(exercise)} type="button" className="btn btn-warning">Edit my Day</button>
                                    <button onClick={()=>toggleModal(exercise)} type="button" className="btn btn-primary">See This Day</button>
                                    {editing===true ? 
                                        <div>
                                            {exercise.id === exerciseId ? 
                                                <div>
                                                    <h1>Edit My Day</h1>
                                                    <form onSubmit={handleEdit}>
                                                        <label htmlFor="day">Day</label>
                                                        <input type="text" id="editedDay" onChange={handleChange}/>
                                                        <label htmlFor="description">Description</label>
                                                        <input type="text" id="editedDescription"onChange={handleChange}/>
                                                        <input type="submit" className="submit" />
                                                    </form>
                                                </div>
                                            : null} 
                                        </div> 
                                    : null}
                                 </div> : null}              
                            </>)})}
                </div> : 
                <div>
                    <div>
                        <h1>This Is My Day</h1>
                        <h2>{modalExercise.day}: {modalExercise.description}</h2>
                        <div className="shadow p-3 mb-5 bg-white rounded">{modalExercise.goals.map(goal=>{state.items.push(goal)
                            console.log(state.items)
                            return(
                                <div className="ListDiv">
                                    <ul className="list">
                                        <li className={className} id={`${goal.id}`} style={{textDecoration:'none'}} onClick={(e)=>toggleStrikeThrough(goal.id, e)}>
                                            <h3 className="h3Goal">{goal.activity}:</h3><p> {goal.description}</p>
                                        </li>
                                    </ul>
                                    <button onClick={()=>deleteGoal(goal.id)} type="button" className="btn btn-danger">I'm not feeling this one</button>
                                </div>
                            )
                            })}
                        </div>
                        <div>
                            <h2>Add a new goal!</h2>
                            <form onSubmit={(event)=>handleNewSubmit(event)} className="form-group">
                                <label htmlFor="activity">Activity</label>
                                <input type="text" id="newGoalActivity" onChange={handleChange} className="form-control"/>
                                <label htmlFor="description">Description</label>
                                <input type="text" id="newGoalDescription"onChange={handleChange} className="form-control"/>
                                <input type="submit" className="submit" />
                            </form>
                        </div>
                        <div>
                            <button onClick={toggleModal} type="button" className="btn btn-warning">See All Days</button>
                        </div>
                    </div>
                </div>
        }</div>
    )
}

export default Exercise



// import React, { Component } from 'react';
// import Modal from './Modal.js';
// import Url from '../Url.js';

// class Exercise extends Component {

//     state = {
//         exercises:[],
//         current:{},
//         show: false,
//         formInputs: {
//             day: '',
//             description: ''
//         },
//         day: '',
//         description: '',
//     }



//     state = {
//         exercises: [],
//         formInputs: {
//           day: '',
//           activity: ''
//         },
//         exerciseToEdit: {},
//         isEditing: false
//       }

//     componentDidMount() {
//         this.getExercises()
//     }

//     getData = () => {
//         fetch(`${Url}`)
//         .then(res => res.json())
//         .then(jsonExercises=> this.setState({exercises :jsonExercises}))
//         .catch(error => console.error(error))
//     }

//     getExercises = () =>{
//         fetch(`${Url}`)
//             .then(response => response.json())
//             .then(json => this.setState({exercises: json}))
//         .catch(error => console.error(error))
//     }

//     showModal = (event, exercise) => {
//         localStorage.setItem("reloadPage",false)
//         this.setState({
//             current: exercise,
//             show: !this.state.show
//         });
//     }

//     checkLocalStorage = () => {
//         if(localStorage.reloadPage === "true") {
//             window.location.reload();
//             localStorage.removeItem("reloadPage")
//         }
//     }

//     handleDayChange = (event) => {
//         this.props.exerciseToEdit.date =event.target.value
//         this.setState({[event.target.id]:event.target.value})
//     }

//     handleDescriptionChange = (event) => {
//         this.props.exerciseToEdit.date =event.target.value
//         this.setState({[event.target.id]:event.target.value})
//     }

//       componentDidMount() {
//         this.getData()
//       }
    
//       getData = () => {
//         fetch(`${Url}`)
//         .then(res => res.json())
//         .then(jsonExercises => this.setState({exercises :jsonExercises}))
//         .catch(error => console.error(error))
//       }
    
//       handleChange = (event) => {
//         const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
//         this.setState(updateInput)
//       }
    
//       handleSubmit  = (event) =>{
//         console.log("this is my new day")
//         event.preventDefault()
//         fetch(`${Url}`, {
//           body: JSON.stringify(this.state.formInputs),
//           method: 'POST',
//         headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'Content-Type': 'application/json'
//         }
//         })
//         .then(createdExercise => {
//           return createdExercise.json()
//         })
//         .then(jsonedExercise => {
//           this.setState({
//             formInputs: {
//               day: '',
//               description: ''
//             },
//             exercises: [jsonedExercise, ...this.state.exercises]
//           })
//         })
//         .catch(error => console.log(error))
//         }
    
//         handleDelete =(id, index) => {
//           fetch(`${Url}/${id}`, {
//               method: 'DELETE',
//           }).then(() => {
//               this.setState({
//                   days: [...this.state.exercises.slice(0, index), ...this.state.exercises.slice(index + 1)],
//               });
//               this.getData();
//           });
//         };
    
//         toggleEdit=(exercise) =>{
//           this.setState({
//               exerciseToEdit: exercise,
//               isEditing: !this.state.isEditing
//           })
//         }
    
//         handleUpdate(event, item, id) {
//           event.preventDefault();
//           fetch(`${Url}/${id}`, {
//               body: JSON.stringify(item),
//               method: 'PUT',
//               headers: {
//                   Accept: 'application/json, text/plain, */*',
//                   'Content-Type': 'application/json',
//               },
//           })
//               .then(response => response.json())
//               .then(updatedExercise => {
//                   window.location.reload()
//               });
//         }
    


//     render() {
//         console.log(localStorage)
//         return(
//             <div>
//                 {this.state.show === false ? 
//                     <div>
//                         {this.props.content.map((exercise,index) => {
//                             console.log(this.props.exerciseToEdit)
//                             if(this.props.isEditing) {
//                                 if(this.props.exerciseToEdit.exercise.id === exercise.id) 
//                                     return(
//                                         <div>
//                                             <div>
//                                                 <h1>Edit My Day</h1>
//                                                 <form onSubmit={(event)=>this.props.handleUpdate(event, this.props.exerciseToEdit)}>
//                                                     <label htmlFor="day">Day</label>
//                                                     <input type="text" id="day" value={this.props.exerciseToEdit.exercise}onChange={this.handleDayChange}/>
//                                                     <label htmlFor="description">Description</label>
//                                                     <input type="text" id="description" value={this.props.exerciseToEdit.exercise} onChange={this.handleDescriptionChange}/>
//                                                 <input type="submit" className="submit" />
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     )  
//                             } else return(
//                                 <div key={exercise.id}>
//                                     <h1>Let's Get Moving</h1>
//                                     {this.state.exercises.length && this.state.exercises.map(exercise=>{
//                                                 return(
//                                                     <div key={exercise.id} className="exercise">
//                                                         <h2>{exercise.day}</h2>
//                                                         <p>{exercise.description}</p>
//                                                         <button onClick={()=>this.props.handleDelete}>Delete Day</button>
//                                                         <button onClick={()=>this.props.toggleEdit(exercise)}>Update Day</button>
//                                                         <button onClick={(event)=>{this.showModal(event, exercise)}}>See This Day</button> 
//                                                     </div>  
//                                                 )})}
//                                 </div>
//                             )
//                         })}
//                     </div> : <div>
//                         {Object.keys(this.state.current).length && <Modal 
//                         show={this.state.show} 
//                         onClose={this.showModal} 
//                         getExercises={this.getExercises}
//                         checkLocalStorage={this.checkLocalStorage}
//                         current={this.state.current}/>}
//                         </div>}
//             </div>
//         )
//     }
// }

// export default Exercise



{/* <div>
                            <h2>Set Up Tomorrow for Success!</h2>
                            <form onSubmit={(event)=>this.handleSubmit()}>
                                <label htmlFor="day">Day</label>
                                <input type="text" id="day" value={this.state.formInputs.day} onChange={this.handleChange}/>
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" value={this.state.formInputs.description} onChange={this.handleChange}/>
                                <input type="submit" className="submit" />
                            </form>
                        </div> */}










// import React, { Component, useEffect, useState } from 'react';
// import Modal from './Modal.js';
// import Url from '../Url.js';

// function Exercise(props) {

//     const [exercises, setExercises] = useState([])
//     const [day, setDay] = useState("")
//     const [description, setDescription] = useState("")
//     const [editing, setEditing] = useState(false)
//     const [exerciseToEdit, setExerciseToEdit] = useState({})
//     const [exerciseId, setExerciseId] = useState("")
//     const [editedDay, setEditedDay] = useState("")
//     const [editedDescription, setEditedDescription] = useState("")

//     useEffect(()=>{
//         fetch(`${Url}`)
//         .then(res => res.json())
//         .then(jsonExercises=> setExercises(jsonExercises))
//         .catch(error => console.error(error))
//     }, [])

//     const handleChange = (event) => {
//         if (event.target.id === "day") setDay(event.target.value)
//         if (event.target.id === "description") setDescription(event.target.value)
//         if (event.target.id === "editedDay") setEditedDay(event.target.value)
//         if (event.target.id === "editedDescription") setEditedDescription(event.target.value)
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         let form = event.currentTarget
//         let data = {
//             day: day,
//             description: description
//         }
//         fetch(`${Url}`, {
//           body: JSON.stringify(data),
//           method: 'POST',
//         headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'Content-Type': 'application/json'
//         }
//         }).then(response => response.json())
//         .then(jsonedExercise => fetch(`${Url}`)
//             .then(res => res.json())
//             .then(jsonExercises=> setExercises(jsonExercises))
//             .then(form.reset())
//             .catch(error => console.error(error)))
//         .catch(error => console.log(error))
//         }

//         const handleDelete =(id, index) => {
//           fetch(`${Url}/${id}`, {
//               method: 'DELETE',
//           }).then(() => {
//             fetch(`${Url}`)
//             .then(res => res.json())
//             .then(jsonExercises=> setExercises(jsonExercises))
//             .catch(error => console.error(error))
//           });
//         };

//         const toggleEdit=(exercise) =>{
//             setExerciseToEdit(exercise)
//             setEditing(true)
//             setExerciseId(exercise.id)
//         }
    
//         const handleEdit = (event) => {
//             event.preventDefault();
//             let data = {
//                 day: editedDay,
//                 description: editedDescription
//             }
//             fetch(`${Url}/${exerciseToEdit.id}`, {
//                 body: JSON.stringify(data),
//                 method: 'PUT',
//                 headers: {
//                     Accept: 'application/json, text/plain, */*',
//                     'Content-Type': 'application/json',
//                 },
//             })
//                 .then(response => response.json())
//                 .then(updatedExercise => {
//                     fetch(`${Url}`)
//                     .then(res => res.json())
//                     .then(jsonExercises=> setExercises(jsonExercises))
//                     .then(setEditing(false))
//                     .catch(error => console.error(error))
//                 });
//         }
    

//     return(
//         <div>
//             <div>
//                 <h2>Set Up Tomorrow for Success!</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="day">Day</label>
//                     <input type="text" id="day" onChange={handleChange}/>
//                     <label htmlFor="description">Description</label>
//                     <input type="text" id="description" onChange={handleChange}/>
//                     <input type="submit" className="submit" />
//                 </form>
//             </div>
//             {exercises.length && exercises.map(exercise=>{
//                 return(
//                     <>
//                         <h2>{exercise.day}</h2>
//                         <p>{exercise.description}</p>
//                         <button onClick={()=>handleDelete(exercise.id)}>Delete Day</button>
//                         <button onClick={()=>toggleEdit(exercise)}>Edit my Day</button>
//                         {editing===true ? 
//                             <div>
//                                 {exercise.id === exerciseId ? 
//                                     <div>
//                                         <h1>Edit My Day</h1>
//                                         <form onSubmit={handleEdit}>
//                                             <label htmlFor="day">Day</label>
//                                             <input type="text" id="editedDay" onChange={handleChange}/>
//                                             <label htmlFor="description">Description</label>
//                                             <input type="text" id="editedDescription"onChange={handleChange}/>
//                                             <input type="submit" className="submit" />
//                                         </form>
//                                     </div>
//                                 : null} 
//                             </div> 
//                         : null}
//                 </>)})}
//         </div>
//     )
// }


// export default Exercise