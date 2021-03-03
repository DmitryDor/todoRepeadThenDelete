import React from 'react';
import './App.css';
import {Todolist} from "./featchers/todolist/todolist";
import {v1} from "uuid";

export type TasksType = Array<TaskType>
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    console.log('App')
    let tasks1 = [
        {id:v1(), title: 'HTML', isDone: true},
        {id:v1(), title: 'CSS', isDone: false},
        {id:v1(), title: 'React', isDone: false},
    ]

    let tasks2 = [
        {id:v1(), title: 'Milk', isDone: true},
        {id:v1(), title: 'Water', isDone: false},
        {id:v1(), title: 'Bread', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks1}/>
            <Todolist title='What to buy' tasks={tasks2}/>
        </div>
    );
}


export default App;
