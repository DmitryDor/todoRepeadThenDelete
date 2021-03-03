import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./featchers/todolist/todolist";
import {v1} from "uuid";

export type TasksType = Array<TaskType>
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<TasksType>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (taskId: string) => {
        const newTasks = tasks.filter(t => t.id !== taskId)
        setTasks(newTasks)
    }

    const changeTaskFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeTaskFilter={changeTaskFilter}
            />
        </div>
    );
}


export default App;
